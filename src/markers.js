const parseLength = require('overpass-layer/src/parseLength')
const getHalfHeight = require('./getHalfHeight')

function metersPerPixel () {
  return global.map ? global.map.getMetersPerPixel() : 1
}

function cssStyle (style) {
  let ret = ''
  if ('color' in style) {
    ret += 'stroke: ' + style.color + ';'
  }
  ret += 'stroke-width: ' + parseLength('width' in style ? style.width : '3', metersPerPixel()) + ';'
  if ('dashArray' in style) {
    ret += 'stroke-dasharray: ' + style.dashArray + ';'
  }
  if ('dashArray' in style) {
    ret += 'stroke-dasharray: ' + style.dashArray + ';'
  }
  if ('dashOffset' in style) {
    ret += 'stroke-dashoffset: ' + style.dashOffset + ';'
  }

  if (!('fill' in style) || style.fill) {
    if ('fillColor' in style) {
      ret += 'fill: ' + style.fillColor + ';'
    } else if ('color' in style) {
      ret += 'fill: ' + style.color + ';'
    } else {
      ret += 'fill: #3388ff;'
    }
    if ('fillOpacity' in style) {
      ret += 'fill-opacity: ' + style.fillOpacity + ';'
    } else {
      ret += 'fill-opacity: 0.2;'
    }
  } else {
    ret += 'fill-opacity: 0;'
  }

  return ret
}

/**
 * return a marker with a line
 * @param {Object} data - Style options
 * @param {Object} [options] - Additional options
 * @return {string} - an SVG image
 */
function markerLine (data, options = {}) {
  const styles = parseOptions(data, options)

  const halfHeight = getHalfHeight(styles)
  const countEvenStyles = styles
    .filter(style => Math.round(style.width + Math.abs(style.offset || 0)) % 2 == 0)
    .length
  const countOddStyles = styles
    .filter(style => Math.round(style.width + Math.abs(style.offset || 0)) % 2 == 1)
    .length
  const shiftOdd = countOddStyles > countEvenStyles ? 1 : 0

  const height = halfHeight * 2 + 1

  let ret = '<svg anchorX="13" anchorY="' + (halfHeight + 1) + '" width="25" height="' + height + '">'

  styles.forEach(style => {
    const y = halfHeight + parseLength('offset' in style ? style.offset : 0, metersPerPixel()) + shiftOdd / 2

    ret += '<line x1="0" y1="' + y + '" x2="25" y2="' + y + '" style="' + cssStyle(style) + '"/>'
  })

  ret += '</svg>'

  return ret
}

/**
 * return a marker with a polygon
 * @param {Object} data - Style options
 * @param {Object} [options] - Additional options
 * @return {string} - an SVG image
 */
function markerPolygon (data, options = {}) {
  const styles = parseOptions(data, options)

  const halfHeight = getHalfHeight(styles)
  const halfWidth = Math.max(9, halfHeight + 3)
  const height = (halfHeight + halfWidth) * 2 + 1

  let ret = '<svg anchorX="' + (halfHeight + halfWidth + 1) + '" anchorY="' + (halfHeight + halfWidth + 1) + '" width="' + height + '" height="' + height + '">'

  styles.forEach(style => {
    const offset = parseLength('offset' in style ? style.offset : 0, metersPerPixel())

    ret += '<rect x="' + (halfHeight + offset) + '" y="' + (halfHeight + offset) + '" width="' + ((halfWidth - offset) * 2) + '" height="' + ((halfWidth - offset) * 2) + '" style="' + cssStyle(style) + '"/>'
  })

  ret += '</svg>'

  return ret
}

/**
 * return a marker with a circle
 * @param {Object} data - Style options
 * @param {Object} [options] - Additional options
 * @return {string} - an SVG image
 */
function markerCircle (data, options = {}) {
  const styles = parseOptions(data, options)

  const c = styles
    .map(style => (style.size || style.radius || 12) + (style.width / 2) + (style.offset || 0))
    .sort()[0]

  let ret = '<svg anchorX="' + (c + 0.5) + '" anchorY="' + (c + 0.5) + '" width="' + (c * 2) + '" height="' + (c * 2) + '">'

  styles.forEach(style => {
    ret += '<circle cx="' + c + '" cy="' + c + '" r="' + ((style.radius || 12) + (style.offset || 0)) + '" style="' + cssStyle(style) + '"/>'
  })

  ret += '</svg>'

  return ret
}

/**
 * return a marker with a pointer
 * @param {Object} data - Style options
 * @param {Object} [options] - Additional options
 * @return {string} - an SVG image
 */
function markerPointer (data, options = {}) {
  const styles = parseOptions(data, options)

  let ret = '<svg anchorX="13" anchorY="45" width="25" height="45" signAnchorX="0" signAnchorY="-31">'

  styles.forEach(style => {
    ret += '<path d="M0.5,12.5 A 12,12 0 0 1 24.5,12.5 C 24.5,23 13,30 12.5,44.5 C 12,30 0.5,23 0.5,12.5" style="' + cssStyle(style) + '"/>'
  })

  ret += '</svg>'

  return ret
}

function parseOptions (data, options) {
  if (!data || (!('style' in data) && !('styles' in data))) {
    const ret = [
      { fillColor: '#f2756a', color: '#000000', width: 1, radius: 12, fillOpacity: 1 }
    ]

    if (data && data.color) {
      ret[0].fillColor = data.color
      ret[0].fillOpacity = 0.2
    }

    if (data) {
      for (const k in data) {
        ret[0][k] = data[k]
      }
    }

    return ret
  }

  if (!('styles' in data)) {
    data = {
      style: data,
      styles: ['default']
    }
  }

  if (typeof data.styles === 'string') {
    data.styles = data.styles.split(/,/g)
  } else if (!data.styles) {
    data.styles = []
  }

  return data.styles.map(k => (k === 'default' ? data.style : data['style:' + k]) || {})
}

module.exports = {
  line: markerLine,
  circle: markerCircle,
  pointer: markerPointer,
  polygon: markerPolygon
}
