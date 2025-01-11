---
env:
  - WLJS
context: Notebook`Interpreter`
package: wljs-interpreter
source: https://github.com/JerryI/wljs-interpreter/blob/dev/src/Definitions.wl
---
```mathematica
WindowScope[name_String] _JSObject
```

reads out Javascript variable available from the global scope and returns it. __This is pure WLJS function__

It allows another way of WL JS communication
## Example

### Read JS variable
Firstly let us create it

```js title="cell 1"
.js

window.variable = [0,1,2,3,4,5];
```

now read

```mathematica
FrontFetch[WindowScope["variable"]]
```