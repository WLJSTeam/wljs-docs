---
env:
  - Wolfram Kernel
source: https://github.com/JerryI/wljs-editor/blob/dev/src/RemoteCellsKernel.wl
package: wljs-editor
context: Notebook`CellOperations`
---
fetches [RemoteCellObj](frontend/Reference/Cells%20and%20Notebook/RemoteCellObj.md) for a parent input cell of a given cell

```mathematica
ParentCell[cell_RemoteCellObj] _CellObj
```

:::danger
It relies on a synchronous function [`WaitAll`](frontend/Reference/Misc/Promise.md#`WaitAll`), which blocks the main event-loop, therefore it is not recommended to use it. Please, consider to use [EvaluationCell](frontend/Reference/Cells%20and%20Notebook/EvaluationCell.md) if possible.  
:::