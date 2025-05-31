__Write small useful apps using WL, JS, whatever with GUI and isolated resources__

WLJS Notebook can be used __as a runtime__ for mini apps. It is 1 window app, which uses the full capabilities of a normal notebook (similar to Wolfram CDF or LabView programs) and runs in the isolated generated context. 

> We have a __dedicated section on our website - [Mini Apps](https://wljs.io/widgets)__, > where we showcase some of the mini apps we’ve developed.

:::note
Widgets are shipped as a single executable file with `.wlw` extension. By changing this extension to `.wln` you can restore the source notebook.
:::

## How write a mini app using notebook
In general you can thing about a mini app if it was an output of a single cell [projected](frontend/Advanced/Projector.md) to a window. The following rules are applied in addition

- The default context (`$Context`) of all symbols is randomly generated and will be unique for each running instance of your widget
- __All initialization cells will be executed automatically__ on the startup of the widget
- __The output of the last input cell__ will be the window of your widget
- An app will use the first available computation Kernel in your system

Apart from that the program for the widget is just a plain WLJS notebook. You can leave there cells for testing, debugging with no impact.

- export it using `Share` menu

![](./../../Screenshot%202025-05-22%20at%2019.08.07.png)

![](./../../Screenshot%202025-05-22%20at%2019.07.26.png)

:::tip
Use [WLX](frontend/Cell%20types/WLX.md) cell as the output
:::

:::info
See more tutorials on making mini apps in __Advanced section__ -  [Advanced/Mini Apps](Advanced/Mini%20Apps)
:::

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

Then you can simple press `Share` and locate *mini app* or *WLJS Widget*

![](./../../Screenshot%202024-12-25%20at%2019.54.09.png)

As the result you will get `.wlw` file. Open it anytime on any machine with WLJS Notebook installed 

![](./../../Screenshot%202024-12-25%20at%2020.01.28.png)

### Example 2

```mathematica title="Last input cell"
Module[{
	text = "Hello World"
},
	Column[{
		EventHandler[InputText[text], (text = #)&],
		Graphics[Table[{
			RandomColor[], 
			Rotate[
				Text[text // Offload, RandomReal[{-1,1}, 2]],
				RandomReal[{0, 3.14}]
			]
		}, {40}]]
	}]
]
```

![](./../../Screenshot%202024-12-25%20at%2020.47.41.png)


## Tips

:::tip
Utilize [WLX](frontend/Cell%20types/WLX.md) cells for the best customization of the GUI 
:::

:::tip
Track opened windows using [CurrentWindow](frontend/Reference/Frontend%20IO/CurrentWindow.md) inside event generating functions (buttons or other UI elements used on the window) and free the resources once it has been closed. See also how it is done in [Multi-window app](frontend/Advanced/Mini%20apps/Multi-window/index.mdx)
:::


## Examples
__See Mini apps section in the top navigation menu__
- [Transform Native Plot Functions: Bonus section](frontend/Advanced/Dynamics/Transform%20native%20plot%20functions/index.mdx)
- [Multi-window app](frontend/Advanced/Mini%20apps/Multi-window/index.mdx)