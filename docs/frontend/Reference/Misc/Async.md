## Utils

### `SetTimeout`
Spawns an asynchronous task (a wrapper over `SchelduleTask`), that evaluates an expression once
```mathematica
SetTimeout[expr_, interval_Real] _TaskObject
```
A symbol has `HoldFirst` attribute. An `interval` is in __milliseconds__. To cancel it, use
```mathematica
CancelTimeout[_TaskObject]
```


### `SetInterval`
Spawns an asynchronous task (a wrapper over `SchelduleTask`), that evaluates an expression every `interval` __milliseconds__
```mathematica
SetInterval[expr_, interval_Real] _TaskObject
```
A symbol has `HoldFirst` attribute. To cancel this task use

```mathematica
TaskRemove[_TaskObject]
```
or

```mathematica
CancelInterval[_TaskObject]
```

### `PauseAsync`
Works similar to `Pause`, but returns [Promise](frontend/Reference/Misc/Promise.md)

```mathematica
Then[PauseAsync[3], Beep];
```


## Asynchronous Functions

### `AsyncFunction`
It works similar to `Function`

```mathematica
AsyncFunction[args, body] _Promise
```

One can use it as normal function, but utilizing [`Await`](#`Await`) keyword. On the background it restructures `body` in the runtime. 

### `Await`
Holds the execution (non blocking to threads) until the promise is resolved and returns the result

```mathematica
Await[_ | _Promise] _
```

If the argument is not `Promise` it won't pause the execution and return the result without changes.

The following constructions are supported with `Await`:

- `Set`
- `CompoundExpression`
- `If` 
- `Module`, `With`
- `_Symbol` or any other singular expressions

What is not supported

- Loops: `While`, `For`, `Do`
- Tables and maps: `Map`, `Table`

For example:

```mathematica
btn = InputButton[]

Then[AsyncFunction[x, Module[{res},
  Speak["Click to start"];
  btn // Await;
  Speak["Choose"];
  res = ChoiceDialogAsync["Add 10?"] // Await;
  If[res, x + 10, x] 
]][10], Speak];

```