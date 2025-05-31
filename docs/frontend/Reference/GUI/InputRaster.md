---
env:
  - Wolfram Kernel

package: wljs-inputs
origin: https://github.com/JerryI/wljs-inputs
---
provides a free-drawing 2D input

```mathematica
InputRaster[opts___] _EventObject
```

provides a free-drawing over an image

```mathematica
InputRaster[img_Image, opts___] _EventObject
```

## Event generation
Fires a single event on any changes on canvas with [Image](frontend/Reference/Image/Image.md) as a payload. For example

```mathematica
bufferImage = ImageData[ConstantImage[{0,0,0,0}, {350,350}], "Byte"];

EventHandler[InputRaster[ImageSize->{350,350}], Function[img,
  bufferImage = ImageData[img, "Byte"];
]]

Image[bufferImage // Offload, "Byte"]
```

## Chaining events
One can reuse another event

```mathematica
InputRaster[event_EventObject, rest__]
```

## Options
### `ImageSize`
If no image or overlay image is provided, one can specify a size for blank canvas. By the default is `300`

### `"OverlayImage"`
Places a semitransparent image over the canvas. It comes handy when working with masks for images

### `"Topic"`
Specifies which topic (or pattern) of an event is used. By the default is `"Default"`

### `"AllowUpdateWhileDrawing"`
By the default is `False`. Sends new image on every change.




