Debugger is a [Command palette](frontend/Command%20palette.md) tool that attaches to a notebook and a working kernel to intercept the evaluation process and monitor symbol changes.

![](./../../../Pasted%20image%2020250103191609.png)

__Inspect__ is a central mode for debugging.

## Inspecting Mode
It stops the current execution and allows you to interact with any other cells in the sub-session, enabling you to check the status of various symbols. You can write and evaluate other cells in `Inspect` mode.

For example, evaluate this one:

```mathematica
Do[k = i; Pause[1], {i, 100}];
```

Then switch to `Inspect` mode; it will pause the evaluation. Now, you can check the state of the `k` symbol by running a new cell with:

```mathematica
k
```

:::note
You can always continue execution from this mode by clicking `Continue` until the next possible break. All transitions take time and depend on the current kernel occupancy.
:::

## Watching Symbols
You can add a symbol to a tracking list to monitor its `OwnValue` in real-time automatically. It won't interrupt your execution unless you enable the checkbox for that option.

:::note
Live updates are supported only for assignments, i.e., when `symbol = *newValue*`. If you mutate a part of a `List`, it won't trigger an update.
:::

:::note
`Shallow` is applied to an expression of a symbol for display in the tracking window.
:::

## Breakpoints
In Wolfram Language, traditional breakpoints are difficult to implement since there is no *source code file* in the classical sense. Everything is an expression, and a breakpoint must be an expression as well.

There are two sources for breaking events, both of which immediately switch the kernel to [Inspecting Mode](#Inspecting%20Mode).

### Asserts
First, __enable breaking on assertions__ from the dropdown menu in the top bar of the debugger. Then, whenever execution encounters `False` in an [Assert](frontend/Reference/Misc/Assert.md), it will break.

For example:

```mathematica
Do[k = i; If[i > 6, Assert[False, "Hey"]]; Pause[1], {i, 100}];
```

This code will break automatically after 6 seconds. In `Inspect` mode, evaluating `k` will return `7`.

If you track the `k` symbol at the same time, you will see the following:

![](./../../../assert-ezgif.com-optimize.gif)

### Symbols
When a symbol is assigned a new value, it generates an event in the debugger. Use the `Break on` checkbox to enable breaking.

For example:

```mathematica
Do[k = i; If[i > 6, test = Now]; Pause[1], {i, 100}];
```

This code will break after 6 iterations.

![](./../../../symbols-ezgif.com-optimize.gif)