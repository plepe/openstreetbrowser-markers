/* global describe, it */
const test = require('./src/test')
const markers = require('../src/markers')

describe('markerLine', function () {
  it('without parameters', function (callback) {
    test(markers.line, 'line1', {}, callback)
  })

  it('color and odd width', function (callback) {
    test(markers.line, 'line2a', { color: 'red', width: 5 }, callback)
  })

  it('color and even width', function (callback) {
    test(markers.line, 'line2b', { color: 'red', width: 6 }, callback)
  })

  it('offset', function (callback) {
    test(markers.line, 'line3', { offset: -5 }, callback)
  })

  it('width as string', function (callback) {
    test(markers.line, 'line-string-width', { color: 'red', width: '3' }, callback)
  })

  it('two lines', function (callback) {
    test(markers.line, 'line4', {
      styles: ['default', 'sec'],
      style: { color: 'red', width: 5 },
      'style:sec': { color: 'blue', width: 2, offset: -3.5 }
    }, callback)
  })

  it('ignoreStyles', function (callback) {
    test(markers.line, 'line5', {
      styles: ['default', 'sec'],
      style: { color: 'red', width: 5 },
      'style:sec': { color: 'blue', width: 2, offset: -3.5 }
    }, { ignoreStyles: ['sec'] }, callback)
  })
})
