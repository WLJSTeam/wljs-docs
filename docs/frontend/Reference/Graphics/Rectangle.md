---
env:
  - WLJS
update: true
package: wljs-graphics-d3
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/kernel.js
---
```mathematica
Rectangle[{xmin_, ymin_}, {xmax_, ymax_}, opts___]
```

represents a basic rectangle

```mathematica
Graphics[{Red, Rectangle[{0, 0}], Blue, Rectangle[{0.5, 0.5}]}]
```

<Wl >{`Graphics[{Red, Rectangle[{0, 0}], Blue, Rectangle[{0.5, 0.5}]}]`}</Wl>


## Options
### `RoundingRadius`
Accepts `_Real | _Integer` or a list of values for X and Y rounding.  By the default is `0`. It uses printer points.


## Parameters
### `RGBColor`
filling color

### `EdgeForm`
stroke color

### `Opacity`
global opacity of an object

## Methods

### `Area`
Calculates total area (symbolically as well)

```mathematica
Area[Rectangle[{x1, y1}, {x2, y2}]]
```

### `RegionCentroid`

```mathematica
RegionCentroid[Rectangle[{x1, y1}, {x2, y2}]]
```

### `EventHandler`
One can listen to a several events produced by this primitive using [`EventHandler`](frontend/Reference/Misc/Events.md#`EventHandler`)

```mathematica
EventHandler[t_Rectangle, {event_ -> handler_, ...}]
```

where `event` can be
- `"mousemove"` detects and sends coordinates of a mouse, when it is over this element 
- `"drag"` makes primitive draggable and emits coordinates
- `"zoom"` detects zoom / mouse-wheel
- `"click"` detects mouse clicks

:::tip
See more in [Mouse and keyboard](frontend/Advanced/Events%20system/Mouse%20and%20keyboard.md)
:::

## Dynamics
It fully supports dynamics. Use [Offload](frontend/Reference/Interpreter/Offload.md) on coordinates.

## Example
A simple bar chart

```mathematica
data = RandomReal[{3, 10}, {10, 2}];

Graphics[{
	EdgeForm[Black], Blue, 
	Table[{Blue, Rectangle[{i - .4, 0}, {i, data[[i, 1]]}], 
	Red, Rectangle[{i + .4, 0}, {i, data[[i, 2]]}]}, {i, 10}]
}, Frame -> True]
```

<Wl >{`data = RandomReal[{3, 10}, {10, 2}];Graphics[{EdgeForm[Black], Blue, Table[{Blue, Rectangle[{i - .4, 0}, {i, data[[i, 1]]}], Red, Rectangle[{i + .4, 0}, {i, data[[i, 2]]}]}, {i, 10}]}, Frame -> True]`}</Wl>
