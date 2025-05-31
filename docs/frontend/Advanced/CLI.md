WLJS Notebook app registers (if you allowed this during the installation) CLI-tool globally in your operating system.

Here is a list of commands you can use

## Open current folder
```bash
wljs .
```

## Open a file by path
```bash
wljs "full path..."
```

## Execute a command
```bash
wljs -c [command] [args...]
```

This pattern sends a command to all extensions used by WLJS Notebook. The list of known commands follows

### share
It is handled by `wljs-export-html` extension, that allows to share notebooks programmatically in different forms

```bash
wljs -c share -i "path to wln notebook" -o "path to output file"
```
*exports to [Static HTML](frontend/Exporting/Static%20HTML.md)*

```bash
wljs -c share -i "path to wln notebook"
```
*exports to [Static HTML](frontend/Exporting/Static%20HTML.md) using the same path*

```bash
wljs -c share -i "path to wln notebook" -t html
```
*exports to [Static HTML](frontend/Exporting/Static%20HTML.md)*

```bash
wljs -c share -i "path to wln notebook" -t html --cdn
```
*exports to [Static HTML](frontend/Exporting/Static%20HTML.md) and enables CDN*

List of supported output types:
- `html` [Static HTML](frontend/Exporting/Static%20HTML.md)
- `nb` [Mathematica](frontend/Exporting/Mathematica.md)
- `md` [Markdown](frontend/Exporting/Markdown.md)
- `mdx` [MDX](frontend/Exporting/MDX.md) (Static only)


## Version of CLI
```bash
wljs -v
```

