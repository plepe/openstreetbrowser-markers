const isTrue = require('overpass-layer/src/isTrue')
const parseLength = require('overpass-layer/src/parseLength')
const metersPerPixel = require('./metersPerPixel')
const cssStyle = require('./cssStyle')

const d2r = Math.PI / 180

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
      ret += PatternTypes[patternTypes[patternId]](coordinates, options, symbolOptions[patternId])
    }
  })

  return ret
}

PatternTypes = {
  arrowHead (coordinates, _options, _style) {
    const defaultOptions = {
      polygon: true,
      pixelSize: 10,
      offset: 0,
      headAngle: 60,
      angleCorrection: 0
    }
    const defaultStyle = {
      stroke: false,
      width: 2
    }

    const options = { ...defaultOptions, ..._options }
    const style = { ...defaultStyle, ..._style }

    const heading = 90 // todo
    const pos = [
      coordinates[0][0] + options.offset,
      coordinates[0][1]
    ]

    const direction = (-(heading - 90 + options.angleCorrection)) * d2r
    const radianAngle = options.headAngle / 2 * d2r

    const headAngle1 = direction + radianAngle
    const headAngle2 = direction - radianAngle

    const a = [
      pos[0] - options.pixelSize * Math.cos(headAngle1),
      pos[1] + options.pixelSize * Math.sin(headAngle1)
    ]
    const b = [
      pos[0] - options.pixelSize * Math.cos(headAngle2),
      pos[1] + options.pixelSize * Math.sin(headAngle2)
    ]

    return '<polyline points="'+ a[0] + ',' + a[1] + ' ' + pos[0] + ',' + pos[1] + ' ' + b[0] + ',' + b[1] + '" style="' + cssStyle(style) + '"/>'
  }
}
