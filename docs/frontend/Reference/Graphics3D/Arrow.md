---
env:
  - WLJS
package: wljs-graphics3d-threejs
source: https://github.com/JerryI/Mathematica-ThreeJS-graphics-engine/blob/dev/src/kernel.js
update: true
---
draws an arrow connected with a line

```mathematica
Arrow[pts_List]
```

## Parameters
### `Thickness` or `AbsoluteThickness`
controls the width of a stroke

### `RGBColor`
controls color of a stroke

## Example
Simple broken line with an arrow on the end

```mathematica
Graphics3D[Arrow[{{1, 1, -1}, {2, 2, 0}, {3, 3, -1}, {4, 4, 0}}]]
```

<Wl >{`Graphics3D[Arrow[{{1, 1, -1}, {2, 2, 0}, {3, 3, -1}, {4, 4, 0}}]]`}</Wl>


## Dynamic updates
It does support updates. Use [Offload](frontend/Reference/Interpreter/Offload.md)

:::warning
Changing the length of an array of points is not supported!
:::