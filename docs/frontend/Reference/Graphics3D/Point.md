---
env:
  - WLJS
package: wljs-graphics3d-threejs
update: true
numericArray: true
---
represents 3D point

```mathematica
Point[{x,y,z}] 
```

or set of points

```mathematica
Point[p_List] 
```

## Parameters
### `RGBColor`
### `Opacity`

### `PointSize`
Absolute size of a point can be altered using `PointSize`

```mathematica
{PointSize[Small], Point[{1,1,1}]}
```

or in numbers

```mathematica
{PointSize[0.01], Point[{1,1,1}]}
```


## Indexed geometry
The most efficient way of using it for constructing complex objects is to wrap it into [GraphicsComplex](frontend/Reference/Graphics3D/GraphicsComplex.md)