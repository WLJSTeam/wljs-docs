---
draft: false
---
Leaving some calculations to the frontend can reduce the overhead from communication between the frontend and the Kernel while also making your code much cleaner.

The idea is to minimize the number of dynamic symbols (see [Dynamics](frontend/Dynamics.md)). Let us start with a simple example of Bezier curves:

```mathematica
autoLine[t_, p1_, p2_, p3_] := 
 Line[
  {p1 + t (p2 - p1), p2 + t (p3 - p2)}
 ]
```

To make it *dynamic*, we just need to pass our symbols like this:

```mathematica
p1 = ...;
p2 = ...;
p3 = ...;

autoLine[t, p1 // Offload, p2 // Offload, p3 // Offload]
```

Imagine if we have many such lines. __Do we need to define the same number of symbols to control them?__ No, we need just `3` points, and the rest can be calculated. Let us bind our `Line` to those 3 and only 3:

```mathematica title="Optimized Version"
autoLine[t_, p1_, p2_, p3_] := 
 Line[
   With[{pc = p2, pi = p1, pf = p3}, 
     {pi + t (pc - pi), pc + t (pf - pc)}
   ] // Offload
 ]

SetAttributes[Line, HoldRest]
```

Here, we used a trick with `With` so that `p1, p2, p3` are external symbols bound to `Line` and will cause its reevaluation, while `pc, pi, pf`, which enter the list multiple times, are just numbers calculated locally.

:::tip
Avoid multiple copies of the same dynamic symbol entering the arguments of the same expression. For example:

```mathematica
Line[{Offload[a], Offload[a] + b}]
```

A single change in `a` will cause the reevaluation of `Line` __two times__, whereas:

```mathematica
Line[With[{p = a}, {p, p + b}] // Offload]
```

A single change in `a` will cause the reevaluation of `Line` only __one time__ 👍🏼
:::

The final step is to generate a list of curves connected to three draggable points on a graph:

```mathematica
curve[p1_, p2_, p3_] := LeakyModule[{pi = p1, pc = p2, pf = p3},
  {
    Blue, Table[autoLine[t, pi, pc, pf], {t, 0, 1, 0.01}],
    PointSize[0.06], Red, 

    EventHandler[Point[pi], {"drag" -> Function[xy, pi = xy]}],
    EventHandler[Point[pc], {"drag" -> Function[xy, pc = xy]}],
    EventHandler[Point[pf], {"drag" -> Function[xy, pf = xy]}]
  }
]
```

Here, we used [`LeakyModule`](frontend/Reference/Misc/Language.md#`LeakyModule`), which is just a regular `Module` but with the garbage collector disabled.

Now, let us draw:

```mathematica
curve[{0.2,0.2}, {0.3,0.5}, {0.6,0.1}] // Graphics
```

![](./../../../Curves%20video%20to%20gif.gif)

### A Side Note
Frontend computations do not cost much since everything happens within a browser. One can add many more curves, and they will still work perfectly, as all of them are recalculated independently and bound to only __3 symbols__.

![](./../../../Many_many.svg)