---
env:
  - WLJS
package: wljs-graphics-d3
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/kernel.js
---
Used for styling plots or 2D graphics

```mathematica
Directive[directives___, opts___Rule]
```

The support is quite limited compared to Mathematica's implementation

## Directives

### `_RGBColor`

## Options
### `FontSize`
### `FontFamily`
### `TransitionType`
### `TransitionDuration`


## Examples
### Ticks of a plot
One can provide a font-size parameters

```mathematica
Plot[Sin[x], {x,0,2Pi}, FrameTicksStyle->Directive[FontSize->16], Frame->True]
```

<Wl >{`Plot[Sin[x], {x,0,2Pi}, FrameTicksStyle->Directive[FontSize->16], Frame->True, ImageSize->350]`}</Wl>

### FrameLabel style
The same is valid for the labels

```mathematica
Plot[Sin[x], {x,0,10 Pi}, FrameStyle->Directive[FontSize->16], Frame->True, FrameLabel->{"x-axis", "y-axis"}]
```

<Wl >{`Plot[Sin[x], {x,0,10 Pi}, FrameStyle->Directive[FontSize->16], Frame->True, FrameLabel->{"x-axis", "y-axis"}, ImageSize->350]`}</Wl>


### Transitions
One can specify the local transitions parameters. For example

```mathematica
p1 = {0,0};
p2 = {0,0};

Graphics[{
	Directive[TransitionDuration->500], Red, Disk[p1 // Offload, 0.2],
	{Directive[TransitionDuration->100], Blue, Disk[p2 // Offload, 0.2]}}
, PlotRange->{{-1,1}, {-1,1}}]
```

then try

```mathematica
p1 = {1,1};
p2 = {-1,-1};
```

You will find that they are animated with a different duration. __The same applies to `TransitionType` as well__
