---
env:
  - Wolfram Kernel
context: Notebook`Kernel`Inputs`
package: wljs-inputs
source: https://github.com/JerryI/wljs-inputs/blob/dev/src/Kernel.wl
---
```mathematica
InputJoystick[] _EventObject
```

creates and instance of 2D manipulator (virtual joystick)

## Event generation
It fires an event with `{x_, y_}` coordinates of a joystick in a range of `[-1,1]` once it has been dragged by a user.

### Helpers
There is helper function to integrate the position, that joystick controls velocity instead of absolute position

```mathematica
InputJoystick`IntegrationHelper[initialValue_:{0,0}, delta_:0.01][callback_Function] _Function
```

for example

```mathematica title="cell 1"
pt = {0.,0.};

handler = InputJoystick`IntegrationHelper[][Function[xy, 
  pt = xy
]];

EventHandler[InputJoystick[], handler]
```

```mathematica title="cell 2"
Graphics[
  {Red, PointSize[0.05], Point[pt // Offload]}
  , PlotRange->{{-1,1}, {-1,1}}
]
```

![](./../../../Joystikc%20video%20to%20gif.gif)

## Chaining events
One can reuse another event

```mathematica
InputJoystick[event_EventObject, rest___]
```


## Options
No options are available


## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
- [WLXForm](frontend/Reference/Formatting/WLXForm.md)