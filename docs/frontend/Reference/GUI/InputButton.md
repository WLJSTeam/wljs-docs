---
env:
  - Wolfram Kernel
origin: https://github.com/JerryI/wljs-inputs

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

## Possible issues
Grouping two buttons using [InputGroup](frontend/Reference/GUI/InputGroup.md) 

```mathematica
group = InputGroup[{
	InputButton[],
	InputButton[]
}] 

EventHandler[group, Print];
```

You __will always see__ `{True, True}`. This is because buttons are stateless, and [InputGroup](frontend/Reference/GUI/InputGroup.md) records the last state of each. There are different ways to differentiate between them

#### Option 1A
By patterns
```mathematica
group = InputGroup[{
	InputButton["Topic"->"A"],
	InputButton["Topic"->"B"]
}] 

EventHandler[group, {
	topic_ :> Function[Null, Print[topic]]
}];
```

#### Option 1B
Using custom wrapper and separate by patterns

```mathematica
ev = EventObject[];

{
	InputButton[ev, "Topic"->"A"],
	InputButton[ev, "Topic"->"B"]
}// Column // Panel


EventHandler[ev, {
	any_ :> Function[Null, Print[any]]
}];
```

#### Option 2
Connect separately

```mathematica
{
	b1 = InputButton[],
	b2 = InputButton[]
}// Column // Panel


EventHandler[b1, (Print["A"])&];
EventHandler[b2, (Print["B"])&];
```




## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
- [WLXForm](frontend/Reference/Formatting/WLXForm.md)