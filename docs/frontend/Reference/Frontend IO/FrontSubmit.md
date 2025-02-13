---
env:
  - Wolfram Kernel

source: https://github.com/JerryI/wljs-editor/blob/dev/src/FrontSubmitKernel.wl
package: wljs-editor
---
Sends an expression to be executed on WLJS Interpreter (frontend / browser)

```mathematica
FrontSubmit[expr_, opts___]
```

## Options
### `"Window"`
specifies a window socket, to which an expression will be sent. Use [CurrentWindow](frontend/Reference/Frontend%20IO/CurrentWindow.md) to fetch a window object from the evaluation context.

:::warning
Be aware of a context loss in a case of an handler function called from outside. For example with [Parallel kernels](frontend/Advanced/Events%20system/Parallel%20kernels.md) or [`SetTimeout`](frontend/Reference/Misc/Async.md#`SetTimeout`) one have to explicitly provide a [WindowObj](frontend/Reference/Frontend%20IO/WindowObj.md)

```mathematica
With[{win = CurrentWindow[]},
	(* Current evaluation context *)
	
	SetTimeout[
		(* Evaluation context lost!!! *)
		FrontSubmit[Alert["Boom"], "Window"->win]
	, 3000];
	
	"Hi there!"
]
```

:::


:::tip
Please have a look at this guide - [Advanced animation](frontend/Advanced/Dynamics/Advanced%20animation.md)
:::

## Examples
### Calling an WLJS (or Frontend) function

```mathematica
FrontSubmit[Alert["Hello World!"]]
```

which will produce a pop-up modal window.

Or to call a custom-defined Javascript function

```js title="cell 1"
core.ShowReversed = async (args, env) => {
	const text = await interpretate(args[0], env);
	alert(text..split("").reverse().join(""));
}
```

```mathematica title="cell 2"
FrontSubmit[ShowReversed["Must be reversed..."]];
```

### Append objects to a static graph
We can append anything to a graphics canvas without reevaluation of a cell

```mathematica title="cell 1"
scene = FrontInstanceReference[];
Plot[x, {x,0,1}, Epilog->{scene}]
```

and then

```mathematica title="cell 2"
FrontSubmit[Arrow[RandomReal[{0,1}, {2,2}]], scene]
```

to append an arrow to an existing graph.

### Controlling ViewBox
A typical graphics figure is usually a [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md). Here we can reference it using [FrontInstanceReference](frontend/Reference/Frontend%20IO/FrontInstanceReference.md)

```mathematica
plot.= FrontInstanceReference[];
Plot[x, {x,0,1}, Epilog->{plot}]
```

and then we can destroy it and replace with some other text

```mathematica
FrontSubmit[ViewBox`OuterExpression["Hello World"], plot] 
```


