---
sidebar_position: 22
---
You can extend output cell types via a few lines of code and you favorite framework / package

:::info
Package system docs are still in development. Please request on Github issues to give it priority
:::

#### Shell

:::danger
Currently not supported on Windows
:::

You can type commands to your system shell. PATH is imported from your terminal automatically, and a working directory is set to [NotebookDirectory](frontend/Reference/Cells%20and%20Notebook/NotebookDirectory.md)

```bash
.sh
ls
```

![](./../../Screenshot%202024-11-17%20at%2023.08.09.png)

#### Mermaid

Draw beautiful diagrams by code 
```bash
.mermaid
pie title NETFLIX
         "Time spent looking for movie" : 90
         "Time spent watching it" : 10
```

![](../../imgs/Screenshot%202023-03-31%20at%2016.01.28.png)

Styling is also available

```md
.mermaid

%%{init: { 'theme': 'base', 'themeVariables': { 'primaryColor': '#ffcc00', 'edgeLabelBackground':'#ffffff', 'tertiaryColor': '#F0F0F0'}}}%%
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

![](./../../Screenshot%202024-11-29%20at%2017.33.48.png)

