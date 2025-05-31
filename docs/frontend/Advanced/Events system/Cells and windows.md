Cells and window objects can also emit events, and there is no need to clone event objects to assign multiple handlers (this is done automatically once the `EventHandler` method is applied).

## Cells
The following functions are available to extract cell objects ([RemoteCellObj](frontend/Reference/Cells%20and%20Notebook/RemoteCellObj.md)) from the evaluation context:

- [EvaluationCell](frontend/Reference/Cells%20and%20Notebook/EvaluationCell.md): the input cell (where the code is written)
- [ResultCell](frontend/Reference/Cells%20and%20Notebook/ResultCell.md): the output cell (even if it does not exist yet)

The following patterns are available to attach handlers:

- "Destroy"
- "State"
- "Error"

The most practical one is the first:

```mathematica
With[{},
  EventHandler[ResultCell[], {"Destroy" -> (Print["Destroyed!"] &)}];
  "Lovely day"
]
```
*Try reevaluating it multiple times.*

It can be used to unsubscribe from listeners or stop tasks once a cell has been reevaluated or destroyed. 

:::info
Cell events are supported for all types of cells, including [WLX](frontend/Cell%20types/WLX.md), [Slides](frontend/Cell%20types/Slides.md), etc.
:::

:::info
Cell events also work for __projected outputs to new windows__.
:::

## Window
A [WindowObj](frontend/Reference/Frontend%20IO/WindowObj.md) represents the current window where the notebook is running. It is usually used in [FrontFetch](frontend/Reference/Frontend%20IO/FrontFetch.md) and [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md), but it also supports a few handler patterns:

- "Closed"

:::tip
Use the "Closed" event to remove tasks running in the background.
:::

*Example:*
```mathematica
test = {0,1,0};

EventHandler[CurrentWindow[], {"Closed" -> Function[Null,
  test = {1,0,0};
]}];

Graphics[{RGBColor[test // Offload], Disk[{0,0}, 1]}]
```

Try reloading the page or window and observe the changes.
