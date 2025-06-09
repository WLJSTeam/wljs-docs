---
sidebar_position: 4
---
Any animation sequence can be rendered to the sequence of images. Since graphical canvas can include a mixture of an arbitrary expressions containing HTML elements, SVG, WebGL canvas we rely on the direct render of Chromium Engine on-page:

- You keep the notebook open (probably fullscreen)
- Animating is played __lively__ at lower speeds to achieve higher frame rates
- Chromium is taking screenshots of the area of the scene and saves them on the disk

:::warning
This feature is only available for WLJS Notebook __desktop application__
:::

## Tips
- Use `PauseAsync` with `scene` object provided

```mathematica
...your timeline
❌ PauseAsync[3] // Await
✅ PauseAsync[scene, 3] // Await
```

This allows to lock the time with the frame rate


## How to record?
Let's try with a simple example

### Step 1
Import a library and define an animation timeline:

```mathematica
Needs["AnimationFramework`"->"af`"];
```

```mathematica
timeline = AsyncFunction[scene, Module[{d},
  d = af`AddTo[scene, {
    Opacity[#o], 
    Translate[
      Rotate[
        Rectangle[{-0.5,-0.1}, {0.5,0.1}]
      , #r]
    , #c]
  }, {
    "o" -> 0.,
    "r" -> 0.,
    "c" -> {0,0}
  }];

  af`Animate[scene, d, {"o" -> 1.0,"r" -> 3.14}, "Ease", 1.0] // Await;

  PauseAsync[scene, 0.4] // Await;

  af`Animate[scene, d, {"c"->{0.5,0.5}}, "Ease", 1.0] // Await;
  af`Animate[scene, d, {"c"->{-0.5,0.5}, "r"->4.2}, "Ease", 1.0] // Await;
  af`Animate[scene, d, {"c"->{0.5,-0.5}}, "Ease", 1.0] // Await;

  af`Animate[scene, d, {"c"->{0.,0.}, "o"->0., "r"->0}, "Ease", 1.0] // Await;

  af`Remove[d];
]];
```

### Step 2


```mathematica
r = af`RecordAnimation[animation, ImageSize->Large, FrameRate->60];
```

To start recording - evaluate `r` and resize the notebook __to fit the render window__:

```mathematica
r
```

![](./../../../Screenshot%202025-06-05%20at%2017.52.42.png)


### Step 3
Once the rendering has been finished, you can see the exported series:

```mathematica
r["OutputDirectory"] // SystemOpen
```

### Step 4 (Optional)
Make a video using Wolfram Standard library

```mathematica
af`RecorderToVideo[r]
```

