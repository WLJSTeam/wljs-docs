---
env:
  - WLJS
  - Wolfram Kernel
package: wljs-sound
---
```mathematica
SoundNote[note_String, duration_:1]
```

represents a single note, where `note` can be `"C"`, `"C#"`, ... and etc. `duration` is given in seconds. To specify octave place a number as a first character, i.e. `"C4"`

```mathematica
SoundNote[note_Integer, duration_:1]
```

represents a note, where `note` is a semitone integer, i.e. C4 is `0`, C#4 is `1` and etc.

```mathematica
SoundNote[{notes__}, duration_:1]
```

represents a group (vertical in the timeline) of `notes`, which can be a chord for example E Major

```mathematica
SoundNote[{"E", "G#", "B"}]
```

## Methods

### `Sound`
To play or emit sound wrap a list of `SoundNote` or a single one into [Sound](frontend/Reference/Sound/Sound.md)

```mathematica
SoundNote[{"E", "G#", "B"}] // Sound
```

