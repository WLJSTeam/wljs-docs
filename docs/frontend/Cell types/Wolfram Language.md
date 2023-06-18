---
sidebar_position: 1
---
__[Github repo](https://github.com/JerryI/wljs-editor)__

When you open an editor and __start typing__, the following happens
1. each character is send to a server and updates the cell (autosaving)
2. editor tries to figure out the language or a cell type 
3. considering (2) it changes the highlighting and autocomplete / other plugins

In this sense your input cell is __an ultimate tool__.


:::tip
To specify the type of a cell - use a prefix in the first line of the cell
```markdown
.md
# Hello
```
it can be anything `**.**` the behavior is defined by language processors shipped via packages installed (see [Static Evaluation](../Evaluation/Static.md))
:::

For example

<Notebook code="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" name="aridity-18185">aridity-18185</Notebook>

Then whatever you typed, you should press `Shift-Enter` to make magic happens.

:::info
Input cell is a universal text-field and cannot be customized. Output cells can be different and customized via plugins / packages.
:::

Wolfram Language cells support code with built-in syntax highlighting, graphics or any other interactive objects, syntax sugar (fractions) and etc.

## Syntax highlighting
Depending on the language you specify at the first line, it will highlight HTML, Markdown or Javascript. Wolfram Language autocomplete and highlighting can be extended using external packages.

Locate any package in `Packages/` folder. Usually `src/autocomplete.js` file describes any new library-related Wolfram Expressions.

## Graphics symbols | Syntax sugar
All "heavy" objects are represented as

```mathematica
FrontEndExecutable["uid"]
```

where `uid` is an identifier for the Objects storage. Basically any `Graphics`, `Graphics3D` are packed to such construction to prevent slow-down caused by many symbols stored in the editor.

For the lightweight objects it uses inline representation, for example
```mathematica
data // Iconize
```

will result in
```mathematica
FrontEndInlineExecutable["compressed data"]
```

There are some special cases, please see more about it in.....