const assert = require('assert')
const getHalfHeight = require('../src/getHalfHeight')

describe('getHalfHeight', function () {
  it('[{width:1}]', function () {
    const actual = getHalfHeight([{width: 1}])
    const expected = 8

    assert.equal(actual, expected)
  })

  it('[{width:2}]', function () {
    const actual = getHalfHeight([{width: 2}])
    const expected = 8

    assert.equal(actual, expected)
  })

  it('[{width:3}]', function () {
    const actual = getHalfHeight([{width: 3}])
    const expected = 8

    assert.equal(actual, expected)
  })

  it('[{width:4}]', function () {
    const actual = getHalfHeight([{width: 4}])
    const expected = 8

    assert.equal(actual, expected)
  })

  it('[{width:20}]', function () {
    const actual = getHalfHeight([{width: 20}])
    const expected = 10

    assert.equal(actual, expected)
  })

  it('[{width:21}]', function () {
    const actual = getHalfHeight([{width: 21}])
    const expected = 12

    assert.equal(actual, expected)
  })

  it('[{width:22}]', function () {
    const actual = getHalfHeight([{width: 22}])
    const expected = 12

    assert.equal(actual, expected)
  })

  it('[{width:23}]', function () {
    const actual = getHalfHeight([{width: 23}])
    const expected = 12

    assert.equal(actual, expected)
  })

  it('[{width:1},{width:4}]', function () {
    const actual = getHalfHeight([{width: 1},{width:4}])
    const expected = 8

    assert.equal(actual, expected)
  })

  it('[{width:1,offset:2},{width:4,offset:-2}]', function () {
    const actual = getHalfHeight([{width: 1,offset:2},{width:4,offset:-2}])
    const expected = 8

    assert.equal(actual, expected)
  })
})
