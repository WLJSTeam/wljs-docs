# Mathematica

__Open `.nb` Files__

:::warning
This feature is still in the $\beta$ stage.
:::

We provide automatic conversion of Wolfram Mathematica `.nb` notebook files to WLJS Notebook `.wln` format. Cells are transcoded to a format suitable for WLJS.

![](./../../Screenshot%202025-06-22%20at%2020.41.55.png)

Text styling can be difficult to convert and render accurately. As shown in the screenshot, it is still far from perfect.

![](./../../Screenshot%202024-12-19%20at%2019.08.58.png)

### Known Limitations
- Complex text formatting
- Deeply nested structures
- Certain `Graphics` and `Graphics3D` styling options
- Embedded image / video / audio data inside cells