---
env:
  - Wolfram Kernel
package: wljs-editor
---
```mathematica
ChoiceDialog[expr_]
```

puts up a standard choice dialog that displays `expr` together with two buttons OK and CANCEL. It block the execution, until any button is pressed (or ESC / ENTER)

```mathematica
ChoiceDialog[expr_, {label1_ -> value1_, label2_ -> value2_ ...}]
```

includes buttons with labels `labeli` and returns `valuei` if clicked. Labels and values can be __any WL expressions__.

:::note
It will use [StandardForm](frontend/Reference/Formatting/StandardForm.md) for displaying expressions
:::

## Options
In a case of a lost context provide 

### `"Notebook"`
Specify explicitly a notebook where to pop up a window

