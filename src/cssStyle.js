const parseLength = require('overpass-layer/src/parseLength')
const metersPerPixel = require('./metersPerPixel')

module.exports = function cssStyle (style) {
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
