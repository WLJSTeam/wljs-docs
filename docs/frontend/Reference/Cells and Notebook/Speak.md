---
env:
  - Wolfram Kernel
---
```mathematica
Speak[expr_]
```

speaks a spoken representation of the expression `expr`

For example

```mathematica
Speak[Red]
```

## Audio object
To get an audio object (see [Audio](frontend/Reference/Sound/Audio.md))

```mathematica
SpeechSynthesize[SpokenString[Red], GeneratedAssetLocation -> None]
```

