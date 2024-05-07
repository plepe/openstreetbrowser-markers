/* global describe, it */
const test = require('./src/test')
const markers = require('../src/markers')

describe('markerPointer', function () {
  it('without parameters', function (callback) {
    test(markers.pointer, 'pointer1', {}, callback)
  })

  it('color and width', function (callback) {
    test(markers.pointer, 'pointer2', { color: 'red', width: 5 }, callback)
  })

  it('color, width, dashArray', function (callback) {
    test(markers.pointer, 'pointer-dash', { color: 'red', width: 5, dashArray: '2,3' }, callback)
  })

  it('color, width, title', function (callback) {
    test(markers.pointer, 'pointer-title', { color: 'red', width: 5, title: '<foo>' }, callback)
  })

  it('size=8', function (callback) {
    test(markers.pointer, 'pointer-size8', { size: 8 }, callback)
  })

  it('size=9', function (callback) {
    test(markers.pointer, 'pointer-size9', { size: 8 }, callback)
  })

  it('offset', function (callback) {
    test(markers.pointer, 'pointer3', { offset: -5 }, callback)
  })

  it('width as string', function (callback) {
    test(markers.pointer, 'pointer-string-width', { color: 'red', width: '3' }, callback)
  })

  it('two pointers', function (callback) {
    test(markers.pointer, 'pointer4', {
      styles: ['default', 'sec'],
      style: { color: 'red', width: 5 },
      'style:sec': { color: 'blue', width: 2, offset: -3.5 }
    }, callback)
  })

  it('ignoreStyles', function (callback) {
    test(markers.pointer, 'pointer5', {
      styles: ['default', 'sec'],
      style: { color: 'red', width: 5 },
      'style:sec': { color: 'blue', width: 2, offset: -3.5 }
    }, { ignoreStyles: ['sec'] }, callback)
  })
})
