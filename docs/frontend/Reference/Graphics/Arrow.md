---
env:
  - WLJS
update: true
needsContainer: false
virtual: true
origin: https://github.com/JerryI/wljs-graphics-d3/
draft: false
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/kernel.js
package: wljs-graphics-d3
context: JerryI`Notebook`Graphics2D`
numericArray: true
---
Plots an arrow with a fixed head-size from point 1 to point 2

```mathematica
Graphics[{
  Arrow[{{0,0}, {1,1}}]
}]
```

<Wl >{`Graphics[{Arrow[{{0,0}, {1,1}}]}, ImageSize->350]`}</Wl>

:::warning
Does work only with [Graphics](frontend/Reference/Graphics/Graphics.md) (2D). Dynamics is not supported for now
:::

## Dynamics
Fully supports. Use [Offload](frontend/Reference/Interpreter/Offload.md) keyword for that


## Attach to other primitives

### `BezierCurve`
### `Line`

You can wrap it over the corresponding object to attach an arrow-marker to the end
```mathematica
Arrow[Line[...], 0.04]
```

## Options
Not available at the moment

