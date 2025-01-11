Templates are just the same notebooks, stylized using hidden Javascript or HTML cells. Call them from the command line or top-bar menu

![](./../../../Screenshot%202024-07-18%20at%2016.45.40.png)

There are several built-in templates for you to try.  _Note that `attachments` folder (if found) will also be copied, so that your template can include uploaded images or other files._

## Structure
All user templates are stored at
- `AppData/wljs-notebook/UserTemplates`

All built-in templates are stored at
- `AppData/wljs-notebook/wljs-packages/wljs-templates/Library/*`

If you template notebook contains attached images or other files, it must be placed into a separate directory. Once you create new notebook using such template, all files in `attachments` folder will be copied as well to your project directory.

File name will be takes as a title in a template list.

The first 1-2 cells usually contains styles, that overrides the system CSS or Javascript code or a banner image. Depending on what you want, you can hide first cells completely using `Vanish` button

![](./../../../Screenshot%202024-07-19%20at%2010.10.34.png)

:::note
`Vanish` makes a cell invisible and uneditable, but the output of it will still be injected to the DOM. Therefore all CSS, JS can be placed there. You can see and edit such cells in `Expert` mode (see in Settings)
:::

Another option, if you still need to have a visible output, but want to make a cell uneditable and impossible to focus - use `Lock` and `Hide` properties

![](./../../../Screenshot%202024-07-19%20at%2010.11.03.png)

### Example
Let us have a look at built-in `Matcha` template. To reproduce follow the steps

![](./../../../Screenshot%202024-07-19%20at%2009.58.57.png)

1. Create a new empty notebook
2. Create  `.html` cell with the following content

```html
.html

<style>
 /*
 * Copyright (c) 2016-present Sven Greb <development@svengreb.de>
 * This source code is licensed under the MIT license found in the license file.
 */

:root {
  --matcha0: #fafafa; /* Lightest background (similar to nord0) */
  --matcha1: #f0f0f0; /* Slightly darker than matcha0 (similar to nord1) */
  --matcha2: #e5e5e5; /* Slightly darker than matcha1 (similar to nord2) */
  --matcha3: #939393; /* Dark gray for contrasts (similar to nord3) */
  --matcha4: #868686; /* Slightly darker than matcha3 (similar to nord4) */
  --matcha5: #787878; /* Slightly darker than matcha4 (similar to nord5) */
  --matcha6: #4d4d4d; /* Darkest background (similar to nord6) */
  --matcha7: #9ecb8e; /* Unchanged (Matcha accent similar to nord7) */
  --matcha8: #87c0a8; /* Unchanged (Matcha accent similar to nord8) */
  --matcha9: #5e8a8b; /* Darker for better contrast (similar to nord9) */
  --matcha10: #4c7873; /* Darker for better contrast (similar to nord10) */
  --matcha11: #88b388; /* Replaced red with greenish hue */
  --matcha11r: #d85f5f; /* Unchanged (Matcha accent similar to nord11) */
  --matcha12: #a2c3a2; /* Replaced red with lighter greenish hue */
  --matcha13: #ebd28b; /* Unchanged (Matcha accent similar to nord13) */
  --matcha14: #a3be89; /* Unchanged (Matcha accent similar to nord14) */
  --matcha15: #b48e9d; /* Unchanged (Matcha accent similar to nord15) */
  --editor-key-meta: var(--matcha3); /* Darker for better contrast */
  --editor-key-keyword: var(--matcha9); /* Darker for better contrast */
  --editor-key-atom: var(--matcha15); /* Unchanged */
  --editor-key-literal: var(--matcha15); /* Unchanged */
  --editor-key-string: var(--matcha11r); /* Unchanged */
  --editor-key-escape: var(--matcha13); /* Unchanged */
  --editor-key-variable: var(--matcha4); /* Darker for better contrast */
  --editor-local-variable: var(--matcha4); /* Darker for better contrast */
  --editor-key-type: var(--matcha7); /* Unchanged */
  --editor-key-class: var(--matcha7); /* Unchanged */
  --editor-special-variable: var(--matcha4); /* Darker for better contrast */
  --editor-key-property: var(--matcha8); /* Darker for better contrast */
  --editor-key-comment: var(--matcha12); /* Unchanged */
  --editor-key-invalid: var(--matcha11); /* Unchanged */
  --editor-outline: var(--matcha4); /* Darker for better contrast */
  color: black; /* Text color for light mode */
}

[transparency="true"] .bg-g-trans {
  background: var(--matcha0) !important;
}

[transparency="false"] .bg-g-trans {
  background: var(--matcha0) !important;
}  

.bg-g-trans {
  background: var(--matcha1) !important;
}

.cm-tooltip-autocomplete.cm-tooltip {
  background-color: var(--matcha2) !important;
}

.cm-editor .cm-cursor {
  border-left-color: var(--matcha5);
}

.cm-tooltip-autocomplete ul li[aria-selected] {
  background: var(--matcha3); /* Darker for better contrast */
  color: white !important; /* Ensuring text visibility */
  border-radius: 4px !important;
}

  h1 {
    color: var(--matcha11)
  }

  h2 {
    color: var(--matcha12)
  }

  h3 {
    color: var(--matcha13)
  }

  h3 {
    color: var(--matcha14)
  }  

  mark{
    background: var(--matcha13);
    color: black;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }

  body {
    background: var(--matcha0);
  }

  @media (prefers-color-scheme: dark) {
    body {
      background: var(--matcha5);
    }
  }
</style>
```

You can stylize many things. Please, consider to use Dev Tools to check classes and DOM structure. For cells structure the following classes available

- `main` main window
- `.ccontainer` cells container
- `.cgroup` a single group of cells: 1 input + outputs + tools
- `.cframe` a single inner group of cells: 1 input + outputs
- `.cborder` a vertical line displayed at the right side from the cell group
- `.cwrapper` an input/output cell wrapper
- `.cseparator` a thin space between cells

- `.cinit` a class for initialization cells
- `.cin` a class for input cells
- `.cout` a class for output cells

3. Evaluate it
4. Make this cell `Hidden` and then apply `Vanish`
5. Create `.md` cell for a banner image and drop an image there. Adjust inline styles if needed

```md
.md

<img src="/attachments/0a12e130650543cf5b165a008d1604e3.gif" style="width: 100vw; object-fit: cover; image-rendering: pixelated; height: 300px"/>
```

6. Evaluate it. Make input cell `Hidden` and then apply `Lock` to prevent editing
7. Save your notebook
8. Move your notebook and `attachments` folder to `AppData/wljs-notebook/UsersTemplate/NewFolder/`
9. Restart an App and check your template from the command palette

