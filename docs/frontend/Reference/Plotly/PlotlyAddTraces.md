---
env:
  - Wolfram Kernel
source: https://github.com/JerryI/wljs-plotly/blob/dev/src/Kernel.wl

package: wljs-plotly
---
```mathematica
PlotlyAddTraces[p_PlotInstance, {data_Association} | _Association, opts___]
```

appends to a plot `p` new data specified in `data`.

:::tip
See the [official reference](https://plotly.com/javascript/plotlyjs-function-reference/)
:::

## Options
### `"Window"`
By default, the `"Window"` option is set to `"Inherited"`. This setting *dynamically* uses the currently active window associated with the [`PlotlyInstance`](frontend/Reference/Plotly/PlotlyInstance.md).

When set to `"Inherited"`, even if a new window is opened using the same instance, it will be detected automatically. This is possible because all [`PlotlyInstance`](frontend/Reference/Plotly/PlotlyInstance.md) objects perform a handshake after mounting on the page.

To override this behavior, you can provide a specific [`WindowObj`](frontend/Reference/Frontend%20IO/WindowObj.md) as an option.

## Example
Plot an example data

```mathematica
p = Plotly[<|
  "x" -> Range[100],
  "y" -> Table[Sin[2Pi x / 100.0], {x,100}],
  "mode" -> "line"
|>]
```

To dynamically add new traces, we can call directly

```mathematica
PlotlyAddTraces[p, <|
  "x" -> Range[100],
  "y" -> Table[Cos[4Pi x / 100.0], {x,100}]
|>]
```

![](../../../imgs/test1123.png)

