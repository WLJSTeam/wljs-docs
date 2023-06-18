---
sidebar_position: 1
---
#### Editor in the browser
When you open an editor and __start typing__, the following happens
1. each character is send to a server and updates the cell (autosaving)
2. editor tries to figure out the language or a cell type 
3. considering (2) it changes the highlighting and autocomplete / other plugins

In this sense your input cell is __an ultimate tool__.

![](../../imgs/ezgif.com-video-to-gif-4.gif)

To specify the type it uses a prefix in the first line of the cell

```markdown
.md
# Hello
```

it can be anything `**.**` the behavior is defined by so-called [Processors](../Development/Making%20new%20cell%20types/Processors.md) (comes with a downloadable package).

Then whatever you typed, you should press `Shift-Enter` to make magic happens

### 1. WL Processing
JS sends the data via websockets to the server and sets the status of the cell to  `working`

```mermaid
flowchart
  subgraph Browser
  In[Input Cell]
  Out[Output Cell]
    subgraph JS Engine
        direction RL
        WJ[Wolfram Interpreter];
    end
    WJ[Interpreter] --> Out[Output Cell]
  end
  In[InputCell]-- WebSockets -->B[Preprocessor]
  subgraph Master Kernel
    B[Preprocessor]
    V[Postprocessor]
    subgraph Addons
        Wolfram
        Markdown
        Mermaid
        HTML
        JS
    end
    Addons -.- B[Preprocessor]
  end
  subgraph Secondary Kernel
    B[Preprocessor]-- TCP/WSTP -->E[Evaluator] -- TCP --> V[Postprocessor] -- WebSockets --> WJ[Interpreter]
  end
```

#### Processing on Master Kernel
Firstly the preprocessing happens on the first master-kernel. 

All cells operations are performed via `Kernel/Cells` module under `Kernel/Notebook` wrapper

```mermaid

flowchart TB
subgraph Browser
JS
subgraph Frontend

InputCells
OutputCells
UI

end

end

Frontend --"Shift+Enter"--> Evaluate
subgraph Notebook["Notebook API"]

  Evaluate
  Events
  Processors
  subgraph MyNotebook["Notebook"]
	  Kernel
  end
end
Events --"Create Cell"--> Frontend 
Processors ---> CEvaluate
CEvaluate ---> Processors

Evaluate --"Meta-data"-->CEvaluate

subgraph Cells["Cell API"]
  CEvaluate["Evaluate"]
  CCallback["Callback"]

  CCallback --- CEvaluate
end

CEvaluate --> Kernel

Kernel --Async--> CCallback

subgraph KernelAPI["Kernel API"]
  Kernel1["Local Kernel"]
  Kernel2["Remote Kernel"]
end

CCallback--Fire-->Events

Kernel <--> KernelAPI
```

It applies all available processors to the input expression listed in `jsfn'Processors` . This is an example with Markdown language

```mathematica
{
	MarkdownQ -> <|"SyntaxChecker"->(True&), "Epilog"->(#&), "Prolog"->(#&), "Evaluator"->MarkdownProcessor |>,
}
```

The pipeline for `Processors` is following

```mermaid
flowchart TD
  In["Input String"]
  In --check--> MarkdownQ
  MarkdownQ --False--> MermaidQ
  MermaidQ --False--> WolframQ
  WolframQ --False--> ERR["Error!"]

  WolframQ--True-->SyntaxChecker
  MarkdownQ--True-->MProcessor
  MermaidQ--True-->MMProcessor

  subgraph Kernel["Kernel API"]
	  LocalKernel
	  RemoteKernel
  end
  
  subgraph WProcessor["Wolfram Processor"]
  direction LR
	SyntaxChecker-->Epilog["Epilog"]
	Epilog["Epilog"]-->Evaluator
	Evaluator --Async-->Prolog

  end
  Evaluator-->Kernel
Kernel --> Evaluator

Prolog-->Callback
  


  subgraph MProcessor["Markdown Processor"]
	
  end

  subgraph MMProcessor["Mermaid Processor"]
	
  end
```

Here evaluator function (`WolframProcessor`) can decide if it returns the result immediately or send to the evaluation to the secondary kernel with a callback included. Also it determines the final output cell subtype (wolfram, html, mermaid) see [Cell types](../Cell%20types/) to be interpreted by the frontend running in the browser.

#### Evaluation on the secondary kernel | Kernel API
The expression arrives in a form of string and then converts to the Wolfram Expression with a held head. See `Kernel/Evaluator`

To support fully [[Frontend Object]] it replace them with an actual wolfram expressions. If it is not available on the kernel it makes a query to the master kernel and download them.

All non-native boxes, decorations (see [Decorations](../Decorations.md) are replaced with the corresponding Wolfram Expressions.

The result evaluates normally. However if it encounters the creation function for [[Frontend Object]] or registered Frontend Objects (see [[Writting WebObject]]) like `Graphics`, `Plotly` it replaces them with `FrontEndExecutable` and stores the compressed to JSON data for them into the local storage to be shared lately with the master kernel and a notebook.

On the very last stage it converts the result to sort of `Boxes` (see [Decorations](../Decorations.md)).

If the resulting string is too long, then instead of a string it returns a pointer to the corresponding data to prevent frontend overloading

```mermaid
flowchart TB
In["Input String"]

subgraph FrontEndObjects
direction TB
	Object1
	Object2
	Object3["..."]
end


ToExpression --Get--> FrontEndObjects

subgraph MasterKernel
subgraph Notebook
	subgraph FrontEndObjectsGlobal["FrontEndObjects"]
	direction TB
		ObjectG1["Object1"]
		ObjectG2["Object2"]
		ObjectG3["..."]
	end
end
end

subgraph WebObjects
direction TB
	WebObject1
	WebObject2
	WebObject3["..."]
end

FrontEndObjectsGlobal --Sync--> FrontEndObjects
FrontEndObjects --Sync--> FrontEndObjectsGlobal

Evaluate

ToExpression --> Evaluate

Evaluate --Append-->FrontEndObjects

Evaluate-->ReplaceAll

ReplaceAll--Look-->WebObjects

WebObjects--Append-->FrontEndObjects

ReplaceAll-->ConvertToBoxes-->Out

Out["Output String"]


In --> ToExpression
```

The result, created frontend objects, the cell type are shared via provided callback function with a master kernel. As well as syncs updated or created [[Frontend Object]] s.

### 2. JS Processing
Once the message is decoded by the frontend in your browser, it creates a cell and fetches the corresponding handler to display the result in a cell. 

For example, here the handler function for `markdown` ([Markdown](../Cell%20types/Markdown.md))

```js
class MarkdownCell {
	dispose() {}
	constructor(parent, data) {
		//parse markdown code and draw it to DOM element
		parent.element.innerHTML = marked.parse(data);
		return this;
	}
}
```

After that the user can see the content. It also takes care about syntax highlighting and anything else. This process is boosted by the server side rendering, i.e. the server also provides DOM template for the cell wrapper, controls, buttons (as much as possible) to release an extra load from the client.

:::info
Any action with a cell must be approved by the server via Notebook API functions. If you remove the cell or add a new one the client waits the server's reply for it. Therefore it makes sure that the data is synced perfectly.
:::