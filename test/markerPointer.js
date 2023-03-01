const test = require('./src/test')

const markers = require('../src/markers')

describe('markerPointer', function () {
  it('without parameters', function (callback) {
    test(markers.pointer, 'pointer1', {}, callback)
  })

  it('color and width', function (callback) {
    test(markers.pointer, 'pointer2', {color: 'red', width: 5}, callback)
  })

  it('offset', function (callback) {
    test(markers.pointer, 'pointer3', {offset: -5}, callback)
  })

  it('two pointers', function (callback) {
    test(markers.pointer, 'pointer4', {
      styles:['default','sec'],
      'style': {color: 'red', width: 5},
      'style:sec': {color: 'blue', width: 2, offset: -3.5}
    }, callback)
  })
})
