---
env:
  - WLJS
internal: true

package: wljs-editor
source: https://github.com/JerryI/wljs-editor/blob/dev/src/FrontendObject.wl
---
```mathematica
FrontEndExecutable[uid_String]
```

A static reference to a frontend object (see [CreateFrontEndObject](frontend/Reference/Frontend%20Objects/CreateFrontEndObject.md))  like [FrontEndRef](frontend/Reference/Frontend%20Objects/FrontEndRef.md).

## Supported output forms
[StandardForm](frontend/Reference/Formatting/StandardForm.md) used in the output Wolfram Language cells is defined as [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md) decoration with a corresponding [FrontEndRef](frontend/Reference/Frontend%20Objects/FrontEndRef.md) as an input expression. This decoration is used as a sort of an empty widget to which any nested expression can output ([Graphics](frontend/Reference/Graphics/Graphics.md), [Plot](frontend/Reference/Plotting%20Functions/Plot.md) and etc made using this method)

[WLXForm](frontend/Reference/Formatting/WLXForm.md) produces a widget-like placeholder, which can be populated with a content. This is how [Plot](frontend/Reference/Plotting%20Functions/Plot.md) and other graphics function can output to a [slides](frontend/Cell%20types/Slides.md).

## Application

### Custom WLJS function
Use for custom defined WLJS functions i.e.

```js
.js
core.MyCustomStuff = async (args, env) => {
	env.element.innerText = "Hi dude!";
}
```

and then in the next cell
```mathematica
CreateFrontEndObject[MyCustomStuff[]]
```

:::tip
Use `TagSetDelayed` on [MakeBoxes](frontend/Reference/Formatting/MakeBoxes.md) to apply it automatically, i.e.

```mathematica
MyCustomStuff /: MakeBoxes[m_MyCustomStuff, StandardForm] := With[{
	o = CreateFrontEndObject[m]
},
	MakeBoxes[m, StandardForm]
]
```

then you don't need to manually create a frontend object anymore. Or even better - __if your expression is not too big__ one can bypass frontend objects at all

```mathematica
MyCustomStuff /: MakeBoxes[m_MyCustomStuff, StandardForm] := ViewBox[m,m]
```
:::


