---
env:
  - Wolfram Kernel
---

:::caution
Only partially supported [wljs-graphics-d3](https://github.com/JerryI/wljs-graphics-d3) for now
:::

```mathematica
Show[g1_Graphics, g2_Graphics] _Graphics
```

overlay two or more [Graphics](frontend/Reference/Graphics/Graphics.md) objects

## Example

Plot a histogram and a 2D graph

```mathematica
data = RandomVariate[GammaDistribution[4, 12.5], 10^4];
hist = Histogram[data, Automatic, "ProbabilityDensity"];
pl = Plot[PDF[GammaDistribution[4, 12.5], x], {x, 0, 200}];
```

Show them overlayed

```mathematica
Show[hist, pl]
```

<Wl>{`Module[{data, hist, pl}, data = RandomVariate[GammaDistribution[4, 12.5], 10^4];hist = Histogram[data, Automatic, "ProbabilityDensity"];pl = Plot[PDF[GammaDistribution[4, 12.5], x], {x, 0, 200}]; Show[hist, pl]]`}</Wl>

