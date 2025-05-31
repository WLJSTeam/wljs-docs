---
draft: false
---
:::warning
Raster graphics are not well optimized in the WLJS Notebook at the moment. Consider using them as sparingly as possible.
:::

All raster graphics are rendered using the [Image](frontend/Reference/Image/Image.md) expression, which also supports updates via the [Offload](frontend/Reference/Interpreter/Offload.md) expression.

Let us start with a practical example — __image distortion__

![](./../../../Pasted%20image%2020240514150707.png)
*Yandex Open Source Jam 2024*

Or this one:

![](./../../../Pasted%20image%2020240514150822.png)
*[Stack Overflow](https://stackoverflow.com/questions/36174431/how-to-make-a-wave-warp-effect-in-shader) OpenGL*

### Implementation

First, let's take an example image. Drag and drop it into the editor:

![](./../../../Screenshot%202024-06-16%20at%2011.17.10.png)

Then extract the raw data from it as a sequence of bytes:

```mathematica
img = ImageData[(* image *), "Byte"];
```

Now we can apply a mapping function to it, which stretches and shrinks pixels periodically:

```mathematica
shader = Compile[{{img, _Integer, 3}, {phase, _Real}}, Module[{iter},
  With[{
    ysize = Length[img],
    xsize = Length[img[[1]]]
  },
    Table[
      iter = 1.0;
      Table[With[{
        yr = y,
        xr = If[# < 1, 1, If[# > xsize, xsize, #]] &@ Round[iter]
      },

        iter = iter + (1.0 + 0.7 Sin[6 Pi x / xsize + phase]);

        img[[yr, xr]]
        
      ], {x, xsize}], {y, ysize}]
  ]
]];
```

Here, we use `Compile` to speed up the process since only real arrays are involved. We do not apply any antialiasing filters; it works in the nearest neighbors approximation. Let's check the result using the original `Byte` encoding:

```mathematica
Image[NumericArray[shader[img, 0], "UnsignedInteger8"], "Byte"] 
```

![](./../../../Screenshot%202024-05-14%20at%2015.18.05.png)

:::tip
Always provide a typed numeric array as the first argument to [Image](frontend/Reference/Image/Image.md). By default, it assumes a `Real` format for pixel data. Therefore, we explicitly specify the encoding by passing `Byte` as the second argument.

The most efficient way is to use:
- `UnsignedInteger8` : `Byte`
:::

Since performance is great with raster graphics, we can rely on fixed time intervals while animating, or use a straightforward `Do` loop:

```mathematica title="cell 1"
imageFrame = NumericArray[img, "UnsignedInteger8"];
Image[imageFrame // Offload, "Byte"]
```

```mathematica title="cell 2"
Do[
  imageFrame = NumericArray[shader[img, angle], "UnsignedInteger8"];
, {angle, 0, 4Pi, 2Pi/30.0}]
```

The resulting animation:

![](./../../../goood-ezgif.com-optimize.gif)

#### Alternative way
Using [AnimationFrameListener](frontend/Reference/Graphics/AnimationFrameListener.md) one can get rid of any timers and animate as fast as system allows

```mathematica title="cell 1"
frameEvent = CreateUUID[];
angle = 0.;

EventHandler[frameEvent, Function[Null,
	imageFrame = NumericArray[shader[img, angle], "UnsignedInteger8"];
	angle += 2Pi/30.0;
]];

EventFire[frameEvent, True];

Image[imageFrame // Offload, "Byte", Epilog->{
	AnimationFrameListener[imageFrame // Offload, "Frame"->frameEvent]
}]
```

This way it is also suitable for [Dynamic HTML](frontend/Exporting/Dynamic%20HTML.md)
