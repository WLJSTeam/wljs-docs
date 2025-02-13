---
env:
  - Wolfram Kernel

package: wljs-editor
internal: true
source: https://github.com/JerryI/wljs-editor/blob/dev/src/
---
```mathematica
Internal`Kernel`$FrontEndObjectSizeLimit
```

limits the size of [Frontend Objects](frontend/Advanced/Frontend%20interpretation/Frontend%20Objects.md) in megabytes (sound, 2d, 3d images).

The default system value is `8`.

:::tip
You can set it globally from the settings menu (Editor section)
:::
