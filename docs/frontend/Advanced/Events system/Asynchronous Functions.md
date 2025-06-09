:::warning
This chapter is in development
:::

:::info
See the reference section on [Async](frontend/Reference/Misc/Async.md)
:::

> Asynchronous programming is a technique that enables your program to start a potentially long-running task (or a request from a user) and still be able to be responsive to other events while that task runs, rather than having to wait until that task has finished. Once that task has finished, your program is presented with the result.

This is a relatively new concept inherited from other modern languages. It allows to write asynchronous sequential code avoiding callback hell. `AsyncFunction` and `Await` expressions and their concepts are built on top of [Promise](frontend/Reference/Misc/Promise.md)s framework.

## Limitations
The following constructions are supported with `Await`:
- `Set`
- `CompoundExpression`
- `If` 
- `Module`, `With`
- `_Symbol` or any other singular expressions

What is not supported (by now)
- Loops: `While`, `For`, `Do`
- Tables and maps: `Map`, `Table`

## Side by side comparison
Here is the same code-block using promises and `AsyncFunction`

```mathematica title="Using promises"
temperature = "Loading";
TextView[temperature // Offload]

Then[ParallelSubmitAsync[URLRead["https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m"]], Function[response, 
    temperature = ImportByteArray[response["BodyByteArray"], "RawJSON"]["current", "temperature_2m"];
]]
```

```mathematica title="Using AsyncFunction"
temperature = "";
TextView[temperature // Offload]

AsyncFunction[Null, Module[{response},
  temperature = "Loading";
  response = ParallelSubmitAsync[URLRead["https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m"]] // Await;
  temperature = ImportByteArray[response["BodyByteArray"], "RawJSON"]["current", "temperature_2m"];
]][]
```

The things are getting much more readable if you have multiple nested `Then` and promises.

## Naturally async functions
There are many built-in functions, which by the default return `Promise`

- [FrontFetchAsync](frontend/Reference/Frontend%20IO/FrontFetchAsync.md)
- [ChoiceDialogAsync](frontend/Reference/Frontend%20IO/ChoiceDialogAsync.md)
- [SystemDialogInputAsync](frontend/Reference/Frontend%20IO/SystemDialogInputAsync.md)
- [`ParallelSubmitAsync`](frontend/Reference/Misc/Parallel.md#`ParallelSubmitAsync`)
- [`ParallelSubmitFunctionAsync`](frontend/Reference/Misc/Parallel.md#`ParallelSubmitFunctionAsync`)
- Any `EventObject`: [InputButton](frontend/Reference/GUI/InputButton.md) and etc

## Examples
:::danger
Be aware of the evaluation context loss after each `Await` statement. Provide [EvaluationNotebook](frontend/Reference/Cells%20and%20Notebook/EvaluationNotebook.md), [EvaluationCell](frontend/Reference/Cells%20and%20Notebook/EvaluationCell.md) or [CurrentWindow](frontend/Reference/Frontend%20IO/CurrentWindow.md) if necessary.
:::

### Heavy branching
In this example we demonstrate __branching__, __assignments__ and compound expressions in asynchronous functions:

```mathematica
p1 = Promise[];
p2 = Promise[];
p3 = Promise[];

win = CurrentWindow[];

f = AsyncFunction[Null, With[{},
  Speak["Press p1", "Window"->win];
  p1 // Await;
  Speak["Press p2A or p2B", "Window"->win];
  Module[{m = -100},
    m = Await[p2];
    Speak["Pause 2 seconds", "Window"->win];
    PauseAsync[2] // Await;
    
    If[m > 4,
      Speak["Press p3", "Window"->win];
      m = Await[p3];
    ];

    StringTemplate["Result: ``"][m]
  ]
]];

Then[f[], Speak];
```

To simulate async events here we use buttons

```mathematica
Button["p1", EventFire[p1, Resolve, True]]
Button["p2A", EventFire[p2, Resolve, 1]]
Button["p2B", EventFire[p2, Resolve, 5]]
Button["p3", EventFire[p3, Resolve, 10]]
```



