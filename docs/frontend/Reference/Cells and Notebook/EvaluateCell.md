---
env:
  - Wolfram Kernel

package: wljs-editor
---
```mathematica
EvaluateCell[cell_RemoteCellObj, opts___]
```

evaluates programmatically a cell in the notebook given by [RemoteCellObj](frontend/Reference/Cells%20and%20Notebook/RemoteCellObj.md)

## Options
### `"Target"`
Specifies where to output the result. Default is `"Notebook"`, possible values
- `"Notebook"` or `Null`
- `"Window"` or `_` makes the output to be projected to a new window
