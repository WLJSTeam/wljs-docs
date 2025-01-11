Cells and window objects can also emit events and there is no need in cloning event objects to assign multiple handlers (it is done automatically once an `EventHandler` method is applied).

## Cells
There are following functions are available to extract cell objects [RemoteCellObj](frontend/Reference/Cells%20and%20Notebook/RemoteCellObj.md) from the evaluation context

- [EvaluationCell](frontend/Reference/Cells%20and%20Notebook/EvaluationCell.md) an input cell (where the code is written)
- [ResultCell](frontend/Reference/Cells%20and%20Notebook/ResultCell.md) an output cell (even if it does not exists yet)

There are following patterns available to attach handlers

 - `"Destroy"`
 - `"State"`
 - `"Error"`

The most practical one is the first one

```mathematica
With[{},
  EventHandler[ResultCell[], {"Destroy" -> (Print["Destroyed!"] &)}];
  "Lovely day"
]
```
*try to reevaluate it multiple times*

It can be used to unsubscribe from listeners, stop tasks once a cell has been reevaluated or destroyed. 

:::info
Cell events are supported for all types of cells including [WLX](frontend/Cell%20types/WLX.md), [Slides](frontend/Cell%20types/Slides.md), and etc.
:::

:::info
Cell events are working as well for __projected outputs to new windows__
:::


## Window
A [WindowObj](frontend/Reference/Frontend%20IO/WindowObj.md) represents a current window, where the notebook is running. Usually it is used in [FrontFetch](frontend/Reference/Frontend%20IO/FrontFetch.md), [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md), however it also supports a few patterns for handlers

- `"Closed"`

:::tip
Use `"Closed"` event to remove tasks running in the background
:::

*example*
```mathematica
test = {0,1,0};

EventHandler[CurrentWindow[], {"Closed" -> Function[Null,
  test = {1,0,0};
]}];

Graphics[{RGBColor[test // Offload], Disk[{0,0}, 1]}]
```

Try to reload a page / window and see the changes.