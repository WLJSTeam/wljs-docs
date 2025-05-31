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

#### Possible events
##### Normal cells
- `"Destroy"` when a cell was removed

##### Projected cells 
*See [CellPrint](frontend/Reference/Cells%20and%20Notebook/CellPrint.md) with window Target*

- `"Mounted"` fired once cell is mounted and is ready, returns [WindowObj](frontend/Reference/Frontend%20IO/WindowObj.md);

:::note
`"Mounted"` can be fired multiple times in the case if a window was refreshed (or reconnected)
:::

- `"Closed"` fired when user closes window (or connection breaks), returns [WindowObj](frontend/Reference/Frontend%20IO/WindowObj.md)


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