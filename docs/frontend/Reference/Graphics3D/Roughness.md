---
env:
  - WLJS
package: wljs-graphics3d-threejs
source: https://github.com/JerryI/Mathematica-ThreeJS-graphics-engine/blob/dev/src/kernel.js

---
:::warning
It is considered to be removed. Please use [Directive](frontend/Reference/Graphics3D/Directive.md) instead
:::

sets roughness for the current material

```mathematica
Roughness[i_Real]
```

where `i` is in the range of `0` and `1`. 

## Examples

__rough material__
```mathematica
Graphics3D[{White, Roughness[1], Sphere[], PointLight[Red, {-1,-3,3}]}]
```

<Wl >{`Graphics3D[{White,Roughness[1], Sphere[], PointLight[Red, {-1,-3,3}]}]`}</Wl>

__polished__
```mathematica
Graphics3D[{White, Roughness[0], Sphere[], PointLight[Red, {-1,-3,3}]}]
```

<Wl >{`Graphics3D[{White, Roughness[0], Sphere[], PointLight[Red, {-1,-3,3}]}]`}</Wl>

