---
env:
  - Wolfram Kernel
  - WLJS
package: wljs-editor
source: https://github.com/JerryI/wljs-editor/blob/dev/src/
---
```mathematica
SystemOpen[path_String | _File | _URL, opts___]
```

opens a file, url or a folder specified by the first argument. It uses OS API.

:::warning
It uses absolute path. To open a file in your notebook directory use the pattern

```mathematica
SystemOpen[FileNameJoin[{NotebookDirectory[], "yourFile"}]]
```
:::

## Options
### `"Window"`
By the default is uses [CurrentWindow](frontend/Reference/Frontend%20IO/CurrentWindow.md) from the current context. If the context is not available, you have to specify a window object explicitly.


:::warning
Works only for Desktop App
:::

