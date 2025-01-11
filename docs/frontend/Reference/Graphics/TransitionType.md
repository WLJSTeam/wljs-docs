---
env:
  - WLJS
package: wljs-graphics-d3
context: JerryI`Notebook`Graphics2D`
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/Kernel.wl
---
acts as an option and a context modifier for [Graphics](frontend/Reference/Graphics/Graphics.md) that tells the transition function for graphics primitives (coordinate changes, and etc) once one of dependencies has been updated

__global__
```mathematica
Graphics[..., TransitionType->type_String]
```

__local__
```mathematica
Graphics[{Directive[TransitionType->type_String], ...}]
```

## Types
### `"Linear"`

### `"CubicInOut"`

### `None`
No transition. Works best for fast animation


## Example
Let us see how it works with a moving object

```mathematica title="cell 1"
object = {-1.,0.};
Graphics[{
	{Directive[TransitionType -> "Linear"], Disk[(object + {0,0.5}) // Offload, 0.2]},
	{Directive[TransitionType -> "CubicInOut"], Disk[(object - {0,0}) // Offload, 0.2]},
   {Directive[TransitionType -> None], Disk[(object - {0,0.5}) // Offload, 0.2]}
}, PlotRange->{{-1,1}, {-1,1.5}}, "TransitionDuration"->500]
```

and then in the next cell

```mathematica
object = {1.,0};
```

the result is following

![](../../../imgs/moves-ezgif.com-video-to-apng-converter.png)