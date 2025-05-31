---
env:
  - WLJS
package: wljs-graphics-d3
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/kernel.js
draft: false
---
```mathematica
GraphicsComplex[{pt1, pt2, ...}, data]
```

represents a graphics complex in which coordinates given as integers $i$ in graphics primitives in `data` are taken to be `pti`.

:::info
`GraphicsComplex` provides faster rendering for a complex primitives with many vertices and colors. It looks similar to an interfaces of OpenGL or other graphics framework, where buffers with coordinates are provided separately from the object instances.
:::

:::warning
Limited functionality
:::

## Supported primitives
### `Line`

```mathematica
GraphicsComplex[{{0,0}, {1,0}, {1,1}}, Line[{{1,2,3}}]] // Graphics
```

vertex colors are not supported

### `Polygon`
:::note
Uses WebGL graphics acceleration for rendering
:::

```mathematica
GraphicsComplex[{{0,0}, {1,0}, {1,1}}, Polygon[{1,2,3}], "VertexColors"->{{1,1,0}, {0,1,1}, {0,1,1}}] // Graphics
```


### `Point`
:::note
Uses WebGL graphics acceleration for rendering
:::

```mathematica
GraphicsComplex[{{0,0}, {1,0}, {1,1}}, Point[{{1,2,3}}]] // Graphics
```

or with colors

```mathematica
GraphicsComplex[{{0,0}, {1,0}, {1,1}}, Point[{{1,2,3}}], "VertexColors"->{{1,0,0}, {0,1,0}, {0,0,1}}] // Graphics
```

### `Arrow`

### `Disk`

