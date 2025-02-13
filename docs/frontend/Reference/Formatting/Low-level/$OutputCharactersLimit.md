---
env:
  - Wolfram Kernel

package: wljs-editor
internal: true
source: https://github.com/JerryI/wljs-editor/blob/dev/src/
---
```mathematica
Internal`Kernel`$OutputCharactersLimit
```

limits the number of characters in the output cell before the truncation is applied.

The default system value is `5000`.

:::tip
You can set it globally from the settings menu (Editor section)
:::
