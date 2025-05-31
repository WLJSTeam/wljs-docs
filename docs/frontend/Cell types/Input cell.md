---
sidebar_position: 1
---
> One Ring to rule them all...

An input cell is a multi-tool. __By default, it assumes Wolfram Language as input__; however, this can be changed using a directive in the first line. See [Markdown](frontend/Cell%20types/Markdown.md), [JavaScript](frontend/Cell%20types/Javascript.md), [WLX](frontend/Cell%20types/WLX.md), [HTML](frontend/Cell%20types/HTML.md), [Slides](frontend/Cell%20types/Slides.md), and others.

For example:

```mathematica @
1+1
```

```mathematica @
.md
# Heading
```

```mathematica @
.js
return 1+1;
```

*Think of it like an anonymous file.*
After typing, press `Shift-Enter` to make the magic happen.

When you __start typing__, the following occurs:
1. Each character is sent to a server and the cell is updated (autosaving every 300 ms).
2. The editor attempts to detect the language or cell type.
3. Based on (2), it applies syntax highlighting, autocompletion, and other plugins.

![](../../imgs/Mathinput-ezgif.com-optipng%201.png)

## Cell Properties
Click on the `...` (more icon) on the right side of a cell group to access input cell properties.

![](./../../Screenshot%202025-02-24%20at%2011.48.04.png)

This affects the entire cell group (input + output cells). The following transformations are available:

- _Project to a window_ – evaluates the cell and displays the first output in a separate window.
- *Make initialization cell* – marks an input cell to evaluate automatically when the notebook opens (shown with a <span style={{color:'green'}}>green</span> dot in the top-right corner).
- *Copy* – compresses the cell group into a gzip-compressed string expression. Paste it into a new input cell.
- *Hide / Show* – hides the input cell while keeping the output visible. Shortcut: `Cmd+2 / Alt+2`, or use the arrow icon on the left.
- *Shrink / Expand* – fades large text to show only a preview. The cursor can still enter the area.
- *Lock / Unlock* – makes the input read-only and limits editing options.
- *Vanish* – makes the entire cell group invisible and uneditable. Output code (JS/HTML) still runs but is hidden. Only visible in `Expert Mode` (found in Settings). Useful for templates.

## Wolfram Language
### Syntax Highlighting & Symbol Tracking
Wolfram Language autocomplete and highlighting can be extended using external packages.

Once a symbol is defined in the `Global`` context of a Wolfram Kernel session, it appears in the autocomplete window and is shared across open notebooks.

At startup, the Wolfram Kernel loads all imported packages, reads `::usage` directives for defined symbols, and periodically refreshes this info upon `Get` or `Needs` commands.

### Syntax Sugar
All equations typed in the editor are compatible with WL kernels, including `wolframscript`. Syntax sugar is localized within comments.

For example:

$$\sqrt{2\pi}$$
becomes:

```mathematica
(*SqB[*)Sqrt[2\[Pi]](*]SqB*)
```

This ensures compatibility outside the WLJS ecosystem.

**You don't need a mouse to construct or edit complex equations.**

:::info
Unlike Wolfram Mathematica, our `StandardForm` output is always compatible with `InputForm`.
:::

Common equation editing shortcuts:

- `Ctrl-2` – square root
- `Ctrl-/` – fraction
- `Ctrl--` – subscript
- `Ctrl-6` – superscript
- `ESC + ..` – Greek letters
- `Ctrl-=` - Semantic interpretation

Editor shortcuts:
- `Alt+/`, `Cmd+/` – comment line
- Hold `Alt` – multiple carets
- `Cmd/Ctrl+F` – search current cell

Cursor navigation:

- `ArrowLeft` / `ArrowRight` – character movement
- `Ctrl-ArrowLeft` / `Ctrl-ArrowRight` – word movement
- `Cmd-ArrowLeft` / `Cmd-ArrowRight` – start/end of line
- `ArrowUp` / `ArrowDown` – move lines
- `Cmd-ArrowUp` / `Cmd-ArrowDown` – start/end of document
- `Ctrl-ArrowUp` / `Ctrl-ArrowDown` – page up/down
- `Home` / `End` – line boundaries
- `Ctrl-Home` / `Ctrl-End` – document boundaries
- `Enter` – new line with indent
- `Ctrl-a` / `Cmd-a` – select all
- `Backspace` / `Delete` – delete characters
- `Ctrl-Backspace` / `Ctrl-Delete` – delete words
- `Cmd-Backspace` / `Cmd-Delete` – delete to line start/end

Advanced movements:

- `Alt-ArrowLeft` / `Alt-ArrowRight` – move by syntax element
- `Alt-ArrowUp` / `Alt-ArrowDown` – move lines
- `Shift-Alt-ArrowUp` / `Down` – copy lines
- `Escape` – simplify selection
- `Ctrl-Enter` – insert blank line
- `Alt-l` – select line
- `Ctrl-i` – select parent syntax
- `Ctrl-[` / `Ctrl-]` – indent less/more
- `Ctrl-Alt-\\` – indent selection
- `Shift-Ctrl-k` – delete line
- `Shift-Ctrl-\\` – go to matching bracket
- `Shift-Alt-a` – toggle block comment

EMACS-style bindings (macOS):

- `Ctrl-b` – move left
- `Ctrl-f` – move right
- `Ctrl-p` – move up
- `Ctrl-n` – move down
- `Ctrl-a` – start of line
- `Ctrl-e` – end of line
- `Ctrl-d` – delete forward
- `Ctrl-h` – delete backward
- `Ctrl-k` – delete to line end
- `Ctrl-Alt-h` – delete word backward
- `Ctrl-o` – split line
- `Ctrl-t` – transpose characters
- `Ctrl-v` – page down

For integrals, derivatives, and series, use the [Command Palette](frontend/Command%20palette.md) to insert special characters.

:::note
Features like `DateObject`, `Graphics`, and many other familiar Mathematica features are supported. See [Symbolic Programming](frontend/Symbolic%20programming.md) for details.
:::

:::info
If an output is too large, it may be truncated or converted into a temporary symbol to reduce editor load.
:::

Custom symbol representations (like in Mathematica) are possible via `MakeBoxes`. See:
- [InterpretationBox](frontend/Reference/Formatting/Low-level/InterpretationBox.md)
- [Interpretation](frontend/Reference/Formatting/Interpretation.md)
- [MakeBoxes](frontend/Reference/Formatting/MakeBoxes.md)
- [ArrangeSummaryBox](frontend/Reference/Formatting/ArrangeSummaryBox.md)
- [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md)
- [BoxBox](frontend/Reference/Formatting/Low-level/BoxBox.md)
- [Decorating Symbols](frontend/Advanced/Syntax%20sugar/Decorating%20symbols.md)

### Access to Documentation
Click the 🔎 icon in the autocomplete window to open the documentation for a symbol in a new tab.

![](./../../Screenshot%202024-08-25%20at%2017.36.24.png)

### Morph Output Cell into Input
If you modify a Wolfram Language output cell, it will automatically be converted into a new input cell.

### Auto-upload Files
Drag and drop files into the editor or paste media from the clipboard. *You can always access clipboard contents using [ReadClipboard](frontend/Reference/Interpreter/ReadClipboard.md)*.

## Other Languages
Most other languages supported as input also provide:
- File auto-upload or clipboard media import
- Autocomplete
- Syntax highlighting and code parsing (beyond tokenizing)

