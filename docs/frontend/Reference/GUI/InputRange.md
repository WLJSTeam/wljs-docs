---
env:
  - Wolfram Kernel
origin: https://github.com/JerryI/wljs-inputs

package: wljs-inputs
source: https://github.com/JerryI/wljs-inputs/blob/dev/src/Kernel.wl
---
```mathematica
InputRange[min_, max_, step_:1, initial_:(min+max)/2, opts___] _EventObject
```
creates a basic combo of a slider and numerical input field and returns [`EventObject`](frontend/Reference/Misc/Events.md#`EventObject`)

## Event generation
Every-time user drags a slider, an event __in a form of number__ will be generated
```mathematica
slider = InputRange[0,1,0.1];
EventHandler[slider, Function[data,
	Print[StringTemplate["`` is a number"][data]]
]];
slider
```


:::info
On MacOS devices it provides a haptic feedback when dragged
:::


## Options
### `"Label"`
Adds a label to a slider

```mathematica
slider = InputRange[0, 1, 0.1, "Label"->"Slider"]
```

### `"Topic"`
Specifies which topic or pattern of an event is used

```mathematica
"Topic" -> name_String
```
emits `name` for each time when user drags a slider

```mathematica
"Topic" -> {oninput_String, onchange_String}
```
emits `oninput` when any changes occur, while `onchange` is __emitted after__ the users action. `Null` value will suppress event generation, i.e. to make `onchange` only slider

```mathematica
"Topic" -> {Null, "Default"}
```

### `"TrackedExpression"`
Adds expression to track (usually a symbol) and update the slider position

```mathematica
var = 0.3;
EventHandler[InputRange[0,2,0.1, var, "TrackedExpression"->Offload[var], Print]
```

Now you can overwrite slider position by setting

```mathematica
var = 0.6;
```

:::note
Your slider effectively acquires an initialization value because of tracked expression 
:::

## Chaining events
One can reuse another event for a new element

```mathematica
InputRange[event_EventObject, min_, max_, step_:1, initial_:(min+max)/2, opts___]
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


## Applications
Control properties using knob

```mathematica
EventHandler[InputRange[0,1,0.1], Function[data, pos = data]];
% 
% // EventFire;
Graphics[Rectangle[{-1,0}, {1, Offload[pos]}]]
```

## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
- [WLXForm](frontend/Reference/Formatting/WLXForm.md)