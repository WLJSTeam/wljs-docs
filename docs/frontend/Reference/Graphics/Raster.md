---
env:
  - WLJS
package: wljs-graphics-d3
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/kernel.js
---
:::warning
Is not fully supported. *Fallback to SVG rectangles*
:::

```mathematica
Graphics[{{Red, Disk[{5, 5}, 4]}, 
  Raster[Table[{x, y, x, y}, {x, .1, 1, .1}, {y, .1, 1, .1}]]}]
```

<Wl>{`Graphics[{{Red, Disk[{5, 5}, 4]}, 
  Raster[Table[{x, y, x, y}, {x, .1, 1, .1}, {y, .1, 1, .1}]]}]`}</Wl>

