---
env:
  - Wolfram Kernel
origin: Wolfram Language
source:
---
Generates a raster [`Image`](frontend/Reference/Image/Image.md) with a given size and distribution. Only `RGB` space is supported. The maximum value __is limited to `255` for each channel__

```mathematica
RandomImage[255, {100, 100}, ColorSpace -> "RGB"]
```

:::warning
3D features are not supported
:::