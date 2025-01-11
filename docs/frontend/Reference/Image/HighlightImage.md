Combines raster [Image](frontend/Reference/Image/Image.md) with vector [Graphics](frontend/Reference/Graphics/Graphics.md) in order to annotate, overlay or highlight certain features

```mathematica
HighlightImage[img_Image, roi_]
```

where `roi` can be

- `{{x1,y1}, ...}` list of image positions (drawn as points)
- `g_Graphics` a graphics object or list of graphics primitives
- `mask_Image` a mask image

The following form is also valid

```mathematica
HighlightImage[img_Image, {style__, roi_}]
```

where `style` accepts the same directives as [Style](frontend/Reference/Graphics/Style.md) or graphics.
There are additional `style` rules

- `"Blur", {"Blur", r}`


:::warning
There is a known bug on HI-DPI screens and specific types of images. Apply this patch to your image.

```mathematica
img = Image[img, "ImageResolution"->Automatic];
```

:::

## Examples
Highlight features

```mathematica
i = (* image *)
HighlightImage[i, ImageCorners[i, 1, .001, 5]]
```

![](./../../../Screenshot%202024-11-23%20at%2015.41.55.png)

Highlight multiple regions of interest
```mathematica
i = (* image *);

HighlightImage[i, {Blue, EdgeDetect[i], Red, 
  ImageLines[GradientFilter[i, 2], MaxFeatures -> 10], Green, 
  ImageKeypoints[i, MaxFeatures -> 20]}]
```

![](./../../../Screenshot%202024-11-23%20at%2015.50.47.png)



