---
env:
  - Wolfram Kernel
origin: https://github.com/JerryI/wljs-inputs

package: wljs-inputs
source: https://github.com/JerryI/wljs-inputs/blob/dev/src/Kernel.wl
---
```mathematica
InputSelect[{expr1_ -> name1_String, expr2_ -> name2_String}, defaultExpr_] _EventObject
```

represents a select field with different choices

or

```mathematica
InputSelect[{val1_, val2_}, defaultval_] _EventObject
```

is also valid

## Event generation
Emits corresponding `expr` based on user's choice.

## Options
### `"Label"`
Adds a label 
### `"Topic"`
Specifies which topic or pattern of an event is used

## Chaining events
One can reuse another event

```mathematica
InputSelect[event_EventObject, rest__]
```

## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
- [WLXForm](frontend/Reference/Formatting/WLXForm.md)