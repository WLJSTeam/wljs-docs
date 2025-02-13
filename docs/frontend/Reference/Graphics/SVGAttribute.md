---
env:
  - WLJS
update: 
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/Kernel.wl
package: wljs-graphics-d3

---
Allows to directly set SVG attribute to a 2D graphics object
```mathematica
SVGAttribute[object_, "name"->"value"]
```

__Please see the SVG__ [docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute) for all possible attributes. In principle it should work with most 2D primitives, since all of them are SVG elements.
## Example
If we want a dashed line

```mathematica
Graphics[
	SVGAttribute[
		Line[{{-1,-1}, {1,1}}]
	, "stroke-dasharray"->"3"]
]
```

<Wl >{`Graphics[SVGAttribute[Line[{{-1,-1}, {1,1}}], "stroke-dasharray"->"3"], ImageSize->500]`}</Wl>

