---
env:
  - WLJS
package: wljs-graphics-d3
update: true
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/kernel.js
---
Represents an arbitrary text label placed as a [Graphics](frontend/Reference/Graphics/Graphics.md) object

```mathematica
Text["String", {0,0}]
```

Supports styling such as `Style` and `Directive`, i.e.

```mathematica
Graphics[{
	Text[Style["Hello World", FontSize->14], {0,0}]
}]
```

<Wl >{`Graphics[{
	Text[Style["Hello World", FontSize->14], {0,0}]
}, ImageSize->500]`}</Wl>

### Styling options
The following options can be provided to [`Style`](frontend/Reference/Graphics/Style.md) wrapper
- `FontSize->Number` - 10, 12, 14...
- `FontFamily->String` - this is basically an SVG attribute, please see [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-family). If you have imported any font using CSS, you can also use it. 

To change the color, just put in somewhere to the list
```mathematica
Graphics[{
	Red, Text["Hello World", {0,0}]
}]
```


<Wl >{`Graphics[{
	Red, Text["Hello World", {0,0}]
}, ImageSize->500]`}</Wl>

## Methods
### `EventHandler`
One can listen to a several events produced by this primitive using [`EventHandler`](frontend/Reference/Misc/Events.md#`EventHandler`)

```mathematica
EventHandler[t_Text, {event_ -> handler_, ...}]
```

where `event` can be
- `"mousemove"` detects and sends coordinates of a mouse, when it is over this element 
- `"drag"` makes primitive draggable and emits coordinates
- `"zoom"` detects zoom / mouse-wheel
- `"click"` detects mouse clicks


### Dynamic updates
For both the position and text content [dynamic updates](frontend/Dynamics.md) are supported

```mathematica
txt = RandomWord[];
pos = {0,0};

Graphics[{
	Red, Text[txt // Offload, pos // Offload]
}]
```

```mathematica
task = SetInterval[With[{},
	txt = RandomWord[];
	pos = RandomReal[{-1,1}, 2];
], 500];

SetTimeout[TaskRemove[task], 5000];
```

use `TaskRemove[task];` __to stop an animation__

### Math support
You can use __a limited Latex-math kinda mode__, that I implemented instead of full `Boxes` support as it was done in Mathematica, since it might slow down the system a lot

```mathematica
Text["wavenumber (cm^{-1})", {0,0}]
Text["\\alpha (cm^{-1})", {0,0}]
```

<Wl >{`Graphics[{Text["wavenumber (cm^{-1})", {0,0}], Text["\\alpha (cm^{-1})", {0,-0.4}]}, ImageSize->500]`}</Wl>

A list of features
- most used Greek symbols like `alpha` and etc are supported
- subscript `a_1` or `a_{hi}`
- superscript `a^2` or `a^{23}`

<Wl >{`Graphics[{Text["a_1 or a_{hi} and a^2 or a^{23}", {0,0}]}, ImageSize->500]`}</Wl>

In principle, it will anyway ends up in HTML, therefore one can use any special symbol

```mathematica
"I will display &#10060;"
```

<Wl >{`Graphics[{Text["I will display &#10060;", {0,0}]}, ImageSize->500]`}</Wl>