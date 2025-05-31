---
env:
  - WLJS
  - Wolfram Kernel
package: wljs-sound
---
```mathematica
Sound[primitives_]
```

represents sound as a concept composed from `primitives`. Draws a player widget once appears in the output form - [StandardForm](frontend/Reference/Formatting/StandardForm.md)

`primitives` can be a simple primitive or a `List` of primitives played sequentially 

## Primitives

### `SoundNote`

### `SampledSoundList`



## Examples
Play chord composed from [SoundNote](frontend/Reference/Sound/SoundNote.md)

```mathematica
Sound[SoundNote[{"E", "G#", "B"}]]
```

![](./../../../Screenshot%202024-12-18%20at%2020.51.36.png)

Play D Major scale up and down doubled in up-octave

```mathematica
major = {2,2,1,2,2,2};
SoundNote[{#, # + 12}] &/@ Accumulate[Join[{2}, major, -major]] // Sound
```

## Emit sound without a widget
It is possible to play the sound programmatically without a widget using [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md)

```mathematica
EventHandler[InputButton[], Function[Null,
  FrontSubmit[Sound[SoundNote[RandomInteger[{0, 12}]]]]
]]
```

or __use [EmitSound](frontend/Reference/Sound/EmitSound.md)__

:::tip
If you want to continuously stream raw sound data, consider to use [PCMPlayer](frontend/Reference/Sound/PCMPlayer.md)
:::
