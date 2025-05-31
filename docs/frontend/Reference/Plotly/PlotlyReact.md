---
env:
  - Wolfram Kernel
source: https://github.com/JerryI/wljs-plotly/blob/dev/src/Kernel.wl

package: wljs-plotly
---
```mathematica
PlotlyReact[p_PlotlyInstance, data_Association, opts___]
```

```mathematica
PlotlyReact[p_PlotlyInstance, {data_Association ..}, layout_Association, opts___]
```

fully recreates a graph using provided data (it is faster than reevaluation)

:::tip
See the [official reference](https://plotly.com/javascript/plotlyjs-function-reference/)
:::

For example

```mathematica
p = Plotly[<|"type"->"line", "y"->{1,2,3,4,5,6}|>]
```

And now we can update the whole graph using different data

```mathematica
PlotlyReact[p, {<|"type"->"scatter", "y"->110{5,2,3,4,5,6}, "x"->{1,2,3,4,5,6}|>}];
```


## Options
### `"Window"`
By default, the `"Window"` option is set to `"Inherited"`. This setting *dynamically* uses the currently active window associated with the [`PlotlyInstance`](frontend/Reference/Plotly/PlotlyInstance.md).

When set to `"Inherited"`, even if a new window is opened using the same instance, it will be detected automatically. This is possible because all [`PlotlyInstance`](frontend/Reference/Plotly/PlotlyInstance.md) objects perform a handshake after mounting on the page.

To override this behavior, you can provide a specific [`WindowObj`](frontend/Reference/Frontend%20IO/WindowObj.md) as an option.