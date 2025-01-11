---
env:
  - Wolfram Kernel
context: JerryI`Notebook`ManipulateUtils`
package: wljs-manipulate
source: https://github.com/JerryI/wljs-manipulate/blob/main/Kernel.wl
---
:::warning
Implementation differs from Mathematica
:::

```mathematica
Refresh[expr_, interval_]
```

produces a dynamic window with `expr` reevaluated each interval of time specified in seconds or in `Quantity` provided in `interval`

```mathematica
Refresh[expr_, trigger_EventObject | trigger_String]
```

produces a dynamic window with `expr` reevaluated by `trigger` event (see [Events](frontend/Reference/Misc/Events.md)).

`Referesh` has `HoldFirst` attribute.


## Example

```mathematica
Refresh[Now // TextString, 1]
```

or even for decorated symbols

```mathematica
Refresh[Now, 1]
```



:::caution
Do not put `Plot` or any other functions inside with a fast refresh rate (< 1 second). In general the reevaluation cause a large overhead to the system with graphics.

Consider to use [Offload](frontend/Reference/Interpreter/Offload.md) for rapidly changing data (see more in [Dynamics](frontend/Dynamics.md) and [Advanced animation](frontend/Advanced/Dynamics/Advanced%20animation.md) or [PlotlyExtendTraces](frontend/Reference/Plotly/PlotlyExtendTraces.md)).
:::