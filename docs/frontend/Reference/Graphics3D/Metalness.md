---
env:
  - WLJS
package: wljs-graphics3d-threejs
context: JerryI`Notebook`Graphics3DUtils`
source: https://github.com/JerryI/Mathematica-ThreeJS-graphics-engine/blob/dev/src/kernel.js
---
:::warning
It is considered to be removed. Please use [Directive](frontend/Reference/Graphics3D/Directive.md) instead
:::

specifies metallic property of a graphics primitive (see [MeshPhysicalMaterial](frontend/Reference/Graphics3D/MeshPhysicalMaterial.md))

```mathematica
Metalness[i_Real]
```

where `i` can be between `0` and `1`. In real world it either `1` or `0`.

An effect is more visible, when there is an HDR map is used

__non-metallic__

```mathematica
Graphics3D[{Metalness[0], Sphere[]}, "Lighting"->None, "Lightmap"->"https://raw.githubusercontent.com/JerryI/Mathematica-ThreeJS-graphics-engine/master/assets/PureSky.hdr"]
```

<Wl >{`Graphics3D[{Metalness[0], Sphere[]}, "Lighting"->None, "Lightmap"->"https://raw.githubusercontent.com/JerryI/Mathematica-ThreeJS-graphics-engine/master/assets/PureSky.hdr"]`}</Wl>

__metallic__

```mathematica
Graphics3D[{Metalness[1], Sphere[]}, "Lighting"->None, "Lightmap"->"https://raw.githubusercontent.com/JerryI/Mathematica-ThreeJS-graphics-engine/master/assets/PureSky.hdr"]
```

<Wl >{`Graphics3D[{Metalness[1], Sphere[]}, "Lighting"->None, "Lightmap"->"https://raw.githubusercontent.com/JerryI/Mathematica-ThreeJS-graphics-engine/master/assets/PureSky.hdr"]`}</Wl>

__metallic and polished__

```mathematica
Graphics3D[{Metalness[1], Roughness[0], Sphere[]}, "Lighting"->None, "Lightmap"->"https://raw.githubusercontent.com/JerryI/Mathematica-ThreeJS-graphics-engine/master/assets/PureSky.hdr"]
```

<Wl >{`Graphics3D[{Metalness[1], Roughness[0], Sphere[]}, "Lighting"->None, "Lightmap"->"https://raw.githubusercontent.com/JerryI/Mathematica-ThreeJS-graphics-engine/master/assets/PureSky.hdr"]`}</Wl>