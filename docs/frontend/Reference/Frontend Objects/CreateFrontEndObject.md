---
env:
  - Wolfram Kernel
context: Notebook`Editor`FrontendObject`
source: https://github.com/JerryI/wljs-editor/blob/dev/src/FrontendObject.wl
package: wljs-editor
---

creates a reference to the inner expression and stores it into frontend objects storage  shared with Kernel and Notebook

```mathematica
CreateFrontEndObject[expr_, id_String | Null, opts___Rule] _FrontEndExecutable
```

Returns [`FrontEndExecutable`](frontend/Reference/Frontend%20Objects/FrontEndExecutable.md) object with a given `id` or generated.

See more about it in [Frontend Objects](frontend/Advanced/Frontend%20interpretation/Frontend%20Objects.md)

This is a fundamental component  for `Graphics`, `InputRange`... and other interactive elements, which are too large to be stored inline in the editor.

:::tip
If you do not want to apply [CreateFrontEndObject](frontend/Reference/Frontend%20Objects/CreateFrontEndObject.md) on your symbol manually, consider to define [MakeBoxes](frontend/Reference/Formatting/MakeBoxes.md) for [StandardForm](frontend/Reference/Formatting/StandardForm.md). Then it can be applied automatically once it goes to the output cell.
:::

## Options
### `"Store"`
Specifies which to storage to use for an expression (`"Frontend"`, `"Kernel"`, or `All`). The default values is `All`.

Each time you create `Graphics` or any other frontend object, it makes two copies of it: the first one is shared with a browser (WLJS), while  the second one is a *private* copy used by Wolfram Kernel once fetched by [FrontEndRef](frontend/Reference/Frontend%20Objects/FrontEndRef.md) or evaluated for a second time (see [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md)).


## Applications
It is mostly used for storing *heavy* expressions to be executed as [WLJS Functions](frontend/Advanced/Frontend%20interpretation/WLJS%20Functions.md) such as [Graphics](frontend/Reference/Graphics/Graphics.md), [Graphics3D](frontend/Reference/Graphics3D/Graphics3D.md), [Audio](frontend/Reference/Sound/Audio.md) and etc.

Other use cases are provided by its derivative - [FrontEndExecutable](frontend/Reference/Frontend%20Objects/FrontEndExecutable.md), which has an UpValue for [StandardForm](frontend/Reference/Formatting/StandardForm.md) and [WLXForm](frontend/Reference/Formatting/WLXForm.md) used for printing the data for output wolfram language cells and [Slides](frontend/Cell%20types/Slides.md).

## Exporting
Created stored objects are fully portable and can be automatically exported to [Static HTML](frontend/Exporting/Static%20HTML.md), [Dynamic HTML](frontend/Exporting/Dynamic%20HTML.md), [Slides](frontend/Exporting/Slides.md) or as [Figures](frontend/Exporting/Figures.md)

