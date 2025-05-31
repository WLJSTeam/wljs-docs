Exports an expression to TeX format

```matheamtica
TeXForm[expr_]
```

## Examples
```mathematica
Series[Sin[x], {x,0,5}] // Normal // TeXForm
```

```mathematica title="output"
"\\frac{x^5}{120}-\\frac{x^3}{6}+x"
```

One can directly render using LaTeX built in to [Markdown](frontend/Cell%20types/Markdown.md) cells or [LaTeX cells](frontend/Cell%20types/Many%20more.md) via [CellView](frontend/Reference/GUI/CellView.md)

```mathematica
CellView[StringJoin[
  TeXForm[Series[Sin[x], {x,0,7}] // Normal]
], "Display"->"latex"]
```

![](./../../../Screenshot%202025-03-29%20at%2017.23.35.png)

## Back-conversion
Using `ToExpression` one can parse TeX to Wolfram Language

```mathematica
ToExpression["\\frac{x^5}{120}-\\frac{x^3}{6}+x", TeXForm]
```