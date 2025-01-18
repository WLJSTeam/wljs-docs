---
env:
  - WLJS
source: https://github.com/JerryI/wljs-editor/blob/dev/src/EditorKernel.wl
update: false
package: wljs-editor
context: Notebook`EditorUtils`
---
A low-level view component to spawn a cell wrapper (fully functional) 

```mathematica
CellView[content_String, opts___]
```

where `content` is a string, that represents an expression needed by a view component of a cell. View-components are provided by different extensions such as [Slides](frontend/Exporting/Slides.md), [WLX](frontend/Cell%20types/WLX.md), [Markdown](frontend/Cell%20types/Markdown.md), [Javascript](frontend/Cell%20types/Javascript.md) and [Many more](frontend/Cell%20types/Many%20more.md) and used by the default to render the notebook in a window.

## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
- [WLXForm](frontend/Reference/Formatting/WLXForm.md)

## Options
### `"Display"`
A view-component to render the content. For default cell types it can be
- `"codemirror"` a default view component used in all input cells as well as in [EditorView](frontend/Reference/GUI/EditorView.md)
- `"markdown"` a renderer of [Markdown](frontend/Cell%20types/Markdown.md) cells
- `"html"` a renderer of [HTML](frontend/Cell%20types/HTML.md)
- `"js"` a renderer of [Javascript](frontend/Cell%20types/Javascript.md) cells
- `"mermaid"` a renderer of [Mermaid Diagrams](frontend/Cell%20types/Many%20more.md)
- ...

### `"Class"`
Specify a class names to apply for a container element

### `"Style"`
Specify a style names to apply for a container element

### `ImageSize`
Resizes the container


## Applications
If you want to show mermaid diagrams in your slides

*craft a diagram*
```mathematica
MyDiagram = CellView["
graph LR
    A[Text Header 3200 byte]  --> B[Binary Header 400 byte]
    B --> C1[240 byte 1-st trace header] --> T1[samples of 1-st trace]
    B --> C2[240 byte 2-st trace header] --> T2[samples of 1-st trace]
    B --> CN[240 byte n-st trace header] --> T3[samples of 1-st trace] 
", ImageSize->650, "Display"->"mermaid"] 
```

*make a slide*
```mathematica
.slide

# My slide with a Diagram

<MyDiagram/>
```





