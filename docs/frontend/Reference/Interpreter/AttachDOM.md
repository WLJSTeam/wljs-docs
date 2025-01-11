---
env:
  - WLJS
package: wljs-interpreter
needsContainer: true
context: Notebook`Interpreter`
source: https://github.com/JerryI/wljs-interpreter/blob/dev/src/Definitions.wl
---
Explicitly attaches an DOM element to a [container](../../../../interpreter/Advanced/containers.md) by its id

```mathematica
AttachDOM[id_String]
```

It is defined only as WLJS function, you need to use [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md) or [CreateFrontEndObject](frontend/Reference/Frontend%20Objects/CreateFrontEndObject.md) to use it
