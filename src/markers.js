const htmlEscape = require('html-escape')
const parseLength = require('@geowiki-net/geowiki-lib-geo-functions/src/parseLength')
const getHalfHeight = require('./getHalfHeight')
const cssStyle = require('./cssStyle')

function fixParameters (options, map) {
  if (!map) {
    if (options.zoom) {
      map = options
      options = {}
    } else {
      map = {}
    }
  }

  return [options, map]
}

/**
 * return a marker with a line
 * @param {Object} data - Style options
 * @param {Object} [options] - Additional options
 * @param {string[]} [options.ignoreStyles] - List of style id's which should be ignored (e.g. ['hover'])
 * @param {Object} [map] - Map information (an object with: e.g. { zoom: 12, center: { lat: 0, lon: 0 }[, metersPerPixel: 0.5] }). If not defined, it will calculate the information from the global.map object (if defined), otherwise metersPerPixel will be assumed to be 1.
 * @return {string} - an SVG image
 */
function markerLine (data, options = {}, map = null) {
  [options, map] = fixParameters(options, map)

  const styles = parseOptions(data, options, map)

  const halfHeight = getHalfHeight(styles)
  const countEvenStyles = styles
    .filter(style => Math.round(parseFloat(style.width) + Math.abs(style.offset || 0)) % 2 === 0)
    .length
  const countOddStyles = styles
    .filter(style => Math.round(parseFloat(style.width) + Math.abs(style.offset || 0)) % 2 === 1)
    .length
  const shiftOdd = countOddStyles > countEvenStyles ? 1 : 0

  const height = halfHeight * 2 + 1

  let ret = '<svg xmlns="http://www.w3.org/2000/svg" anchorX="13" anchorY="' + (halfHeight + 1) + '" width="25" height="' + height + '">'

  styles.forEach(style => {
    const y = halfHeight + parseLength('offset' in style ? style.offset : 0, map) + shiftOdd / 2

    ret += '<line x1="0" y1="' + y + '" x2="25" y2="' + y + '" style="' + cssStyle(style, map) + '"'

    if (style.title) {
      ret += '><title>' + htmlEscape(style.title) + '</title></line>'
    } else {
      ret += '/>'
    }
  })

  ret += '</svg>'

  return ret
}

// source: https://stackoverflow.com/a/17323608
function mod (n, m) {
  return ((n % m) + m) % m
}

/**
 * return a marker with a polygon
 * @param {Object} data - Style options
 * @param {Object} [options] - Additional options
 * @param {string[]} [options.ignoreStyles] - List of style id's which should be ignored (e.g. ['hover'])
 * @param {Object} [map] - Map information (an object with: e.g. { zoom: 12, center: { lat: 0, lon: 0 }[, metersPerPixel: 0.5] }). If not defined, it will calculate the information from the global.map object (if defined), otherwise metersPerPixel will be assumed to be 1.
 * @return {string} - an SVG image
 */
function markerPolygon (data, options = {}, map = null) {
  [options, map] = fixParameters(options, map)

  const styles = parseOptions(data, options, map)

  const halfHeight = getHalfHeight(styles)
  const halfWidth = Math.max(9, halfHeight + 3)

  const countEvenStyles = styles
    .filter(style => mod(Math.round(parseFloat(style.width) + parseFloat(style.offset || 0) * 2), 2) === 0)
    .length
  const countOddStyles = styles
    .filter(style => mod(Math.round(parseFloat(style.width) + parseFloat(style.offset || 0) * 2), 2) === 1)
    .length
  const shiftOdd = countOddStyles > countEvenStyles ? -0.5 : 0
  const height = (halfHeight + halfWidth) * 2 - (countOddStyles > countEvenStyles ? 1 : 0)

  let ret = '<svg xmlns="http://www.w3.org/2000/svg" anchorX="' + (halfHeight + halfWidth + 1) + '" anchorY="' + (halfHeight + halfWidth + 1) + '" width="' + height + '" height="' + height + '">'

  styles.forEach(style => {
    const offset = parseLength('offset' in style ? style.offset : 0, map)

    ret += '<rect x="' + (halfHeight + offset + shiftOdd) + '" y="' + (halfHeight + offset + shiftOdd) + '" width="' + ((halfWidth - offset) * 2) + '" height="' + ((halfWidth - offset) * 2) + '" style="' + cssStyle(style, map) + '"'

    if (style.title) {
      ret += '><title>' + htmlEscape(style.title) + '</title></rect>'
    } else {
      ret += '/>'
    }
  })

  ret += '</svg>'

  return ret
}

/**
 * return a marker with a circle
 * @param {Object} data - Style options
 * @param {Object} [options] - Additional options
 * @param {string[]} [options.ignoreStyles] - List of style id's which should be ignored (e.g. ['hover'])
 * @param {Object} [map] - Map information (an object with: e.g. { zoom: 12, center: { lat: 0, lon: 0 }[, metersPerPixel: 0.5] }). If not defined, it will calculate the information from the global.map object (if defined), otherwise metersPerPixel will be assumed to be 1.
 * @return {string} - an SVG image
 */
function markerCircle (data, options = {}, map = null) {
  [options, map] = fixParameters(options, map)

  const styles = parseOptions(data, options, map)

  const c = styles
    .map(style => (style.size || style.radius || 12) + (style.width / 2) + (style.offset || 0))
    .sort()[0]

  let ret = '<svg xmlns="http://www.w3.org/2000/svg" anchorX="' + (c + 0.5) + '" anchorY="' + (c + 0.5) + '" width="' + (c * 2) + '" height="' + (c * 2) + '">'

  styles.forEach(style => {
    ret += '<circle cx="' + c + '" cy="' + c + '" r="' + ((style.radius || 12) + (style.offset || 0)) + '" style="' + cssStyle(style, map) + '"'

    if (style.title) {
      ret += '><title>' + htmlEscape(style.title) + '</title></circle>'
    } else {
      ret += '/>'
    }
  })

  ret += '</svg>'

  return ret
}

/**
 * return a marker with a pointer
 * @param {Object} data - Style options
 * @param {Object} [options] - Additional options
 * @param {string[]} [options.ignoreStyles] - List of style id's which should be ignored (e.g. ['hover'])
 * @param {Object} [map] - Map information (an object with: e.g. { zoom: 12, center: { lat: 0, lon: 0 }[, metersPerPixel: 0.5] }). If not defined, it will calculate the information from the global.map object (if defined), otherwise metersPerPixel will be assumed to be 1.
 * @return {string} - an SVG image
 */
function markerPointer (data, options = {}, map) {
  [options, map] = fixParameters(options, map)

  const styles = parseOptions(data, options, map)

  const c = styles
    .map(style => parseFloat(style.size || style.radius || 12) + parseFloat(style.width / 2) + parseFloat(style.offset || 0))
    .sort()[0]
  const size = styles.map(style => parseFloat(style.size || style.radius || 12))
    .sort()[0]
  const height = size * 2.75 + c

  let ret = '<svg xmlns="http://www.w3.org/2000/svg" anchorX="' + (c + 0.5) + '" anchorY="' + toFixed2(c + size * 2.75 + 0.5) + '" width="' + (c * 2) + '" height="' + toFixed2(height + 0.5) + '" signAnchorX="0" signAnchorY="' + -toFixed2(size * 2.75) + '">'

  styles.forEach(style => {
    const size = parseFloat(style.size || style.radius || 12) + parseFloat(style.offset || 0)

    ret += '<path d="' +
      'M' + toFixed2(c - size) + ',' + c + ' ' +
      'A ' + size + ',' + size + ' 0 0 1 ' + (c + size) + ',' + c + ' ' +
      'C ' + (c + size) + ',' + toFixed2(c + size * 0.85) + ' ' + toFixed2(c + size * 0.05) + ',' + toFixed2(c + size * 1.75) + ' ' + c + ',' + toFixed2(height) + ' ' +
      'C ' + toFixed2(c - size * 0.05) + ',' + toFixed2(c + size * 1.75) + ' ' + toFixed2(c - size) + ',' + toFixed2(c + size * 0.85) + ' ' + (c - size) + ',' + c +
      '" style="' + cssStyle(style, map) + '"'

    if (style.title) {
      ret += '><title>' + htmlEscape(style.title) + '</title></path>'
    } else {
      ret += '/>'
    }
  })

  ret += '</svg>'

  return ret
}

function parseOptions (data, options, map) {
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

  if (options.ignoreStyles) {
    data.styles = data.styles.filter(k => !options.ignoreStyles.includes(k))
  }

  return data.styles.map(k => (k === 'default' ? data.style : data['style:' + k]) || {})
}

function toFixed2 (v) {
  return v.toFixed(2)
}

module.exports = {
  line: markerLine,
  circle: markerCircle,
  pointer: markerPointer,
  polygon: markerPolygon
}
