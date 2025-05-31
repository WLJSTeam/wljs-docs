---
source: https://reference.wolfram.com/language/ref/Plot3D.html
---

```mathematica
Plot3D[f, {x,xmin,xmax},{y,ymin,ymax}]
```

generates a three-dimensional plot of `f` as a function of `x` and `y`.

or of a list of function

```mathematica
Plot3D[{f1, f2, ...}, {x,xmin,xmax},{y,ymin,ymax}]
```

## Example
Plot functions with branch cuts

```mathematica
Plot3D[Im[ArcSin[(x + I y)^4]], {x, -2, 2}, {y, -2, 2}, 
	Mesh -> None, 
	PlotStyle -> Directive[Yellow, Opacity[0.8]], 
	ExclusionsStyle -> {None, Red}
]
```

<Wl >{`Plot3D[Im[ArcSin[(x + I y)^4]], {x, -2, 2}, {y, -2, 2}, Mesh -> None, PlotStyle -> Directive[Yellow, Specularity[White, 20], Opacity[0.8]], ExclusionsStyle -> {None, Red}]`}</Wl>

Other examples

```mathematica
NDSolve[{D[u[t, x], t] == D[u[t, x], x, x], u[0, x] == 0, u[t, 0] == Sin[t], u[t, 5] == 0}, u, {t, 0, 10}, {x, 0, 5}]; 

Plot3D[Evaluate[u[t, x] /. %], {t, 0, 10}, {x, 0, 5}, PlotRange -> All, ColorFunction -> "SunsetColors"]
```

<Wl >{`Module[{uuu, sol, x, t}, sol = NDSolve[{D[uu[t, x], t] == D[uu[t, x], x, x], uu[0, x] == 0, uu[t, 0] == Sin[t], uu[t, 5] == 0}, uu, {t, 0, 10}, {x, 0, 5}]; Plot3D[Evaluate[uu[t, x] /. sol], {t, 0, 10}, {x, 0, 5}, PlotRange -> All, ColorFunction -> "SunsetColors"]]`}</Wl>