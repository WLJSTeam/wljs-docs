---
env:
  - Wolfram Kernel
context: Notebook`Editor`OffloadExtension`
package: wljs-editor
origin: https://github.com/JerryI/wljs-editor/tree/main
---
```mathematica
Offload`FromEventObject[ev_EventObject] _Offload
```

generates a dynamic symbol (aka [Offload](frontend/Reference/Interpreter/Offload.md)) from a given [`EventObject`](frontend/Reference/Misc/Events.md#`EventObject`) ([InputRange](frontend/Reference/GUI/InputRange.md), [InputText](frontend/Reference/GUI/InputText.md), ... etc) placing view-component of `ev` as a decoration

:::info
To produce more instances, you need to call it multiple times
:::

## Example
It feels similar to what Mathematica's dynamic keyword produce

```mathematica title="evaluate"
Offload`FromEventObject[InputRange[-1,1,0.1]]
```

__cut and paste it into__

```mathematica
Rectangle[{-1,-1}, {(*here*), 1}]
```

![](./../../../Generated.mov%20to%20GIF%201.gif)

## Dev notes
This is a simple combination of [Offload](frontend/Reference/Interpreter/Offload.md), [`EventHandler`](frontend/Reference/Misc/Events.md#`EventHandler`) and [Interpretation](frontend/Reference/Formatting/Interpretation.md) 
