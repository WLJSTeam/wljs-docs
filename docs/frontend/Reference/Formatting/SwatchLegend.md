Represents swatch-type legend

```mathematica
SwatchLegend[colors_List, labels_List]
```

where `labels` can be any Wolfram Expression

## Examples
### Manual
Define firstly

```mathematica
legend = SwatchLegend[{Red, Green, Blue}, {1,2,3}]
```

![](./../../../Screenshot%202025-03-18%20at%2013.08.05.png)

and place it to an existing plot

```mathematica
Plot[{x, x^2, x^3}, {x,0,1}, PlotStyle->{Red, Green, Blue}, PlotLegends->legend]
```

![](./../../../Screenshot%202025-03-18%20at%2013.09.12.png)

### Automatic
Let it determine colors or expressions automatically

```mathematica
Plot[{Sin[x], Cos[x]}, {x, 0, 5}, PlotLegends -> SwatchLegend["Expressions"]]
```

![](./../../../Screenshot%202025-03-18%20at%2013.10.33.png)

