---
env:
  - WLJS
package: wljs-graphics-d3
update: true
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/Kernel.wl
context: JerryI`Notebook`Graphics2D`
---
signals once the beginning of a browser's frame (depends on OS settings, hardware). It can be reloaded again after any changes of dependent dynamic symbols similar to [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

The main idea is
- to be in sync with a beginning of native browser's frame drawing
- to animate something as fast as possible
- don't fire next frame, before calculations are done

Therefore this provides a balanced load to the system.

```mathematica
AnimationFrameListener[trigger_Offload, "Event"->event_String]
```

where `trigger` can be any dynamic symbol wrapped in [Offload](frontend/Reference/Interpreter/Offload.md), that will be changed each frame, it serves the purpose of a signal, that all calculations are done. `event` is a string representation of [`EventObject`](frontend/Reference/Misc/Events.md#`EventObject`) to which a handler function, that recalculates `trigger` is assigned.

## Example
There is [a famous example](https://community.wolfram.com/groups/-/m/t/122095) of 1000 particles "dancing" with each other

```mathematica title="cell 1"
n = 1000;
r := RandomInteger[{1, n}];
f := (#/(.01 + Sqrt[#.#])) & /@ (x[[#]] - x) &;
s := With[{r1 = r}, p[[r1]] = r; q[[r1]] = r];
x = RandomReal[{-1, 1}, {n, 2}];
{p, q} = RandomInteger[{1, n}, {2, n}];
```

```mathematica title="cell 2"
EventHandler["frame", Function[Null,
  (* all calculations *)
  x = 0.995 x + 0.02 f[p] - 0.01 f[q];
  If[r < 100, s];
]];
```

```mathematica title="cell 3"
Graphics[{
  PointSize[0.007], Point[x // Offload],
  AnimationFrameListener[x // Offload, "Event"->"frame"]
}, PlotRange -> {{-2,2}, {-2,2}}, "TransitionType"->"Linear", "TransitionDuration"->1]  
```

![](../../../imgs/dancers-ezgif.com-video-to-apng-converter.png)

Here we used the same symbol `x` used for drawing our points for triggering [AnimationFrameListener](frontend/Reference/Graphics/AnimationFrameListener.md). __It does not cost anything__, since it listens only for change of a symbol and does not read or decode an actual value.



to cancel animation - remove handler

```mathematica
EventRemove["frame"]
```

and to restart - evaluate cell 2 and retrigger it using

```mathematica
EventFire["frame", True];
```

