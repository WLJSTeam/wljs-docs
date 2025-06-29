---
env:
  - WLJS
package: wljs-graphics-d3
update: true
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/kernel.js
---
```mathematica
Inset[expr_]
```

```mathematica
Inset[expr_, pos_List, origin: Center]
```

a graphics object, that allows to put another [Graphics](frontend/Reference/Graphics/Graphics.md), [Image](frontend/Reference/Image/Image.md), [EditorView](frontend/Reference/GUI/EditorView.md), [CellView](frontend/Reference/GUI/CellView.md) or __anything else__ on the canvas.

Parameters:
- `pos` has to be a 2D vector, that specifies the position of the inset in the local coordination system
- `origin` __is optional__ and specifies the anchor:
	- - `"Center"` (default value)
	- - `"Top"`
	- - `"Bottom"`
	- - `"Left"`
	- - `"Right"`


## Examples

```mathematica
inset = Graphics[{
  LightRed,
  Disk[{0,0},0.25],
  Black, Directive[FontSize->16], Text["Test", {0,0}, {0,0}]
}, PlotRange->{{-1,1}, {-1,1}}];

Plot[x, {x,0,10}, Epilog->{Inset[inset, {5,5}]}]
```

or use place any Wolfram expression:

```mathematica @
Plot[x, {x,0,10}, Epilog->{Inset[HoldForm[(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)], {5,5}, Bottom]}]
```

## Dynamics
The second arguments `pos` that specifies the position of an inset does support updates.