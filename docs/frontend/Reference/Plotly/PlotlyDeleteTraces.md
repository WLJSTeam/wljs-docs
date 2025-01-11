---
env:
  - Wolfram Kernel
source: https://github.com/JerryI/wljs-plotly/blob/dev/src/Kernel.wl
context: Notebook`Kernel`PlotlyExtension`
package: wljs-plotly
---
```mathematica
PlotlyDeleteTraces[p_PlotlyInstance, traces_List]
```

removes traces listed in `traces` with indexes starting from `0`

:::tip
See the [official reference](https://plotly.com/javascript/plotlyjs-function-reference/)
:::