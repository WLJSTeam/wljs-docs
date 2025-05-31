---
env:
  - Wolfram Kernel
update: 
needsContainer: 
origin: https://reference.wolfram.com/language/ref/ArrayPlot.html
---
Generates a plot, where values are shown in a discrete array of blocks

:::danger
Since [Graphics](frontend/Reference/Graphics/Graphics.md) in this implementation cannot guess the plot range, you need to provide this explicitly. Use [MatrixPlot](frontend/Reference/Plotting%20Functions/MatrixPlot.md) if you want it to happen automatically.
:::

```mathematica
ArrayPlot[{{1, 0, 0, Pink}, {1, 1, 0, Pink}, {1, 0, 1, Red}}];
Insert[%, PlotRange->{{0,4}, {0,3}}, 2]
```

<Wl >{`Insert[ArrayPlot[{{1, 0, 0, Pink}, {1, 1, 0, Pink}, {1, 0, 1, Red}}, ImageSize->500], PlotRange->{{0,4}, {0,3}}, 2]`}</Wl>

Combining it with `Controls` option for `Graphics`, you __can zoom and pan the plot using your mouse__

```mathematica
ArrayPlot[Table[Sin[x y], {x, -40, 40}, {y, -40, 40}]];
Insert[%, PlotRange->{{0,80}, {0,80}}, 2];
Insert[%, Controls->True, 2]
```

<Wl >{`Insert[Insert[ArrayPlot[Table[Sin[x y], {x, -40, 40}, {y, -40, 40}], ImageSize->500], PlotRange->{{0,80}, {0,80}}, 2], Controls->True, 2]`}</Wl>