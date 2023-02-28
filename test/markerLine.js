const fs = require('fs')
const assert = require('assert')

const markers = require('../src/markers')

describe('markerLine', function () {
  it('without parameters', function (callback) {
    test('line1', {}, callback)
  })

  it('color and width', function (callback) {
    test('line2', {color: 'red', width: 5}, callback)
  })

  it('offset', function (callback) {
    test('line3', {offset: -5}, callback)
  })

  it('two lines', function (callback) {
    test('line4', {
      styles:['default','sec'],
      'style': {color: 'red', width: 5},
      'style:sec': {color: 'blue', width: 2, offset: -3.5}
    }, callback)
  })
})

function test (id, data, callback) {
  const actual = markers.line(data)
  fs.readFile('test/data/' + id + '.svg', (err, expected) => {
    assert.equal(actual, expected)
    callback(err)
  })

  fs.writeFile('test/generated/' + id + '.svg', actual, () => {})
}
