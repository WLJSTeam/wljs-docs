Unlike Mathematica, we interpret all expressions passed to `Text`, `PlotLabel`, etc., normally. Therefore, this approach can conflict with Mathematica's method of displaying equations or Wolfram Language (WL) expressions in labels. For example:

```mathematica
Plot[x, {x, 0, 1}, PlotLabel -> x]    ❌
Plot[x, {x, 0, 1}, PlotLabel -> "x"]  ✅
```

However, we provide other tools to achieve the same goals.

## Plain Superscript/Subscript and Greek Symbols

There is built-in support for basic TeX-like formatting (though somewhat limited) in all [Text](frontend/Reference/Graphics3D/Text.md) or Text-like primitives, including `PlotLabel`, `AxesLabel`, etc.

```mathematica
Plot[x, {x, 0, 1}, AxesLabel -> {"cm^{-1}", "\\alpha"}]
```

<Wl>{`Plot[x, {x, 0, 1}, AxesLabel->{"cm^{-1}", "\\alpha"}]`}</Wl>

Some special characters in the Wolfram Language, compatible with the Unicode symbol table, *can be entered directly*:

```mathematica @
ListLinePlot[yourData, Frame -> True, FrameLabel -> {"ω (THz)", "α (absorption coefficient)"}]
```

## Render WL Expressions

Using [EditorView](frontend/Reference/GUI/EditorView.md) inside [Inset](frontend/Reference/Graphics/Inset.md), you can place any valid WL expression in [StandardForm](frontend/Reference/Formatting/StandardForm.md):

```mathematica
Plot[x, {x, 0, 10}, Epilog -> {
    Inset[
        EditorView["(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)"],
        {3, 5}
    ]
}]
```

<Wl>{`Plot[x, {x, 0, 10}, Epilog->{Inset[EditorView["(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)"], {3,5}]}]`}</Wl>

These *symbols in the string* are just copied text from a standard input or output Wolfram cell (see [Introduction](frontend/Symbolic%20programming.md#Introduction)). You can also render expressions in-place:

```mathematica
Plot[Sin[x]/x, {x, 0, 10}, Epilog -> {
    Inset[
        EditorView @ ToString[Sin[x]/x, StandardForm],
        {3, 0.5}
    ]
}]
```

## Render LaTeX

### Option 1

Using [CellView](frontend/Reference/GUI/CellView.md), you can insert an entire output cell into an [Inset](frontend/Reference/Graphics/Inset.md), with its content provided as a string. There is special [cell type for LaTeX](frontend/Cell%20types/Many%20more.md)

```mathematica
Plot[Sin[x]/x, {x, 0, 10}, Epilog -> {
    Inset[
        CellView["\\hat{T} = i \\hbar \\frac{\\partial}{\\partial t}", "Display" -> "latex"],
        {3, 0.5}, Center, {3,1}
    ]
}]
```

<Wl>{`Plot[Sin[x]/x, {x, 0, 10}, Epilog->{Inset[CellView["$\\hat{T} = i \\hbar \\frac{\\partial}{\\partial t}$", "Display"->"markdown"], {3,0.5}]}]`}</Wl>

#### Generate on-fly
Using [TeXForm](frontend/Reference/Formatting/TeXForm.md) one can convert existing expression to LaTeX

```mathematica
Plot[Sin[x]/x, {x, 0, 10}, Epilog -> {
    Inset[
        CellView[TeXForm[Sin[x]/x], "Display" -> "latex"],
        {3, 0.5}, Center, {3,1}
    ]
}]
```


### Option 2

Using the [MaTeX package](https://github.com/szhorvat/MaTeX), you can directly render LaTeX equations into [Graphics](frontend/Reference/Graphics/Graphics.md) primitives. Install it from the official repository or use a resource function available online:

```mathematica
ResourceFunction["MaTeXInstall"][]
```

:::warning
This package requires LaTeX and Ghostscript to be installed.
:::

```mathematica
<<MaTeX`

Plot[Sin[x]/x, {x, 0, 10}, Epilog -> {
    Inset[
        MaTeX["\\sum_{k=1}^{\\infty} \\frac{1}{k}", FontSize -> 20],
        {3.5, 0.5}
    ]
}]
```

If you place it directly on the same canvas by exploding it into primitives using ` // First`, you may encounter issues with the aspect ratio, as it will be dictated by your plot.

![](./../../../Screenshot%202024-12-19%20at%2009.47.06.png)
