---
sidebar_position: 6
---



The true power of customization comes with a powerful command palette system. This is provided by a [plugin](https://github.com/JerryI/wljs-snippets) bundled with the core package.

Command palette items are mostly special cells—Wolfram / [WLX](frontend/Cell%20types/WLX.md) / [JavaScript](frontend/Cell%20types/Javascript.md)—that serve a single utility function and are saved in a standard notebook. __They are accessible via the command palette__ and have access to your notebook and computational kernel. You can also view their source notebook and read brief documentation by clicking the question mark icon.

![](./../snippetsover.png)

:::tip
Use the shortcut `Cmd + P` (Mac) or `Ctrl + P` (Windows/Linux) to open the command palette.
:::

## Context Menu
If you want to apply `Simplify` or highlight selected expressions in the code:

![](./../Screenshot%202024-05-05%20at%2012.11.27.png)

Highlighting is non-destructive and won’t alter the original expression.

## Notebook Templates
This relatively new feature allows you to create a new notebook based on a predefined template.

![](./../Screenshot%202024-07-10%20at%2022.00.55.png)

![](./../Screenshot%202024-07-10%20at%2021.55.50.png)

## Uploading Data
There are several snippets for uploading ASCII data or arbitrary files into your notebook’s folder.

![](./../Screen%20Recording%20Apr%208.gif)

These snippets are built using standard Wolfram Language.

## Special Characters
A toolbar with templates for symbolic integration, series, and more is available via the command palette.

![](./../plattte-ezgif.com-optimize.gif)

However, it's recommended to use keyboard shortcuts for:
- Fractions: `Ctrl+/`
- Subscripts: `Ctrl+-`
- Power: `Ctrl+6`
- Square roots: `Ctrl+2`
- Semantic interpretation: `Ctrl+=`
- Greek symbols: `ESC+al`, `ESC+be`, `ESC+ga`, `ESC+o`, ...

## Matrix Helper
For easier matrix input, use this snippet:

![](./../Screen%20Recording%20Apr%208%20(1).gif)

It inserts a matrix into the cell __at your last cursor position__. Built with [WLX](frontend/Cell%20types/WLX.md) cells for enhanced visuals.

## Show Available Options
This snippet analyzes the content of your cell __to the left of your cursor__ and prints `Options` for the relevant symbol.

![](./../Screen%20Recording%20Apr%208%20(2).gif)

:::tip
Drop your cursor in the middle of the target symbol. You can select and edit option values directly in the picker.
:::

:::warning
Not all options are supported for standard Wolfram symbols.
:::

## Navigation Gizmo
This feature blurs the line between code and GUI for 2D/3D graphics design.

![](./../Screen%20Recording%20Apr%208%20(3).gif)

__Shorts__:
- YTS 📽️ [You don't need to program your figures manually](https://youtube.com/shorts/Z76dMHK8POM?feature=share)

It leverages WLJS Notebook’s dynamic reevaluation and editor syntax sugar:

1. Select a 2D or 3D list of coordinates `{}`
2. Type `gizmo...` in the command palette
3. Evaluate the cell
4. Drag the gizmo to the desired position and confirm with the checkmark

Also works for most primitives:

![](./../Screen%20Recording%20Apr%208%20(4).gif)

:::tip
Add an offset to avoid overlapping with other graphics primitives. For example:

```mathematica @
Text["Hello World", ({0.5, 0.5} + (*BB[*)({0.5, 0.5})(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRAeB5AILqnMSXXKr0hjgskHleakFnMBGU6JydnpRfmleSlpzDDlQe5Ozvk5+UVFDGDwwR6dwcAAAAHdFiw="*)(*]BB*)) // Hold]
```

Use `Offload` or `Hold` to prevent the kernel from distributing `Plus` across the list.
:::

Also works for 3D:

![](./../Screen%20Recording%20Apr%208%20(5).gif)

## Format Wolfram Language Code
A built-in formatter is also available:

![](./../Screen%20Recording%20Apr%208%20(6).gif)

__It formats selected text or the entire cell if no selection is made.__

## Text Formatting
This snippet provides basic tools for styling Wolfram expressions, slides, HTML, and Markdown. It attempts to detect the cell type and apply formatting accordingly.

![](./../ToolbarT%20optimizer.gif)

:::warning
This feature is still under development and somewhat limited.
:::

## Take a Picture
Uses your webcam and sends the image to the Wolfram Kernel as an [Image](frontend/Reference/Image/Image.md) object.

![](./../TakeAPic%20speed.gif)

## Install Wolfram Packages from GitHub
Paste a GitHub repo URL containing a `PacletInfo.wl` file into the command palette:

![](./../Screenshot%202024-05-10%20at%2021.35.19.png)

The system will auto-install the package into your notebook’s folder.

## Terminal
Access the master or any evaluation kernel directly:

![](./../Screenshot%202024-07-10%20at%2021.56.40.png)

Formatted and colorized output. Default form: `InputForm`.

## Debugger
A built-in debugger lets you watch symbols, pause execution, and inspect cells.

![](./../Pasted%20image%2020250103191609.png)

See [Debugger](frontend/Advanced/Command%20palette/Debugger.md) for more.

## AI Assistant
If nothing is selected, __text typed into the command palette is sent to ChatGPT__, which __has access to your notebook__.

![](./../ASKAI%20optimizer.gif)

__See the [detailed guide](frontend/Advanced/Command%20palette/AI%20Assistant.md)__ for more.

:::note
You’ll be prompted for an OpenAI API Key. You can generate one on the official OpenAI website.
:::

We use a "knowledge on demand" concept, meaning that additional notebook-specific information (like cell types) is only fetched when needed—__saving tokens__ if your request is unrelated.

AI capabilities:
- __Create, remove, evaluate, and edit cells__ in any language
- __Read notebook structure__
- __See and edit the focused cell__ where your cursor is
- __See and edit your selection__ in any editor area
- __Access the knowledge library__
- ~~Google~~ __Use WolframAlpha__ to fetch real-world data

__Shorts__:
- YTS 📽️ [We made AI Copilot in your Notebook 🤖](https://youtube.com/shorts/6s9m5ZGPkdE?feature=share)
- YTS 📽️ [AI Copilot in your Notebook. Part 2 🤖](https://youtube.com/shorts/B_ZVjN9cvQM?feature=share)

