---
env:
  - Wolfram Kernel
---
```mathematica
Interpretation[display_, expression_]
```
allows to alter the displayed expression

__An expression will be revealed after 1 evaluation__

:::tip
For the best performance optimization __apply__ [CreateFrontEndObject](frontend/Reference/Frontend%20Objects/CreateFrontEndObject.md) if you use interactive objects as `display` value.

For example

```mathematica
Interpretation[TextView["Hello"], 1]
```
has __more overhead__ than

```mathematica
Interpretation[TextView["Hello"] // CreateFrontEndObject, 1]
```

It will help interpreter to bypass extra layers of complexity.

Note that you don't need to do this for [Graphics](frontend/Reference/Graphics/Graphics.md), [Graphics3D](frontend/Reference/Graphics3D/Graphics3D.md), [Image](frontend/Reference/Image/Image.md) and input elements, since it is done __automatically__
:::

:::info
By the default [Interpretation](frontend/Reference/Decorations/Interpretation.md) applies [StandardForm](frontend/Reference/Decorations/StandardForm.md) to `display` expression before printing it to an output cell
:::
## Example
Have a look at the following example

```mathematica
Interpretation[Red, 1]
```

![](../../../Screenshot%202024-03-27%20at%2020.30.45.png)


## Supported output forms
- [StandardForm](frontend/Reference/Decorations/StandardForm.md)


