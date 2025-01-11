---
env:
  - Wolfram Kernel
origin: https://reference.wolfram.com/language/ref/ContourPlot3D.html?q=ContourPlot3D
---
```mathematica
ContourPlot3D[f, {x, xmin, xmax}, {y...}, {z...}]
```
produces a three-dimensional contour plot of f as a function of x, y, and z.

```mathematica
ContourPlot3D[f==g, {x, xmin, xmax}, {y...}, {z...}]
```
produces surface that satisfies `f==g`.

## Example

```mathematica
ContourPlot3D[x^3 + y^2 - z^2, {x, -2, 2}, {y, -2, 2}, {z, -2, 2}]
```

<Wl >{`ContourPlot3D[x^3 + y^2 - z^2, {x, -2, 2}, {y, -2, 2}, {z, -2, 2}]`}</Wl>

