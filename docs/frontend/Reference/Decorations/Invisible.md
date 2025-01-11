---
env:
  - Wolfram Kernel
source: https://github.com/JerryI/wljs-editor/blob/dev/src/
---
```mathematica
Invisible[expr_]
```

makes an expression invisible, but keeps the space occupied

For example

```mathematica
Framed[Invisible[Integrate[f[x], {x, -\[Pi]/2, \[Pi]/2}]]]
```

```mathematica @
(*BB[*)((*BB[*)((*TB[*)Integrate[(*|*)f[x](*|*), {(*|*)x(*|*),(*|*)-(*FB[*)((\[Pi])(*,*)/(*,*)(2))(*]FB*)(*|*),(*|*)(*FB[*)((\[Pi])(*,*)/(*,*)(2))(*]FB*)(*|*)}](*|*)(*1:eJxTTMoPSmNiYGAo5gESnnklqelFiSWpTvkVmYwgURYgEVJUmgoAvmMJeQ==*)(*]TB*))(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkAguqcxJdcqvgIiA5INKc1KLeUBSGfnlzvl5Jal5JcXFrEABt8Sc4lRsCkuKMgv88zzzCkpLEAoBE0ocRw=="*)(*]BB*))(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRAeB5BwK0rMTXXKr0hjgskHleakFvMAGcElRZkF/nmeeQWlJcWsILWJOcWpAG8uEdg="*)(*]BB*)
```


## Supported output forms
- [StandardForm](frontend/Reference/Decorations/StandardForm.md)
