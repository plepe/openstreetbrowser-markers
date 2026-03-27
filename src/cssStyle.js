const parseLength = require('@geowiki-net/geowiki-lib-geo-functions/src/parseLength')

module.exports = function cssStyle (style, map) {
  let ret = ''
  if ('color' in style) {
    ret += 'stroke: ' + style.color + ';'
  }
  if ('opacity' in style) {
    ret += 'stroke-opacity: ' + style.opacity + ';'
  }
  ret += 'stroke-width: ' + parseLength('width' in style ? style.width : '3', map) + ';'
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
