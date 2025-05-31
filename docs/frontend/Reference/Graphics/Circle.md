---
env:
  - WLJS
package: wljs-graphics-d3
update: true
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/kernel.js
---
draws a circle with a given radius `r`

```mathematica
Circle[{x_,y_}, r_]
```

for example

```mathematica
Graphics[Table[Circle[RandomReal[{-1,1}, 2], 1], {i,10}]]
```

<Wl >{`Graphics[Table[Circle[RandomReal[{-1,1}, 2], 1], {i,10}]]`}</Wl>

## Parameters
See [Disk](frontend/Reference/Graphics/Disk.md)

## Dynamics
Fully support for a radius and coordinates. Use [Offload](frontend/Reference/Interpreter/Offload.md)

```mathematica
pt = {0,0};
EventHandler[Graphics[{
	Red,
	Circle[pt // Offload, 0.08]
}, PlotRange->{{-1,1}, {-1,1}}], {
		"mousemove" -> Function[xy, pt = xy]
}]
```