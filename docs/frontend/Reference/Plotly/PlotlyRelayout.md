---
env:
  - Wolfram Kernel
source: https://github.com/JerryI/wljs-plotly/blob/dev/src/Kernel.wl

package: wljs-plotly
---
```mathematica
PlotlyRelayout[p_PlotlyInstance, update_Association, opts___]
```

an efficient means of updating the `layout` object of an existing plot.

**Mush faster than [PlotlyReact](frontend/Reference/Plotly/PlotlyReact.md)**

:::tip
See the [official reference](https://plotly.com/javascript/plotlyjs-function-reference/)
:::

For example

```mathematica
p = Plotly[<|"type"->"line", "y"->{1,2,3,4,5,6}|>]
```

Change the ranges

```mathematica
PlotlyRelayout[p, <|"xaxis.range" -> {0, 5}|>];
```


## Options
### `"Window"`
By default, the `"Window"` option is set to `"Inherited"`. This setting *dynamically* uses the currently active window associated with the [`PlotlyInstance`](frontend/Reference/Plotly/PlotlyInstance.md).

When set to `"Inherited"`, even if a new window is opened using the same instance, it will be detected automatically. This is possible because all [`PlotlyInstance`](frontend/Reference/Plotly/PlotlyInstance.md) objects perform a handshake after mounting on the page.

To override this behavior, you can provide a specific [`WindowObj`](frontend/Reference/Frontend%20IO/WindowObj.md) as an option.