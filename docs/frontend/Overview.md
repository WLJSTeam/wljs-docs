---
sidebar_position: 2
---


The entire notebook interface is built using plain JavaScript and HTML, powered by a [Wolfram WebServer](https://github.com/KirillBelovTest/HTTPHandler) and [WLX](https://jerryi.github.io/wlx-docs/) running locally on a Wolfram Kernel. This means you can work remotely __by running the server anywhere you like__ (see how in the [instruction guide](frontend/instruction.md)).

Some computations are partially performed by your browser, and you can [control this behavior](frontend/Dynamics.md) if desired. All UI elements and cell operations are written in JavaScript and Wolfram Language, and handled by the WLJS Interpreter.

> **WLJS Interpreter** is a tiny (3 kB) Wolfram Language interpreter that runs in the browser, written in vanilla JavaScript. It fully integrates the JavaScript environment with the Wolfram Language backend. We'll also refer to this as the *frontend* or *client*.

![](./../imgs/Interface-1.png)

:::info
Unlike Mathematica, the cell design follows a mostly flat structure, similar to Jupyter Notebook. Only `input` and `output` cells are grouped together.
:::

Output cells are editable. We do not explicitly separate them (as Mathematica or Jupyter do), because the whole document is a **notebook** — it doesn't distinguish between inputs and outputs. You can freely edit, copy, and reevaluate any output expression in place. So we distinguish them only formally.

[__See live example__](https://jerryi.github.io/wljs-docs/wljs-demo/intro-notebook/)

### Cell Control Buttons
All cells are grouped under a parent input cell. Other than that, the notebook structure is flat. Control buttons apply to the entire group:

![](./../imgs/Screenshot%202024-03-13%20at%2018.53.13.png)

From left to right:
- Add new cell below
- Hide input cell
- Evaluate (also via `Shift+Enter`)
- More options

The last button expands into:

![](./../imgs/Screenshot%202024-03-13%20at%2018.54.44.png)

"Project to a window" is a particularly useful feature that lets you evaluate a cell in a new window. This is especially helpful when presenting [slides](frontend/Advanced/Slides/Slides.md).

### Shortcuts
*Works in both browser and desktop app versions*

#### UI Shortcuts
- `Ctrl+S`, `Cmd+S`: Save notebook
- `Alt+.`, `Cmd+.`: Abort evaluation
- `Ctrl+P`, `Cmd+P`: Open command palette
- `Shift+Enter`: Evaluate current cell
- `Ctrl/Cmd+F`: Search within the focused cell
- `Shift+Alt+Space`: Overlay window (Desktop App only)

#### Cell Editing
- `Ctrl+W`, `Cmd+2`: Hide/show input cell
- `Ctrl+/`: Create fraction from selection
- `Ctrl+6`: Superscript
- `Ctrl+2`: Square root
- `Ctrl+-`: Subscript
- `Alt/Cmd+/`: Comment a line

See __more keybindings__ in the [Input Cell](frontend/Cell%20types/Input%20cell.md) reference.

## Wolfram Language
When you start typing, the editor assumes you're using the Wolfram Language. Press `Shift+Enter` (or click the play button) to evaluate.

![](./../imgs/Screenshot%202024-03-13%20at%2018.58.12.png)

Output cells are joined to the input. You can hide the output by clicking the arrow `→` to the left of the cell.

:::note
Once you modify the output cell, it becomes a new input cell—just like in Mathematica.
:::

Syntax sugar for fractions and 2D input is fully supported.

![](./../nice.gif)

Useful shortcuts include:
- `Ctrl+/`: Fraction
- `Ctrl+^`: Power
- `Ctrl+-`: Subscript
- `Ctrl+2`: Square root
- `Ctrl+=`: Semantic interpretation 

Or use the special toolbar (snippet palette):

![](./../plattte-ezgif.com-optimize%201.gif)

## What Differs from Mathematica 💡
If you're familiar with the Wolfram Language, you'll feel at home using WLJS Notebook. Notable differences:

- Output cells are editable
- Full support for syntax sugar (fractions, powers, etc.)
- Support for [Graphics](frontend/Reference/Graphics/Graphics.md), [Graphics3D](frontend/Reference/Graphics3D/Graphics3D.md), [Sound](frontend/Reference/Sound/Sound.md), [Video](frontend/Reference/Video/Video.md), and more
- Most [plotting functions](https://jerryi.github.io/wljs-docs/wljs-demo/plot-1d) are supported (see [Reference](frontend/Reference/Reference.md))
- Compatible with standard Wolfram Packages and Paclets
- Support for resource functions and [neural networks](https://jerryi.github.io/wljs-docs/wljs-demo/neuralnet-1)
- [Formatting options](https://jerryi.github.io/wljs-docs/wljs-demo/intro-mathinput/) (limited)

Partial support for [Mathematica](frontend/Importing/Mathematica.md) `.nb` format:
- Limited text formatting support (see Decorations in [Reference](frontend/Reference/Reference.md))
- Different [dynamics](frontend/Dynamics.md) implementation
- No `DynamicModule`, `Slider`, or `Button` — use [InputRange](frontend/Reference/GUI/InputRange.md), [InputButton](frontend/Reference/GUI/InputButton.md)
- Flat notebook structure
- Markdown is the main language for text cells ([Markdown](frontend/Cell%20types/Markdown.md))
- No extended evaluation history (only the last output)
- Not all graphics primitives are implemented (gradually improving)

:::tip
If something does not look like as it should, try [MMAView](frontend/Reference/GUI/MMAView.md)

```mathematica
With[{p = Plot3D[f[x] y, {x,0,10}, {y,0,10}]},
  MMAView[p]
]
```

![](./../neverasked-ezgif.com-optimize.gif)

:::

## Why Not Jupyter Ecosystem?
We chose to build our own system because:
- A Jupyter kernel for Wolfram Engine already exists
- We wanted syntax sugar, editable output cells, multimedia cells — which require a custom cell editor
- Jupyter uses `ZMQ`, which doesn't meet our needs for fast, low-latency communication with large payloads
- Adding a third language or API would increase long-term maintenance

## Command Palette

:::tip
Learn more: [Command Palette](frontend/Command%20palette.md)
:::

Use `Cmd+P` / `Ctrl+P` to access useful tools like matrix builders, color pickers, and more.

![](./../imgs/Gizmo-ezgif.com-optipng.png)

![](./../CuboidGizmo-ezgif.com-optipng.png)

Snippets are just special notebooks with built-in UI elements.

## Editor of Power
A single input cell can output:
- Wolfram Language results
- An HTML page
- A JavaScript window
- A slide in a presentation

![](./../imgs/Dropfiles-ezgif.com-optipng.png)

You can even draw inside the code editor:

![](./../Excalidraw-ezgif.com-speed%201.gif)

## Overlay Mode
If the WLJS App is running (tray or regular), press `Shift+Alt+Space` for quick input access.

![](./../Screenshot%202024-08-25%20at%2016.52.14.png)

More: [Overlay Mode](frontend/Advanced/Overlay%20mode.md)

## Graphics 2D & 3D
Most Mathematica plotting functions produce low-level primitives. Most of them are supported here:

<Wl>{`ExampleData[{"Geometry3D","KleinBottle"}]`}</Wl>

:::info
Try dragging and panning with your mouse!
:::

![](./../imgs/Screenshot%202024-03-13%20at%2019.07.00.png)

## Powered by SVG and WebGL

![](./../Isingspins-ezgif.com-optipng.png)

![](./../manipulatePlot-ezgif.com-optimize.gif)

![](./../DynamicsFast-ezgif.com-optimize.gif)

![](./../RotationMatriix3D-ezgif.com-optipng.png)

![](./../flowerPot-ezgif.com-video-to-gif-converter.gif)

![](./../balls-ezgif.com-video-to-gif-converter.gif)

## Portability
Need to share your notes? You have several options:

1. Export the entire notebook as a web page: [Static HTML](frontend/Exporting/Static%20HTML.md) or [Dynamic HTML](frontend/Exporting/Dynamic%20HTML.md)
2. Export individual figures: [Figures](frontend/Exporting/Figures.md)
3. Make a presentation: [Static Slides](frontend/Exporting/Static%20Slides.md)

![](./../StiticExport-ezgif.com-optimize.gif)

**No internet dependency** — it works offline and will remain functional even after future updates. You can always re-import the exported notebook. Ideal for sharing notes or publishing on a blog.

## Other Languages
Need annotations? No need to switch cell types. Just type `.md` on the first line of a cell to enable Markdown.

![](./../imgs/Screenshot%202024-03-13%20at%2019.05.40.png)

Click the arrow on the right to hide the source — only the output will be shown. The editor is flexible enough to support custom output cells too.

You can also mix WL and JavaScript to create stunning visualizations:

![](./../imgs/Spark-ezgif.com-speed.png)

Built-in support for:
- [JavaScript](frontend/Cell%20types/Javascript.md)
- [Markdown](frontend/Exporting/Markdown.md)
- [Slides](frontend/Cell%20types/Slides.md)
- [WLX](frontend/Cell%20types/WLX.md)
- [Files](frontend/Cell%20types/Files.md)
- [HTML](frontend/Cell%20types/HTML.md)
- [More](frontend/Cell%20types/Many%20more.md) (e.g. Mermaid)

## Debugger
Access via the command palette.

![](./../symbols-ezgif.com-optimize.gif)

More: [Debugger](frontend/Advanced/Command%20palette/Debugger.md)

## AI Copilot
Try it out: [AI Assistant](frontend/Advanced/Command%20palette/AI%20Assistant.md)

<iframe width="315" height="560" src="https://youtube.com/embed/wenBdDRpD4g?si=bB5h28zAHb7r6Nmh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<iframe width="315" height="560" src="https://youtube.com/embed/pXe1mSir47Q?si=UTclXIdPiB3HydPI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
