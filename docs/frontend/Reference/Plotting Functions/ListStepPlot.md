---
env:
  - Wolfram Kernel
update: 
needsContainer: 
registered: true
origin: https://reference.wolfram.com/language/ref/ListStepPlot.html
---
```mathematica
ListStepPlot[{y1, y2, ...}]
```
plots the values $y_1$, $y_2$ ... in steps 
## Examples
Using $x$ and $y$ coordinates
```mathematica
ListStepPlot[Table[{Prime[n], EulerPhi[n]}, {n, 50}]]
```

<Wl >{`ListStepPlot[Table[{Prime[n], EulerPhi[n]}, {n, 50}], ImageSize->500]`}</Wl>