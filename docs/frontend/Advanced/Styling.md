---
sidebar_position: 13
---


Notebook UI is styled using Tailwind CSS framework, however, there are predefined empty CSS classes for certain elements:

- `main` main window  
- `.ccontainer` cells container  
- `.cgroup` a single group of cells: 1 input + outputs + tools  
- `.cframe` a single inner group of cells: 1 input + outputs  
- `.cborder` a vertical line displayed at the right side from the cell group  
- `.cwrapper` an input/output cell wrapper  
- `.cseparator` a thin space between cells  
- `.cinit` a class for initialization cells  
- `.cin` a class for input cells  
- `.cout` a class for output cells
- `.ttint` a class applied to focused cells

## Root styles
The following styles are applied to `:root` and defines editor's colors and fonts for UI

```css
font-size: medium;
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

--editor-key-meta: #404740;
--editor-key-keyword: #708;
--editor-key-atom: #219;
--editor-key-literal: #164;
--editor-key-string: #a11;
--editor-key-escape: #e40;
--editor-key-variable: #00f;
--editor-local-variable: #30a;
--editor-key-type: #085;
--editor-key-class: #167;
--editor-special-variable: #256;
--editor-key-property: #00c;
--editor-key-comment: #940;
--editor-key-invalid: #f00;
--editor-outline: #696969;
```

To override them - redefine `:root` class.

## Local Styling
[HTML](frontend/Cell%20types/HTML.md) or [WLX](frontend/Cell%20types/WLX.md) can be used to customize them locally for an individual notebook document.

See also: [Templates](frontend/Advanced/Command%20palette/Templates.md).

## Global Styles
From the settings menu a global styles can be set

![](./../../Screenshot%202025-05-29%20at%2008.32.01.png)