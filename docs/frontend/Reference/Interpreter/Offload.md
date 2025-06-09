---
env:
  - Wolfram Kernel
  - WLJS
source: https://github.com/JerryI/wljs-interpreter/blob/dev/src/Definitions.wl

package: wljs-interpreter
---
Holds (or offloads) an expression to be evaluated on frontend (WLJS)

```mathematica
Offload[expr_, opts___]
```

It has `HoldFirst` attribute. 

:::info
Please, see the tutorial [Dynamics](frontend/Dynamics.md)
:::

:::info
Nested `Offload` is allowed
:::

## Options
### `"Volatile"`
Blocks or allows updates. Only normal evaluation will be allowed if it is set to `False`. The default values is `True`

:::warning
In such case an expression will not be evaluated during the updates and will return undefined value. Use it only in constructions like `CompoundExpression`
:::

### `"Static"`
Prevents or allows a parent instance to listen changes of an inner expression. The default value is `False`. 

:::tip
The typical case scenario is you don't want to create extra bondings between an objects and other dynamic symbols.
:::

## Related
See also [OffloadFromEventObject](frontend/Reference/Interpreter/OffloadFromEventObject.md)

## Examples
### Symbols tracking and deferred evaluation
Typical example for the dynamic evaluation

```mathematica
pts = RandomReal[{-1,1}, {64, 2}];
Graphics[{PointSize[0.02], Point[pts // Offload]}, ImageSize->500]
```

<Wl >{`Graphics[{PointSize[0.02], Point[RandomReal[{-1,1}, {64, 2}] // Offload]}, ImageSize->500]`}</Wl>

Now the symbol was actually evaluated on the frontend (browser/ client) using fetched data from the server.

And then, change the variable from the separate task
```mathematica
task = SetInterval[With[{},
  pts = (# + 0.001 Sum[
    (i - #)/(Norm[i - #]^3 + 0.1) - (i - #)/(Norm[i - #]^5 + 0.1)
  , {i, pts}]) &/@ pts;
], 100]
```

Don't forget to remove it afterwards
```mathematica
TaskRemove[task]
```

### Force WL Kernel to offload an expression 
Looking back to the previous example, the function  `RandomReal` implemented on both sides. If you offload it to the `Point` expression

```mathematica
Graphics[{PointSize[0.02], Point[RandomReal[{-1,1}, {64, 2}] // Offload]}]
```

Each time you load a notebook the distribution of the point will be different, since it reevaluate it on frontend's side each time.
