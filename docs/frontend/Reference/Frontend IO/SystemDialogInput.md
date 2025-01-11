---
env:
  - Wolfram Kernel
package: wljs-editor
---
```mathematica
SystemDialogInput[type_String, opts___]
```

opens a OS dialog window to operate with IO.

:::warning
This call blocks the whole Wolfram Kernel, use [SystemDialogInputAsync](frontend/Reference/Frontend%20IO/SystemDialogInputAsync.md) for asynchronous dialog window
:::

:::note
This feature is currently available only for WLJS Desktop App
:::

## type
### `"FileOpen"`
Opens a file browser. Filters can be provided as well

```mathematica
SystemDialogInput["FileOpen", {Null, {"Tabular Formats" -> {"*.csv", "*.tsv"}, "Plain Text Document" -> {"*.txt"}}}]
```

### `"FileSave"`
Opens a file saving dialog. Filters can be provided as well

```mathematica
SystemDialogInput["FileSave", {Null, {"Tabular Formats" -> {"*.csv", "*.tsv"}, "Plain Text Document" -> {"*.txt"}}}]
```

### `"Directory"`
Opens a dialog to select a directory

```mathematica
SystemDialogInput["Directory"]
```

## General options
### `WindowTitle`
The title of the browser window

### `"Window"`
A window to which the dialog will be assigned. By the default is [CurrentWindow](frontend/Reference/Frontend%20IO/CurrentWindow.md)