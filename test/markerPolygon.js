const test = require('./src/test')

const markers = require('../src/markers')

describe('markerPolygon', function () {
  it('without parameters', function (callback) {
    test(markers.polygon, 'polygon1', {}, callback)
  })

  it('color and width', function (callback) {
    test(markers.polygon, 'polygon2', {color: 'red', width: 5}, callback)
  })

  it('offset', function (callback) {
    test(markers.polygon, 'polygon3', {offset: -5}, callback)
  })

  it('two polygons', function (callback) {
    test(markers.polygon, 'polygon4', {
      styles:['default','sec'],
      'style': {color: 'red', width: 5},
      'style:sec': {color: 'blue', width: 2, offset: -3.5}
    }, callback)
  })
})
