---
env:
  - WLJS
  - Wolfram Kernel

package: wljs-graphics3d-threejs
source: https://github.com/JerryI/Mathematica-ThreeJS-graphics-engine/blob/dev/src/Kernel.wl
---


:::warning
Limited support. Only gray-scale and minimum options. Not possible to combine with `Graphics3D`
:::

```mathematica
Image3D[data_List]
```

represents a 3D image with pixel values given by the 3D array `data`

```mathematica
Image3D[{image1, image2, ...}]
```

creates a 3D image from a list of 2D images.

Image is rendered using **maximum intensity projection** (**MIP**) and shader code developed by [Martin Röhlig](https://observablehq.com/@mroehlig).

## Options
### `ImageSize`

### `Background`

### `BoxRatios`

### `ColorFunction`
#### Possible Values

##### Named Palettes
- `"XRay"`
- `"GrayLevelOpacity"`
- `"Greys"`
- `"OrRd"`

##### Color Scales
- `PuBu`
- `BuPu`
- `Oranges`
- `BuGn`
- `YlOrBr`
- `YlGn`
- `Reds`
- `RdPu`
- `Greens`
- `YlGnBu`
- `Purples`
- `GnBu`
- `Greys`
- `YlOrRd`
- `PuRd`
- `Blues`
- `PuBuGn`
- `Viridis`

##### Diverging Scales
- `Spectral`
- `RdYlGn`
- `RdBu`
- `PiYG`
- `PRGn`
- `RdYlBu`
- `BrBG`
- `RdGy`
- `PuOr`

##### Categorical Palettes
- `Set2`
- `Accent`
- `Set1`
- `Set3`
- `Dark2`
- `Paired`
- `Pastel2`
- `Pastel1`

or one can provide a pure color function similar to `Graphics`, which return color based on the input value from `0` to `1`.

## Examples
Generate one from random numbers

```mathematica
Image3D[RandomReal[1, {5, 10, 10}]]
```

Use example data

```mathematica
ExampleData[{"TestImage3D", "CTengine"}]
```

or MRT of a brain

```mathematica
Image3D[ExampleData[{"TestImage3D","MRbrain"}], BoxRatios->{1,1,1/1.65}, ColorFunction->"XRay"]
```