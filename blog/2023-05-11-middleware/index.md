---
slug: middleware-example
title: Introducing middleware event handlers
authors: jerryi
tags: [frontend, dynamics]
enableComments: true
---

:::danger
In development
:::

To describe the idea of a new tool better, it is good to start from the initial problem. 

The data transfer via `ExpressionJSON` representation over the WebSocket protocol adds a significant latency. What if we want to implement __real-time visualization with a least  $\sim 30FPS$ ?__

<!--truncate-->

## Interpolation
A standard library [wljs-graphics-d3](https://github.com/JerryI/wljs-graphics-d3) based on D3.js provides a decent transition mechanism, that makes a nice animated transitions from the old dataset to a new one perfectly in-sync with browser's refresh rate.

Let us have a look at the example __with no interpolation involved__

```mathematica
p = {-1,0};
Graphics[{PointSize[0.1], Point[{p} // Hold]}, "TransitionDuration"->0.1]
```

By updating the position 

```mathematica
Do[
  p = {x, Cos[10 x]}; 
  
  (* simulate load *)
  Pause[0.2];
, {x,-1,1,0.1}]
```

we will see the following

![](ezgif.com-video-to-gif-19.gif)

To __enable the interpolation__ specify `TransitionDuration`

```mathematica
Graphics[{Cyan, PointSize[0.1],Point[{p} // Hold]}, ImageSize->{600,100}, "TransitionDuration"->300, "TransitionType"->"Linear"]
```

Now the transition time overlaps with our `Pause[0.2]` time period, that results in a kinda smooth behaviour. 

![](ezgif.com-video-to-gif-20.gif)

This approach might work well in a case, __when there is only one object to animate__. However, the artificial `Pause` to slow-down the animation (in a case if the actual calculation happens faster than we want to see)

## Many objects
Let us show an example with many objects to be animated


