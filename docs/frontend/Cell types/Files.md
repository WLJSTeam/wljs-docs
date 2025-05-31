---
sidebar_position: 12
---
## Image Preview
You can drop any image available in the folder of your notebook and type its filename in a new cell.

```shell
randompic.png
```

![](../../imgs/Screenshot%202023-03-31%20at%2016.06.38.png)

## Reading and Writing Files
In principle, you can __print the contents of any file__ located in the notebook's folder by typing its name without line breaks.

```
filename.txt
```

For writing, the process is the same, but the actual content goes on the next line:

```
filename.txt
Hello World
```

![](../../imgs/Screenshot%202023-03-31%20at%2016.07.58.png)

Or, if you are writing a package, this might come in handy:

```mathematica title="cell 1"
IR.wl

BeginPackage["JerryI`Mirage`IR`"]

(* utils *)
MapHeld[f_, list_] := Table[Extract[Unevaluated[list], i, f], {i, 1, Length[Unevaluated[list]]}]
SetAttributes[MapHeld, HoldAll]

ClearAll[Lexer]
SetAttributes[Lexer, HoldAll]

...
```

![](../../imgs/Screenshot%202023-12-05%20at%2010.29.43.png)

And then, it can be imported easily:

```mathematica title="cell 2"
Get["IR.wl"];
```

:::info
The frontend detects the file extension and tries to apply the appropriate syntax highlighting scheme.
:::

