# Mathematica

__Export to `.nb` format__

:::warning
This feature is quite experimental.
:::

It is possible to convert a `wln` notebook to a `.nb` file, with some limitations.

![](./../../Screenshot%202025-05-22%20at%2019.08.07.png)

![](./../../Screenshot%202025-01-25%20at%2017.24.11.png)

## Limitations

1. __Only input cells__ will be transferred.
2. Input cells will be converted to [InputForm](frontend/Reference/Formatting/InputForm.md).
3. Markdown formatting is not fully supported in Wolfram Language text cells (only sections, titles, etc. are preserved).
4. LaTeX, Excalidraw, Mermaid, HTML, and WLX output cells will not be displayed.