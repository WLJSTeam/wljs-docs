---
env:
  - Wolfram Kernel
origin: https://github.com/JerryI/wljs-inputs
context: Notebook`Kernel`Inputs`
package: wljs-inputs
source: https://github.com/JerryI/wljs-inputs/blob/dev/src/Kernel.wl
---
```mathematica
InputCheckbox[initial_Boolean:False, opts___] _EventObject
```

represents a UI element - checkbox or a toggle switch

## Event generation
Emits `True` or `False` based on its state

## Options
### `"Label"`
A text label for an element

### `"Description"`
A description label for an element

### `"Topic"`
The default topic/pattern is `"Default"`. Specifies an event-pattern used on emitting (see more on [`EventFire`](frontend/Reference/Misc/Events.md#`EventFire`) patterns topics)

## Application
A basic GUI element

```mathematica
tg = InputCheckbox[False];
EventHandler[tg, Print]
```

## Chaining events
One can reuse another event

```mathematica
InputCheckbox[event_EventObject, rest__]
```



## TODO
Developers notes
- [ ] Use `server.ask()` method for restoring the original state 


## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
- [WLXForm](frontend/Reference/Formatting/WLXForm.md)