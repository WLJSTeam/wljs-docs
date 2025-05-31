Represents bar-type legend

```mathematica
BarLegend[cf_ColorFunction | cf_String]
```

```mathematica
BarLegend[{cf_, {min, max}}]
```

where `cf` is a color function (named or provided explicitly)

## Examples
Named colors

```mathematica
BarLegend[{"Rainbow", {0,1}}]
```

![](./../../../Screenshot%202025-03-18%20at%2013.04.01.png)

Using `Hue`

```mathematica
BarLegend[{Hue, {0, 1}}]
```

![](./../../../Screenshot%202025-03-18%20at%2013.04.53.png)

### Implicit usage
Automatically generated and wrapped into [Legended](frontend/Reference/Formatting/Legended.md)

```mathematica
ContourPlot[Sin[x y], {x, 0, \[Pi]}, {y, 0, \[Pi]}, Contours -> 5, PlotLegends -> Automatic]
```

![](./../../../Screenshot%202025-03-18%20at%2013.05.52.png)