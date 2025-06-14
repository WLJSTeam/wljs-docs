---

---


A standard form used for representing Wolfram expressions on [Slides](frontend/Advanced/Slides/Slides.md) and in [WLX](frontend/Cell%20types/WLX.md) cells.

By the default it applies `ToString` transformation. The use cases are the same as for [StandardForm](frontend/Reference/Formatting/StandardForm.md). 

## Example
### Strings
Try the simples example:

```mathematica
Sym /: MakeBoxes[Sym, f: StandardForm] := MakeBoxes["Hooray", f]

Sym /: MakeBoxes[Sym, f: WLXForm] := MakeBoxes["Didly-Didly", f]
```

Here is how it looks in the wolfram language cell:
![](./../../../Screenshot%202025-06-12%20at%2019.22.37.png)

Here it is in markdown cell:
![](./../../../Screenshot%202025-06-12%20at%2019.22.43.png)


### Complex
Depending on where an expression is displayed, one can change its visual representation using [MakeBoxes](frontend/Reference/Formatting/MakeBoxes.md) tagset, i.e.

```mathematica
SpecialOne /: MakeBoxes[SpecialOne, StandardForm] := With[{
	o = Graphics[{Red, Disk[]}] 
},
	MakeBoxes[o, StandardForm]
]

SpecialOne /: MakeBoxes[SpecialOne, WLXForm] := With[{
	o = Graphics[{Blue, Disk[]}]
},
	MakeBoxes[o, WLXForm]
]
```

in the normal Wolfram cell an output looks like

![](../../../Screenshot%202024-03-27%20at%2021.43.43.png)

![](./../../../Screenshot%202024-03-27%20at%2021.42.31.png)

while on a slide

![](../../../Screenshot%202024-03-27%20at%2021.43.10.png)


