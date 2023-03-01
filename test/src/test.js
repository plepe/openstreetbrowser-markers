const fs = require('fs')
const assert = require('assert')

module.exports = function test (fun, id, data, callback) {
  const actual = fun(data)
  fs.readFile('test/data/' + id + '.svg', (err, expected) => {
    assert.equal(actual, expected)
    callback(err)
  })

  fs.writeFile('test/generated/' + id + '.svg', actual, () => {})
}
