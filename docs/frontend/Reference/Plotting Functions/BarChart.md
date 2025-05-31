---
env:
  - Wolfram Kernel
origin: https://reference.wolfram.com/language/ref/BarChart.html
update: false
needsContainer: false
---
```mathematica
BarChart[{1, 2, 3}]
```
generates a bar chart for a list of heights

<Wl >{`BarChart[{1, 2, 3}, ImageSize->350]`}</Wl>

or also
```mathematica
BarChart[{data1, data2...}]
```
is used for multiple plots.

## Examples
Set the style for bars

```mathematica
BarChart[Range[8], ChartStyle -> "DarkRainbow"]
```

<Wl >{`BarChart[Range[8], ChartStyle -> "DarkRainbow", ImageSize->350]`}</Wl>

chartwork with stacked bars

```mathematica
BarChart[RandomReal[1, {50, 50}], ChartLayout -> "Stacked", Axes -> None, BarSpacing -> {0, 0}, PerformanceGoal -> "Speed", ChartStyle -> "FallColors"]
```


<Wl >{`BarChart[RandomReal[1, {50, 50}], ChartLayout -> "Stacked", Axes -> None, BarSpacing -> {0, 0}, PerformanceGoal -> "Speed", ChartStyle -> "FallColors", ImageSize->350]`}</Wl>
