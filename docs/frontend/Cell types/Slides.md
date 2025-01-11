> Type `.slide` in the first line of an input cell



One can also make presentations using WLJS Frontend. This is provided by [wljs-revealjs](https://github.com/JerryI/wljs-revealjs), that integrates [RevealJS](https://revealjs.com) and [WLX](frontend/Cell%20types/WLX.md) language to provide components approach on making presentations as well as add interactivity and all features of frontend's cells like this

<div style={{'text-align':'center'}}>

![](../../imgs/ezgif.com-optimize-15.gif)

</div>

## See [slides tutorial](frontend/Advanced/Slides/Slides.md)

:::tip
To __go fullscreen__ mode - press `f` key after focusing on the content of a slide
:::

```jsx
.slide

# Title

Paragraph
```

## Merge slides from different cells
To merge the all slides into a single fat presentation use

```md
.slides

```

It will merge and print slides from all cells in the notebook into a single one.

:::tip
Use projector feature

![](../../imgs/Screenshot%202024-03-13%20at%2019.25.16.png)

to show slides in a separate window
:::

## Plain HTML
By the default slides cells do support plain HTML mixed with Markdown syntax and WLX. For example one can embed a website on a slide

```markdown
.slide

<iframe
  style="margin-left:auto; margin-right:auto; border-radius: 10px"
  width="600"
  height="500"
  src="https://jerryi.github.io/wljs-docs/">
</iframe>
```

## LaTeX
We use KaTeX as a render engine, to type a equation wrap it inside `$` or `$$` (for equation block)

```markdown
.slide

$$
E = \\hbar \\omega
$$
```

:::warning
Unfortunately, you have to escape all backslashes, i.e. instead of `\alpha` you need to write `\\alpha`.
:::

__See [here](https://katex.org/docs/supported.html) all supported function for LaTeX equations.__



## WLX
Slides integrates some features of [WLX](frontend/Cell%20types/WLX.md) cell types similar to [Markdown](frontend/Cell%20types/Markdown.md) cells. Please see [Slides](frontend/Advanced/Slides/Slides.md) tutorial for more information on how to use its power.

## Drawings
We use an amazing [Excalidraw](https://excalidraw.com/) editor for any complex drawings right inside the slides and markdown input cells. Try to type

```markdown
.slide

!![]
```

In the output cell a corresponding SVG image will be generated.

## Export
Slides can be exported using [Static HTML](frontend/Exporting/Static%20HTML.md) exporter or static export using [Slides exporter](frontend/Reference/Slides/Slides.md) for printing for example

## Autoupload images
### Drop a file

### Paste media file

## Plugins
The package uses also some external plugins
- [pointer](https://github.com/burnpiro/reveal-pointer) (press `Q` to toggle)

