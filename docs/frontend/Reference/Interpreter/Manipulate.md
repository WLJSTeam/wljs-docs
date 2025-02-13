---
env:
  - Wolfram Kernel
package: wljs-manipulate

source: https://github.com/JerryI/wljs-manipulate/blob/main/Kernel.wl
---
```mathematica
Manipulate[expr_, {u_Symbol, min_, max_}..]
```

```mathematica
Manipulate[expr_, {{u_Symbol, initial_}, min_, max_}..]
```

```mathematica
Manipulate[expr_, {{u_Symbol, initial_}, min_, max_, step_}..]
```

```mathematica
Manipulate[expr_, {{u_Symbol, initial_, label_String}, min_, max_, step_}..]
```


generates a version of `expr` with controls added to allow interactive reevaluation

```mathematica
Manipulate[expr_, {{u_Symbol}, values_List}..]
```

```mathematica
Manipulate[expr_, {{u_Symbol, initial_}, values_List}..]
```

```mathematica
Manipulate[expr_, {{u_Symbol, initial_, label_String}, values_List}..]
```

## Examples
Manipulate `Series` 

```mathematica
Manipulate[Series[Sinc[x], {x, 0, n}], {n, 1, 5, 1}]
```

![](./../../../Screenshot%202024-08-20%20at%2012.31.29.png)

```mathematica
Manipulate[Plot3D[Sin[n x] Cos[n y], {x,-1,1}, {y,-1,1}], {n, 1, 5, 1}]
```

![](./../../../Screenshot%202024-08-20%20at%2012.34.02.png)

:::warning
`Manipulate` reevaluates the whole expression similar to [Refresh](frontend/Reference/Interpreter/Refresh.md), which is a huge overhead for the system. Please, consider to use [ManipulatePlot](frontend/Reference/Plotting%20Functions/ManipulatePlot.md), [AnimatePlot](frontend/Reference/Plotting%20Functions/AnimatePlot.md), [ManipulateParametricPlot](frontend/Reference/Plotting%20Functions/ManipulateParametricPlot.md) or general dynamics using [Offload](frontend/Reference/Interpreter/Offload.md) (see [Dynamics](frontend/Dynamics.md)) for any plots, rapidly changing data and smooth transitions instead of `Manipulate`.
:::

`Manipulate` is caching all results by the default.

## Portability
`Manipualte` __cannot be exported__ to [Static HTML](frontend/Exporting/Static%20HTML.md), ~~however, [Dynamic HTML](frontend/Exporting/Dynamic%20HTML.md) __is possible__ to keep the functionality working, but the file size might be quite large.~~

:::caution
Due to garbage collection problem, it is no longer possible to export using dynamic mode. Please write to Github issues, if you consider this problem important. Apart from that, [ManipulatePlot](frontend/Reference/Plotting%20Functions/ManipulatePlot.md) as well as[ManipulateParametricPlot](frontend/Reference/Plotting%20Functions/ManipulateParametricPlot.md) will work properly being exported using dynamic mode.
:::