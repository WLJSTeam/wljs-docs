---
sidebar_position: 7
---
:::warning
Still populating with a content
:::


## Use shortcuts
It improves user experience drastically
### UI Operations
- New notebook `Cmd+N`, `Ctrl+N`
- Open file `Cmd+O`, `Ctrl+O`
- Save `Cmd+S`, `Ctrl+S`
- Enter command palette `Cmd+P`, `Ctrl+P` 
- Hide/Unhide current cell `Cmd+2`, `Alt+2`
- Clear outputs `Cmd+U`, `Alt+U`
- Search inside cell `Cmd+f`, `Ctrl+f`
- `Shift + Alt + Space` overlay window (Desktop App only)

### Evaluation
- Evaluate `Shift+Enter`
- Abort `Cmd+.`, `Alt+.`
- Evaluate initialization cells `Cmd+I`, `Alt+I`

### Cells
- `Ctrl+/` make fraction on selected
- `Ctrl+6` make superscript on selected
- `Ctrl+2` make square root on selected
- `Ctrl+-` make subscript on selected
- `Cmd + /` or `Alt + /` comment a line

See __more keybindings__ in [Input cell](frontend/Cell%20types/Input%20cell.md)


## Keep folders organized
Various functions may produce [Iconize](frontend/Reference/Formatting/Iconize.md) objects, for storing large chunks of data, which are copied to `./.iconized/` folder in the notebook directory. Any dropped images or files will be uploaded to `./attachments/` directory. Therefore it is important to have a clear separation between your projects.

## Use `NotebookStore` for portability 
If you want your notebook to be exported to a single editable `.html` [Static HTML](frontend/Exporting/Static%20HTML.md), use [NotebookStore](frontend/Reference/Cells%20and%20Notebook/NotebookStore.md) as a persistent storage for your raw data. In such case all images, graphs, and stored data will be kept.

## Install everything locally
We promote the idea of storing libraries or paclets for Wolfram Language locally for each project. There is no other way to provide the reliable way of computing, storing data, reproducibility and independence from any remote resources

```mathematica title="example of a built-in package manager"
PacletRepositories[{
    Github -> "https://github.com/KirillBelovTest/GPTLink"
}]

<<KirillBelov`GPTLink`
```

this will create a folder with all used paclets and keep them up to date if needed

## Do not use `Dynamic`
We rely on *a completely different architecture* to handle interactivity and graphics updates compared to Wolfram Mathematica. 

> In general [Manipulate](frontend/Reference/Interpreter/Manipulate.md) is implemented as well, but it is not recommend to use often due to its impact to the system performance.

### Dynamic
[Buttons](frontend/Reference/GUI/InputButton.md), [sliders](frontend/Reference/GUI/InputRange.md) are event-driven, i.e. you need to subscribe to them using [`EventHandler`](frontend/Reference/Misc/Events.md#`EventHandler`). All dynamic updates are handled using [Offload](frontend/Reference/Interpreter/Offload.md) approach. For example

```mathematica
length = 1.0;
EventHandler[InputRange[-1,1,0.1], Function[l, length = l]]

Graphics[Rectangle[{-1,-1}, {length // Offload, 1}]]
```

### Manipulate
In general there is built-in function for simple 2D plots - [ManipulatePlot](frontend/Reference/Plotting%20Functions/ManipulatePlot.md), however, for something more complicated - *you need to craft it by yourself* using building [Offset](frontend/Reference/Graphics/Offset.md) and simple graphics primitives such as [Line](frontend/Reference/Graphics3D/Line.md), [Polygon](frontend/Reference/Graphics3D/Polygon.md) and etc as building blocks.



