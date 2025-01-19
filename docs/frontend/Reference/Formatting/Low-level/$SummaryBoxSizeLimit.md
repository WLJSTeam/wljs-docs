---
env:
  - Wolfram Kernel
context: BoxForm`
package: wljs-editor
internal: true
source: https://github.com/JerryI/wljs-editor/blob/dev/src/
---
```mathematica
BoxForm`$SummaryBoxSizeLimit
```

limits the size of [ArrangeSummaryBox](frontend/Reference/Formatting/ArrangeSummaryBox.md) stored in the notebook in bytes. If an expression exceeds it, it will be stored on Kernel (in memory) and a reference will be provided instead.

The default system value is `40000`.

:::tip
You can set it globally from the settings menu (Editor section)
:::
