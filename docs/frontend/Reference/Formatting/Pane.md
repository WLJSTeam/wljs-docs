```mathematica
Pane[expr_]
```

displays as a pane containing `expr`.

```mathematica
Pane[expr_, w_]
```

```mathematica
Pane[expr_, {w_, h_}]
```

displays with a given container size.

## Methods
### `EventHandler`
It supports `Click` event

```mathematica
EventHandler[Pane["Click on me"], {"Click" -> Print}]
```

## Options
### `ImageSize`
The effect is the same as if `{w_, h_}` or `w` were specified as a second argument.

### `Background`
Specifies the background color


## Examples

```mathematica
Pane[50!, 200]
```

![](./../../../Screenshot%202024-05-11%20at%2017.22.54.png)


## Supported output forms
- [StandardForm](frontend/Reference/Formatting/StandardForm.md)
