---
env:
  - Wolfram Kernel
origin: https://github.com/JerryI/wljs-inputs
source: https://github.com/JerryI/wljs-inputs/blob/dev/src/Kernel.wl
package: wljs-inputs

update: false
---
```mathematica
InputTable[list_List, opts___]
```

:::caution
This component was removed due to a low demand and high complexity
:::

it places a sort of small Excel-like table editor for `list` provided. This is a great solution for __a large tables__, since it does support lazy loading from a server
