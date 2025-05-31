# PDF

:::info
Not implemented directly. Requires a web browser or the WLJS desktop application.
:::

- To export to PDF, use your browser's built-in print-to-PDF functionality on the exported file when using [Static HTML](frontend/Exporting/Static%20HTML.md) or [Static Slides](frontend/Exporting/Static%20Slides.md) (for presentations).

- To export individual expressions -- use default `Export` function

```mathematica
Plot[x, {x, 0,1}];
Export["filename.pdf", %]
```

See also [Files](frontend/Exporting/Files.md)

:::note
This requires WLJS Notebook desktop app, since we use a customized Chromium engine feature to produce high-quality vector-based PDFs from any Wolfram Language expression.
:::
