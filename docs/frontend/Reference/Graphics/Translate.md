---
env:
  - WLJS
package: wljs-graphics-d3
update: true
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/kernel.js
---
```mathematica
Translate[g_, pos_List | _Offload]
```

translates graphics primitive by `pos`


## Dynamics
`pos` argument does support dynamic updates. Use [Offload](frontend/Reference/Interpreter/Offload.md)