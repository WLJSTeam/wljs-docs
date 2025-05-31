__Export as React Markdown__

This option lets you embed cells or an entire notebook to [MDX](https://mdxjs.com/)-based websites (personal blog or a React App in general).

![](./../../Screenshot%202025-05-22%20at%2019.08.07.png)

![](./../../Screenshot%202025-05-05%20at%2020.09.06.png)

## Where you can use it
- Static MDX website generators like [MDXBlog](https://www.mdxblog.io/blog/simple-static-mdx-blog), [Docusaurus](https://docusaurus.io/)
- Any [NextJS projects](https://nextjs.org/docs/pages/guides/mdx) paired with MDX

> We personally use this format to build our docs pages including this one you are looking at.

## Portability
The same as [Static HTML](frontend/Exporting/Static%20HTML.md) and [Dynamic HTML](frontend/Exporting/Dynamic%20HTML.md), in addition MDX exporter will copy 
- `./attachments` folder

## Interactive content
It works in the same ways as in [Dynamic HTML](frontend/Exporting/Dynamic%20HTML.md)

## Folder structure
Once exported it produces the following structure

```
- yourNotebook.mdx
- attachments/
	- yourNotebook.wln
	- ...uid.txt
	- ...uid.txt
	- picture1.png
	- ...
```

where `...uid.txt` are figures, sound, or video data stored as JSON expressions. This we do in order to make the output `.mdx` files still readable and load interactive content on demand. 

## React library
To render cells we use __[wljs-notebook-react](https://github.com/JerryI/wljs-notebook-react)__ library, which provides the following component for MDX files

- `WLJSStore` (only once per page): Loads heavy content like 3D graph data, hash maps for interactive widgets, etc.
- `WLJSEditor`: Renders an input/output cell
- `WLJSHTML`: Renders raw HTML content

Example how the exported notebooks can look like

```mdx
### How to convert a notebook to MDX
Use `Share` menu button in *WLJS Notebook application*.

Now let's have a look at some example

import { WLJSHTML, WLJSEditor, WLJSStore } from "wljs-notebook-react";

<WLJSStore kernel={'./attachments/kernel-1132786671423612299.txt'} json={'./attachments/8f0674d8-8a5d-40d7-b8a5-bf7114e97175.txt'} notebook={'./attachments/notebook-8f0.wln'}/>


## ManipulatePlot
An example of built-in function for interactive plotting

<WLJSEditor display={"codemirror"} nid={"8f0674d8-8a5d-40d7-b8a5-bf7114e97175"} id={"6848862b-32a7-4077-8d20-c9255ce82a17"} type={"Input"} opts={{}} >{`.......code....`}</WLJSEditor>

<WLJSEditor display={"codemirror"} nid={"8f0674d8-8a5d-40d7-b8a5-bf7114e97175"} id={"a4397cb9-344e-4b44-a119-b565feef9a15"} type={"Output"} opts={{}} >{`....code...goes....`}</WLJSEditor>
```

You would also need to preprocess these files using remark plugin. __Please see the documentation to [wljs-notebook-react](https://github.com/JerryI/wljs-notebook-react) library__

## NextJS Example
Here is an example repository
- __Github__ [wljs-nextjs-example](https://github.com/JerryI/wljs-nextjs-example)
- [Online demo](https://jerryi.github.io/wljs-nextjs-example/)

It features a working SSR-based website built using a minimal setup

```json
"dependencies": {
    "@mdx-js/loader": "^3.1.0",
    "@mdx-js/react": "^3.1.0",
    "@next/mdx": "^15.3.1",
    "fs-extra": "^11.3.0",
    "next": "^15.3.1",
    "remark-mdx": "^3.1.0",
    "wljs-notebook-react": "^1.0.7"
}
```

