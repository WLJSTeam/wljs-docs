---
env:
  - Wolfram Kernel

---
```mathematica
WindowObj[assoc_Association]
```

an internal representation of a current window (can be a notebook or projected cell), that contains the information of a live connection to it used by [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md), [FrontFetch](frontend/Reference/Frontend%20IO/FrontFetch.md), [FrontSlidesSelected](frontend/Reference/Slides/FrontSlidesSelected.md) and other functions.

It is produced by [CurrentWindow](frontend/Reference/Frontend%20IO/CurrentWindow.md).

## Methods
### `EventHandler`
You can attach an event listener to it. The following patterns are supported
- `"Closed"` - fires, when a windows has been closed

It returns a wrapper for [`EventObject`](frontend/Reference/Misc/Events.md#`EventObject`) generated from the events of the given window. You can apply `EventRemove` on it to remove all handlers.

*example*
```mathematica
test = {0,1,0};

EventHandler[CurrentWindow[], {"Closed" -> Function[Null,
  test = {1,0,0};
]}];

Graphics[{RGBColor[test // Offload], Disk[{0,0}, 1]}]
```

Try to reopen a window (reload) a disk must turn red.

