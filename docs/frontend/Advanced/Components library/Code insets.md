---
sidebar_position: 3
tags:
  - code
---

# Code insets

This component uses [EditorView](frontend/Reference/GUI/EditorView.md) to display Wolfram Language code (including all syntax sugar) on a slide or [WLX](frontend/Cell%20types/WLX.md) / [Markdown](frontend/Cell%20types/Markdown.md) cell

![](./../../../Screenshot%202024-11-26%20at%2020.00.41.png)

For example

```html
.slide

# Code on a slide

<CodeInset>
Table[
  With[{
    i = (*SqB[*)Sqrt[Sinc[\[Phi]]](*]SqB*)
  },
    funcion[i, (*VB[*)(RGBColor[1, 0, 0])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyiDgQHOAAALpBNd"*)(*]VB*)] / i   
  ]
, {\[Phi], 0, n}
</CodeInset>
```

:::info
There is no need in writing `(*funny comments*)` and etc. manually, this is a representation of cell's elements (Boxes) from a normal WL editor. __Just copy the text from it__  (input/output cell)
:::

## Source code
Copy and paste it into an input cell
```jsx
.wlx
CodeInset[str_String] := With[{Fe = EditorView[str]},
  <div>
	  <Fe/> <!-- .element: class="text-left" style="font-size:18px" -->
  </div>
]
```

:::tip
If you want to embed other languages, consider to use [CellView](frontend/Reference/GUI/CellView.md) instead of `EditorView` and specify `"Display"` property.
:::
### Layout fixes
Sometimes the text is aligned to the center. Another way to fix this issue is to apply this patch by evaluating in a new cell the following

```html
.html

<style>
	.slide-frontend-object .cm-editor {
		text-align: left;
	}
</style>
```
