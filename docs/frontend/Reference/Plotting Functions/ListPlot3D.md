---
origin: https://reference.wolfram.com/language/ref/ListPlot3D.html
update: false
---
```mathematica
ListPlot3D[{{f11,…,f1n},…,{fm1,…,fmn}}]
```

generates a surface with height `fij` at position `{j,i}`

```mathematica
ListPlot3D[{{x1,y1,f1},...,{x_k,y_k,f_k}}]
```

generates a surface with height `fi` at position `{xi,yi}`.

```mathematica
ListPlot3D[{data1,data2,…}]
```

plots the surfaces corresponding to each of the `data_i`.


## Examples

```mathematica
ListPlot3D[{{1, 1, 1, 1}, {1, 2, 1, 2}, {1, 1, 3, 1}, {1, 2, 1, 4}}, Mesh -> All]
```

<Wl >{`ListPlot3D[{{1, 1, 1, 1}, {1, 2, 1, 2}, {1, 1, 3, 1}, {1, 2, 1, 4}}, Mesh -> All]`}</Wl>

or an interpolated surface

```mathematica
data = Table[Sin[j^2 + i], {i, 0, Pi, Pi/5}, {j, 0, Pi, Pi/5}];

ListPlot3D[data, Mesh -> None, InterpolationOrder -> 3, 
 ColorFunction -> "SouthwestColors", BoxRatios->{1,1,0.5}]
```

<Wl >{`data = Table[Sin[j^2 + i], {i, 0, Pi, Pi/5}, {j, 0, Pi, Pi/5}];ListPlot3D[data, Mesh -> None, InterpolationOrder -> 3, ColorFunction -> "SouthwestColors", BoxRatios->{1,1,0.5}]`}</Wl>

