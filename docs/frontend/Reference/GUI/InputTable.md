---
env:
  - Wolfram Kernel
origin: https://github.com/JerryI/wljs-inputs
source: https://github.com/JerryI/wljs-inputs/blob/dev/src/Kernel.wl
package: wljs-inputs
context: Notebook`Kernel`Inputs`
update: false
---
```mathematica
InputTable[list_List, opts___]
```

it places a sort of small Excel-like table editor for `list` provided. This is a great solution for __a large tables__, since it does support lazy loading from a server

:::warning
`list` has to be a 2D list of numbers
:::

:::tip
For just viewing tables use [TableView](frontend/Reference/GUI/TableView.md)
:::

## Event generation
Every-time user changes the cell's data, the events comes as transactions in a form of

```mathematica
{"Typeof", row, col, oldData, newData}
```

try this example

```mathematica
list = Table[i j, {i,5}, {j,5}];
EventHandler[InputTable[list], Print]
```

### Transaction helper
if you don't want to mess with them, there is a helper function `InputTable~EventHelper`, that updates the list using those transitions

```mathematica
InputTable`EventHelper[list_List] _Function
```

It will mutate the given symbol `list` according to the transactions. One has to initialize it on the corresponding list and use the resulting generated symbol in your [`EventHandler`](frontend/Reference/Misc/Events.md#`EventHandler`) function like in the example below

```mathematica
list = Table[i j, {i,5}, {j,5}];
handler = InputTable`EventHelper[list];
textstr = ToString[Style["Change something in the table", Italic], StandardForm];
EventHandler[InputTable[list, "Height"->150], Function[data, 
  handler[data];
  textstr = "";
  textstr = ToString[list // TableForm, StandardForm];
]]

EditorView[textstr // Offload]
```

the result should look like this

![](../../../imgs/ezgif.com-optimize-7-2%201.gif)

:::tip
If you want to __just view__ your data, do not apply `EventHandler` 

```mathematica
list = Table[i j, {i,5}, {j,5}];
InputTable[list]
```

your symbol `list` will not be affected. 
:::

## Options
### `"Height"`
specifies the max-height of the table widget. The default value is `400` px.

:::tip
If you have a large list of rows, project the cell to a new window with a bigger `"Height"`
value. It will bring similar experience to Excel-like programs. 
:::

## Chaining events
One can reuse another event

```mathematica
InputTable[event_EventObject, rest__]
```


## Dev notes
A [handsontable](https://handsontable.com) engine is used as the cells manager. 


## Supported output forms
- [StandardForm](frontend/Reference/Decorations/StandardForm.md)
- [WLXForm](frontend/Reference/Decorations/WLXForm.md)