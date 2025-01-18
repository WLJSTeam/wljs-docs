---
env:
  - Wolfram Kernel
origin: https://github.com/JerryI/wljs-inputs
source: https://github.com/JerryI/wljs-inputs/blob/dev/src/Kernel.wl
package: wljs-inputs
context: Notebook`Kernel`Inputs`
---
```mathematica
InputText[initial_String, opts___] _EventObject
```

represents an input-text field and returns [`EventObject`](frontend/Reference/Misc/Events.md#`EventObject`)

:::tip
For dynamic read-only indication use [TextView](frontend/Reference/GUI/TextView.md)
:::

## Event generation
Every-time user changes the content, an event __in a form of string__ will be generated
```mathematica
"<current string>"
```

## Options
### `"Label"`
adds a label at the left side to the input text field

### `"Placeholder"`
Text placeholder

### `"Description"`
adds description field to a widget

### `ImageSize`
sets the width in pixels

### `"Topic"`
Specifies which topic or pattern of an event is used

```mathematica
"Topic" -> name_String
```
emits `name` for each time when user types

```mathematica
"Topic" -> {oninput_String, onchange_String}
```
emits `oninput` when any changes occur, while `onchange` is __emitted after__ the users leaves the field

## Example
A simple text input

```mathematica
text = InputText["Hi"]
EventHandler[text, Print];
```

## Chaining events
One can reuse another event

```mathematica
InputText[event_EventObject, rest__]
```


## Dev notes
This is a wrapper for [TextView](frontend/Reference/GUI/TextView.md) view-component

## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
- [WLXForm](frontend/Reference/Formatting/WLXForm.md)