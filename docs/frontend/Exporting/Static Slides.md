# Static Slides

__Print all slides into a good old PDF__

:::note
If you're looking to export interactive slides, please use [Static HTML](frontend/Exporting/Static%20HTML.md) or [Dynamic HTML](frontend/Exporting/Dynamic%20HTML.md).
:::

Any presentation made using [Slides](frontend/Cell%20types/Slides.md) cells can be exported individually, preserving all graphics and styling.

![](./../../Screenshot%202025-05-22%20at%2019.08.07.png)

![](./../../Screenshot%202024-07-08%20at%2021.56.30.png)

:::warning
Don’t forget to save your notebook before exporting! This is important for proper garbage collection.
:::

:::tip
Be sure to save your notebook and evaluate your slide cells beforehand. *If you have many slide cells, group them by adding a `.slides` cell at the top of your notebook.*
:::

The export will generate an `.html` file that can be opened in any browser and printed directly. Each slide or fragment will become a separate PDF page.

![](./../../Screenshot%202024-07-08%20at%2022.05.34.png)

## Use Cases
- Virtual lecture notes
- Presentation format for situations where installing the WLJS Notebook on a presentation device is not possible

:::info
All dynamic content will be *frozen* in the last evaluated state.
:::

