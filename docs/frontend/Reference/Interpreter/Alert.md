---
env:
  - WLJS
update: false
package: wljs-interpreter

source: https://github.com/JerryI/wljs-interpreter/blob/dev/src/Definitions.wl
needsContainer: true
---
```mathematica
Alert[message_String]
```

pops up a default alert message on the frontend

## Example
This is purely WLJS function, which has to be called either using [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md) or [CreateFrontEndObject](frontend/Reference/Frontend%20Objects/CreateFrontEndObject.md)

```mathematica
FrontSubmit[Alert["Hello World"]]
```