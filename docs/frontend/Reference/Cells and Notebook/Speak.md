---
env:
  - Wolfram Kernel
---
```mathematica
Speak[expr_, opts___]
```

speaks a spoken representation of the expression `expr`

For example

```mathematica
Speak[Red]
```

## Options
### `"Window"`
By the default is [CurrentWindow](frontend/Reference/Frontend%20IO/CurrentWindow.md)

## Audio object
To get an audio object (see [Audio](frontend/Reference/Sound/Audio.md))

```mathematica
SpeechSynthesize[SpokenString[Red], GeneratedAssetLocation -> None]
```

