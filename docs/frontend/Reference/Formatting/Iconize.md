---
env:
  - Wolfram Kernel
context: System`
package: wljs-editor
source: https://github.com/JerryI/wljs-editor/blob/dev/src/Boxes.wl
---
compresses any arbitrary `expr` into an icon (encoded as base64 gzip string or a file)

```mathematica
Iconize[expr_, opts___] _
```

If an expression exceeds `30000` bytes, it will be serialized to a local file in the subdirectory of the notebook `.iconized`. 

## Options
### `"Label"`
Specifies a label for an icon. Accepts only `_String`


## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
