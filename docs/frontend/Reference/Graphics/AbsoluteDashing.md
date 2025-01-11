---
env:
  - WLJS
package: wljs-graphics-d3
origin: https://github.com/JerryI/wljs-graphics-d3/
---
```mathematica
AbsoluteDashing[{d1, d2, ...}]
```

is a graphics directive which specifies that lines which follow are to be drawn dashed, with successive segments having absolute lengths `d1`, `d2`, … (repeated cyclically).


For example

```mathematica
Table[Graphics[{AbsoluteDashing[{d, 15 - d}], 
   Line[{{0, 0}, {2, 1}}]}], {d, {2, 5, 8, 12}}]
```

## Supported primitives

- [Rectangle](frontend/Reference/Graphics/Rectangle.md)
- [Line](frontend/Reference/Graphics/Line.md)
- [Circle](frontend/Reference/Graphics/Circle.md)
- [Polygon](frontend/Reference/Graphics/Polygon.md)
