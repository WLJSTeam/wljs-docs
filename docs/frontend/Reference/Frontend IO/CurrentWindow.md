---
env:
  - Wolfram Kernel
package: wljs-editor

source: https://github.com/JerryI/wljs-editor/blob/dev/src/FrontSubmitKernel.wl
---
```mathematica
CurrentWindow[] _WindowObj
```

returns a window socket object from the evaluation context. The object corresponds to the current socket channel used for the communication with a window, where a cell is evaluated. 

Provides [WindowObj](frontend/Reference/Frontend%20IO/WindowObj.md)

## Notes on projected cells
`CurrentWindow[]` will return an object pointing to the window, where a cell was projected. To get the window object of the parent notebook window use

```mathematica
CurrentWindow["Origin"]
```

It is used by [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md), [FrontFetch](frontend/Reference/Frontend%20IO/FrontFetch.md) and [FrontFetchAsync](frontend/Reference/Frontend%20IO/FrontFetchAsync.md)
