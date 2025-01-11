---
env:
  - WLJS
  - Wolfram Kernel
package: wljs-graphics3d-threejs
source: https://github.com/JerryI/Mathematica-ThreeJS-graphics-engine/blob/dev/src/kernel.js
update: false
numericArray: true
---
a 3D version of [Polygon](frontend/Reference/Graphics/Polygon.md) used in [Graphics3D](frontend/Reference/Graphics3D/Graphics3D.md)

```mathematica
Polygon[vertices_List | {vertices__List} | faces_List]
```

represents a single or a list of polygons

## Types
### Triangle
The most efficient one. It consists of 3 vertices

```mathematica
pol = Polygon[{{1, 0, 0}, {1, 1, 1}, {0, 0, 1}}];
pol // Graphics3D
```

<Wl >{`Graphics3D[Polygon[{{1, 0, 0}, {1, 1, 1}, {0, 0, 1}}]]`}</Wl>

### Quad
4 vertices. It will be converted to the set of triangles on output

### Pentagon
5 vertices. It will be converted to the set of triangles on output

## Parameters
### `RGBColor`
### `Opacity`


## Indexed geometry
The most efficient way of using [Polygon](frontend/Reference/Graphics3D/Polygon.md) for constructing complex objects is to wrap it into [GraphicsComplex](frontend/Reference/Graphics3D/GraphicsComplex.md). It provides the list of faces and colors of each vertex as  separate lists, while `Polygon` contains only the indexes, which forms each polygon


```mathematica
v = PolyhedronData["Dodecahedron", "Vertices"] // N;
i = PolyhedronData["Dodecahedron", "FaceIndices"];

GraphicsComplex[v, Polygon[i]] // Graphics3D 
```

<Wl >{`v = PolyhedronData["Dodecahedron", "Vertices"] // N; i = PolyhedronData["Dodecahedron", "FaceIndices"]; GraphicsComplex[v, {Polygon[i]}] // Graphics3D `}</Wl>


## Non-indexed geometry
One can provide only the ranges for the triangles to be rendered

```mathematica
GraphicsComplex[v, Polygon[1, Length[v]]] // Graphics3D 
```

:::warning
it assumes you are using triangles
:::



## Dynamic updates
It is possible only using [GraphicsComplex](frontend/Reference/Graphics3D/GraphicsComplex.md) and keeping faces unchanged. 

