---
env:
  - Wolfram Kernel
update: 
origin: https://github.com/JerryI/wljs-editor/tree/main
needsContainer:
---


Styling box used as a decoration for an arbitrary Wolfram Expressions

```mathematica
Style[expr_, opts__]
```

:::info
Expressions are editable
:::

The argument `opts` contains directives for the formatted output. 
## Options
- `Background`
- `FontFamily`
- `FontSize`

## Directives
- `_Integer` font size
- `_RGBColor` font color
- `Bold`
- `Italic`


## Example

```mathematica
Style[1, Background->Yellow]
```

![](./../../../Screenshot%202024-03-27%20at%2021.18.47.png)

For pure string options are much richer

```mathematica
Style["ddd", Background->LightBlue, FontFamily->"Monospace", Bold, Red, Italic,  20]
```

![](./../../../Screenshot%202024-04-03%20at%2020.45.35.png)



Hamlet's soliloquy, with repeated words successively has more contrast background

```mathematica
With[{data = ExampleData[{"Text", "ToBeOrNotToBe"}, "Words"]}, 
  Take[MapIndexed[Style[#, 4 Count[Take[data, First[#2]], #]] &, data], 100]
]
```

![](./../../../Screenshot%202024-04-07%20at%2017.59.26.png)

Or for a regular expressions

```mathematica
Style[(*FB[*)((1)(*,*)/(*,*)((*SqB[*)Sqrt[2](*]SqB*)))(*]FB*), 18, Red]
```

![](./../../../Screenshot%202024-04-07%20at%2018.00.06.png)

## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
