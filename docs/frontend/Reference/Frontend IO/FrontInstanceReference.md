---
env:
  - Wolfram Kernel
package: wljs-editor
context: Notebook`Editor`Kernel`FrontSubmitService`
---
```mathematica
FrontInstanceReference[] _FrontInstanceReference
```

or 

```mathematica
FrontInstanceReference[uid_String] _FrontInstanceReference
```

constructs an instance reference object, which can be used to refer the execution context on the frontend in order to evaluate new expressions within it.

## Methods
### `FrontSubmit`

```mathematica
FrontSubmit[expr_, _FrontInstanceReference, opts___]
```

For example to add a new object on a scene

```mathematica
scene = FrontInstanceReference[];
Plot[x, {x,0,1}, Epilog->{scene}]
```

Then one can dynamically add new object

```mathematica
FrontSubmit[{RandomColor[], Disk[{.5,.5},.2]}, scene];
```

### `FrontFetch`

### `FrontFetchAsync`

```mathematica
FrontFetchAsync[expr_, _FrontInstanceReference, opts___]
```

