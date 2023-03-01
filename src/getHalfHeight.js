module.exports = function getHalfHeight (styles) {
  let halfHeight = 0
  styles.forEach(style => {
    const h = (style.width || 3) / 2 + Math.abs(style.offset || 0)
    if (h > halfHeight) {
      halfHeight = h
    }
  })

  return Math.ceil(halfHeight)
}
