__Open .nb files__

:::warning
This feature is still in $\alpha$ stage
:::

We provide an automatic conversion of Wolfram Mathematica's `.nb` notebook files to WLJS Notebook `.wln`. It transfers input cells with almost no changes, while output cells are transcoded to a suitable for WLJS format

![](./../../Screenshot%202024-12-19%20at%2019.04.41.png)

There is a problem with styling of the text, which is tricky to convert and render. As one can see on the screenshot it is still far from being perfect

![](./../../Screenshot%202024-12-19%20at%2019.08.58.png)

If we summarize, what might not work

- complex text formatting
- multilayer nested structure
- iconized expressions
- some styling options for `Graphics` and `Graphics3D`
- stored image / video / audio data inside cells

