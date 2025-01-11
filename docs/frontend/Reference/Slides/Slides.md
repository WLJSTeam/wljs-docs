---
env:
  - Wolfram Kernel
package: wljs-revealjs
source: https://github.com/JerryI/wljs-revealjs/blob/dev/src/Kernel.wl
context: Notebook`Editor`Kernel`Slides`
---
```mathematica
Slides[] _Slides
```

an object that represents current window with slides (even if not created)

## Constructor
Once evaluated it returns `Slides` as an object with a current window connection (aka [CurrentWindow](frontend/Reference/Frontend%20IO/CurrentWindow.md)) and other properties

:::tip
Always call the constructor on the window, where the slides will be shown
:::

## Methods
It provides a direct access to RevealJS engine

### `EventFire`
It extends [`EventFire`](frontend/Reference/Misc/Events.md#`EventFire`) acting like an event object

```mathematica
EventFire[o_Slides, APICommand_String, data_]
```

where `APICommand` is a [RevealJS API](https://revealjs.com/api/)

__For example__ to navigate to the next slide
```mathematica
EventFire[o_Slides, "navigateNext", 1]
```

