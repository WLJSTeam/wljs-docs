---
env:
  - WLJS
package: wljs-graphics-d3
update: true
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/kernel.js
---
Represents a raster image and plots the list of pixel's colors to a canvas used in notebooks

```mathematica
Image[{row1_List, row2_List..} | n_NumericArray, encoding_:"Real32"]
```

where each `row` is a list of pixel colors. It it better to pass `NumericArray` for the best performance.

The following `encoding` is supported

- `"Real32"` each pixel is encoded using a real value from 0 up-to 1. Corresponding `NumericArray` format is `"Real32"` (if applicable).
- `"Byte"` each pixel is encoded using integer value from 0 up-to 255. Corresponding `NumericArray` format is `"UnsignedInteger8"`.
- `"Bit"` each pixel is either `1` or `0` (integer). Corresponding `NumericArray` is `"UnsignedInteger8"`

__The first two__ can be divided into groups by pixel format
- `{R,G,B}` - each pixel is a list of numbers
- `{R,G}` - experimental mode with just 2 colors
- `{R,G,B,A}` - each pixel is a list of numbers
- `I` grayscale - each pixel is a single number

## Options
### `Magnification`
Magnifies by an integer factor original pixels provided by an array
### `ImageSize`
Acts similar to `Magnification` and scales an image to match the width of provided size
### `Antialiasing`
By the default is `True`, which forces to use bilinear approximation when an image is shown scaled.

### `Epilog`
The same as for `Graphics`, can be used to embed [AnimationFrameListener](frontend/Reference/Graphics/AnimationFrameListener.md). See examples below

## Examples

### Direct
Show multiple iterations of a cellular automaton as a binary image
```mathematica
Image[CellularAutomaton[30, {{1}, 0}, 40], Magnification->4]
```

<Wl >{`Image[CellularAutomaton[30, {{1}, 0}, 40]]`}</Wl>

A random noise
```mathematica
Image[Table[RandomInteger[{0,1}], {i, 200}, {j, 350}]]
```

adding a color

```mathematica
Image[Table[RandomInteger[{0,255}, 3], {i, 200}, {j, 350}], "Byte"]
```

<Wl >{`Image[Table[RandomInteger[{0,255}, 3], {i, 200}, {j, 350}]]`}</Wl>


:::tip
Use `NumericArray` to provide and handle pixel data. It has to be a nested list of lists as usual. There is a following correspondence.  `Byte` and `UnsignedInteger8` combo is the most efficient.
::

### Indirect
One can also use `Rasterize` function to show any expressions as an image

```mathematica
x + y // Rasterize
```

<Wl >{`x + y // Rasterize`}</Wl>


## Notes on DPR
`Image` is pixel-perfect. Depending on the pixel-density of the device the visible image size might differ from machine to machine. 

To compensate for than, one can request DPR and calculate magnification in-place

```mathematica
Image[img_Image, Magnification->Offload[Graphics`DPR[]]]
```

Here ``Graphics`DPR `` will be executed on the frontend (WLJS Interpreter), there is no need in revaluation. 

## Dynamics
It does support dynamic variables. 

### Clouds
Gaussian clouds (Perlin noise)

```mathematica
n = 128;
k2 = Outer[Plus, #, #] &[RotateRight[N@Range[-n, n - 1, 2]/n, n/2]^2];

spectrum = With[{d := RandomReal[NormalDistribution[], {n, n}]},
   (1/n) (d + I d)/(0.002 + k2)]; 
spectrum[[1, 1]] *= 0;

im[p_] := Clip[Re[InverseFourier[spectrum Exp[I p]]], {0, ∞}]^0.5

p0 = p = Sqrt[k2];
```

Animation

```mathematica
Module[{buffer = im[p0 += p], frame = CreateUUID[]},
  EventHandler[frame, (buffer = im[p0 += p])&];
  
  Image[buffer // Offload, 
    Magnification->2, 
    Epilog->AnimationFrameListener[buffer // Offload, "Event"->frame]
  ]
]
```


### GOL

```mathematica
Puffer = {{1, 4}, {2, 5}, {3, 1}, {3, 5}, {4, 2}, {4, 3}, {4, 4}, {4,
     5}, {8, 1}, {9, 2}, {9, 3}, {10, 3}, {11, 3}, {12, 2}, {15, 1}, {15,
     4}, {16, 5}, {17, 1}, {17, 5}, {18, 2}, {18, 3}, {18, 4}, {18, 5}};

board = NumericArray[
  CellularAutomaton["GameOfLife", {SparseArray[Puffer
     -> 1], 0}, {{500}}] // First
, "UnsignedInteger8"];

Image[board // Offload, "Bit", Magnification -> 3, Antialiasing->False]
```

and now we can run the simulation with a desired speed

```mathematica
task = SetInterval[board = NumericArray[CellularAutomaton["GameOfLife",
     board // Normal, {{1}}] // First, "UnsignedInteger8"], 50];

SetTimeout[TaskRemove[task], 5000];
```

See more examples in [Raster animation](frontend/Advanced/Dynamics/Raster%20animation.md)

## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
- [WLXForm](frontend/Reference/Formatting/WLXForm.md)