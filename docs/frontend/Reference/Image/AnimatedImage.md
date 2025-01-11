Represents a collection of [Image](frontend/Reference/Image/Image.md) merged into an animation

```mathematica
AnimatedImage[{__Image}, opts___]
```

## Options
### `FrameRate`
By the default is `25`

## Constructor
### From GIF animation
Import `.gif` as usual and supply to `AnimatedImage` as a list

### From images
Generates raster images and supply to `AnimatedImage`. For examples

```mathematica
AnimatedImage[Rasterize[Style[#, 40]] & /@ Range[0, 9], 
 FrameRate -> 6]
```

