---
env:
  - Wolfram Kernel
origin: https://github.com/JerryI/wljs-inputs
context: Notebook`Kernel`Inputs`
package: wljs-inputs
source: https://github.com/JerryI/wljs-inputs/blob/dev/src/Kernel.wl
---
```mathematica
InputFile[opts___] _EventObject
```
outputs as a drag & drop file-form used to handle file input

## Options
### `"Label"`
A text label for an element

### `"Description"`
A description label for an element


## Event generation
It accepts single or multiple files. The whole pipeline is separated into two steps
1. Initiation of a transaction. Emits an event with a topic `"Transaction"`, which has the following structure

```mathematica
<|"Id"->uid_String, "Length"->numberOfFiles_Integer|>
```

2. Sending files one by one files emitting `"File"` event that follows the structure

```mathematica
<|"Transaction"->uid_String, "Name"->filename_String, "Data"->base64_String|>
```


## Chaining events
One can reuse another event

```mathematica
InputFile[event_EventObject, rest__]
```



## Example
A simple file-form to plot the data from the uploaded file

```mathematica
plot = Plotly[<|"type"->"line"|>]
EventHandler[InputFile[], {"File" -> Function[file,
  Module[{},
    imported = Drop[ImportByteArray[file["Data"]//BaseDecode, "CSV"], 3];
    (* try different encoding *)
    If[!NumberQ[imported[[1,1]]], imported = Drop[ImportByteArray[file["Data"]//BaseDecode, "TSV"], 3]];

    Plotly`addTraces[plot, {<|"x" -> imported[[All,1]], "y" -> imported[[All,2]]|>}];
  ]
  
]}]
```


## Supported output forms
- [StandardForm](frontend/Reference/Decorations/StandardForm.md)
- [WLXForm](frontend/Reference/Decorations/WLXForm.md)