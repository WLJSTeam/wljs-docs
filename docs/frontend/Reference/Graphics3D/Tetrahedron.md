---
env:
  - WLJS
  - Wolfram Kernel
package: wljs-graphics3d-threejs
source: https://github.com/JerryI/Mathematica-ThreeJS-graphics-engine/blob/dev/src/kernel.js
update: false
---
```mathematica
Tetrahedron[{p1, p2, p3, p4}]
```

represents a polyhedron with 4 vertices 

```mathematica
Graphics3D[Tetrahedron[{{1, 1, 1}, {-1, -1, 1}, {1, -1, -1}, {-1, 1, -1}}]]
```

<Wl >{`Graphics3D[Tetrahedron[{{1, 1, 1}, {-1, -1, 1}, {1, -1, -1}, {-1, 1, -1}}]]`}</Wl>

## Parameters

### `RGBColor`

## Methods
### `Volume`

### `RegionCentroid`