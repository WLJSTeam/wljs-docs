---
sidebar_position: 2
---
# 2. Static decorations

One of the feature advantage of Wolfram Mathematica and WLJS Notebook is a multimodal cells with a powerful syntax sugar. A visual representation of an instance of an object makes the programming experience more educative for sure.

## Summary Item
The easiest way of providing a bit more information, but still keeping the actual expression intact is to use [ArrangeSummaryBox](frontend/Reference/Formatting/ArrangeSummaryBox.md)

```mathematica
StateMachine /: MakeBoxes[s: StateMachine[symbol_Symbol?AssociationQ], form: (StandardForm | TraditionalForm)] := Module[{},
	With[{
		summary = {BoxForm`SummaryItem[{"State: ", s["State"]}]}
	},
		BoxForm`ArrangeSummaryBox[
			StateMachine,
			s,
			None,
			summary,
            Null
		]
	]
] 
```

Here we redefined a standard output form to a decorated summary box, providing the visible state field

```mathematica
StateMachine["State" -> 3]
```

![](./../../../Screenshot%202024-05-01%20at%2019.29.27.png)

:::info
Despite the fact of looking different, you can still work with it normally: setting and getting properties, i.e.

![](./../../../Screenshot%202024-05-01%20at%2019.31.40.png)

is 100% valid
:::

## Custom decorations
One can do all decorations from scratch using [Graphics](frontend/Reference/Graphics/Graphics.md) for instance

```mathematica
StateMachine /: MakeBoxes[s: StateMachine[symbol_Symbol?AssociationQ], form: (StandardForm | TraditionalForm)] := Module[{},
	With[{
		g = Graphics[{ Opacity[0.5],
			Table[
				Rotate[{
                  Hue[i/12.0, 1.0, 0.5],
                  Rectangle[{-1,-1}, {1,1}]
                }, i / (s["State"]+1)]
			, {i, 0, 6Pi, Pi}]
		}, ImageSize->{100,100}, ImagePadding->None]
	},
		ViewBox[s, g]
	]
] 
```

The result will look like

```mathematica
machine = StateMachine[]
```

![](./../../../Screenshot%202024-05-01%20at%2019.50.18.png)

```mathematica
StateMachineChange[machine, 2]
```

![](./../../../Screenshot%202024-05-01%20at%2019.51.05.png)

## Summary Item and Custom decoration
Why not to merge both leaving the graphics as an icon?

```mathematica
StateMachine /: MakeBoxes[s: StateMachine[symbol_Symbol?AssociationQ], form: (StandardForm | TraditionalForm)] := Module[{},
	With[{
		summary = {BoxForm`SummaryItem[{"State: ", s["State"]}]},
		icon = Graphics[{ Opacity[0.5],
			Table[
				Rotate[{
                  Hue[i/12.0, 1.0, 0.5],
                  Rectangle[{-1,-1}, {1,1}]
                }, i / (s["State"]+1), {0.,0.}]
			, {i, 0, 6Pi, Pi}]
		}, ImageSize->{50,50}, AspectRatio->1, ImagePadding->None]
	},
		BoxForm`ArrangeSummaryBox[
			StateMachine,
			s,
			icon,
			summary,
            Null
		]
	]
] 
```

```mathematica
machine = StateMachine["State"->2]
```

![](./../../../Screenshot%202024-05-01%20at%2019.55.18.png)

## Javascript decoration
There is also an option to use pure Javascript to render an object, let us make our layout much simpler starting with

```mathematica
StateMachine /: MakeBoxes[s: StateMachine[symbol_Symbol?AssociationQ], form: (StandardForm | TraditionalForm)] := Module[{},
	ViewBox[s, CustomDecorator[s["State"]]]
] 
```

Here we mentioned `CustomDecorator` which is going to be our [WLJS Function](frontend/Advanced/Frontend%20interpretation/WLJS%20Functions.md)

Then, create a new cell

```js
.js

core.CustomDecorator = async (args, env) => {
	const state = await interpretate(args[0], env);
	const element = env.element;

	element.classList.add('flex', 'rounded-md', 'p-2');
	element.style.border = "1px solid #999";
	element.style.boxShadow = "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)";

    element.style.transitionDuration = '0.8s';
    element.style.transitionProperty = 'transform';

    setTimeout(() => {
      element.style.transform = "rotate(360deg)";
    }, 100);

	element.innerText = state;
}
```

The result will be following

![](./../../../AniBox%20video%20to%20gif.gif)


## Animated decoration in Summary Item
Why not also animate it using Wolfram Language?

Let it be many balls bouncing the walls. Firstly let us make proof of concept

```mathematica title="test"
balls = RandomReal[{-1,1}, {4,2}];
velocities = RandomReal[{-1,1}, {4,2}];

EventHandler["animate", Function[Null,
  {balls, velocities} = Map[With[{
    v = {If[Abs[#[[1,1]]] >= 1, -1, 1], If[Abs[#[[1, 2]]] >= 1, -1, 1]} #[[2]], 
    p = #[[1]]
  },
    {p + 0.2 v, v}
  ]&, Transpose[{balls, velocities}]] // Transpose;
]]

Graphics[{PointSize[0.03], Point[balls // Offload], AnimationFrameListener[balls // Offload, "Event"->"animate"]}, PlotRange->{{-1,1}, {-1,1}}, TransitionType->None]
```

Now we need only to scope our variables and embed it to summary item

```mathematica
StateMachine /: MakeBoxes[s: StateMachine[symbol_Symbol?AssociationQ], form: (StandardForm | TraditionalForm)] := Module[{
	balls = RandomReal[{-1,1}, {s["State"],2}],
	velocities = RandomReal[{-1,1}, {s["State"],2}],
	animateEvent = CreateUUID[]
},

	EventHandler[animateEvent, Function[Null,
	  {balls, velocities} = Map[With[{
	    v = {If[Abs[#[[1,1]]] >= 1, -1, 1], If[Abs[#[[1, 2]]] >= 1, -1, 1]} #[[2]], 
	    p = #[[1]]
	  },
	    {p + 0.2 v, v}
	  ]&, Transpose[{balls, velocities}]] // Transpose;
	]];

	With[{
		summary = {BoxForm`SummaryItem[{"State: ", s["State"]}]},
		icon = Graphics[{
			PointSize[0.03], Point[balls // Offload],
			AnimationFrameListener[balls // Offload, "Event"->animateEvent]
		}, 
			PlotRange->{{-1,1}, {-1,1}}, 
			TransitionType->None, 
			ImageSize->{50,50}, 
			AspectRatio->1, 
			ImagePadding->None
		]
	},
		BoxForm`ArrangeSummaryBox[
			StateMachine,
			s,
			icon,
			summary,
            Null
		]
	]
] 
```

Then let us see the result

```mathematica
machine = StateMachine["State"->2]
```

![](./../../../BallsDecoration%20video.gif)
