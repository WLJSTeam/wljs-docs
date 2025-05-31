---
env:
  - WLJS
  - Wolfram Kernel
---
```mathematica
Beep[] | Beep[_]
```

make a sound notification. It does not require any context or window object.

To make system beep sound use (*Desktop App only*)

```mathematica
Beep["System"]
```

## Example
Click on this button to make sound

```mathematica
EventHandler[InputButton[], Beep]
```

