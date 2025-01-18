```mathematica
Indexed[expr_, i_]
```

represents the component of `expr` with index `i` and formats as expected in traditional form.

```mathematica
Indexed[expr_, {i_, j_, ...}]
```

For example

```mathematica
Indexed[x, {1,2}]
```

```mathematica @
(*TB[*)Indexed[(*|*)x(*|*), {(*|*)1,2(*|*)}](*|*)(*1:eJxTTMoPSmMAgmIuIOGZl5JakZrilF8BAECTBhI=*)(*]TB*)
```

:::note
If `expr` represents a `List`, a corresponding `Part` of this list will be taken
:::

