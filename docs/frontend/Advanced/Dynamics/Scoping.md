---
draft: false
---
Since `Module` adds `Temporal` attribute to your symbols, it is not clear when and how your dynamic symbols will be purged from the Kernel. Therefore use [`LeakyModule`](frontend/Reference/Misc/Language.md#`LeakyModule`) to scope all dynamic symbols.

You can clean them up using `ClearAll` after a notebook has been closed or cell has been destroyed. [`EventHandler`](frontend/Reference/Misc/Events.md#`EventHandler`) methods is applicable on [ResultCell](frontend/Reference/Cells%20and%20Notebook/ResultCell.md) as well as [EvaluationNotebook](frontend/Reference/Cells%20and%20Notebook/EvaluationNotebook.md) or even [WindowObj](frontend/Reference/Frontend%20IO/WindowObj.md).



