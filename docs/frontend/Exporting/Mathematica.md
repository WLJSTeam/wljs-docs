__Export to .nb format__

:::warning
This feature is quite experimental.
:::

It is possible to convert `wln` notebook to `nb` with some limitations

![](../../imgs/Screenshot%202024-03-13%20at%2019.37.13.png)

![](./../../Screenshot%202025-01-25%20at%2017.24.11.png)

## Limitations

1. __Only input cells__ will be transferred 
2. Input cells will be converted to [InputForm](frontend/Reference/Formatting/InputForm.md) 
3. Markdown formatting is not fully supported in the context of the Wolfram Language text cells (only sections, titles and etc)
4. LaTeX, Excalidraw, mermaid cells, HTML and WLX output will not be shown 

