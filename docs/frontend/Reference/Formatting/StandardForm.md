---
env:
  - Wolfram Kernel
package: wljs-editor
context: Notebook`Editor`StandardForm`
source: https://github.com/JerryI/wljs-editor/blob/dev/src/StandardForm.wl
---
A standard form for representing math, colors, dates, graphics, which comes with visual decorations

__This is a default representation__ used in output cells. You can apply it to expressions before using in [EditorView](frontend/Reference/GUI/EditorView.md) and [InputEditor](frontend/Reference/GUI/InputEditor.md) and [CellPrint](frontend/Reference/Cells%20and%20Notebook/CellPrint.md)

## Example
Stylize an output form of a symbol

```mathematica
specialSymbol /: MakeBoxes[specialSymbol, StandardForm] := With[{
	o = Graphics[Disk[], ImageSize->100, ImagePadding->None]
},
	ViewBox[specialSymbol, o]
]
```

![](./../../../Screenshot%202024-03-27%20at%2021.16.28.png)

__An expression will not be revealed__

