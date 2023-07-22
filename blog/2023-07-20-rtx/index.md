---
slug: rtx-intro
title: Realtime path-tracing
authors: jerryi
tags: [frontend, graphics]
enableComments: true
---

![](Screenshot%20from%202023-07-20%2020-04-08.png)

There is nothing more exciting in programming than designing a graphics application. Thankfully, there is one person on Github [Garrett Johnson](https://github.com/gkjohnson), who implemented a path-tracing algorithm on top of the well-known [THREE.js](https://threejs.org) graphics engine. Moreover, it fully supports features from the original library and can be anytime flipped as a main renderer.

<!--truncate-->

I hooked up his [library](https://github.com/gkjohnson/three-gpu-pathtracer) to works as a secondary engine for `Graphics3D` function presented in [wljs-graphics3d-threejs](https://github.com/JerryI/Mathematica-ThreeJS-graphics-engine) library. Just pass an option

```mathematica
Graphics3D[%, "RTX"->True]
```

And it will bake a realtime photorealistic image. It also supports all properties used in traditional rendering, i.e. `Emissive[]`, `Metallness[]`, HDRI map and many more!

Some classical examples from Wolfram Mathematica

![](IMG_0556.png)

