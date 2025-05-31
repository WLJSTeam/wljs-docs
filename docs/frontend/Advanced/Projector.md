There is an option to unpin the output cell to a new window.

![](./../../Screenshot%202024-08-25%20at%2017.09.18.png)

> It does two things:
> 1. Evaluates the cell in the context of the notebook.
> 2. Projects the last output result to a new window.

:::info
[CurrentWindow](frontend/Reference/Frontend%20IO/CurrentWindow.md) will refer to the new window, but [NotebookStore](frontend/Reference/Cells%20and%20Notebook/NotebookStore.md) will still be assigned to the source notebook.
:::

## Detaching controls / output graphics

This feature is handy if you have interactive elements in different cells and want to arrange them.

*Boids simulation*

```mathematica title="evaluate normally"
n = 100;
r := RandomInteger[{1, n}];
f := (#/(.05 + Sqrt[#.#])) & /@ (x[[#]] - x) &;
s := With[{r1 = r}, p[[r1]] = r; q[[r1]] = r];
x = RandomReal[{-1, 1}, {n, 2}];
v = {#,#} &/@ x // NumericArray;
{p, q} = RandomInteger[{1, n}, {2, n}];
colors = RGBColor[#/n // N,0.3,0.5] &/@ Range[n];

fps = 0;
fpsLabel = "0";
time = AbsoluteTime[];
defaults = <|"p"->0.03, "q"->0.02|>;

EventHandler["frame", Function[Null,
  With[{new = 0.995 x + defaults["p"] f[p] - defaults["q"] f[q]},
    v = {5 #[[1]], 5 #[[1]] + 30 #[[2]]} &/@ Transpose[{new, new - x}] // NumericArray;
    x = new;
  ];

  If[r < 100, s];

  (* FPS counter *)
  fps += 1;
  With[{diff = AbsoluteTime[] - time},
    If[diff >= 1.0,
      fpsLabel = ToString[fps / (diff)];
      fps = 0;
      time = AbsoluteTime[];
    ];
  ];
]];
```

```mathematica title="project it to a window"
Graphics[{
  PointSize[0.007], Table[With[{i = i, c = colors[[i]]},
    {c, Arrow[v[[i]] // Offload]}
  ], {i, n}],
  AnimationFrameListener[v // Offload, "Event"->"frame"],
  Text[fpsLabel // Offload, {-1.8,1.8}]
}, PlotRange -> {{-2,2}, {-2,2}}, "TransitionType"->"Linear", "TransitionDuration"->10, ImageSize->500]  
```

```mathematica title="evaluate normally"
EventHandler[InputGroup[<|
  "p" -> InputRange[0, 0.1, 0.01, 0.03, "Label"->"p"], 
  "q" -> InputRange[0, 0.1, 0.01, 0.02, "Label"->"q"]
|>], Function[assoc, defaults = assoc]] 
```

The result looks like this:

![](./../../Screenshot%202024-08-25%20at%2017.17.48.png)

You can project the controls to a new window as well. There are no limitations on the number of windows.

## Making a slideshow

If you are working with [FrontSlidesSelected](frontend/Reference/Slides/FrontSlidesSelected.md) cells, you can always go fullscreen by pressing the `F` key on the output cell in the notebook. Here is a second option:

![](./../../Screenshot%202024-08-25%20at%2017.25.50.png)

:::warning
All your custom [JavaScript](frontend/Cell%20types/Javascript.md) cells, as well as custom styles for your presentation defined in [HTML](frontend/Cell%20types/HTML.md) cells, will not be accessible in the projected window.
:::

## Programmatic control
See [CellPrint](frontend/Reference/Cells%20and%20Notebook/CellPrint.md)

