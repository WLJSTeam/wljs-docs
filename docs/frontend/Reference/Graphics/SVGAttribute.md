---
env:
  - WLJS
update: true
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

Make it blurry

```mathematica
Graphics[
	SVGAttribute[
		SVGGroup[{
			Red, Disk[{0,0}, 0.5],
			Blue, Line[{{-1,-1}, {1,1}}]
		}]
	, "style"->"filter: blur(10px)"]
]
```

![](./../../../Screenshot%202025-06-03%20at%2011.38.32.png)