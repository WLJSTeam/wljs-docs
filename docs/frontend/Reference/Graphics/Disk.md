---
env:
  - WLJS
package: wljs-graphics-d3
update: true
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/kernel.js
---
draws a filled [Circle](frontend/Reference/Graphics/Circle.md)

```mathematica
Disk[{x_, y_}, r_]
```

or

```mathematica
Disk[{x_,y_}, r_, {start_, finish_}]
```

where `start` and `finish` are corresponding angles of a sector (used to make pie diagrams)

for example

```mathematica
Graphics[Table[Disk[RandomReal[{-1,1}, 2], 1], {i,10}]]
```

<Wl >{`Graphics[Table[Disk[RandomReal[{-1,1}, 2], 1], {i,10}]]`}</Wl>
## Dynamics
Fully support for a radius and coordinates. Use [Offload](frontend/Reference/Interpreter/Offload.md)

## Parameters

### `RGBColor`
Color of the filling and stroke (if `EdgeForm` is not specified)

```mathematica
{Blue, Disk[{0,0}, 1]}
```

<Wl >{`Graphics[{Blue, Disk[{0,0}, 1]}]`}</Wl>


### `EdgeForm`
Specifies the color of a stroke 

```mathematica
{EdgeForm[Red], Blue, Disk[{0,0}, 1]}
```

<Wl >{`Graphics[{EdgeForm[Red], Blue, Disk[{0,0}, 1]}]`}</Wl>


### `Opacity`
Defines opacity for a primitive (see [[frontend/Reference/Graphics/Opacity]])

```mathematica
{Opacity[0.5], Red, Disk[{-0.5,0}, 1], Blue, Disk[{0.5,0}, 1]}
```

<Wl >{`Graphics[{Opacity[0.5], Red, Disk[{-0.5,0}, 1], Blue, Disk[{0.5,0}, 1]}]`}</Wl>


## Methods
### `EventHandler`
One can listen to a several events produced by this primitive using [`EventHandler`](frontend/Reference/Misc/Events.md#`EventHandler`)

```mathematica
EventHandler[t_Disk, {event_ -> handler_, ...}]
```

where `event` can be
- `"mousemove"` detects and sends coordinates of a mouse, when it is over this element 
- `"drag"` makes primitive draggable and emits coordinates
- `"zoom"` detects zoom / mouse-wheel
- `"click"` detects mouse clicks

:::tip
See more in [Mouse and keyboard](frontend/Advanced/Events%20system/Mouse%20and%20keyboard.md)
:::
