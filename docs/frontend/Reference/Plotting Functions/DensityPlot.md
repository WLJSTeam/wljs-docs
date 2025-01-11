---
env:
  - Wolfram Kernel
needsContainer: false
update: false
origin: https://reference.wolfram.com/language/ref/DensityPlot.html
---
```mathematica
DensityPlot[f, {x, xmin, xmax}, {y, ymin, ymax}]
```
makes a density plot of `f` as a function of `x` and `y`

:::warning
Only a flat-shading is supported for now
:::

:::tip
For better performance use this option
```mathematica
PerformanceGoal->"Speed"
```
:::


```mathematica
DensityPlot[x y, {x,0,1}, {y,0,1}]
```

<Wl >{`DensityPlot[x y, {x,-1,1}, {y,-1,1}]`}</Wl>

## Options

### `ColorFunction`

```mathematica
CoolColor[ z_ ] := RGBColor[z, 1 - z, 1];
DensityPlot[Sin[x y], {x, -1, 1}, {y, -1, 1}, 
 ColorFunction -> CoolColor]
```

<Wl >{`CoolColor[ z_ ] := RGBColor[z, 1 - z, 1];
DensityPlot[Sin[x y], {x, -1, 1}, {y, -1, 1}, 
 ColorFunction -> CoolColor]`}</Wl>

or using predefined

```mathematica
 DensityPlot[Sin[x] Sin[y], {x, -2, 2}, {y, -2, 2}, 
 ColorFunction -> ColorData["SolarColors"]]
```

<Wl >{`DensityPlot[Sin[x] Sin[y], {x, -2, 2}, {y, -2, 2}, 
 ColorFunction -> ColorData["SolarColors"]]`}</Wl>