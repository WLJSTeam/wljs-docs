---
env:
  - WLJS
  - Wolfram Kernel
package: wljs-graphics3d-threejs
source: https://github.com/JerryI/Mathematica-ThreeJS-graphics-engine/blob/dev/src/kernel.js
update: true
numericArray: true
---
```mathematica
Line[{{x1_,y1_,z1_}, ..., {xn_, yn_, zn_}} | indexes_List]
```

represents a line in 3D space.

```mathematica
Graphics3D[{Black,Line[{{1, 1, -1}, {2, 2, 1}, {3, 3, -1}, {4, 4, 1}}]}]
```

<Wl >{`Graphics3D[{Black,Line[{{1, 1, -1}, {2, 2, 1}, {3, 3, -1}, {4, 4, 1}}]}]`}</Wl>

## Parameters
### `RGBColor`
### `AbsoluteThickness`

## Indexed geometry
The most efficient way of using [Line](frontend/Reference/Graphics3D/Line.md) for many vertices is to wrap it into [GraphicsComplex](frontend/Reference/Graphics3D/GraphicsComplex.md). It provides the list of vertices as  a separate list, while `Line` contains only the indexes for a line

```mathematica
v = PolyhedronData["Dodecahedron", "Vertices"] // N;
i = PolyhedronData["Dodecahedron", "FaceIndices"];

GraphicsComplex[v, {Black, Line[i]}] // Graphics3D 
```

## Dynamic updates
It does support updates. Use [Offload](frontend/Reference/Interpreter/Offload.md)

:::tip
Updates of geometry using [GraphicsComplex](frontend/Reference/Graphics3D/GraphicsComplex.md) is more efficient for many vertices
:::

:::warning
Changing the length of an array of points is not supported!
:::
