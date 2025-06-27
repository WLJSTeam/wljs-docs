---
env:
  - Wolfram Kernel

package: wljs-editor
source: https://github.com/JerryI/wljs-editor/blob/dev/src/Notifications.wl
---
:::warning
Only for MacOS users and Desktop Application
:::

```mathematica
HapticFeedback[]
```

produces vibrations on native trackpad or external one. The same function is called on a slider from [InputRange](frontend/Reference/GUI/InputRange.md) 

For example:

```mathematica
Module[{balls1, balls2, balls3, ev = CreateUUID[]},
  balls1 = balls2 = balls3 = {RandomReal[{-0.5,0.5}, 2]};
  balls2 = balls2 + {0.01 RandomReal[{-1,1}, 2]};
  
  EventHandler[ev, Function[Null,
    balls3 = balls2;
    balls2 = balls1;
    balls1 = Map[Function[p, 
      If[Norm[p] > 1,
        HapticFeedback[]; 
        Normalize[p] 0.99
      ,
        p
      ]
    ], (2 balls2 - balls3)];
  ]];

  Graphics[{
    LightBlue, EventHandler[Disk[], {"click" -> Function[xy,
      AppendTo[balls1, xy];
      AppendTo[balls2, xy + 0.01 RandomReal[{-1,1}, 2]];
      AppendTo[balls3, xy];
    ]}], Black, PointSize[0.08], Point[balls1 // Offload],
    AnimationFrameListener[balls1 // Offload, "Event"->ev]
  }, "Controls"->False, TransitionType->None
  ]
]
```

**Each time a ball bounces off the wall, it produces a vibration.**