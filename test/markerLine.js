/* global describe, it */
const test = require('./src/test')
const markers = require('../src/markers')

describe('markerLine', function () {
  it('without parameters', function (callback) {
    test(markers.line, 'line1', {}, callback)
  })

  it('color and width', function (callback) {
    test(markers.line, 'line2', { color: 'red', width: 5 }, callback)
  })

  it('offset', function (callback) {
    test(markers.line, 'line3', { offset: -5 }, callback)
  })

  it('two lines', function (callback) {
    test(markers.line, 'line4', {
      styles: ['default', 'sec'],
      style: { color: 'red', width: 5 },
      'style:sec': { color: 'blue', width: 2, offset: -3.5 }
    }, callback)
  })
})
