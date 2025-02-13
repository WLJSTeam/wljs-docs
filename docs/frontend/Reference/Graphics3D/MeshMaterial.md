---
env:
  - WLJS
package: wljs-graphics3d-threejs
source: https://github.com/JerryI/Mathematica-ThreeJS-graphics-engine/blob/dev/src/kernel.js

---
```mathematica
MeshMaterial[material_]
```

specifies the material used for 3D lighting in [Graphics3D](frontend/Reference/Graphics3D/Graphics3D.md)

__This is scope-type parameter__ like [Opacity](frontend/Reference/Graphics3D/Opacity.md), [RGBColor](frontend/Reference/Graphics3D/RGBColor.md) and can be applied separately for each object.

## Materials

### `MeshPhysicalMaterial`

### `MeshToonMaterial`

### `MeshFogMaterial` 
See more [MeshFogMaterial](frontend/Reference/Graphics3D/MeshFogMaterial.md)