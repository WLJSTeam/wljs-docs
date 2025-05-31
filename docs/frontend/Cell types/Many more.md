---
sidebar_position: 22
---
You can extend output cell types with just a few lines of code using your favorite framework or package.

#### Shell

You can type commands directly into your system shell. The `PATH` is automatically imported from your terminal, and the working directory is set to [NotebookDirectory](frontend/Reference/Cells%20and%20Notebook/NotebookDirectory.md).

```bash
.sh
ls
```

![](./../../Screenshot%202024-11-17%20at%2023.08.09.png)

#### LaTeX
There is a dedicated cell type solely to render LaTeX equations. You can still do it using [Markdown](frontend/Cell%20types/Markdown.md), but if for some reason you have troubles mixing MD and TeX, here you go

```
.latex

\alpha^2 + \beta^2
```

This also does not require escaping TeX code with double slashes unlike other cell types.


#### Mermaid

Draw beautiful diagrams using code:

```bash
.mermaid
pie title NETFLIX
         "Time spent looking for movie" : 90
         "Time spent watching it" : 10
```

![](../../imgs/Screenshot%202023-03-31%20at%2016.01.28.png)

You can also apply custom styling:

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