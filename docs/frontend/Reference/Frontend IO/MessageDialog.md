---
env:
  - Wolfram Kernel
package: wljs-editor
---
```mathematica
MessageDialog[expr_]
```

opens a modal window with `expr` displayed in the middle in a *non-blocking way*, where `expr` can be a string, graphics or any other expression

:::note
It will use [StandardForm](frontend/Reference/Decorations/StandardForm.md) for displaying expressions
:::

## Options
In a case of a lost context provide 

### `"Notebook"`
Specify explicitly a notebook where to pop up a window

