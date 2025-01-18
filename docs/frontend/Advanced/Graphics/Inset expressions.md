Unlike Mathematica, we interpret all expressions passed to `Text`, `PlotLabel` and etc normally. Therefore it clashes with some of Mathematica's approaches to display equations or WL expressions in labels. For example

```mathematica
Plot[x, {x,0,1}, PlotLabel->x]    ❌
Plot[x, {x,0,1}, PlotLabel->"x"]  ✅ 
```

However, we provide other tools to accomplish same goals.

## Plain sup/subscript and Greek symbols
There is a built-in support for basic TeX-like formatting (quite limited) in all [Text](frontend/Reference/Graphics3D/Text.md) or Text-like primitives including `PlotLabel`, `AxesLabel` and etc

```mathematica
Plot[x, {x,0,1}, AxesLabel->{"cm^{-1}", "\\alpha"}]
```

<Wl>{`Plot[x, {x,0,1}, AxesLabel->{"cm^{-1}", "\\alpha"}]`}</Wl>

## Render WL expressions
Using [EditorView](frontend/Reference/GUI/EditorView.md) inside [Inset](frontend/Reference/Graphics/Inset.md) you can pretty much place any valid WL expression in [StandardForm](frontend/Reference/Formatting/StandardForm.md) 

```mathematica
Plot[x, {x,0,10}, Epilog->{
	Inset[
		EditorView["(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)"]
	, {3,5}, {10,30}, {1,3}]
}]
```

<Wl>{`Plot[x, {x,0,10}, Epilog->{Inset[EditorView["(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)"], {3,5}, {10,30}, {1,3}]}]`}</Wl>

where those *funny symbols* in a string is just a copied text from the normal input or output Wolfram cell (see [Introduction](frontend/Symbolic%20programming.md#Introduction)). Or in-place

```mathematica
Plot[Sin[x]/x, {x,0,10}, Epilog->{
	Inset[
		EditorView @ ToString[Sin[x]/x, StandardForm]
	, {3,0.5}, {0,400}, {3,3}]
}]
```

## Render LaTeX

### Option 1
Using [CellView](frontend/Reference/GUI/CellView.md) you can put into [Inset](frontend/Reference/Graphics/Inset.md) an entire output cell with a given content provided as a string. By the default `"markdown"` cell type does support LaTeX, you can use this one

```mathematica
Plot[Sin[x]/x, {x,0,10}, Epilog->{
	Inset[
		CellView["$\\hat{T} = i \\hbar \\frac{\\partial}{\\partial t}$", "Display"->"markdown"]
	, {3,0.5}, {0,400}, {3,3}]
}]
```

<Wl>{`Plot[Sin[x]/x, {x,0,10}, Epilog->{Inset[CellView["$\\hat{T} = i \\hbar \\frac{\\partial}{\\partial t}$", "Display"->"markdown"], {3,0.5}, {0,400}, {3,3}]}]`}</Wl>

### Option 2
Using [MaTeX package](https://github.com/szhorvat/MaTeX) one can directly render equations into [Graphics](frontend/Reference/Graphics/Graphics.md) primitives. Install it from the official repository or use a resource function available online

```mathematica
ResourceFunction["MaTeXInstall"][]
```

:::warning
This package requires LaTeX and Ghostscript installed
:::

```mathematica
<<MaTeX`

Plot[Sin[x]/x, {x,0,10}, Epilog->{
	Inset[
		MaTeX["\\sum_{k=1}^{\\infty} \\frac{1}{k}", FontSize->20]
	, {3.5,0.5}]
}]
```

If you place it directly to the same canvas by exploding it into primitives ` // First`, you might have issues with aspect ratio, since it is dictated by your plot.

![](./../../../Screenshot%202024-12-19%20at%2009.47.06.png)
