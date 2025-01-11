---
env:
  - Wolfram Kernel
---
```mathematica
Row[{object1, object2, ...}]
```
shows the list of any Wolfram Expressions in a row acting as a decoration

![](../../../Screenshot%202024-03-27%20at%2021.10.03.png)

Or using it on slides with [WLX](frontend/Cell%20types/WLX.md)

```mathematica title="cell 1"
Figure = Plot[x, {x,0,1}];
Editor = EditorView["Plot[x, {x,0,1}] -> "];
```

```html title="cell 2"
.slide

<Row>
	<Editor/>
	<Figure/>
</Row>
```

![](./../../../Screenshot%202024-09-25%20at%2015.37.02.png)


## Supported output forms
- [StandardForm](frontend/Reference/Decorations/StandardForm.md)
- [WLXForm](frontend/Reference/Decorations/WLXForm.md)