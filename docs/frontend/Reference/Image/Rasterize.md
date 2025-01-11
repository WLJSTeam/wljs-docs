---
env:
  - Wolfram Kernel
---
```mathematica
Rasterize[expression_, opts___]
```

rasterizes any expression into an [Image](frontend/Reference/Image/Image.md) using frontend as it is rendered in a cell.

:::caution
Requires Desktop App for rasterizing (no available in server mode). It literally takes a screenshot of a specific area.
:::

:::tip
Apply `Rasterize` before exporting expression to an image or video (using `Export`).
:::

## Options
### `"Window"`
By the default it uses [CurrentWindow](frontend/Reference/Frontend%20IO/CurrentWindow.md). 

### `"ExposureTime"`
Sets the time in seconds for possible async processes to settle down on displayed expression before the rasterization. By the default is `1`.

## Application
Can be used to export graphics to raster format try

```mathematica
Rasterize[x+y]
```

And then you can freely export it

```mathematica
Export["image.png", %]
```

