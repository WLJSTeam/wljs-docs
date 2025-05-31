---
env:
  - Wolfram Kernel
update: false
virtual: 
registered: true
---
A Swiss knife for displaying 2D data

```mathematica
Plot[expr_, {variable, min, max, step}, opts__]
```

has `HoldFirst` attribute. See the list of supported options (`opts`) down below
## Options
### `PlotStyle` 
Works as in Mathematica, i.e. per element in `expr` array, supports color, opacity and etc

```mathematica
Plot[Table[x^y, {y, 6}]//Evaluate, {x, 0,1}, PlotStyle->Table[Blend[{Red, Blue}, i/6], {i, 6}]]
```

<Wl >{`Plot[Table[x^y, {y, 6}]//Evaluate, {x, 0,1}, PlotStyle->Table[Blend[{Red, Blue}, i/6], {i, 6}], ImageSize->500]`}</Wl>

### `AxesLabel`
Place labels on your axes
```mathematica
Plot[Sinc[x], {x, 0, 10}, AxesLabel -> {"x", "Sinc[x]"}]
```

<Wl >{`Plot[Sinc[x], {x, 0, 10}, AxesLabel -> {"x", "Sinc[x]"}, ImageSize->500]`}</Wl>

Labels __accepts only strings__ or numbers unlike Mathematica, where you can put everything. 

Since it is translated into [`Text`](frontend/Reference/Graphics/Text.md), one can use sort of TeX math input

```mathematica
Plot[PDF[NormalDistribution[0, 1], x], {x, -10, 10}, AxesLabel -> {"wavenumber (cm^{-1})", "absorption \\alpha"}, PlotRange->Full]
```

<Wl >{`Plot[PDF[NormalDistribution[0, 1], x], {x, -10, 10}, AxesLabel -> {"wavenumber (cm^{-1})", "absorption \\alpha"}, PlotRange->Full, ImageSize->500]`}</Wl>

It also supports absolute positioning using offset

```mathematica
Plot[PDF[NormalDistribution[0, 1], x], {x, -10, 10}, AxesLabel -> {"wavenumber (cm^{-1})", {"absorption \\alpha", {112,0}}}, PlotRange->Full]
```

### `Ticks`
Customize ticks by providing an array of numbers for both axes
```mathematica
Plot[x, {x, 0, 1}, Ticks->{{0, 0.5, 1}, {}}]
```

<Wl >{`Plot[x, {x, 0, 1}, Ticks->{{0, 0.5, 1}, {}}, ImageSize->500]`}</Wl>

Or by providing as pairs `{Number, String}` one can specify the displayed text
```mathematica
Plot[x, {x, 0, 1}, Ticks->{{{0, "Zero"}, {0.5, "Half"}, {1,"One"}}, {}}]
```

<Wl >{`Plot[x, {x, 0, 1}, Ticks->{{{0, "Zero"}, {0.5, "Half"}, {1,"One"}}, {}}, ImageSize->500]`}</Wl>

### `Controls` 💛
This is more an option for [Graphics](frontend/Reference/Graphics/Graphics.md), but with a bit of a hacking it can be used here as well. The features __allows to pan and zoom your plots__, that was never possible in Mathematica

```mathematica
Plot[Sin[1/x], {x, 0.001, 0.1}, MaxRecursion->1];
Insert[%, Controls->True, {2,-1}]
```

<Wl >{`Insert[Plot[Sin[1/x], {x, 0.001, 0.1}, MaxRecursion->1, ImageSize->500], Controls->True, {2,-1}]`}</Wl>

*Try to use your mouse here*

### `Frame`
Turns plot into the journals-like styled graph. In general it has much more options to customize the look

```mathematica
Plot[x, {x, 0, 1}, Frame->True]
```

<Wl >{`Plot[x, {x, 0, 1}, Frame->True, ImageSize->500]`}</Wl>

#### `FrameTicks`
The same as [`Ticks`](#`Ticks`), but for this regime.

#### `FrameLabel` 
The same as [`AxesLabel`](#`AxesLabel`)
```mathematica
Plot[x, {x, 0, 1}, Frame->True, FrameLabel->{
	"x-axis", 
	"y-axis"
}]
```

<Wl >{`Plot[x, {x, 0, 1}, Frame->True, FrameLabel->{"x-axis", "y-axis"}, ImageSize->500]`}</Wl>

one can specify an absolute offset for a label by wrapping it into a list

```mathematica
Plot[x, {x, 0, 1}, Frame->True, FrameLabel->{
	"x-axis", 
	{"y-axis", {0,50}}
}]
```

#### `FrameStyle`
Affects the style of [`FrameLabels`](#`FrameLabels`). Use `Directive` for changing the style
```mathematica
Plot[x, {x, 0, 1}, Frame->True, FrameLabel->{"x-axis", "y-axis"}, FrameStyle->Directive[FontSize->16]]
```

<Wl >{`Plot[x, {x, 0, 1}, Frame->True, FrameLabel->{"x-axis", "y-axis"}, FrameStyle->Directive[FontSize->16], ImageSize->500]`}</Wl>

#### `FrameTicksStyle`
Affects the style of [`FrameTicks`](#`FrameTicks`)
```mathematica
Plot[x, {x, 0, 1}, Frame->True, FrameLabel->{"x-axis", "y-axis"}, FrameTicksStyle->Directive[FontSize->16]]
```

<Wl >{`Plot[x, {x, 0, 1}, Frame->True, FrameLabel->{"x-axis", "y-axis"}, FrameTicksStyle->Directive[FontSize->16], ImageSize->500]`}</Wl>

#### `TickLabels`
:::info
Since `Plot` options are hardcoded in WL core, we cannot add new options, however using trick with `Insert` any values can be provided to the resulting `Graphics` expression
:::
To remove unnecessary ticks, use
```mathematica
Plot[x, {x, 0, 1}, Frame->True];
Insert[%, "TickLabels"->{{True, False}, {True, False}}, {2,-1}]
```

<Wl >{`Insert[Plot[x, {x, 0, 1}, Frame->True, ImageSize->500], "TickLabels"->{{True, False}, {True, False}}, {2,-1}]`}</Wl>

### `ClippingStyle`
Show the clipped regions like the rest of the curve and colored
```mathematica
Plot[Sin[x]/x^2, {x, -10, 10}, ClippingStyle -> Red]
```

<Wl >{`Plot[Sin[x]/x^2, {x, -10, 10}, ClippingStyle -> Red, ImageSize->500]`}</Wl>


### `Filling`
Fill the area under, over of between curves

```mathematica
Plot[Evaluate[Table[BesselJ[n, x], {n, 4}]], {x, 0, 10}, Filling -> Axis]
```

<Wl >{`Plot[Evaluate[Table[BesselJ[n, x], {n, 4}]], {x, 0, 10}, Filling -> Axis, ImageSize->500]`}</Wl>

Possible options will be
- `Bottom`
- `Top`
- `{1 -> {2}}` from curve 1 to 2


### `Baseline`
Align graphs by the $x$ axis in each plot:
```mathematica
{Plot[Im[Zeta[1/2 + I t]], {t, -20, 20}, BaselinePosition -> Axis], 
 Plot[Re[Zeta[1/2 + I t]], {t, -20, 20}, BaselinePosition -> Axis]} // Row
```

### `Epilog`
Puts any graphics object on top of the data plotted

```mathematica
Plot[Sin[x], {x, 0, 2 Pi}, Epilog -> {PointSize[0.04], Point[{0, 0}], Point[{Pi, 0}], Point[{2 Pi, 0}]}]
```

<Wl >{`Plot[Sin[x], {x, 0, 2 Pi}, Epilog -> {PointSize[0.04], Point[{0, 0}], Point[{Pi, 0}], Point[{2 Pi, 0}]}, ImageSize->500]`}</Wl>

It opens up many possibilities, since it provides low-level access to the `Graphics` canvas.

### `Prolog`
The same as [`Epilog`](#`Epilog`), but acts before plotting the data.

### `ExclusionsStyle`
Use red lines to indicate the vertical asymptotes

```mathematica
Plot[Tan[x], {x, 0, 10}, Exclusions -> {Cos[x] == 0}, 
 ExclusionsStyle -> Red]
```

<Wl >{`Plot[Tan[x], {x, 0, 10}, Exclusions -> {Cos[x] == 0}, 
 ExclusionsStyle -> Red, ImageSize->500]`}</Wl>

### `ImageSize`
A common option for any graphics 
```mathematica
ImageSize -> Width
```
or
```mathematica
ImageSize -> {Width, Height}
```
It uses pixels as units

### `MaxReqursion`
Affects the accuracy of the plot when it comes to the sudden changes of a sampled function
```mathematica
Plot[Sin[1/x], {x, 0.001, 0.1}, MaxRecursion->1]
```

<Wl >{`Plot[Sin[1/x], {x, 0.001, 0.1}, MaxRecursion->1, ImageSize->500]`}</Wl>

The lowest values is `0`

### `Mesh`
Shows sampling points
```mathematica
Plot[Sin[1/x], {x, 0.001, 0.1}, Mesh -> All]
```

<Wl >{`Plot[Sin[1/x], {x, 0.001, 0.1}, Mesh -> All, MaxRecursion->1, ImageSize->500]`}</Wl>

### `PeformanceGoal`
Affects the number of sampling points to reduce the load
- `"Speed"`
- `"Quality"`

### `PlotPoints`
Change the initial sampling points
- a number


### `PlotLegends`
Accepts `Automatic`, `"Expressions"` or `List` of expressions to show or explicit legend function, i.e. [SwatchLegend](frontend/Reference/Formatting/SwatchLegend.md), [LineLegend](frontend/Reference/Formatting/LineLegend.md) or [PointLegend](frontend/Reference/Formatting/PointLegend.md)

```mathematica
Plot[{Sin[x], Cos[x]}, {x, 0, 5}, 
 PlotLegends -> {"Sin", "Cos"}]
```

```mathematica
Plot[{Sin[x], Cos[x]}, {x, 0, 5}, 
 PlotLegends -> {Sin, Cos}]
```

```mathematica
Plot[{Sin[x], Cos[x]}, {x, 0, 5}, 
 PlotLegends -> SwatchLegend["Expressions"]]
```

```mathematica
Plot[{Sin[x], Cos[x]}, {x, 0, 5}, 
 PlotLegends -> SwatchLegend[Automatic, {Sin, Cos}]]
```

or 

```mathematica @
legend = PointLegend[{Red, Green, Blue}, {"red", "green", "blue"}];
Plot[{x, (*SpB[*)Power[x(*|*),(*|*)2](*]SpB*), (*SpB[*)Power[x(*|*),(*|*)3](*]SpB*)}, {x,0,3}, PlotStyle->{(*VB[*)(RGBColor[1, 0, 0])(*,*)(*"1:eJxTTMoPSmNiYGAo5gUSYZmp5S6pyflFiSX5RcEsQBHn4PCQNGaQPAeQCHJ3cs7PyS8qYgCDD/ZQBgMDnAEA4iUPRg=="*)(*]VB*), (*VB[*)(RGBColor[0, 1, 0])(*,*)(*"1:eJxTTMoPSmNiYGAo5gUSYZmp5S6pyflFiSX5RcEsQBHn4PCQNGaQPAeQCHJ3cs7PyS8qYoACKOODPVwEANd+D0Y="*)(*]VB*), (*VB[*)(RGBColor[0, 0, 1])(*,*)(*"1:eJxTTMoPSmNiYGAo5gUSYZmp5S6pyflFiSX5RcEsQBHn4PCQNGaQPAeQCHJ3cs7PyS8qYoACdMYHewDM1w9G"*)(*]VB*)}, PlotLegends->legend]
```

#### Legend placement 
Use [Placed](frontend/Reference/Formatting/Placed.md) to adjust the position of your legend, i.e.

```mathematica
Plot[
  {x,x^2}, {x,0,1}, 
  PlotLegends->Placed[SwatchLegend[Automatic], {0.2,0.2}]
]
```


### `PlotRange`
Change the lot range to show the whole area
```mathematica
Plot[Sqrt[x], {x, -5, 5}, PlotRange -> Full]
```

<Wl >{`Plot[Sqrt[x], {x, -5, 5}, PlotRange -> Full, MaxRecursion->0,ImageSize->500]`}</Wl>

Or a custom range
```mathematica
Plot[Sqrt[x], {x, -5, 5}, PlotRange -> {{-5,5}, {0,1}}]
```

<Wl >{`Plot[Sqrt[x], {x, -5, 5}, PlotRange -> {{-5,5}, {0,1}}, MaxRecursion->0,ImageSize->500]`}</Wl>

### `RegionFunction`
Show the specific area only
```mathematica
Plot[Sin[x], {x, 0, 8 Pi}, RegionFunction -> Function[{x, y}, Abs[y] > 0.5]]
```

<Wl >{`Plot[Sin[x], {x, 0, 8 Pi}, 
 RegionFunction -> Function[{x, y}, Abs[y] > 0.5], ImageSize->500, MaxRecursion->0]`}</Wl>

### `Axes`
Show or hide axes of the plot

```mathematica
Plot[Sinc[x], {x, 0, 10}, Axes -> False]
```





## Dynamics
Consider to use [ManipulatePlot](frontend/Reference/Plotting%20Functions/ManipulatePlot.md) for manipulating parameters of a function in real time