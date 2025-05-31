---
env:
  - Wolfram Kernel

package: wljs-manipulate
source: https://github.com/JerryI/wljs-manipulate/blob/main/Kernel.wl
---
```mathematica
AnimatePlot[f_, {x, min, max}, {t, min, max}, opts___]
```

a dynamic alternative to [Plot](frontend/Reference/Plotting%20Functions/Plot.md) and Mathematica's `Animate`, that samples all frames and creates live animation using them.

`f` has return `_Real` or `{__Real}` (in a case of multiple curves)

:::info
The output is safe for exporting to a static [Static HTML](frontend/Exporting/Static%20HTML.md) file, since it keeps all data inside the notebook. No Wolfram Kernel is required for playing the animation.
:::

the set of parameters are not limited and accepts the following forms

## Options
### `"SamplingPoints"`
A number of points used in sampling. The default value is `200`

It inherits some of [Graphics](frontend/Reference/Graphics/Graphics.md) options as well

### `AnimationRate`
Specifies the number of updates *per second*

### `TransitionType`
See [TransitionType](frontend/Reference/Graphics/TransitionType.md)

### `TransitionDuration`
See [TransitionDuration](frontend/Reference/Graphics/TransitionDuration.md)

### `ImageSize`
Accepts `{width, height}`

### `PlotStyle`
Specifies colors for each curve

### `Epilog`
### `Prolog`
Appends graphics primitives to the plot. See [Graphics](frontend/Reference/Graphics/Graphics.md)

## Example
Plot the simplest sine function

```mathematica
AnimatePlot[{Sin[x c], Sinc[x c]}, {x,-10,10}, {c,1,10,0.1}]
```

![](./../../../StiticExport-ezgif.com-optimize.gif)

An example of the animation played in the notebook and in the exported [Static HTML](frontend/Exporting/Static%20HTML.md) file.

### More examples

```mathematica @
AnimatePlot[(*TB[*)Sum[(*|*)(*FB[*)((Sin[2π(2j - 1) x])(*,*)/(*,*)(2j))(*]FB*)(*|*), {(*|*)j(*|*),(*|*)1.0(*|*),(*|*)n(*|*)}](*|*)(*1:eJxTTMoPSmNiYGAoZgMSwaW5TvkVmYwgPguQCCkqTQUAeAcHBQ==*)(*]TB*), {x, -1,1}, {n, 1,30, 1}]
```

:::tip
Here it is important to keep `n` integer, otherwise it will be converted into a symbolic sum with `LerchPhi` function, which is not defined at some points.
:::

## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
- [WLXForm](frontend/Reference/Formatting/WLXForm.md)

## Issues

:::danger
Help needed!

There is no adaptive sampling implemented.
:::