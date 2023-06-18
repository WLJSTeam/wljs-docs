---
sidebar_position: 3
---
If you use Mathematica quite often, you might probably familliar with `MakeBoxes` interface, where you can make a fancy representation for the symbolic expressions

:::danger
Is in development.
Please, check the page later
:::

Also see [Decorations](../../Decorations.md)

## Low-level implementation
For example, you have an object like this
`
```mathematica
Mesh[<|"vertices", "polygons"->...|>]
```

And you want to make a nice representation of it in the cell. Since to all cell's output expressions the operation `CM6Form` is applied (see [Evaluation](Evaluation.md), [WLJS Interpreter](https://github.com/JerryI/wljs-interpreter)) you can write it directly 

```mathematica
CM6Form[Mesh[assoc_]] ^:= CreateFrontEndObject[Mesh[assoc_], "may be an id"]
```
For example `Slider` is implemented in a simmilar a way.

It is important to note, that there is no postprocessing preformed, since afterwards we want to use it if it was just a `Mesh`, i.e.

```mathematica
FrontEndExecutable["may be an id"] === Mesh[...] === True
```
For `Slider` object it wont work, since the posprocessing is applied.

Then all magic has to happend in JS. You need to define the corresponding function in pure JS

```js
.js
core.Mesh = (args, env) => {
	env.element //draw something
}
core.Mesh.update => {}
core.Mesh.destroy => {}
```

==It becomes [[Frontend Object]]==

To read about it in more details, please see [Frontend functions](Frontend%20functions.md) and [Frontend objects](Frontend%20objects.md). 
It principle it gives you much more flexibillity, but is also harder to do.

✅  flexibillity
❗️  becomes a dedicated [[Frontend Object]] (overhead)
❗️  requires JS knowledge 

💡 Great for "heavy" views

#### Example





## High-level | Easy
Since it is about Wolfram Language we need something better. Therefore you can use build-in helper function

```mathematica
CreateFrontEndView[symbolHead, viewFunction];
```

What it does

```mathematica
CM6Form[symbolHead[any__]] ^:= 
CreateFrontEndObject[	
	FrontEndViewWrapper[symbolHead[any], viewFunction@(symbolHead[any])]
];
```

where

```mathematica
FrontEndView[a_, decoration_] := a;
```

Therefore, when we make an output to the cell, it automatically provides both the original version and postprocessed one, which is going to be use on fronend

```js
core.FrontEndView = (args, env) => {
	interpretate(args[1], env);
}
```

Then one can sumply put any graphical function into `viewFunction` as ease.

```mathematica
CreateFrontEndView[Mesh, Function[mesh, Graphics3D[Polygons[mesh]]]];
```

viola

✅  easy to write using native WL functions
❗️  becomes a dedicated [[Frontend Object]] (overhead)

💡 Great for "heavy" views

### Pefomance goal
One can ommit the problems with creating [[Frontend objects]] each time, therfore one can compress it in a way like

```mathematica
FrontEndViewInline[expr, Compress[decoration]]
```
inside the decoration is a complete calculated expression as a replacement for view.

✅  easy to write using native WL functions
✅  it is inline function, evaluation happends in-place
❗️  significat load on the network (each time you type it sends the content to server)

💡 Great for "lightweight" views

## Editable Boxes
See [[Expressions representation/Boxes]]
Another way to make it is to use CM6 template boxes, i.e.
```mathematica
TemplateBox[exp, ] or FrameBox[] or Style[] or general FrontEndBox[exp, "json"]
```

there is no convertion to [[Frontend Object]] happends, but just interpretation using CM6 decorations.

🎡  type an example
```mathematica
Table[If[PrimeQ[i], Framed[i, Background -> LightYellow], i], {i, 1, 
  100}]
```

The difference with respect to [[#Pefomance goal]] and [[Frontend objects#Inline frontend objects]] is that it can be edited normally using CM6.

✅  easy to write using native WL functions
✅  it is inline function, evaluation happends in-place
✅  editable by user in-place
❗️  Not suitable for complex views
- significat load on the editor (each time you type it recalculates strings)
- significat load on the network (each time you type it sends the content to server)

💡 Great for "superlightweight" views