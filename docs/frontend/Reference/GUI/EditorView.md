---
env:
  - WLJS
source: https://github.com/JerryI/wljs-editor/blob/dev/src/EditorKernel.wl
update: true
package: wljs-editor
context: Notebook`EditorUtils`
---
A view component to spawn an code-editor (fully functional) 
```mathematica
EditorView[expr_String | expr_Offload, opts___]
```
where `expr` is a string, that represents an expression. It can receive updates and emit, when a user change the inner content.

:::danger
Editor is usually quite slow, when it comes to updates, because of many decoration widgets used there. Please, __do not use it on a rapid changing data__, consider [TextView](frontend/Reference/GUI/TextView.md) instead.
:::
## Event generation
When `"Event"` option is provided, it will send a new data in a form of a string.



## Options
### `"Event"`
Specifies an `uid` of an event-object, that will be fired on-change.

### `"ReadOnly"`
Blocks the editing mode. The default value is `False`

### `"Selectable"`
Allows or blocks any selection and copying. The default is `True`

### `"ForceUpdate"`
Fully updates an editor when `expr` changes (rebuilds all widgets). By the default it is set to `False`, which simplifies an update strategy and has less overhead. 

## Application
If you want to show the dynamic symbols content, use it together with `ToString[expr, StandardForm]`

```mathematica
EventHandler[InputRange[1,10,1,1], Function[n,
  series = ToString[Series[Sin[x], {x,0,n}] // Normal, StandardForm];
]]
EventFire[%, 1];

EditorView[series // Offload]
```

## Supported output forms
- [StandardForm](frontend/Reference/Decorations/StandardForm.md)
- [WLXForm](frontend/Reference/Decorations/WLXForm.md)

## Dev notes
This is used in [InterpretationBox](frontend/Reference/Decorations/InterpretationBox.md) implementation to replace a WL expression using a user-provided WL expression in a code editor.






