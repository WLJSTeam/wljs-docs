---
env:
  - Wolfram Kernel
update: false
---



Make a formatting structure whose interpretation is not based on its appearance

```mathematica
InterpretationBox[display_, expr_]
```

where `display` will be shown in the output cell, instead of `expr`, keeping `expr` for the evaluation. 

:::info
`display` can be any Wolfram Expression wrapped in `MakeBoxes`
:::

:::danger
`display` must be Boxes, if you want to use regular WL expressions, consider [Interpretation](frontend/Reference/Formatting/Interpretation.md)
:::

:::tip
Please see [BoxBox](frontend/Reference/Formatting/Low-level/BoxBox.md) and [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md) for an advanced expression decorations
:::

:::tip
See more at [Decorating symbols](frontend/Advanced/Syntax%20sugar/Decorating%20symbols.md)
:::


## Applications
One of the examples is to make some definitions shorter by setting `UpValues` to  `MakeBoxes`, since the last one is recursively applied to everything in the output cell 

```mathematica
AVeryLongFunction /: MakeBoxes[AVeryLongFunction, StandardForm] := InterpretationBox[MakeBoxes[Ashort, StandardForm], AVeryLongFunction]
```

Now we can check the result by
```mathematica
AVeryLongFunction
```

if one define also this
```mathematica
AVeryLongFunction[expr__] := SpecialList[expr]
```

You can use it with the created alias `Ashort`

__An expression will not be revealed__


## Dev notes
This is a wrapper for [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md) with a read-only [EditorView](frontend/Reference/GUI/EditorView.md) inside.

## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
