---
env:
  - WLJS
package: wljs-graphics3d-threejs
update: true
source: https://github.com/JerryI/Mathematica-ThreeJS-graphics-engine/blob/dev/src/kernel.js
---
Represents an arbitrary text label placed as a [Graphics3D](frontend/Reference/Graphics3D/Graphics3D.md) object

```mathematica
Text["String", {0,0,0}]
```

Supports styling such as `Style` and `Directive`, i.e.

```mathematica
Graphics3D[{
	Sphere[],
	Text[Style["Hello World", FontSize->24], {0,2, 0}]
}]
```

<Wl >{`Graphics3D[{
	Sphere[],
	Text[Style["Hello World", FontSize->24], {0,2, 0}]
}, ImageSize->500]`}</Wl>

Or using [Directive](frontend/Reference/Graphics3D/Directive.md)

```mathematica
Graphics3D[{
  Directive[Red, FontSize->20], Text["Hey", {2,0}],
  Sphere[]
}]
```

<Wl>{`Graphics3D[{
  Directive[Red, FontSize->20], Text["Hey", {2,0}],
  Sphere[]
}, ImageSize->500]`}</Wl>

### Styling options
The following options can be provided to [`Style`](frontend/Reference/Graphics/Style.md) wrapper
- `FontSize->Number` - 10, 12, 14...
- `FontFamily->String` - this is basically an SVG attribute, please see [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-family). If you have imported any font using CSS, you can also use it. 

### Dynamic updates
For both the position and text content [updates](frontend/Dynamics.md) are supported

```mathematica
txt = RandomWord[];
pos = {0,0, 1};

Graphics3D[{
	Red, Sphere[], Text[txt // Offload, pos // Offload]
}]
```

```mathematica
task = SetInterval[With[{},
	txt = RandomWord[];
	pos = RandomReal[{-1,1}, 3];
], 500];

SetTimeout[TaskRemove[task], 5000];
```

use `TaskRemove[task];` __to stop an animation__

