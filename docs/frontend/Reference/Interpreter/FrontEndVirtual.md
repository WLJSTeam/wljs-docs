---
env:
  - WLJS
virtual: true
---
It is a virtual [containers-executable](frontend/Advanced/Frontend%20interpretation/WLJS%20Functions.md#Containers%20Executables) wrapper for any expressions evaluated on WLJS

```mathematica
FrontEndVirtual[expr_]
```

This is alternative way of making [Containers | Virtualization](frontend/Advanced/Frontend%20interpretation/WLJS%20Functions.md#Containers%20Virtualization) for any expression

###### Another option
You do not need `FrontEndVirtual` if you add one line to your Javascript code

```js title="change"
...

core.YouSymbol.virtual = true
```

this will tell WLJS Interpreter to automatically create an instance


