---
env:
  - Wolfram Kernel
context: Notebook`Kernel`PlotlyExtension`
source: https://github.com/JerryI/wljs-plotly/blob/dev/src/Kernel.wl
package: wljs-plotly
---
```mathematica
PlotlyExtendTraces[p_PlotlyInstance, data_Association, {target_Integer}]
```

appends new points `data` to a given trace indexed by `trace` number (starting from 0)

:::tip
See the [official reference](https://plotly.com/javascript/plotlyjs-function-reference/)
:::

## Example
Create a dummy plot

```mathematica
p = Plotly[<|
  "y" -> Table[Sin[2Pi x / 100.0], {x,100}],
  "mode" -> "line"
|>]
```

now lets add data dynamically
```mathematica
task = SetInterval[
  PlotlyExtendTraces[p, <|
    "y" -> {{RandomReal[]}}
  |>, {0}]
, 100];

SetTimeout[TaskRemove[task], 2000];
```

![](../../../imgs/plotlydin-ezgif.com-optipng.png)
