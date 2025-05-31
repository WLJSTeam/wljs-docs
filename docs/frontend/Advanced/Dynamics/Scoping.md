---
draft: false
---
Since `Module` adds the `Temporal` attribute to your symbols, it is unclear when and how your dynamic symbols will be purged from the Kernel. Therefore, use [`LeakyModule`](frontend/Reference/Misc/Language.md#`LeakyModule`) to scope all dynamic symbols.

You can clean them up using `ClearAll` after a notebook has been closed or a cell has been destroyed. [`EventHandler`](frontend/Reference/Misc/Events.md#`EventHandler`) methods are applicable to [ResultCell](frontend/Reference/Cells%20and%20Notebook/ResultCell.md), [EvaluationNotebook](frontend/Reference/Cells%20and%20Notebook/EvaluationNotebook.md), or even [WindowObj](frontend/Reference/Frontend%20IO/WindowObj.md).

:::info
Since *WL 14.2* using `LeakyModule` is unnecessary. The native `Module` will do the job.
:::