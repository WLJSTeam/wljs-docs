---
env:
  - WLJS
  - Wolfram Kernel
package: wljs-graphics3d-threejs
update: true
source: https://github.com/JerryI/Mathematica-ThreeJS-graphics-engine/blob/dev/src/kernel.js
---
```mathematica
Cylinder[{i_List, f_List}]
```

represents a cylinder with a radius 1

```mathematica
Cylinder[{i_List, f_List}, r_]
```

represents a cylinder with a radius `r`

```mathematica
Graphics3D[ Table[{Hue[RandomReal[], 1., 0.5], Cylinder[RandomReal[10, {2, 3}]]}, {20}]]
```

<Wl >{`Graphics3D[ Table[{Hue[RandomReal[], 1., 0.5], Cylinder[RandomReal[10, {2, 3}]]}, {20}]]`}</Wl>

## Parameters
### `RGBColor`


## Methods
Volume and centroid

### `Volume`
accepts symbolic values as well
```mathematica
Volume[Cylinder[{{Subscript[x, 1], Subscript[y, 1], Subscript[z, 1]}, {Subscript[x, 2], Subscript[y, 2], Subscript[z, 2]}}, r]]
```

### `RegionCentroid`
```mathematica
RegionCentroid[ Cylinder[{{Subscript[x, 1], Subscript[y, 1], Subscript[z, 1]}, {Subscript[x, 2], Subscript[y, 2], Subscript[z, 2]}}, r]]
```

## Dynamic updates
It does support dynamics for coordinates. Radius changes are not implemented! 