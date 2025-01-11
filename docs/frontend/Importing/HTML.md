__Load and edit already published web notebooks__

All notebooks exported to [Static HTML](frontend/Exporting/Static%20HTML.md) and [Dynamic HTML](frontend/Exporting/Dynamic%20HTML.md) do contain necessary meta-data making possible to convert it back to a native WLJS Notebook format `.wln`

### Option 1
Using [URL Protocol](frontend/Importing/URL%20Protocol.md) click on `"Open"` on the HTML page

### Option 2
Place it to your project directory and open it in WLJS Notebook. It will be automatically converted, while the original HTML is preserved.


## Portability 
Once exported, an `.html` file can be __unpacked back to a normal notebook__ once opened using WLJS Notebook app. There are some limitations

- no external files (except images) will be packaged
- large iconized expressions will be lost

However,

- all static graphs, 2D, 3D graphics are kept
- all external images are kept and embedded to a document (including slides and md)
- [NotebookStore](frontend/Reference/Cells%20and%20Notebook/NotebookStore.md) data is embedded as well
- slides as well as all cell are kept **press `f` to go fullscreen**. *Actually there is separate option on how to export slides for printing - see [Export Slides](frontend/Exporting/Slides.md)*