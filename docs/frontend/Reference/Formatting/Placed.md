---
env:
  - WLJS
---


A special symbol used across formatting, plotting functions in Wolfram Language

```mathematica
Placed[feature_, position_]
```

where `position` can be

```mathematica
Before | After | {x, y} | {Left, Top} | ...
```

where `x,y` are scaled coordinates.

## Use cases
### Legended


```mathematica
Legended[Disk[]//Graphics, Placed[SwatchLegend[{Red}, {"Mark"}], Before]]
```

![](./../../../Screenshot%202025-03-29%20at%2017.18.12.png)

```mathematica
Legended[Disk[]//Graphics, Placed[SwatchLegend[{Red}, {"Mark"}], After]]
```

![](./../../../Screenshot%202025-03-29%20at%2017.18.58.png)

Or using scaled coordinates

```mathematica
Legended[Disk[]//Graphics, Placed[SwatchLegend[{Red}, {"Mark"}], {0.5,0.5}]]
```

![](./../../../Screenshot%202025-03-29%20at%2017.19.40.png)

### Plot
In the most plotting function you can use this wrapper to place your generated legend

```mathematica
Plot[
  {x,x^2}, {x,0,1}, 
  PlotLegends->Placed[SwatchLegend[Automatic], {0.2,0.2}]
]
```

![](./../../../Screenshot%202025-03-29%20at%2017.20.37.png)