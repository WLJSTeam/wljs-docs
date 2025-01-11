---
env:
  - WLJS
package: wljs-graphics-d3
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/kernel.js
update: true
---
```mathematica
Rotate[g_, angle_Real]
```

rotates graphics primitive or list of primitives `g` by `angle` 

```mathematica
Rotate[g_, angle_Real, origin_List]
```

rotates around `origin`

```mathematica
Graphics[Rotate[Rectangle[{-1,-1}, {1,1}], 30 Degree]]
```

<Wl >{`Graphics[Rotate[Rectangle[{-1,-1}, {1,1}], 30 Degree]]`}</Wl>


## Dynamics
It support dynamic updates for `angle` variable. Graphics primitives `g` can be updated separately. `Rotate` only applies transformation on `g`.

```mathematica
EventHandler[InputRange[0, 2.0 Pi, 0.1], Function[a,
  angle = a
]]
% // EventFire;

Graphics[Rotate[Rectangle[{-1,-1}, {1,1}], angle // Offload]]
```

![](../../../imgs/Rotator-ezgif.com-optipng.png)