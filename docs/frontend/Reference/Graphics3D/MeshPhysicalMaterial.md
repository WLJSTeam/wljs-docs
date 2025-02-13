---
env:
  - WLJS
package: wljs-graphics3d-threejs

source: https://github.com/JerryI/Mathematica-ThreeJS-graphics-engine/blob/dev/src/kernel.js
---
```mathematica
MeshPhysicalMaterial[]
```

a default material used in [MeshMaterial](frontend/Reference/Graphics3D/MeshMaterial.md). The most accurate material, that can be parameterized with

### [Roughness](frontend/Reference/Graphics3D/Roughness.md)
### [Emissive](frontend/Reference/Graphics3D/Emissive.md)

### [Metalness](frontend/Reference/Graphics3D/Metalness.md)

## Example

```mathematica
Graphics3D[{MeshMaterial[MeshPhysicalMaterial[]], Roughness[0], Sphere[], PointLight[Red, {1.5075, 4.1557, 2.6129}, 50],  PointLight[Cyan, {-2.268, -2.144, 3.1635}, 50]}, "Lighting"->None]
```

<Wl >{`Graphics3D[{MeshMaterial[MeshPhysicalMaterial[]], Roughness[0], Sphere[], PointLight[Red, {1.5075, 4.1557, 2.6129}, 50],  PointLight[Cyan, {-2.268, -2.144, 3.1635}, 50]}, "Lighting"->None]`}</Wl>