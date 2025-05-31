---
tags:
  - diagrams
---
# Embedded Mermaid Diagrams

How do you embed [Mermaid](frontend/Cell%20types/Many%20more.md#Mermaid) diagrams into a slide? The challenge is that you need to render a cell inside another cell.

There is a special wrapper that allows you to embed cell content into a custom DOM element provided by the execution environment — [CellView](frontend/Reference/GUI/CellView.md).

:::info
When working with slides, every Wolfram Expression is transformed into [WLXForm](frontend/Reference/Formatting/WLXForm.md). You __need to define__ this form for your symbol in order to render it correctly on a slide. Alternatively, you can use wrappers that support both [StandardForm](frontend/Reference/Formatting/StandardForm.md) and [WLXForm](frontend/Reference/Formatting/WLXForm.md) by default, such as [FrontEndExecutable](frontend/Reference/Frontend%20Objects/FrontEndExecutable.md), provided by [CreateFrontEndObject](frontend/Reference/Frontend%20Objects/CreateFrontEndObject.md).

[CellView](frontend/Reference/GUI/CellView.md), [EditorView](frontend/Reference/GUI/EditorView.md), [Graphics](frontend/Reference/Graphics/Graphics.md), and some other symbols __do not require extra actions__, since [WLXForm](frontend/Reference/Formatting/WLXForm.md) is already defined for them.
:::

```mathematica
MyDiagram = CellView["
graph LR
    A[Text Header 3200 byte]  --> B[Binary Header 400 byte]
    B --> C1[240 byte 1-st trace header] --> T1[samples of 1-st trace]
    B --> C2[240 byte 2-st trace header] --> T2[samples of 2-nd trace]
    B --> CN[240 byte n-th trace header] --> T3[samples of n-th trace] 
", "Display"->"mermaid", ImageSize->900] 
```

Then on a slide, simply run:

```jsx
.slide

# Title of My Slide

<MyDiagram/>
```

![](./../../../Screenshot%202024-09-06%20at%2017.03.23.png)