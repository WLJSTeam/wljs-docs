---
env:
  - Wolfram Kernel
package: wljs-graphics3d-threejs
source: https://github.com/JerryI/Mathematica-ThreeJS-graphics-engine/blob/dev/src/kernel.js
---
```mathematica
Image3D[list_]
```

represents efficiently a 3D array of points

```mathematica
Image3D[#] & /@ CellularAutomaton[{14, {2, 1}, {1, 1, 1}}, {{{{1}}}, 0}, 4]
```

:::warning
It has a limited support compared to Mathematica
:::