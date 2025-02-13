---
env:
  - WLJS
registered: true
needsContainer: true
update: true
origin: https://github.com/JerryI/wljs-plotly
numericArray: true
---
```mathematica
ListLinePlotly[{data1_, data2_, ...}]
```

```mathematica
ListLinePlotly[{{x1,y1}, ... {xn,yn}}]
```

```mathematica
ListLinePlotly[{y1, y2, y3 ...}]
```

mimics the native function [ListLinePlot](frontend/Reference/Plotting%20Functions/ListLinePlot.md) using Plotly library (see [Plotly](frontend/Reference/Plotting%20Functions/Plotly.md)). It is limited, there is __no options supported__.

An alternative plotting function to [ListLinePlot](frontend/Reference/Plotting%20Functions/ListLinePlot.md), that supports updates, panning, zoom out of the box

## Dynamics
It fully supports updates. This is the first ever high order function, that does this unlike [ListLinePlot](frontend/Reference/Plotting%20Functions/ListLinePlot.md). 

:::tip
To use full features of Plotly, please, use [Plotly](frontend/Reference/Plotting%20Functions/Plotly.md) and [PlotlyAnimate](frontend/Reference/Plotly/PlotlyAnimate.md) or [PlotlyAddTraces](frontend/Reference/Plotly/PlotlyAddTraces.md)
:::

## Example

```mathematica
ListLinePlotly[Accumulate[RandomReal[{-1, 1}, {250, 2}]]]
```

<Wl >{`ListLinePlotly[Accumulate[RandomReal[{-1, 1}, {250, 2}]]]`}</Wl>

:::danger
No styling possible for now
:::

## Examples with dynamics
As an advantage of it, you can directly feed it with offloaded variables

```mathematica
dirs = {{0,0}, {0,0}};
ListLinePlotly[dirs // Offload]
```

```mathematica
task = SetInterval[dirs = Append[dirs, Last[dirs] + RandomChoice[{{1,0}, {-1,0}, {0,1}, {0,-1}}]], 300];
SetTimeout[TaskRemove[task], 6000];
```