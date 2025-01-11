---
env:
  - Wolfram Kernel
origin: https://github.com/JerryI/wljs-inputs
context: Notebook`Kernel`Inputs`
package: wljs-inputs
source: https://github.com/JerryI/wljs-inputs/blob/dev/src/Kernel.wl
---
```mathematica
InputGroup[events_List | _Association, opts___] _EventObject
```
groups different [event-generators](frontend/Advanced/Events%20system/event-generators.md) such as [InputRange](frontend/Reference/GUI/InputRange.md), [InputButton](frontend/Reference/GUI/InputButton.md) or in general [`EventObject`](frontend/Reference/Misc/Events.md#`EventObject`) into a new `EventObject`

:::info
Please consider to read the full guide [event-generators](frontend/Advanced/Events%20system/event-generators.md)
:::

## Options
### `"Label"`
A text label for an element

### `"Description"`
A description label for an element


## Event generation
Every-time user acts on an inner event-view from a group `events`, it will fire an event and send the data from all event objects keeping the original structure

### Association
```mathematica
group = InputGroup[<|
  "left"->InputRange[0, 10, 1, "Label"->"Range 1"],
  "right"->InputRange[0, 10, 1, "Label"->"Range 2"] 
|>]
EventHandler[group, Print];
```

On each update it generates the data for the handler function in a form
```mathematica
<|"left"->5, "right"->7|>
```

### Arrays
```mathematica
group = InputGroup[{
  InputRange[0, 10, 1, "Label"->"Range 1"],
  InputRange[0, 10, 1, "Label"->"Range 2"],
  InputText["Hi"]
}]
EventHandler[group, Print];
```

the data provided to a handler function `Print` will look like
```mathematica
{5, 7, "Hi"}
```


## Supported output forms
- [StandardForm](frontend/Reference/Decorations/StandardForm.md)
- [WLXForm](frontend/Reference/Decorations/WLXForm.md)