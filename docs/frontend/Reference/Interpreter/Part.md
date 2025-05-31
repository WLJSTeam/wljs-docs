---
env:
  - WLJS
  - Wolfram Kernel
update: true
numericArray: true
---
```mathematica
symbol[[i]]
```

gives the _i_-th part of a symbol

```mathematica
symbol[[-i]]
```

gives the _i_-th part of a symbol form the end

```mathematica
symbol[[i, j]] or Part[symbol, i, j]
```

takes _i_-th and then _j_-th part of a symbol (better optimized than the sequence of two `Part`)

```mathematica
symbol[[{i, j, k}]]
```

takes _i,j,k_ parts and arrange it as a list

```mathematica
symbol[[begin ;; end]]
```

takes elements from begin to end (included)

```mathematica
symbol[[begin ;; end ;; step]]
```

takes elements from begin to end though step

```mathematica
symbol[["key"]] or symbol[[Key["key"]]]
```

takes `"key"` from the association `symbol`


## Notes on WLJS Interpreter
If used inside [Offload](frontend/Reference/Interpreter/Offload.md) or directly on WLJS Interpreter multiple parts pattern is not yet supported, i.e. use

```mathematica
val[[3]][[1]] // Offload ✅
```

instead of 

```mathematica
val[[3,1]] // Offload ❌
```

Any other patterns are not supported