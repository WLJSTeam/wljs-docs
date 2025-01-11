---
tags:
  - diagrams
---

# Embedded Mermaid diagrams

How to embed [Mermaid](frontend/Cell%20types/Many%20more.md#Mermaid) diagrams to a slide? The challenge is that you need to render cell inside another cell.

There is a special wrapper, that allows to embed cell content into a custom DOM element provided by the execution environment - [CellView](frontend/Reference/GUI/CellView.md). 

:::info
When you are working with slides, every Wolfram Expression is transformed into [WLXForm](frontend/Reference/Decorations/WLXForm.md).  You __need to define__ this form for your symbol to render it on a slide correctly. Or one can wrappers, which has both [StandardForm](frontend/Reference/Decorations/StandardForm.md) and [WLXForm](frontend/Reference/Decorations/WLXForm.md) by the default such as [FrontEndExecutable](frontend/Reference/Frontend%20Objects/FrontEndExecutable.md) provided by [CreateFrontEndObject](frontend/Reference/Frontend%20Objects/CreateFrontEndObject.md). 

[CellView](frontend/Reference/GUI/CellView.md), [EditorView](frontend/Reference/GUI/EditorView.md), [Graphics](frontend/Reference/Graphics/Graphics.md) and some other symbols __do not require extra actions__, since [WLXForm](frontend/Reference/Decorations/WLXForm.md) is already defined for them.
:::

```mathematica
MyDiagram = CellView["
graph LR
    A[Text Header 3200 byte]  --> B[Binary Header 400 byte]
    B --> C1[240 byte 1-st trace header] --> T1[samples of 1-st trace]
    B --> C2[240 byte 2-st trace header] --> T2[samples of 1-st trace]
    B --> CN[240 byte n-st trace header] --> T3[samples of 1-st trace] 
", "Display"->"mermaid", ImageSize->900] 
```

then on a slide simply run

```jsx
.slide

# Title of my Slide

<MyDiagram/>
```

![](./../../../Screenshot%202024-09-06%20at%2017.03.23.png)