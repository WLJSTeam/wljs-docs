## `ParallelSubmitAsync`
Submits and expression for evaluation to any available parallel kernel and returns [Promise](frontend/Reference/Misc/Promise.md) with the result

```mathematica
ParallelSubmitAsync[expr_] _Promise
```

:::tip
Please, launch parallel Kernels beforehand using `LaunchKernels[n_Integer]`
:::

```mathematica
Then[
	ParallelSubmitAsync[URLRead["http://google.com"]],

	Function[result, Beep[]; page = result]
]; 
```

The downloaded page will appear in a global symbol `page`. To share the definitions of any symbol from your main evaluation Kernel use `DistributeDefinitions[sym_ | "ContextName"]`.

## `ParallelSubmitFunctionAsync`
Similar to the previous one, but allows an inner expression make callback manually

```mathematica
ParallelSubmitFunctionAsync[f_, args__] _Promise
```

For example

```mathematica
Then[
	ParallelSubmitFunctionAsync[
		Function[{url, cbk}, 
			With[{data = URLRead["http://google.com"]},
				cbk[data];
			];
		],
		
		"http://google.com"
	],
	
	Function[result, Beep[]; page = result]	
];
```



