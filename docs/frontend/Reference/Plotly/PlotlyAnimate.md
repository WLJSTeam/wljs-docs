---
env:
  - Wolfram Kernel

package: wljs-plotly
source: https://github.com/JerryI/wljs-plotly/blob/dev/src/Kernel.wl
---
```mathematica
PlotlyAnimate[p_PlotlyInstance, data_Association, transition_Association, opts___]
```

animates efficiently any [Plotly](frontend/Reference/Plotly/Plotly.md) graph with a new `data` with a specified `transition`. 

:::tip
See the [official reference](https://plotly.com/javascript/plotlyjs-function-reference/)
:::

## Options
### `"Window"`
By default, the `"Window"` option is set to `"Inherited"`. This setting *dynamically* uses the currently active window associated with the [`PlotlyInstance`](frontend/Reference/Plotly/PlotlyInstance.md).

When set to `"Inherited"`, even if a new window is opened using the same instance, it will be detected automatically. This is possible because all [`PlotlyInstance`](frontend/Reference/Plotly/PlotlyInstance.md) objects perform a handshake after mounting on the page.

To override this behavior, you can provide a specific [`WindowObj`](frontend/Reference/Frontend%20IO/WindowObj.md) as an option.


## Example
An example

```mathematica
p = Plotly[<|
  "y" -> Table[Sin[2Pi x / 100.0], {x,100}],
  "mode"-> "markers",
  "type"-> "scatter"
|>]
```

```mathematica
freq = 0.5;
task = SetInterval[
 PlotlyAnimate[p, 
  <|
    "data" -> {
      <|"y" -> Table[Sin[freq Pi x / 100.0], {x,100}]|>
    },
    "trace" -> {0},
    "layout" -> <||>
  |>,
  <|
    "transition" -> <|
      "duration"->30,
      "easing"->"linear"
    |>,
    
    "frame" -> <|
      "duration"->30
    |>
  |>
 ];

 freq += 0.3;
, 30];

SetTimeout[TaskRemove[task], 2000];
```

![](../../../imgs/PlotlyAnimate-ezgif.com-optipng.png)
