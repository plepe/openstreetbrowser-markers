const isTrue = require('overpass-layer/src/isTrue')
const parseLength = require('overpass-layer/src/parseLength')
const metersPerPixel = require('./metersPerPixel')

function parseType (key, value) {
  switch (key) {
    case 'polygon':
    case 'rotate':
      return isTrue(value)
    case 'pixelSize':
    case 'repeat':
    case 'offset':
    case 'endOffset':
    case 'lineOffset':
      return parseLength(value, metersPerPixel())
    case 'angleCorrection':
    case 'headAngle':
      return parseFloat(value)
    default:
      return value
  }
}

module.exports = function patterns (coordinates, def) {
  let ret = ''
  const patternTypes = {}
  const patternOptions = []
  const symbolOptions = {}

  for (const k in def) {
    const m = k.match(/^pattern([^-]*)$/)
    if (m) {
      patternTypes[m[1]] = def[k]
      patternOptions[m[1]] = {}
      symbolOptions[m[1]] = {}
    }
  }

  for (const k in def) {
    const m1 = k.match(/^pattern([^-]*)-path-(.*)$/)
    const m2 = k.match(/^pattern([^-]*)-(.*)$/)

    if (m1) {
      symbolOptions[m1[1]][m1[2]] = def[k]
    } else if (m2) {
      patternOptions[m2[1]][m2[2]] = parseType(m2[2], def[k])
    }
  }

  const patternIds = Object.keys(patternTypes)
  patternIds.forEach(patternId => {
    let symbol
    const options = patternOptions[patternId]
    if (patternTypes[patternId] in PatternTypes) {
      ret += PatternTypes[patternTypes[patternId]](coordinates, options)
    }
  })

  return ret
}

PatternTypes = {
  arrowHead (coordinates, options) {
    console.log(options)
    return ''
  }
}
