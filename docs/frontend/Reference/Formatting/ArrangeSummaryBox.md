---
env:
  - Wolfram Kernel
context: BoxForm`
package: wljs-editor
source: https://github.com/JerryI/wljs-editor/blob/dev/src/Boxes.wl
---
```mathematica
BoxForm`ArrangeSummaryBox[head_Symbol, interpretation_, icon_Graphics | _Graphics3D | _Image | None, summary_List, Null, opts___] _RowBox
```

A decoration for summarizing internals of any WL expression to a human-readable form

![](./../../../Screenshot%202024-04-07%20at%2018.05.37.png)

:::info
A decoration behaves like a single symbol and should contain all covered data. 
:::

Usually it is applied to the output expression using [MakeBoxes](frontend/Reference/Formatting/MakeBoxes.md) and [StandardForm](frontend/Reference/Formatting/StandardForm.md) representation

```mathematica
$icon = Graphics[{Red, Disk[]}];

MyObject /: MakeBoxes[obj : MyObject[asc_Association], StandardForm] := 
    Module[{above, below},
        above = { 
          {BoxForm`SummaryItem[{"Name: ", asc["Name"]}]},
          {BoxForm`SummaryItem[{"Variables: ", asc["Variables"]}], BoxForm`SummaryItem[{"Length: ", asc["Length"]}]}
        };

        BoxForm`ArrangeSummaryBox[
           MyObject, (* head *)
           obj,      (* interpretation *)
           $icon,    (* icon, use None if not needed *)
           (* above and below must be in a format suitable for Grid or Column *)
           above,    (* always shown content *)
           Null (* expandable content. Currently not supported!*)
        ]
    ];
```

where `$icon` can be any [Image](frontend/Reference/Image/Image.md) or [Graphics](frontend/Reference/Graphics/Graphics.md) or [Graphics3D](frontend/Reference/Graphics3D/Graphics3D.md) or other arbitrary [WLJS Function](frontend/Advanced/Frontend%20interpretation/WLJS%20Functions.md) that can output to the DOM.

Each line is a

```mathematica
BoxForm`SummaryItem[{label_String, expr_}]
```

where `expr` is an expression that will be printed in place

Let us test this

```mathematica
MyObject[<|
  "Name" -> "My particular object",
  "Length" -> 10,
  "Variables" -> {a,b,c},
  "Date" -> Today,
  MetaInformation -> "more info..." |>]
```

![](./../../../Screenshot%202024-04-07%20at%2018.14.26.png)

This expression __is still valid for normal coping and evaluating__ 

## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)

## Options
### `"Event"`
A string identifier used for attaching event listeners to a widget. Since this is a wrapper over [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md) and `RowBox`,  see more on its page.