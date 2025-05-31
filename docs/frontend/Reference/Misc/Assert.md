```mathematica
Assert[test]
```

represents the assertion that `test` is [True](https://reference.wolfram.com/language/ref/True.html). If assertions have been enabled, `test` is evaluated when the assertion is encountered. If `test` is not [True](https://reference.wolfram.com/language/ref/True.html), then an assertion failure is generated.

```mathematica
Assert[test, tag]
```

specifies a tag that will be used to identify the assertion if it fails.

## Debugging

### Manual
Turn on warning messages

```mathematica
On[Assert]
```

Generate a failure

```mathematica
Assert[False]
```

### Automatic
Use it together with [Debugger](frontend/Advanced/Command%20palette/Debugger.md) to interrupt evaluation