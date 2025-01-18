---
env:
  - Wolfram Kernel
update: 
origin: https://github.com/JerryI/wljs-editor/tree/main
needsContainer:
---


Acts like a [Style](frontend/Reference/Formatting/Style.md) box, but wrapped into a frame

```mathematica
Framed[expr_, opts__]
```

The argument `opts` contains directives for the formatted output. The following options are supported
- `Background->RGBColor[...]` adds background to the wrapped expression

:::warning
Styling options are currently quite limited
:::
## Example
Highlight prime numbers in the list
```mathematica
Table[If[PrimeQ[i], Framed[i, Background->Yellow], i], {i, 1, 100}]
```

![](../../../Screenshot%202024-03-27%20at%2020.27.07.png)

Or this neat example from Wolfram Research
```mathematica
NestList[Framed, x, 6]
```

![](../../../Screenshot%202024-03-27%20at%2020.27.24.png)


## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
