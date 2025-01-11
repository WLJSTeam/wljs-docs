---
env:
  - Wolfram Kernel
package: wljs-editor
context: Notebook`CellOperations`
source: https://github.com/JerryI/wljs-editor/blob/dev/src/RemoteCellsKernel.wl
---
returns an future output cell identifier as an [RemoteCellObj](frontend/Reference/Cells%20and%20Notebook/RemoteCellObj.md) *even if it was not yet created* from the evaluation context

```mathematica
ResultCell[] _RemoteCellObj
```

:::note
Works in all output cells: Wolfram Language, [WLX](frontend/Cell%20types/WLX.md) and [Slides](frontend/Cell%20types/Slides.md)
:::


