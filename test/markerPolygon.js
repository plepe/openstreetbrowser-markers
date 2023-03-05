/* global describe, it */
const test = require('./src/test')
const markers = require('../src/markers')

describe('markerPolygon', function () {
  it('without parameters', function (callback) {
    test(markers.polygon, 'polygon1', {}, callback)
  })

  it('color and width 4', function (callback) {
    test(markers.polygon, 'polygon2a', { color: 'red', width: 4 }, callback)
  })

  it('color and width 5', function (callback) {
    test(markers.polygon, 'polygon2b', { color: 'red', width: 5 }, callback)
  })

  it('offset -4', function (callback) {
    test(markers.polygon, 'polygon3a', { offset: -4 }, callback)
  })

  it('offset -5', function (callback) {
    test(markers.polygon, 'polygon3b', { offset: -5 }, callback)
  })

  it('offset -4.5', function (callback) {
    test(markers.polygon, 'polygon3c', { offset: -4.5 }, callback)
  })

  it('two polygons', function (callback) {
    test(markers.polygon, 'polygon4', {
      styles: ['default', 'sec'],
      style: { color: 'red', width: 5 },
      'style:sec': { color: 'blue', width: 2, offset: -3.5 }
    }, callback)
  })

  it('ignoreStyles', function (callback) {
    test(markers.polygon, 'polygon5', {
      styles: ['default', 'sec'],
      style: { color: 'red', width: 5 },
      'style:sec': { color: 'blue', width: 2, offset: -3.5 }
    }, { ignoreStyles: ['sec'] }, callback)
  })
})
