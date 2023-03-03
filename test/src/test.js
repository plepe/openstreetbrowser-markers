const fs = require('fs')
const assert = require('assert')

module.exports = function test (fun, id, data, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  const actual = fun(data, options)
  fs.readFile('test/data/' + id + '.svg', (err, expected) => {
    assert.equal(actual, expected.toString())
    callback(err)
  })

  fs.writeFile('test/generated/' + id + '.svg', actual, () => {})
}
