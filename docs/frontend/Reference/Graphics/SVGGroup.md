---
env:
  - WLJS
package: wljs-graphics-d3
origin: https://github.com/JerryI/wljs-graphics-d3/
---
```mathematica
SVGGroup[g_]
```

represents an isolated group of 2D graphics primitives (see [Graphics](frontend/Reference/Graphics/Graphics.md)). The common use case is to reset all attributes like [RGBColor](frontend/Reference/Graphics/RGBColor.md), [Opacity](frontend/Reference/Graphics/Opacity.md) and the rest defined in [Directive](frontend/Reference/Graphics/Directive.md).

Another handy property is that external attributes are applied solely to the group container, i.e. it does not propagate deeper. For example

```mathematica
o = 0.5;

{Opacity[o // Offload], SVGGroup[{
	Disk[{0,0}, 2], Opacity[0.5], Red, RegularPolygon[3]
}]} // Graphics
```

```mathematica
o = 0.1;
```

Here `Opacity` is applied to a container, but does not affect opacity of inner objects.