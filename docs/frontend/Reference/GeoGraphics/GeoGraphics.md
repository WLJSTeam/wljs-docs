---
env:
  - Wolfram Kernel
---
:::warning
Limited support. Outputs only rasterized images
:::

```mathematica
GeoGraphics[primitives_, opts___]
```

represents a two-dimensional geographical image (similar to [Graphics](frontend/Reference/Graphics/Graphics.md))

For example
```mathematica @
GeoGraphics[{EdgeForm[Black], FaceForm[Red], Polygon[(*VB[*)(Entity["Country", "Italy"])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWnMIB4vkAjLTC13SU3OL0osyS8KZgOKuOaVZJZUBrMDmc75pXklRZXBrEC2Z0liTiUAdDwSUA=="*)(*]VB*)]}]
```

![](./../../../Screenshot%202025-03-29%20at%2017.27.13.png)