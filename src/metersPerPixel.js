module.exports = function metersPerPixel () {
  if (typeof global.map === 'object' && global.map.getCenter && typeof global.map.getCenter === 'function') {
    return 40075016.686 * Math.abs(Math.cos(global.map.getCenter().lat / 180 * Math.PI)) / Math.pow(2, global.map.getZoom() + 8)
  }

  return 1
}
