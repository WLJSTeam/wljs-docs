__Write small useful apps using WL, JS, whatever with GUI and isolated resources__

WLJS Notebook can be used __as a runtime__ for standalone widgets. It is 1 window app, which uses the full capabilities of a normal notebook (similar to Wolfram CDF or LabView programs) and runs in the isolated generated context. 

:::note
Widgets are shipped as a single executable file with `.wlw` extension. By changing this extension to `.wln` you can restore the source notebook.
:::

## How write a widget using notebook
In general you can thing about a standalone widget if it was an output of a single cell [projected](frontend/Advanced/Projector.md) to a window. The following rules are applied in addition

- The default context (`$Context`) of all symbols is randomly generated and will be unique for each running instance of your widget
- __All initialization cells will be executed automatically__ on the startup of the widget
- __The output of the last input cell__ will be the window of your widget
- A widget will use the first available computation Kernel in your system

Apart from that the program for the widget is just a plain WLJS notebook. You can leave there cells for testing, debugging with no impact.

### Example 1
Let's write the simples possible interactive widget 

:::note
There is no need in evaluation of any of those cells for widget to work later
:::

```mathematica title="Initialization cell"
equation[x_,n_] := Sum[(Sin[2\[Pi](2j - 1) x])/(2j - 1), {j, 1, n}]
```

```mathematica title="Last input cell"
ManipulatePlot[equation[x,n]//Re, {x, -1,1}, {n, 1,10,1}]
```

Then you can simple press `Share` and locate *Standalone Widget* or *WLJS Widget*

![](./../../Screenshot%202024-12-25%20at%2019.54.09.png)

As the result you will get `.wlw` file. Open it anytime on any machine with WLJS Notebook installed 

![](./../../Screenshot%202024-12-25%20at%2020.01.28.png)

## Tips

:::tip
Utilize [WLX](frontend/Cell%20types/WLX.md) cells for the best customization of the GUI 
:::

:::tip
When working with low-level [Dynamics](frontend/Dynamics.md) (dynamic symbols), define all dynamic symbols in ``System` `` context and scope them using `Module` or [`LeakyModule`](frontend/Reference/Misc/Language.md#`LeakyModule`).  This limitation comes from the bug of the context communication between the frontend and Wolfram Kernel. For example

```mathematica title="Last input cell"
Module[{
	System`text = "Hello World"
},
	Column[{
		EventHandler[InputText[System`text], (System`text = #)&],
		Graphics[Table[{
			RandomColor[], 
			Rotate[
				Text[System`text // Offload, RandomReal[{-1,1}, 2]],
				RandomReal[{0, 3.14}]
			]
		}, {40}]]
	}]
]
```

Here `text` is still unique for each instance due to lexical scoping of `Module`, while its context fixed to `System`.

![](./../../Screenshot%202024-12-25%20at%2020.47.41.png)
:::

## Examples
__See Widgets section in the top navigation menu__
