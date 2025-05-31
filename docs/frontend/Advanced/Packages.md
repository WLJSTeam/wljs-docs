__By default, the following packages **are loaded into the Kernel on startup**__

### Wolfram Language Packages
These are standard packages that can be installed on any WL system:

- [KirillBelov/CSockets](https://github.com/KirillBelovTest/CSockets)
- [KirillBelov/TCPHandler](https://github.com/KirillBelovTest/TCPServer)
- [KirillBelov/WebSocketHandler](https://github.com/KirillBelovTest/WebSocketHandler)
- [KirillBelov/Objects](https://github.com/KirillBelovTest/Objects)
- [JerryI/Misc: Events, Promise, Async, Transport, Language](https://github.com/JerryI/wl-misc)
- [JerryI/LPM](https://github.com/JerryI/wl-localpackages)
- [lshifr/LetWL](https://github.com/lshifr/LetWL/blob/master/PacletInfo.m)

#### How to install new packages locally?

##### Via Command Palette
Open your notebook and paste the GitHub link to a repo<sup>*</sup> in the command palette located on the top bar.

![](./../../Screenshot%202024-05-10%20at%2021.35.19.png)

:::warning
<sup>*</sup> It must contain a `PacletInfo.wl` file in the root directory of the repository.
:::

##### Via LPM
Create a new cell and insert:

```mathematica
PacletRepositories[{
    Github -> "https://github.com/KirillBelovTest/HTTPHandler"
}, "Directory" -> NotebookDirectory[]]

<<KirillBelov`HTTPHandler`
```

This will create a local folder named `wl_packages`, where installed packages will be stored.

#### Global Installation (Classic)

##### Via Paclets
If the package is hosted on the Wolfram repository, then you can simply run:

```mathematica
PacletInstall["Username/Paclet"]

<<PacletContextName`
```

Or from a local paclet file:

```mathematica
PacletInstall["path_to_it.paclet"]

<<PacletContextName`
```

---

### WLJS Packages
This is a new format similar to regular packages, designed to ship JavaScript and CSS together with WL. It is distributed via GitHub and installed using the [WLJSPM](https://github.com/JerryI/wl-wljs-packages) package manager (used internally by developers only).

The default set includes:

- wljs-interpreter – a tiny interpreter of WL running in the browser
- wljs-cells – core component for cell management on the frontend
- wljs-editor – CodeMirror 6 editor with many extensions including syntax sugar
- wljs-graphics-d3 – implementation of [Image](frontend/Reference/Image/Image.md) and [Graphics](frontend/Reference/Graphics/Graphics.md)
- wljs-graphics3d-threejs – implementation of [Graphics3D](frontend/Reference/Graphics3D/Graphics3D.md)
- wljs-inputs – UI elements such as [InputRange](frontend/Reference/GUI/InputRange.md), etc.
- wljs-plotly – adapter for [Plotly](frontend/Reference/Plotting%20Functions/Plotly.md)
- wljs-sharedlib-d3 – shared D3.js library used by graphics
- wljs-sharedlib-mk – shared Markdown and KaTeX libraries
- wljs-html-support – HTML cell type
- wljs-markdown-support – Markdown cell type
- wljs-mermaid-support – Mermaid cell type
- wljs-js-support – JavaScript cell type
- wljs-revealjs – Slide cell type
- wljs-wlx-support – WLX cell type
- wljs-manipulate – library implementing [ManipulatePlot](frontend/Reference/Plotting%20Functions/ManipulatePlot.md)
- wljs-export-html – encoder and decoder for exported notebooks
- wljs-snippets – command palette, snippet system, and AI copilot

#### How to locate and install?
All installed packages can be accessed from the `Settings` menu in the WLJS Notebook.

![](./../../Screenshot%202024-05-13%20at%2011.55.17.png)

:::warning
There are currently no third-party extensions. A guide on how to write your own is still in development.
:::
