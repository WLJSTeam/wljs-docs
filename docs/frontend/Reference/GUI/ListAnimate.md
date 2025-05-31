---
env:
  - Wolfram Kernel
source: https://github.com/JerryI/wljs-manipulate/blob/main/Kernel.wl
package: wljs-manipulate
---
```mathematica
ListAnimate[{__Image}, opts___]
```

accepts list of [Image](frontend/Reference/Image/Image.md) s and animates them in the session

## Options
### `AnimationRate`
By the default is set to `12` (frames per second)

## Examples
Rasterize and animate

```mathematica
frames = Table[Rasterize[Plot[Sin[x y], {x,0,1}]], {y,0,5}];
```

```mathematica
ListAnimate[frames]
```

