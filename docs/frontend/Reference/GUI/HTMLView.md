---
env:
  - Wolfram Kernel
origin: https://github.com/JerryI/wljs-inputs
context: Notebook`Kernel`Inputs`
package: wljs-inputs
update: true
source: https://github.com/JerryI/wljs-inputs/blob/dev/src/Kernel.wl
---
```mathematica
HTMLView[string_String | List[strings__String] | _Offload, opts___]
```

a representation of an HTML element in the notebook. It is used for rendering HTML in-place, where this expression is located and also is used for dynamic indication.

```mathematica
HTMLView["<span style=\"color:red\">Hello World</span>"]
```

![](../../../imgs/Screenshot%202024-03-25%20at%2012.26.11.png)

This is a core function behind most input elements, such as [InputButton](frontend/Reference/GUI/InputButton.md), [InputText](frontend/Reference/GUI/InputText.md), [TextView](frontend/Reference/GUI/TextView.md) and etc.

## Options
### `Prolog`
**works only if a string or a list of strings provided as input**
A function to be executed on the frontend before embedding HTML into DOM. You probably have to define it by yourself (see [WLJS Functions](frontend/Advanced/Frontend%20interpretation/WLJS%20Functions.md)). It exposes in `env` following fields

```js
env.htmlString //mutable HTML expression as string
```

There is a built-in feature for modifying the string - see below [Post-template engine](#Post-template%20engine)

### `Epilog`
**works only if a string or a list of strings provided as input**
A function to be executed on the frontend after embedding HTML into DOM. The exposed fields are

```js
env.element //access to DOM element created
```

### `"Style"`
a string, which sets CSS style attribute

### `"Class"`
a string, which sets CSS class attribute

## Post-template engine
There is built-in tool for post-processing HTML elements before embedding them into DOM. It can be included to the pipeline using `Prolog` option

```mathematica
HTMLView`TemplateProcessor[object_Association]
```

**It has `HoldFirst` attribute and `object` will be evaluated on the frontend**
This text processor replaces all string like

```
#name
```

With a corresponding field value from `object["name"]`.

It comes handy to create unique ID's in runtime, before a widget is rendered on a page. For example

```mathematica
HTMLView["<div>Unique Id #instanceId</div>", Prolog->HTMLView`TemplateProcessor[<|"instanceId" -> CreateUUID[]|>]]
```

It will generate a new UID for each instance even if you copy and paste one.

## Dynamic updates
It fully supports dynamic updates. Use [Offload](frontend/Reference/Interpreter/Offload.md). For example

```mathematica
word = "";
HTMLView[word]
```

and then

```mathematica
word = "<h1>"<>RandomWord[]<>"</h1>";
```

## Supported output forms
- [StandardForm](frontend/Reference/Decorations/StandardForm.md)
- [WLXForm](frontend/Reference/Decorations/WLXForm.md)