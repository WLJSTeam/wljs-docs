---
env:
  - WLJS
  - Wolfram Kernel
update: true

package: wljs-sound
source: https://github.com/JerryI/wljs-sound/blob/master/src/Kernel.wl
numericArray: true
---
```mathematica
PCMPlayer[data_List | _Offload, type_String, opts___]
```

creates a static or dynamic sound emitter. The following data `type`s are supported
- `"SignedInteger32"`
- `"SignedInteger16"`
- `"SignedInteger8"`

where `data` is 1D list of numerical data or [Offload](frontend/Reference/Interpreter/Offload.md) ed symbol with numerical data.

Or also it can also play a regular `Audio` object

```mathematica
PCMPlayer[a_Audio]
```

## Options
### `SampleRate`
The default is `44100`

### `"AutoPlay"`
The default is `True`

### `"Event"`
An `uid` of event to be fired, when a buffer is about to end. It can be used to feed new data to a player aka streaming.

### `"TimeAhead"`
The time is milliseconds, which is offset from the end of the sound buffer and used to fire `"Event"`


## Dynamics
Use `Offload` to feed on data argument to a player in realtime.

### Streaming
The simples example with streaming will look like this

```mathematica
music = Import[...];

(* extract R channel *)
data = AudioData[music, "SignedInteger16"] // First;
buffer = {};

index = 1;
EventHandler["bufferEnds", {"More" -> Function[Null,
  index += 100000;
  If[index > Length[data], Print["End"]; Return[]];
  
  buffer  = data[[index ;; Min[index + 100000 - 1, Length[data]]]]
], "Stop" -> Function[Null,
	index = 1;
]}];

PCMPlayer[buffer // Offload, "SignedInteger16", "Event"->"bufferEnds"]
```

