---
env:
  - Wolfram Kernel
context: Notebook`Storage`
package: wljs-editor
source: https://github.com/JerryI/wljs-editor/blob/dev/src/StoreKernel.wl
---
An access to a permanent local notebook storage. You can carry the raw data within the notebook, ***regardless if it has been exported*** to [Static HTML](frontend/Exporting/Static%20HTML.md) and imported back.

```mathematica
NotebookStore[key_String, opts___] _
```

accesses a `key` and returns the data. 

It works like an association or key-value storage.

## Methods
### `Set`
To assign any Wolfram Expression, use

```mathematica
NotebookStore[key_, opts___] = data_
```

### `Unset`
To remove the data and its key

```mathematica
NotebookStore[key_, opts___] = .
```

### `Keys`
Returns all keys

```mathematica
NotebookStore[opts___] // Keys 
```

## Options
### `"Notebook"`
Specifies the notebook from which the storage will be operated

:::warning
Be aware of a __evaluation context loss__, use [EvaluationNotebook](frontend/Reference/Cells%20and%20Notebook/EvaluationNotebook.md) for such cases if it is called from an external handler, i.e.

```mathematica
(* evaluation context is ok *)
NotebookStore["key"] = 123;

With[{n = EvaluationNotebook[]},
	(* evaluation context is ok *)
	EventHandler[InputButton[], Function[Null,
		(* evaluation context is lost!!! *)
		
		NotebookStore["key", "Notebook"->n] = 124;
							(* manually restore lost info *)
	]]
]
```
:::

### `"Timeout"`
A timeout for data to be piped from the notebook to the kernel in seconds. Default values is 80.