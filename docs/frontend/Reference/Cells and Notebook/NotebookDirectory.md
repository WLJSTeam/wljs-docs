---
env:
  - Wolfram Kernel
context: System`
source: https://github.com/JerryI/wljs-editor/blob/dev/src/RemoteCellsKernel.wl
package: wljs-editor
---
```mathematica
NotebookDirectory[] _String
```

returns a file path to the current notebook.

:::tip
Use it in a multiuser environment, where you cannot rely on `Directory[]`
:::
