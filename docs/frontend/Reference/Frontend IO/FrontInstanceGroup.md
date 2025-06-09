---
env:
  - Wolfram Kernel
package: wljs-editor

---
```mathematica
FrontInstanceGroup[] _FrontInstanceGroup
```

constructs a wrapper, which allows dispose a group of virtual [WLJS Functions](frontend/Advanced/Frontend%20interpretation/WLJS%20Functions.md) (aka instances of WL symbols) on the frontend.

Normally one can append objects on existing plots using [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md), this wrapper allows to undo those action by disposing the created instances (even if they are nested). It does also support batch operations.

To add expressions into created group, use the following pattern
```mathematica
g = FrontInstanceGroup[];
g[{Red, Disk[]}]
```

:::note
This expression is immutable
:::

## Methods
### `FrontSubmit`
Evaluates the group on the frontend

```mathematica
group = FrontInstanceGroup[];
FrontSubmit[group[expr_], scene]
```

one can submit multiple groups as well

```mathematica
...
FrontSubmit[{group1[expr_], group2, ...}, scene]
```

### `Delete`
Disposes created group (s)

```mathematica
Delete[_FrontInstanceGroup | __FrontInstanceGroup]
```

### `FrontInstanceGroupRemove`
Akin to `Delete` but allows to specify the window

```mathematica
FrontInstanceGroupRemove[_FrontInstanceGroup | __FrontInstanceGroup | {__FrontInstanceGroup}, opts___]
```

where `opts` can be

#### `"Window"`
By the default is [CurrentWindow](frontend/Reference/Frontend%20IO/CurrentWindow.md)

## Example
The common use case is to be able to add and remove groups of expressions from the some frontend instance. For example to add and then remove primitives from a plot

```mathematica
scene = FrontInstanceReference[];
Plot[x, {x,0,1}, Epilog->{scene}]
```

now add an object

```mathematica
group = FrontInstanceGroup[];
FrontSubmit[{Red, Disk[]} // group, scene];
```

and delete

```mathematica
Delete[group]
```