# HTML

__Load and edit already published web notebooks__

All notebooks exported to [Static HTML](frontend/Exporting/Static%20HTML.md) and [Dynamic HTML](frontend/Exporting/Dynamic%20HTML.md) contain the necessary metadata, making it possible to convert them back to the native WLJS Notebook format (`.wln`).

### Option 1
Use the [URL Protocol](frontend/Importing/URL%20Protocol.md) and click on "Open" from the HTML page.

### Option 2
Place the `.html` file into your project directory and open it in the WLJS Notebook app. It will be automatically converted, and the original HTML file will be preserved.

## Portability
Once exported, an `.html` file can be __unpacked back into a normal notebook__ when opened using the WLJS Notebook app. There are some limitations:

- No external files (except images) will be packaged.
- Large iconized expressions may be lost.

However:

- All static graphs, including 2D and 3D graphics, are preserved.
- All external images are embedded in the document (including those in slides and markdown).
- [NotebookStore](frontend/Reference/Cells%20and%20Notebook/NotebookStore.md) data is embedded.
- Slides and all other cells are retained. **Press `f` to enter fullscreen.** *There is a separate option for exporting slides for printing—see [Export Slides](frontend/Exporting/Static%20Slides.md).*

