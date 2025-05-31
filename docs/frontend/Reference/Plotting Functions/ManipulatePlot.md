---
env:
  - Wolfram Kernel

package: wljs-manipulate
source: https://github.com/JerryI/wljs-manipulate/blob/main/Kernel.wl
---
```mathematica
ManipulatePlot[f_, {t, min, max}, {p1, min, max}, ..., opts___]
```

a dynamic alternative to [Plot](frontend/Reference/Plotting%20Functions/Plot.md) and Mathematica's [Manipulate](frontend/Reference/GUI/Manipulate.md), that uses input elements and [Offload](frontend/Reference/Interpreter/Offload.md) technic to make a fast interactive plots of a given function `f[t, p1, p2...]` 

the set of parameters are not limited and accepts the following forms

```mathematica
ManipulatePlot[f_, {t, min, max}, {p1}, {p2}, ...]
```

```mathematica
ManipulatePlot[f_, {t, min, max}, {p1, min, max}, {p2}, ...]
```

```mathematica
ManipulatePlot[f_, {t, min, max}, {p1, min, max, step}, {p2}, ...]
```

```mathematica
ManipulatePlot[f_, {t, min, max}, {{p1, initial}, min, max}, {p2}, ...]
```

```mathematica
ManipulatePlot[f_, {t, min, max}, {{p1, initial, label}, min, max}, {p2}, ...]
```

```mathematica
ManipulatePlot[f_, {t, min, max}, {p1, values_List}, {p2}, ...]
```

```mathematica
ManipulatePlot[f_, {t, min, max}, {{p1, initial}, values_List}, {p2}, ...]
```

```mathematica
ManipulatePlot[f_, {t, min, max}, {{p1, initial, label}, values_List}, {p2}, ...]
```

where `f` can return `_Real` or `{__Real}`

## Options
### `"SamplingPoints"`
A number of points used in sampling. The default value is `200`

It inherits some of [Graphics](frontend/Reference/Graphics/Graphics.md) options as well

### `TransitionType`
See [TransitionType](frontend/Reference/Graphics/TransitionType.md)

### `TransitionDuration`
See [TransitionDuration](frontend/Reference/Graphics/TransitionDuration.md)

### `ImageSize`
Accepts `{width, height}`

### `PlotStyle`
Specifies colors for each curve

### `"ControlsLayout"`
By the default is `"Vertical"`, another possible value is `"Horisontal"`

### `Epilog`
### `Prolog`
Appends graphics primitives to the plot. See [Graphics](frontend/Reference/Graphics/Graphics.md)

### `"UpdateFunction"`
Allows to alter the data generated on update or cause user-defined side-effects. The following values are expected

```mathematica
Function[input,
	(* side effects *)
	(* RETURN *)
	True <- accept change
	False <- prevent default
	_ <- will be written instead
]
```

This allows to add extra dynamic features to your plot nicely

```mathematica
Module[{label, pos},
  ManipulatePlot[x w, {x,0,1}, {w,0,2},
    Epilog->Text[label // Offload, pos // Offload],
    "UpdateFunction" -> Function[input,
      label = StringTemplate["w = ``"][input];
      pos = {0.5, input 0.5 + 0.2};
      True
    ]
  ]
]
```


### `"TrackedExpression"`
Similar to the option of [InputRange](frontend/Reference/GUI/InputRange.md). It provides an external control over the sliders. Your expression must be an array of values with a length equal to the number of controlling parameters. For example

```mathematica
woo = {0.5, 0.6};

ManipulatePlot[Sin[ w x^2 + u], {x,0,10}, {w, 0, 1},{u, 0,1}, "TrackedExpression"->Offload[woo]]
```

now you can update it by setting a new value

```mathematica
woo = {0.3, 0.2, 1.3}
```

## Example
Plot the simplest sine function

```mathematica
ManipulatePlot[Sin[w z + p], {z,0,10}, {w, 0, 15.1, 1}, {p, 0, Pi, 0.1}]
```

![](../../../Manipulate-ezgif.com-video-to-gif-converter.gif)

Or give a choice to a user

```mathematica
ManipulatePlot[f[w z + p], {z,0,10}, {w, 0, 15.1, 1}, {p, 0, Pi, 0.1}, {f, {Sin, Cos}}]
```

![](./../../../Screenshot%202024-11-30%20at%2010.15.02.png)

## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
- [WLXForm](frontend/Reference/Formatting/WLXForm.md)

## Issues

:::danger
Help needed!

There is no adaptive sampling implemented.
:::