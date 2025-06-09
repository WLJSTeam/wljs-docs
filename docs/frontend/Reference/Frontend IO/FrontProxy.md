---
env:
  - Wolfram Kernel
package: wljs-editor

---

:::warning
Definitions are not loaded to the main context
:::

An low-level optional abstraction for managing and manipulating graphical or any dynamic [frontend instances](frontend/Advanced/Frontend%20interpretation/WLJS%20Functions.md) efficiently and process them in batch. The idea is to use proxy objects as lightweight references to groups of instances (like rectangles, circles combined with other primitives) in a larger scene and __minimize the data transfer__ and symbols usage.

All properties of proxies are stored in linear auto-sizable buffers, which allows JIT-enabled processing and easy sync with a frontend (single transaction).

## Needs
To load this library use any context that differs from `Global`

```mathematica
Needs["FrontProxy`" -> "f`"] // Quiet
```

## Factory
Creates a new proxy type

```mathematica
f`Proxy[{properties__}, body_] _FrontProxy`Reference
```

or if you want to specify mutable properties explicitly

```mathematica
f`Proxy[{properties__}, body_, {mutable__}] _FrontProxy`Reference
```

For example to make proxy for many [Disk](frontend/Reference/Graphics/Disk.md)s with controllable opacity, color and position

```mathematica
disk = f`Proxy[{pos, c}, {
	Opacity[c], RGBColor[With[{h=c}, {h, 1-h, 0.}]],
    Disk[pos, 0.1]
}];
```

:::info
Proxy factory will automatically wrap all mentioned variables `pos` and `c` linear buffer parts wrapped with [Offload](frontend/Reference/Interpreter/Offload.md)
:::

## Constructor
To construct an single instance
```mathematica
f`AddTo[_FrontProxy`Reference, {args__}] _Integer
```

To construct multiple instances use
```mathematica
f`AddTo[_FrontProxy`Reference, {args__}..] _List
```

as a result it returns __a plain `List` of integers corresponding to the internal `Ids`__. For example

```mathematica
ids = f`AddTo[disk, Sequence @@ Table[{RandomReal[{-1,1}, 2], RandomReal[{0,1}]}, {10}]];
```

## Methods
The following methods can be applied

### `FullForm`

```mathematica
f`FullForm[_FrontProxy`Reference, id_Integer]
```

```mathematica
f`FullForm[_FrontProxy`Reference, {id__Integer}]
```

Reveals the actual expressions. This method can be used to display an object. For example

```mathematica
Graphics[{f`FullForm[disk, ids]}, PlotRange->{{-1,1}, {-1,1}}]
```


### `Remove`
Removes the given proxy or list of proxies by provided Ids (live)

```mathematica
f`Remove[_FrontProxyFunction, Id_Integer]
```

```mathematica
f`Remove[_FrontProxyFunction, {Id__Integer}]
```

### `Dispatch`
Dispatches the changes made to the properties of proxies and effectively syncing all buffers

```mathematica
f`Dispatch[_FrontProxyFunction]
```

It is called usually when all calculations have been finished and an update is needed to see the changes. Behind the scenes it submits all buffers storing the properties of object to the frontend.


### `FrontProxyBuffer`
Provides a read access to the slice of a given property of all proxies in a form if linear packed array

```mathematica
FrontProxyBuffer[_FrontProxyFunction, index_Integer] _List
```

where `index` goes from the first property provided in [Constructor](#Constructor) to the last. There is a special case

```mathematica
FrontProxyBuffer[_FrontProxyFunction, -1] _List
```

which __returns a boolean array standing for the validity of the property at the given position__. Since proxies are dynamic and can be created or removed any time it might temporary lead to "holes" in buffers marked as `False` in the list.

Each position in buffers does correspond to `Id` returned by [Constructor](#Constructor)

### `FrontProxyBufferSet`
Updates a given property buffer with a new array

```mathematica
FrontProxyBuffer[_FrontProxyFunction, index_Integer, new_List]
```

For example one can update `disks` primitives in the following way

```mathematica
  With[{
    position = f`Buffer[disk, 1]
  },
    With[{velocity = Table[{a[[2]], -a[[1]]}, {a, position}]},
    
    f`BufferSet[disk, 1, position - 0.1 velocity];
    f`Dispatch[disk];
    ];
  ];
```

It will cause the rotation of all disks

## Tips

:::tip
If you dynamically add proxies to the scene. Call [`Dispatch`](#`Dispatch`) before submitting it to a scene. This will make sure, that the buffer size is up-to date on the frontend as well.
:::

:::tip
For fast animations with many proxies involved turn off transition interpolation globally on [Graphics](frontend/Reference/Graphics/Graphics.md) using an option [`TransitionType`](frontend/Reference/Graphics/Graphics.md#`TransitionType`) set to `None`.
:::

:::tip
For processing many proxies use pure functions with `Map`, `Table` or `MapThread` and etc. __Multiple passes using less complicated function cost less__, than a single pass with one complex due to JIT.
:::

## Examples

### Spherical attracting molecules
Here we will use Lennard-Jones potential to model a bunch of sphere-like molecules on 2D canvas aka [Graphics](frontend/Reference/Graphics/Graphics.md) 

```mathematica @
disk = f`Proxy[{pos, c}, {
	Opacity[0.2], RGBColor[With[{h=c}, {h, 1-h, 0.}]],
    Disk[pos, 0.1]
}];

disks = f`AddTo[disk, Sequence @@ Table[{RandomReal[{-1,1}, 2], 0.2}, {10}]];

animation = CreateUUID[];
scene = FrontInstanceReference[];

trigger = 1;

potential = Function[{a,b}, With[{r = Norm[a-b]+0.001, r0 = 0.22},
  With[{c = (*FB[*)((3.0 ((*SpB[*)Power[r0(*|*),(*|*)6](*]SpB*)))(*,*)/(*,*)((*SpB[*)Power[r(*|*),(*|*)8](*]SpB*)))(*]FB*)-(*FB[*)((3.0 ((*SpB[*)Power[r0(*|*),(*|*)12](*]SpB*)))(*,*)/(*,*)((*SpB[*)Power[r(*|*),(*|*)14](*]SpB*)))(*]FB*)},
    If[Abs[c] > 100.0, {0.,0.}, (a-b) c]
  ]
]];

EventHandler[animation, Function[Null,
  With[{
    position = f`Buffer[disk, 1],
    state    = f`Buffer[disk, 2]
  },
    With[{velocity = Map[Total] @ Table[potential[a,b], {a, position}, {b, position}]},
      With[{
        character = Map[Clip[5.0 Norm[#], {0.2, 0.8}]&, velocity]
      },
        f`BufferSet[disk, 1, position - 0.001 velocity];
        f`BufferSet[disk, 2, character];

        f`Dispatch[disk];
      ];
    ];
  ];

  trigger = 1;
]];

add = With[{new = f`AddTo[disk, {#, 0.2}]},
  f`Dispatch[disk];
  FrontSubmit[f`FullForm[disk, new], scene];
]&;

Graphics[{
  f`FullForm[disk, disks], scene,
  AnimationFrameListener[trigger // Offload, "Event"->animation],
  EventHandler[Null, {"click" -> add}]
}, PlotRange->{{-1,1}, {-1,1}}, TransitionType->None]
```

![](./../../../lenard-ezgif.com-video-to-gif-converter.gif)
### Fireworks
A crash test for the frontend system

```mathematica
(* Define the rectangle proxy with initial properties *)
rectangleProxy = f`Proxy[
  {position, velocity, rotationAngle, lifeSpan}, 
  Translate[
    {Opacity[lifeSpan], RGBColor[With[{l = lifeSpan}, {l, 0, 1 - l}]], Rectangle[{-1, -1}, {1, 1}]}, 
    position
  ]
];

(* Initialize variables *)
newProxies = {};
expiredProxies = {};
frameCounter = 1;
frameRate = 1;
lastUpdateTime = AbsoluteTime[];

sceneReference = FrontInstanceReference[];

(* Function to add new proxies at a given position *)
addProxyAtPosition[position_] := newProxies = {
  newProxies, 
  f`AddTo[
    rectangleProxy, 
    Sequence @@ Table[
      {position, RandomReal[{0.99, 1.01}] {Cos[angle], Sin[angle]} // N, RandomReal[{0, 3.14}], 1.0},
      {angle, 0., 2 Pi, 2 Pi / 12.0}
    ]
  ]
};

(* Frame update logic *)
Module[{},
  EventHandler["frame", Function[Null,
    With[{
      positions = f`Buffer[rectangleProxy, 1],
      velocities = f`Buffer[rectangleProxy, 2],
      lifeSpans = f`Buffer[rectangleProxy, 4],
      isValid = f`Buffer[rectangleProxy, -1]
    },
      (* Identify expired proxies for disposal *)
      expiredProxies = MapThread[
        If[#1 && #2 < 0.2, #3, Nothing] &, 
        {isValid, lifeSpans, Range[Length[lifeSpans]]}
      ];
      
      (* Update positions and life spans *)
      f`BufferSet[rectangleProxy, 1, positions + velocities];
      f`BufferSet[rectangleProxy, 4, lifeSpans * 0.95];
    ];

    (* Dispatch updates to proxies *)
    f`Dispatch[rectangleProxy];

    (* Remove expired proxies *)
    If[Length[expiredProxies] > 0,
      f`Remove[rectangleProxy, expiredProxies];
      expiredProxies = {};
    ];

    (* Submit new proxies *)
    If[Length[newProxies] > 0, 
      FrontSubmit[f`FullForm[rectangleProxy, newProxies // Flatten], sceneReference];
      newProxies = {};
    ];

    (* Update FPS counter *)
    With[{currentTime = AbsoluteTime[]},
      If[currentTime - lastUpdateTime > 1.0,
        frameRate = Round[(frameCounter + frameRate) / 2.0];
        frameCounter = 1;
        lastUpdateTime = currentTime;
      ,
        frameCounter++;
      ];
    ];
  ]]
];

(* Create the graphics and event handlers *)
Graphics[
  {
    sceneReference, 
    {Directive[FontSize -> 20], Text[frameRate // Offload, {-80, -80}]}, 
    AnimationFrameListener[frameCounter // Offload, "Event" -> "frame"], 
    EventHandler[
      Null, 
      {"mousemove" -> addProxyAtPosition}
    ]
  }, 
  PlotRange -> {{-100, 100}, {-100, 100}}, 
  TransitionType -> None
]
```

![](./../../../fire-ezgif.com-video-to-gif-converter.gif)