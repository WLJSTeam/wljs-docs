---
env:
  - WLJS
package: wljs-sound
---
```mathematica
SampledSoundList[{buffer__Real}, sampleRate_Integer:8000]
```

represents a buffer for PCM-encoded sound wave, where sampled sound data is stored in `buffer` as a plain sequence of real numbers in the range from `0` to `1`.

## Methods
### `Sound`
Plays or emits a sound stored in `SampledSoundList`

```mathematica
Sound[
	SampledSoundList[
		Table[Sin[2 \[Pi] 50 t], {t, 0, 1, 1./2000}], 8000
	]
]
```

