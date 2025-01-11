```mathematica
Panel[expr_]
```

```mathematica
Panel[expr_, titleLabel_, pos_:Top]
```

displays as a panel containing `expr` and provides a title at the top.

## Methods
### `EventHandler`
It supports `Click` event

```mathematica
EventHandler[Panel["Click on me"], {"Click" -> Print}]
```

## Options
### `ImageSize`
The effect is the same as if `{w_, h_}` or `w` were specified as a second argument.

### `FrameMargins`
Sets a margin to the content in *1/10 rem*

### `Background`
Specifies the background color

## Examples

```mathematica
Panel[i = InputRange[0,1,0.1], Style["My slider", 10]]
```

![](./../../../Screenshot%202024-09-26%20at%2010.12.13.png)

## Common issues
By the default it shows [StandardForm](frontend/Reference/Decorations/StandardForm.md) of expression passed as `titleLabel`. For string it will print double quotes as well. To remove them apply [Style](frontend/Reference/Graphics/Style.md)

```mathematica
Panel[123, Style["Title", 10]]
```


## Supported output forms
- [StandardForm](frontend/Reference/Decorations/StandardForm.md)
