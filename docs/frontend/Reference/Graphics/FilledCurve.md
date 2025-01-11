---
package: wljs-graphics-d3
update: false
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/kernel.js
---
```mathematica
FilledCurve[{segments__}]
```

where `segments` can be [Line](frontend/Reference/Graphics/Line.md), [BezierCurve](frontend/Reference/Graphics/BezierCurve.md).  For example

```mathematica
a = {{-1, 0}, {0, 1}, {1, 0}}; b = {{0, -(2/3)}, {-1, 0}};
Graphics[FilledCurve[{BezierCurve[a], Line[b]}]]
```

One can fill the shape defined by __components__ using following pattern

```mathematica
FilledCurve[{components__List}]
```

For example

```mathematica
pts = {{0, 1}, {-1, -(1/2)}, {1, -(1/2)}};
Graphics[FilledCurve[{{Line[2 pts]}, {Line[pts]}}]]
```

:::note
It uses even-odd rule for filling. The intersection will not be filled.
:::