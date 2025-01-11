---
draft: false
update: true
package: wljs-graphics3d-threejs
source: https://github.com/JerryI/Mathematica-ThreeJS-graphics-engine/blob/dev/src/kernel.js
---
```mathematica
Cuboid[pmin_, pmax_]
```
draws a hypercube from `pmin` to `pmax`

```mathematica
Graphics3D[
 Table[{EdgeForm[Opacity[.3]], Hue[RandomReal[], 1, 0.5], 
   Cuboid[RandomReal[4, 3]]}, {40}]]
```

<Wl >{`Graphics3D[Table[{EdgeForm[Opacity[.3]], Hue[RandomReal[], 1, 0.5], Cuboid[RandomReal[4, 3]]}, {40}]]`}</Wl>

## Dynamics
Fully supports. 

An example using gizmo-snippet

![](../../../imgs/CuboidGizmo-ezgif.com-optipng.png)