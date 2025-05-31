---
env:
  - WLJS
package: wljs-revealjs
source: https://github.com/JerryI/wljs-revealjs/blob/dev/src/Kernel.wl
---
```mathematica
FrontSlidesSelected[type_String, payload_]
```

an interface symbol to control current slideshow (if available) similar to [FrontEditorSelected](frontend/Reference/Interpreter/FrontEditorSelected.md) in terms of API implementation.

:::note
You need to call this symbol using [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md)
:::

`type` field reflects [RevealJS API method](https://revealjs.com/api/) and `payload` its first argument.

## Example
To programmatically change the slide

```mathematica
FrontSlidesSelected["navigateNext", 1] // FrontSubmit
```