---
env:
  - WLJS
package: wljs-graphics-d3

source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/Kernel.wl
---
acts as an option and a context modifier for [Graphics](frontend/Reference/Graphics/Graphics.md) that tells the transition duration for graphics primitives (coordinate changes, and etc) once one of dependencies has been updated

__global__
```mathematica
Graphics[..., TransitionDuration->timems_Integer]
```

__local__
```mathematica
Graphics[{Directive[TransitionDuration->timems_Integer], ...}]
```

Value `timems` is __in milliseconds__.