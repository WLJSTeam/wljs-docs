---
sidebar_position: 7
---
# Guidelines

:::warning
This section is still being populated with content.
:::

## Use Shortcuts
Shortcuts drastically improve user experience.

### UI Operations
- New notebook: `Cmd+N`, `Ctrl+N`
- Open file: `Cmd+O`, `Ctrl+O`
- Save: `Cmd+S`, `Ctrl+S`
- Open command palette: `Cmd+P`, `Ctrl+P`
- Hide/Unhide current cell: `Cmd+2`, `Alt+2`
- Clear outputs: `Cmd+U`, `Alt+U`
- Search inside cell: `Cmd+F`, `Ctrl+F`
- Overlay window (Desktop App only): `Shift+Alt+Space`

### Evaluation
- Evaluate: `Shift+Enter`
- Abort: `Cmd+.`, `Alt+.`
- Evaluate initialization cells: `Cmd+I`, `Alt+I`

### Cells
- `Ctrl+/`: Make fraction from selection
- `Ctrl+6`: Make superscript from selection
- `Ctrl+2`: Make square root from selection
- `Ctrl+-`: Make subscript from selection
- `Cmd+/` or `Alt+/`: Comment a line

See __more keybindings__ in the [Input cell](frontend/Cell%20types/Input%20cell.md) section.

## Keep Folders Organized
Various functions may produce [Iconize](frontend/Reference/Formatting/Iconize.md) objects, used for storing large data chunks, which are saved in the `./.iconized/` folder within the notebook directory. Any dropped images or files are uploaded to the `./attachments/` directory. It's important to maintain a clean folder structure to keep projects organized.

## Use `NotebookStore` for Portability
To export your notebook as a single editable `.html` using [Static HTML](frontend/Exporting/Static%20HTML.md), use [NotebookStore](frontend/Reference/Cells%20and%20Notebook/NotebookStore.md) for storing raw data. This ensures all images, graphs, and stored data are preserved.

## Install Everything Locally
We recommend storing all Wolfram Language libraries and paclets locally for each project. This ensures reliability, reproducibility, and independence from remote resources.

```mathematica title="Example of a built-in package manager"
PacletRepositories[{
    Github -> "https://github.com/KirillBelovTest/GPTLink"
}]

<<KirillBelov`GPTLink`
```

This creates a folder with all the required paclets and keeps them up to date if needed.

## Do Not Use `Dynamic`
We use a *completely different architecture* to handle interactivity and graphic updates compared to Wolfram Mathematica.

> While [Manipulate](frontend/Reference/GUI/Manipulate.md) is implemented, frequent use is discouraged due to its impact on system performance.

### Mathematica's native renderer
See [this page for more information](frontend/Advanced/Graphics/mma.md)


### Dynamic
[Buttons](frontend/Reference/GUI/InputButton.md) and [sliders](frontend/Reference/GUI/InputRange.md) are event-driven. You must subscribe to them using [`EventHandler`](frontend/Reference/Misc/Events.md#`EventHandler`). All updates are handled via the [Offload](frontend/Reference/Interpreter/Offload.md) mechanism. Example:

```mathematica
length = 1.0;
EventHandler[InputRange[-1, 1, 0.1], Function[l, length = l]]

Graphics[Rectangle[{-1, -1}, {length // Offload, 1}]]
```

### Manipulate
For basic 2D plots, you can use the built-in [ManipulatePlot](frontend/Reference/Plotting%20Functions/ManipulatePlot.md) or general-purpose [Manipulate](frontend/Reference/GUI/Manipulate.md) function.

For more complex and fast dynamics, you’ll need to build your own using [Offload](frontend/Reference/Interpreter/Offload.md) along with simple graphic primitives like [Line](frontend/Reference/Graphics3D/Line.md), [Polygon](frontend/Reference/Graphics3D/Polygon.md), and others as building blocks.


