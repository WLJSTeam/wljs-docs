---
env:
  - Wolfram Kernel
source: https://github.com/JerryI/wljs-editor/blob/dev/src/EditorKernel.wl
package: wljs-editor
context: Notebook`EditorUtils`
---
a wrapper over [EditorView](frontend/Reference/GUI/EditorView.md) used for making input elements

```mathematica
InputEditor[expr_String] _EventObject
```

as a result it returns [`EventObject`](frontend/Reference/Misc/Events.md#`EventObject`)

## Event generation
It fires the following patterns/topics

### `"Input"`
Fires every time users changes the content with a content as a payload

### `"Evaluate"`
Fires when a user presses a combination `Shift+Enter`

## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
- [WLXForm](frontend/Reference/Formatting/WLXForm.md)