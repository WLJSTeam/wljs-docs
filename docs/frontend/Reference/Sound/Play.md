---
draft: false
package: wljs-sound
env:
  - Wolfram Kernel
---


```mathematica
Play[f, {t, tmin, tmax}, opts___] _Sound
```

creates an object that plays as a sound whose amplitude is given by `f` as a function of time `t`.

## Options

### `SampleRate`
The default is `8000`

:::note
Is effectively generate [SampledSoundList](frontend/Reference/Sound/SampledSoundList.md) and feed it to [[Sound]]
:::