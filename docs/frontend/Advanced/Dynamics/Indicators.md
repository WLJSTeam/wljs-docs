---
draft: false
---
While evaluating experimental data, some live indicators come in handy.

## Crossbar and Coordinates Field
If you are an Origin Pro user, this is an essential tool for picking data points from your graph.

Essentially, we need two things: [Line](frontend/Reference/Graphics/Line.md) and [TextView](frontend/Reference/GUI/TextView.md).

### Normal Way

```mathematica title="cell 1"
point = {0.,0.};

(* Plot some dummy function *)
Plot[Sinc[x], {x,-10,10}, Epilog->{
  Red,

  (* Crossbar *)
  Line[With[{p = point[[1]]},
    {{p, -10}, {p, 10}}
  ] // Offload],

  Line[With[{p = point[[2]]},
    {{-10, p}, {10, p}}
  ] // Offload],

  (* Attach listener *)    
  EventHandler[Null, {
    "mousemove" -> Function[xy, point = xy]
  }]
}]
```

This attaches an [`EventHandler`](frontend/Reference/Misc/Events.md#`EventHandler`) to a `Null` expression, which forces it to seek the nearest parent that emits events, i.e., `Graphics`. Every time the user moves the mouse over it, the event handler is triggered, updating the `point` symbol, which causes the lines to update accordingly.

:::tip
You can reduce lag by tuning [TransitionDuration](frontend/Reference/Graphics/TransitionDuration.md) to a lower value.
:::

![](../../../Draggable-ezgif.com-optipng.png)

Now, the text field:

```mathematica title="cell 2"
TextView[point // Offload]
```

![](../../../Screenshot%202024-03-29%20at%2020.37.00.png)

The accuracy might be too large. We can output the values separately by using another variable or symbol:

```mathematica
point = {0.,0.};
text = " ";

(* Plot some dummy function *)
Plot[Sinc[x], {x,-10,10}, Epilog->{
  Red,

  (* Crossbar *)
  Line[With[{p = point[[1]]},
    {{p, -10}, {p, 10}}
  ] // Offload],

  Line[With[{p = point[[2]]},
    {{-10, p}, {10, p}}
  ] // Offload],

  EventHandler[Null, {
    "mousemove" -> Function[xy, 
        point = xy;
        text = ToString[Round[xy, 0.01]];
    ]
  }]
}]

TextView[text // Offload]
```

Now it is much better.

![](../../../Screenshot%202024-03-29%20at%2020.38.46.png)

### Dynamically Appending to a Plot
One can also append it to a plot dynamically afterward using [FrontInstanceReference](frontend/Reference/Frontend%20IO/FrontInstanceReference.md). Sometimes this approach is better since all variables remain scoped.

```mathematica
placeCrossbar[ref_, pos_:{0.,0.}] := LeakyModule[{point = pos, text = ""},
  FrontSubmit[{
    Red,

    (* Crossbar *)
    Line[With[{p = point[[1]]},
      {{p, -10}, {p, 10}}
    ] // Offload],

    Line[With[{p = point[[2]]},
      {{-10, p}, {10, p}}
    ] // Offload],

    EventHandler[Null, {
    "mousemove" -> Function[xy, 
        point = xy;
        text = ToString[Round[xy, 0.01]];
    ]
  }]
  }, ref];
  
  TextView[text // Offload]
]
```

Now, the only thing we need is to scope it:

```mathematica title="cell 1"
(* Plot some dummy function *)
ref = FrontInstanceReference[];
Plot[Sinc[x], {x,-10,10}, Epilog->{ref}]
```

After evaluation, we can append it:

```mathematica
placeCrossbar[ref]
```

## Progress Bar
During a long evaluation process, we need some sort of indication. For this, we need a few elements: [Rectangle](frontend/Reference/Graphics/Rectangle.md) and [CellPrint](frontend/Reference/Cells%20and%20Notebook/CellPrint.md).

One can think of it as a typical OOP approach. We need a constructor that returns an instance for tracking the evaluation progress:

```mathematica
progressBar[max_Real | max_Integer] := LeakyModule[{
    progress = 0.,
    bar,
    increment,
    timer = AbsoluteTime[]
},
    bar = CellPrint[ToString[
        Graphics[{
            LightBlue, Rectangle[{-1,-1}, {1,1}],
            Green, Rectangle[{-1,-1}, {Offload[2 progress - 1], 1}]
        }, ImagePadding->None, ImageSize->{400, 30}]
    , StandardForm], "After"->EvaluationCell[]];

    (* Throttling *)
    increment[value_Real | value_Integer] := If[AbsoluteTime[] - timer > 0.1,
        timer = AbsoluteTime[];
        progress = value / max // N;
        If[progress >= 0.99, 
            ClearAll[increment];
            Delete[bar];
        ];
    ];

    increment
]
```

Here, we also use a throttling mechanism to avoid overloading the frontend if our progress-tracking function is called too often. The progress bar itself is printed in another cell as a growing green rectangle.

Let’s try to use it:

```mathematica
bar = progressBar[10];
Table[bar[i]; Pause[0.5]; i, {i, 10}]
```

![](../../../Screenshot%202024-03-29%20at%2020.55.44.png)
