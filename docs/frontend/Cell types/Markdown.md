---
sidebar_position: 2
---
> Type `.md` in the first line of an input cell


![](../../imgs/Screenshot%202024-03-13%20at%2019.29.44.png)

![](../../imgs/Screenshot%202024-03-13%20at%2019.29.21.png)

## Markdown syntax

### Headings
Use `#` for headings, increasing the number of `#` for smaller headings:

```markdown
.md
# Heading 1
## Heading 2
### Heading 3
```

### Emphasis
Use `*` or `_` for italics, and `**` or `__` for bold:

```markdown
.md
*italic* or _italic_
**bold** or __bold__
```

### Lists
Create unordered lists with `*`, `+`, or `-`, and ordered lists with numbers followed by a period:

```markdown
.md

- Item 1
- Item 2
  - Subitem 1

1. First item
2. Second item
   1. Subitem 1
```

### Links
Create links using `[text](URL)`:

```markdown
.md
[Tree](https://en.wikipedia.org/wiki/Tree)
```

### Images
Embed images using `![alt text](URL)`:

```markdown
.md
![Tree](https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg)
```

:::note
Files can be remote or local (in the notebook folder). __Try to drag and drop any image inside markdown cell__
:::

### Drawings
We use an amazing [Excalidraw](https://excalidraw.com/) editor for any complex drawings right inside the markdown input cell. Try to type

```markdown
.md

!![]
```

In the output cell a corresponding SVG image will be generated.

*See GIF animation below*

![](./../../Excalidraw-ezgif.com-speed.gif)

### Blockquotes
Create blockquotes using `>`:

```markdown
.md
> This is a blockquote.
```

### Code
Inline code uses backticks, and code blocks are wrapped with triple backticks:

```markdown
.md

`inline code`

```
code block
```
.md

### Horizontal Rule
Create a horizontal rule with three or more dashes, asterisks, or underscores:

```markdown
---
***
___
```

### Tables
Create tables using pipes `|` and dashes `-`:

```markdown
.md

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

### Highlighter
Use `==` wrapper to highlight text, i.e.

```mathematica
.md
==Hello World==
```


## Pure HTML
One can also use plain HTML tags to stylize markdown or embed media objects

## LaTeX
We use KaTeX as a render engine, to type a equation wrap it inside `$` or `$$` (for equation block)

```markdown
.md

$$
E = \\hbar \\omega
$$
```

:::warning
Unfortunately, you have to escape all backslashes, i.e. instead of `\alpha` you need to write `\\alpha`.
:::

__See [here](https://katex.org/docs/supported.html) all supported function for LaTeX equations.__


## WLX
Markdown cells supports many features of [WLX](frontend/Cell%20types/WLX.md) similar to how it is done in [Slides](frontend/Reference/Slides/Slides.md)
### Embed figures
For example you created a nice 3D plot

```mathematica title="cell 1"
Figure = Plot3D[Sin[x] Cos[y], {x,-5,5}, {y,-5,5}];
```

:::tip
Make first letter in the name of a symbol capital, this is required by the syntax of WLX language.
:::

then one can embed it into markdown cell as if it was a custom tag

```markdown
.md

Hello there! Here is my plot

<br/>

<Figure/>
```


## Autoupload
### Drop a file

### Paste media file




__[Github repo](https://github.com/JerryI/wljs-markdown-support)__
To switch to Markdown language use `.md` prefix on the first line





