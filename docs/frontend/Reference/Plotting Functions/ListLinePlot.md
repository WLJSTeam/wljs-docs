---
env:
  - Wolfram Kernel
update: 
needsContainer: 
registered: true
---
Plots a line like [Plot](frontend/Reference/Plotting%20Functions/Plot.md) through the list of points provided
```mathematica
ListLinePlot[{y1, y2, y3, ...}]
```

## Options
The same as for [Plot](frontend/Reference/Plotting%20Functions/Plot.md)

## Examples
Plot a list of $y$ values

```mathematica
ListLinePlot[{1, 1, 2, 3, 5, 8}]
```

<Wl >{`ListLinePlot[{1, 1, 2, 3, 5, 8}, ImageSize->500]`}</Wl>

Add a filling under the line

```mathematica
ListLinePlot[Prime[Range[25]], Filling -> Axis]
```

<Wl >{`ListLinePlot[Prime[Range[25]], Filling -> Axis, ImageSize->500]`}</Wl>

Random walk

```mathematica
ListLinePlot[Accumulate[RandomReal[{-1, 1}, {250, 2}]]]
```

<Wl >{`ListLinePlot[Accumulate[RandomReal[{-1, 1}, {100, 2}]], ImageSize->500]`}</Wl>

## Dev notes
This function does not support updates, please use raw `Graphics` or alternative way - [ListLinePlotly](frontend/Reference/Plotly/ListLinePlotly.md) to animate your data.