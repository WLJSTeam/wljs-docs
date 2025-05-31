---
env:
  - Wolfram Kernel
update: 
needsContainer: 
origin: https://reference.wolfram.com/language/ref/ListCurvePathPlot.html
---
Plots a curve that corresponds to a smooth path through the specified points

## Example
Randomly sampled points on a circle
```mathematica
data = Table[{t Cos[t], t Sin[t]}, {t, RandomReal[{0, 2 Pi}, 50]}];
ListCurvePathPlot[data, Epilog->{Opacity[0.5], Line[data]}]
```

<Wl >{`data = Table[{t Cos[t], t Sin[t]}, {t, RandomReal[{0, 2 Pi}, 50]}];
ListCurvePathPlot[data, Epilog->{Opacity[0.5], Line[data]}]`}</Wl>

where the gray lines represent what would a simple line plot show.

### Neat example
```mathematica
ListCurvePathPlot[RandomReal[{0, 10}, {2000, 2}]]
```

<Wl >{`ListCurvePathPlot[RandomReal[{0, 10}, {2000, 2}], ImageSize->500]`}</Wl>