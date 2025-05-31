There is a few way on how you can put a background image for your slides

## Global settings
You can apply it for all slides by redefining `.reveal` class name

```html title="cell 1"
.wlx

<style>
  .reveal {
    background: black;
    color: white;
  }
</style>
```

now the default background is black

```jsx title="cell 2"
.slide

# Hey, I am Black!
```

:::warning
It will not work to a projected output cell
:::

## Local control
Using RevealJS data attributes, one can specify the background for each slide individually

```jsx
.slide

<!-- .slide: data-background-color="black" -->
<!-- .slide: style="color:white" -->

# Hey, I am black
```

![](./../../../Screenshot%202024-04-10%20at%2009.46.22.png)

## Dynamic background
One can put a giant [Graphics](frontend/Reference/Graphics/Graphics.md) or [Graphics3D](frontend/Reference/Graphics3D/Graphics3D.md) or [Image](frontend/Reference/Image/Image.md) element to the background of your slide. For this reason you need to add some CSS in order to position them properly with a content

:::note
The standard size of a slide is `960x700`
:::

Let us firstly make a draft of our component

```mathematica title="cell 1"
.wlx

BackImageDynamic := Module[{
  frameEvent = CreateUUID[],
  animationEvent = CreateUUID[],
  slideEvent = CreateUUID[],
  allowedQ = False,
  trigger = 1
}, With[{

  Canvas = Graphics[{
    Black, Rectangle[{0,0}, {1,1}], Red,
    curveDynamicGenerator[{0.5,0.5}, 0.8, animationEvent], Blue,
    curveDynamicGenerator[{0.5,0.5}, 0.3, animationEvent],

    AnimationFrameListener[trigger // Offload, "Event"->frameEvent]
  }, "Controls"->False, ImagePadding->0, TransitionDuration->200, ImageSize->{960,700}, PlotRange->{{0,1}, {0,1}}]
},

  EventHandler[frameEvent, Function[Null,
    If[!allowedQ, Return[]];
    If[Mod[trigger, 5] == 0, EventFire[animationEvent, True]];
    trigger = trigger + 1;
  ]];

  EventHandler[slideEvent, {
    "Slide" -> Function[Null,
      allowedQ = True;
      trigger = trigger + 1;
      Print["Animation started"];
    ],

    ("Destroy" | "Left") -> Function[Null,
      allowedQ = False;
      Print["Animation stopped"];
    ]
  }];

  <div>
    <SlideEventListener Id={slideEvent}/>
    <Canvas/>
  </div>
] ]
```

Here, we artificially slow down the Kernel's responses using the `trigger` variable by a factor of 5, so that our background doesn't consume too many resources. Interpolation on the browser side with `TransitionDuration->200` is usually a bit "cheaper." Another concern is not to waste CPU resources, when the slide is not shown, that we solve using `allowedQ` symbol.

 `curveDynamicGenerator` will be our animated fragment

```mathematica title="cell 2"
curveDynamicGenerator[center_, radius_, ev_] := With[{}, 
Module[{
  pts = Table[Norm[center - radius] {Sin[i], Cos[i]} +
         center, {i, 0, 2 Pi + 0.1, 0.1}],
         
  disk = {10,10},
  modulation = 0.,
  phase = 0.,
  initial = 12. RandomInteger[{0,10}]
},

  EventHandler[EventClone[ev], Function[Null,
      pts = Table[(
        Norm[center - radius] 
        + 0.02 modulation Sin[50. i + 30 phase]
      ) {Sin[i], Cos[i]} + center
      , {i, 0, 2 Pi + 0.1, 0.01}];

      disk = With[{i = 3. phase + initial},
        (Norm[center - radius] 
        + 0.01 modulation Sin[50. i + 30 phase]
        ) {Sin[i], Cos[i]} + center
      ];

      phase = phase + 0.02;
      modulation = Sin[phase/2];
  ]];
  
  {
    Line[pts // Offload], 
    Disk[disk // Offload, 0.013]
  }
]]
```

:::tip
To make sure that the slide heigh is `100%` of the window, add the attribute
```html
.slide

<!-- .slide: style="height:100%" -->
```
:::

Let's place our background on the slide and ensure it doesn't take up space there using the `position` property in CSS.

```jsx
.slide

<!-- .element: data-background-color="black" -->
<!-- .slide: style="height:100vh; color: white;" -->

<div class="flex flex-col h-full"> 

<div class="absolute w-full h-full" style="scale: 1.1; left:-30px; z-index:-100">
  <BackImageDynamic/>
</div>

<div class="mt-auto mb-auto">
    
  
# Procedural background

It will be animated till slide is visible

</div>
</div>

---

<!-- .element: data-background-color="black" -->
<!-- .slide: style="height:100vh; color: white;" -->

Now the animation stops
```

Demonstration

![](./../../../SlideDynBackground.png)


