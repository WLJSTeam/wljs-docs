---
package: wljs-sound
update: false
source: https://github.com/JerryI/wljs-sound/blob/master/src/Kernel.wl
---
```mathematica
EmitSound[_Audio | _Sound, opts___]
```

emits (without output or any widgets) a [Sound](frontend/Reference/Sound/Sound.md) or plays [Audio](frontend/Reference/Sound/Audio.md) object. 

## Options
### `"Window"`
The same as in [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md). By the default is [CurrentWindow](frontend/Reference/Frontend%20IO/CurrentWindow.md)



:::tip
If you want to continuously stream raw sound data, consider to use a low-level streamer [PCMPlayer](frontend/Reference/Sound/PCMPlayer.md)
:::
