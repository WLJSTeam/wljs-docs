---

---


A standard form used for representing Wolfram expressions on [Slides](frontend/Advanced/Slides/Slides.md) and in [WLX](frontend/Cell%20types/WLX.md) cells
By the default it applies `Indentity` transformation.

The use cases are the same as for [StandardForm](frontend/Reference/Formatting/StandardForm.md). 

## Example
Depending on where an expression is displayed, one can change its visual representation using [MakeBoxes](frontend/Reference/Formatting/MakeBoxes.md) tagset, i.e.

```mathematica
SpecialOne /: MakeBoxes[SpecialOne, StandardForm] := With[{
	o = Graphics[{Red, Disk[]}] 
},
	ViewBox[SpecialOne, o]
]

SpecialOne /: MakeBoxes[SpecialOne, WLXForm] := With[{
	o = Graphics[{Blue, Disk[]}] // CreateFrontEndObject
},
	o
]
```

in the normal Wolfram cell an output looks like

![](../../../Screenshot%202024-03-27%20at%2021.43.43.png)

![](./../../../Screenshot%202024-03-27%20at%2021.42.31.png)

while on a slide

![](../../../Screenshot%202024-03-27%20at%2021.43.10.png)


