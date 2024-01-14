module.exports = function metersPerPixel () {
  if (global.map) {
    return 40075016.686 * Math.abs(Math.cos(global.map.getCenter().lat / 180 * Math.PI)) / Math.pow(2, global.map.getZoom() + 8)
  }

  return 1
}
