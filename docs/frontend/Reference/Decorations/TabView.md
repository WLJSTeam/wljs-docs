---
env:
  - Wolfram Kernel
package: wljs-editor
---


```mathematica
TabView[{lbl1->expr1, lbl2->expr2, ...}, default_Integer:1]
```

represents an object in which clicking the tab with label `lbli` displays `expri`

```mathematica
TabView[{expr1, expr2, ...}, default_Integer:1]
```

:::note
It prerenders all expressions and swaps between them in the display widget. Therefore it can work offline in [Static HTML](frontend/Exporting/Static%20HTML.md) and on exported slides.
:::

## Supported output forms
- [StandardForm](frontend/Reference/Decorations/StandardForm.md)
- [WLXForm](frontend/Reference/Decorations/WLXForm.md)
