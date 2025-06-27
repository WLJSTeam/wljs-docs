> Package by [Leonid Shifrin](https://github.com/lshifr)

```mathematica
Let[{vars__}, expr_]
```

A `With`-like construction that allows recursive assignments, like `Let*` in scheme.

For example:
```mathematica
Let[{
	a = 1,
	b = a + 1
},
	b
]
```