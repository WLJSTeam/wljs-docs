---
env:
  - Wolfram Kernel
package: wljs-editor

source: https://github.com/JerryI/wljs-editor/blob/dev/src/RemoteCellsKernel.wl
---
a remote representation of a notebook cell for evaluation Kernel

```mathematica
RemoteCellObj[uid_String] _RemoteCellObj
```

## Methods
### `Delete`
Deletes a given cell in the notebook

```mathematica title="Self destruction"
With[{cell = EvaluationCell[]},
	EventHandler[InputButton["Bye"], Function[Null,
		cell // Delete
	]]
]
```
*removes an input cell*

### `EventHandler`
There is an adapter for [`EventHandler`](frontend/Reference/Misc/Events.md#`EventHandler`) method. You can listen a cell's events from the evaluation Kernel  

```mathematica
With[{cell = EvaluationCell[]},
	EventHandler[cell, {any_ :> (Print[any, ": ", #]&)}];
]
```
*listen all events from the input cell*

### `Set`
Use `"Data"` field to mutate the content live

```mathematica
With[{cell = EvaluationCell[]},
  cell["Data"] = "1+1"
]
```

:::warning
For now only works for input cells
:::