# Mathematica

__Open `.nb` Files__

:::warning
This feature is still in the $\alpha$ stage.
:::

We provide automatic conversion of Wolfram Mathematica `.nb` notebook files to WLJS Notebook `.wln` format. Input cells are transferred with minimal changes, while output cells are transcoded to a format suitable for WLJS.

![](./../../Screenshot%202024-12-19%20at%2019.04.41.png)

Text styling can be difficult to convert and render accurately. As shown in the screenshot, it is still far from perfect.

![](./../../Screenshot%202024-12-19%20at%2019.08.58.png)

### Known Limitations

- Complex text formatting
- __Output cells__
- Deeply nested structures
- Iconized expressions
- Certain `Graphics` and `Graphics3D` styling options
- Embedded image / video / audio data inside cells