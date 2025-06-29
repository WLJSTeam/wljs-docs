~~Unlike Mathematica, we interpret all expressions passed to `Text`, `PlotLabel`, etc., normally. Therefore, this approach can conflict with Mathematica's method of displaying equations or Wolfram Language (WL) expressions in labels. For example:~~

:::info
*UPD: 29.06.2025*
This is no longer an issue. You can pass any expression to [Inset](frontend/Reference/Graphics/Inset.md)
:::

```mathematica
Plot[x, {x, 0, 1}, PlotLabel -> x]    ✅
Plot[x, {x, 0, 1}, PlotLabel -> "x"]  ✅
```


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

Using `HoldForm` inside [Inset](frontend/Reference/Graphics/Inset.md) on any expression to prevent it from evaluating:

```mathematica
Plot[x, {x, 0, 10}, Epilog -> {
    Inset[
        HoldForm[(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)],
        {3, 5}
    ]
}]
```

<Wl>{`Plot[x, {x, 0, 10}, Epilog->{Inset[EditorView["(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)"], {3,5}]}]`}</Wl>


## Render LaTeX

### Option 1

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
