const test = require('./src/test')

const markers = require('../src/markers')

describe('markerCircle', function () {
  it('without parameters', function (callback) {
    test(markers.circle, 'circle1', {}, callback)
  })

  it('color and width', function (callback) {
    test(markers.circle, 'circle2', {color: 'red', width: 5}, callback)
  })

  it('offset', function (callback) {
    test(markers.circle, 'circle3', {offset: -5}, callback)
  })

  it('two circles', function (callback) {
    test(markers.circle, 'circle4', {
      styles:['default','sec'],
      'style': {color: 'red', width: 5},
      'style:sec': {color: 'blue', width: 2, offset: -3.5}
    }, callback)
  })
})
