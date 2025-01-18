---
env:
  - Wolfram Kernel
origin: https://github.com/JerryI/wljs-inputs
context: Notebook`Kernel`Inputs`
package: wljs-inputs
source: https://github.com/JerryI/wljs-inputs/blob/dev/src/Kernel.wl
---
```mathematica
InputButton[label_String, opts___] _EventObject
```
creates a button component and returns [`EventObject`](frontend/Reference/Misc/Events.md#`EventObject`)

## Event generation
On-click emits `True` to a handler function assigned


## Options
### `"Class"`
A text string of CSS classes used for customizing a button

### `"Style"`
A text string with CSS styles applied to an element

### `"Topic"`
The default topic/pattern is `"Default"`. Specifies an event-pattern used on emitting (see more on [`EventFire`](frontend/Reference/Misc/Events.md#`EventFire`) patterns topics)


## Application
A basic GUI element

```mathematica
button = InputButton["Click me!"];
EventHandler[button, Print]
```


or click to make sound

```mathematica
EventHandler[InputButton[], Beep]
```


## Chaining events
One can reuse another event when creating a button

```mathematica
InputButton[event_EventObject, label_String, opts___]
```

for example

```mathematica
ev = EventObject[];

InputButton[ev, "Topic"->"Button"]
InputRange[ev, 0,1,0.1, "Topic"->"Slider"]

EventHandler[ev, {
	"Button" -> Beep,
	"Slider" -> Print
}];
```


## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
- [WLXForm](frontend/Reference/Formatting/WLXForm.md)