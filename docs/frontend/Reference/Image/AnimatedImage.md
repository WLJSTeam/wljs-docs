Represents a collection of [Image](frontend/Reference/Image/Image.md) merged into an animation

```mathematica
AnimatedImage[{__Image}, opts___]
```

```mathematica
AnimatedImage[File[_String], opts___]
```

## Options
### `FrameRate`
By the default is `12`

## Constructor
### From GIF animation
Import `.gif` as usual and supply to `AnimatedImage` as a list

```mathematica
AnimatedImage[File["yourGif.gif"], FrameRate->24]
```

### From images
Generate raster images

```mathematica
t = Table[
  With[{h = h}, LinearGradientImage[Hue[# + h, .5] &, 50]], {h, 0, 
   1, .1}];

AnimatedImage[t, FrameRate->24]
```

Another example

```mathematica
AnimatedImage[Rasterize[Style[#, 40]] & /@ Range[0, 9], 
 FrameRate -> 6]
```

## Output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
- [WLXForm](frontend/Reference/Formatting/WLXForm.md)
