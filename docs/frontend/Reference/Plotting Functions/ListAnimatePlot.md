---
env:
  - Wolfram Kernel

package: wljs-manipulate
source: https://github.com/JerryI/wljs-manipulate/blob/main/Kernel.wl
---
```mathematica
ListAnimatePlot[{{y1, y2, y3 ...}, {y1, y2, ...}}, opts___]
```

animates a list of curves, where `{yi...}` is single "frame" of sampled curve `y`. Other formats are also possible:

```mathematica
ListAnimatePlot[{{{y1, y2, y3 ...}, {k1, k2, k3, ...}}, {y1, y2, ...}}, opts___]
```

where `y` and `k` are different curves animated at the same plot

```mathematica
ListAnimatePlot[{{{x1, y1}, {x2, y2}, ...}, frame2, frame3, ...}, opts___]
```

where `{x1,y1}` is a points sampling a single curve 

```mathematica
ListAnimatePlot[{{{{x1, y1}, {x2, y2}, ...}, {{k1, l1}, {k2, l2}, ...}}, frame2, frame3, ...}, opts___]
```

where `{x1,y1}` and `{k1,l1}` are points sampling two different curves

:::info
The output is safe for exporting to a static [Static HTML](frontend/Exporting/Static%20HTML.md) file, since it keeps all data inside the notebook. No Wolfram Kernel is required for playing the animation.
:::

## Options

### `InterpolationOrder`
Sets the interpolation order (all curves are resampled). The default is `1` (linear)

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

## Examples

An animation of `10` frames
```mathematica
ListAnimatePlot[Table[{Table[{i, Sin[i j / 10]}, {i, 0.1, 10,0.1}], Table[{i, Sinc[i j / 10]}, {i, 0.1, 10,0.1}]}, {j,10}]]
```

## Issues

:::danger
Help needed!

There is no adaptive sampling implemented.
:::