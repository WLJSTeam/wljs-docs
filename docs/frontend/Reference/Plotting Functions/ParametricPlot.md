The same as [Plot](frontend/Reference/Plotting%20Functions/Plot.md), but accepts function generating pairs of `{x,y}`

```mathematica
ParametricPlot[{Sin[t], Cos[t]}Exp[-t], {t, 0, 2Pi}]
```


## Examples
Generate complex parametric plot
```mathematica
ParametricPlot[
 With[{z = u + I v}, {Re[z + 1/z], Im[z + 1/z]}], {u, -1/2, 
  1/2}, {v, -1/2, 1/2}, PlotRange -> 5, Mesh -> Automatic]
```

![](./../../../Screenshot%202025-03-23%20at%2011.42.01.png)
Map a texture to parametric plot
```mathematica @
texture = Image[CellularAutomaton[30, {{1}, 0}, 40], "Bit", Magnification -> 2] // Texture
```
```mathematica @
ParametricPlot[{r Cos[\[Theta]], r Sin[\[Theta]]}, {r, 1, 
  2}, {\[Theta], 0, 2 Pi/3}, PlotRange -> All, Mesh -> 15, PlotStyle->texture]
```

![](./../../../Screenshot%202025-03-23%20at%2011.42.34.png)



## Dynamics
Consider to use [ManipulateParametricPlot](frontend/Reference/Plotting%20Functions/ManipulateParametricPlot.md)  for manipulating parameters of a function in real time