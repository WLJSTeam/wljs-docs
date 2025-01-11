---
env:
  - Wolfram Kernel
package: wljs-editor
context: Notebook`Editor`Kernel`FrontEndRuntime`
source: https://github.com/JerryI/wljs-editor/blob/dev/src/
---
```mathematica
FrontEndRuntime[]
```

an interface to modify frontend runtime from Wolfram Kernel.

## Append Javascript, CSS from WL package
It comes handy while developing Wolfram Language Packages together with Javascript modules and styles. To extend frontend runtime with external scripts or styles simply `Append` them

```mathematica
FrontEndRuntime[{"Modules", "js"}] = Append[FrontEndRuntime[{"Modules", "js"}], File["path to your JS"]]
```

```mathematica
FrontEndRuntime[{"Modules", "css"}] = Append[FrontEndRuntime[{"Modules", "css"}], File["path to your CSS"]]
```

These command automatically add the provided data to all opened notebooks and will keep them in the current session (even if you kill a Kernel or reload a notebook)


### How to check if a Wolfram Package runs in WLJS Notebook environment 
There is a special internal variable for this purpose available from any context (technically you specify the context explicitly)

```mathematica
Internal`Kernel`WLJSQ // TrueQ
```



