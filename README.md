# openstreetbrowser-markers
Markers for OpenStreetBrowser

## Documentation
### markers.line(data, [options])
returns a SVG image with a line formatted after the rules of data (see below)

### markers.polygon(data, [options])
returns a SVG image with a rectangle formatted after the rules of data (see below)

### markers.circle(data, [options])
returns a SVG image with a line formatted after the rules of data (see below)

### markers.pointer(data, [options])
returns a SVG image with a line formatted after the rules of data (see below)

### Common parameters
#### data
`data` is either a hash of style parameters, like so:
```json
{
  "width": 3,
  "color": "#ff0000"
}
```

It could also be the structure that [overpass-layer](https://github.com/plepe/overpass-layer)/[OpenStreetBrowser](https://github.com/plepe/OpenStreetBrowser) uses for styling features:
```json
{
  "styles": "default,side",
  "style": {
    "width": 4,
    "color": "#ff0000"
  },
  "style:side": {
    "offset": 3,
    "width": 2,
    "color": "#0000ff"
  }
}
```

* `styles` (array or comma-separated string) selects which styles should be rendered and in which order.
* `style` and `style:*`: See below for possible style parameters. `style` is an alias of `style:default`.

Style parameters:
| Field | Type | Default | Description
|-------|------|---------|-------------
| width | length | 1 | Stroke width, optionally with unit ('px' for width in screen pixels (default) or 'm' for width in world meters).
| color | color | #f2756a | Stroke color
| opacity | float | 1.0 | Stroke opacity
| offset | length | 0 | Offset stroke to left or right ('px' for width in screen pixels (default) or 'm' for width in world meters).
| dashArray | string | *null* | stroke dash pattern
| dashOffset | integer | *null* | distance into the dash pattern to start dash
| fill | boolean | true | whether to fill the path with color. Set it to false or empty string to disable filling on polygons or circles.
| fillColor | color | *value of 'color'* | Fill color. Defaults to the value of the color option.
| fillOpacity | float | *depends* | Fill opacity. If the `fillColor` is derived from the `color`, a default value of `0.2` will be used. Otherwise, `1`.
| radius | length | 10px | Radius of the circle (or the pointer).
| size | length | 10px | Size of the pointer (or the circle). Radius is an alias.

Types:
| Name | Description    |
|------|----------------|
| boolean | true or false. The following values are false: `undefined`, `null`, `false`, "false", 0, "0", "".
| color | A CSS color value, e.g. "#f00", "#ff0000", "#ff0000ff", "rgb(255, 0, 0)", rgb(255, 0, 0, 1), "red", ...
| float | a number, e.g. `1`, `0.5`.
| integer | a decimal number, e.g. `1`, `6`.
| string | an arbitrary text.
| length | a number with an optional unit. Availble units:<ul><li>'px' (default, a distance in display pixels)</li><li>'m' (meters in world coordinate system)</li><li>'%' (percentage of total length - if supported)</li>
