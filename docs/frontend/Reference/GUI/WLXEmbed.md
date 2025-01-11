---
env:
  - WLJS
context: System`
source: https://github.com/JerryI/wl-misc/blob/main/Assets/ServerAPI.js
package: JerryI`Misc`
---
:::caution
Deprecated in 2024. Please consider to use [HTMLView](frontend/Reference/GUI/HTMLView.md)
:::


```mathematica
WLXEmbed[html_String | {html__String}, opts___]
``` 

embeds an `html` string or array of string into a DOM element available in the context (i.e. `env.element` variable on JS side or [AttachDOM](frontend/Reference/Interpreter/AttachDOM.md)) and executes all script tags found in the string

This is a core function behind most input elements, such as [InputButton](frontend/Reference/GUI/InputButton.md), [InputText](frontend/Reference/GUI/InputText.md), [TextView](frontend/Reference/GUI/TextView.md) and etc.

## Options
### `"SideEffect"`
Executes a given WL expression on the frontend (WLJS Interpreter) after HTML DOM element has been embedded. 