---
internal: true
env:
  - WLJS
  - Wolfram Kernel
context: Notebook`Editor`FrontendObject`
source: https://github.com/JerryI/wljs-editor/blob/dev/src/FrontendObject.wl
package: wljs-editor
---
```mathematica
FrontEndRef[uid_String]
```

An executable reference to a frontend object (see [CreateFrontEndObject](frontend/Reference/Frontend%20Objects/CreateFrontEndObject.md)), which does not have output forms defined.

After evaluation it is converted back to a normal Wolfram Language expression and is executed on Kernel.
