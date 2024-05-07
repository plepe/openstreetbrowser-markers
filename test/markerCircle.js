/* global describe, it */
const test = require('./src/test')
const markers = require('../src/markers')

describe('markerCircle', function () {
  it('without parameters', function (callback) {
    test(markers.circle, 'circle1', {}, callback)
  })

  it('color and width', function (callback) {
    test(markers.circle, 'circle2', { color: 'red', width: 5 }, callback)
  })

  it('color, width, title', function (callback) {
    test(markers.circle, 'circle-title', { color: 'red', width: 5, title: '<foo>' }, callback)
  })

  it('color, width, dashArray', function (callback) {
    test(markers.circle, 'circle-dash', { color: 'red', width: 5, dashArray: '2,3' }, callback)
  })

  it('offset', function (callback) {
    test(markers.circle, 'circle3', { offset: -5 }, callback)
  })

  it('width as string', function (callback) {
    test(markers.circle, 'circle-string-width', { color: 'red', width: '3' }, callback)
  })

  it('two circles', function (callback) {
    test(markers.circle, 'circle4', {
      styles: ['default', 'sec'],
      style: { color: 'red', width: 5 },
      'style:sec': { color: 'blue', width: 2, offset: -3.5 }
    }, callback)
  })

  it('ignoreStyles', function (callback) {
    test(markers.circle, 'circle5', {
      styles: ['default', 'sec'],
      style: { color: 'red', width: 5 },
      'style:sec': { color: 'blue', width: 2, offset: -3.5 }
    }, { ignoreStyles: ['sec'] }, callback)
  })
})
