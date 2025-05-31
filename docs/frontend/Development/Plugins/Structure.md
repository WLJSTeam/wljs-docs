---
sidebar_position: 1
---
:::note
A template repository is available at Github [wljs-plugin-template](https://github.com/JerryI/wljs-plugin-template)
:::

Most extensions have the following folder structure

```
name-of-package/
	package.json       <--- most important
	src/ 
		Kernel.wl      <--- usually loaded to Evaluation Kernel
		Frontend.wl    <--- usually loaded to Main Kernel
		kernel.js      <--- usually some JS libraries
	dist/
		kernel.js      <--- bundled JS libraries (if applicable)
		kernel.min.js
	templates/         <--- usually WLX templates for UI element
		Button.wlx
		Item.wlx
		...
	...
```

The most important file is `package.json`, while the rest is only the recommendation, but you will anyway configure all paths in JSON file.

## package.json
This is standard package declaration file from NodeJS, but modified with extra field for WLJS-specific features

```json title="package.json"
{
  "name": "<name-of-package>",
  "version": "<X.Y.Z>",
  "description": "<short-description>",
  "wljs-meta": {
    "js": "dist/kernel.js", //will be injected to HEAD
    "minjs": "dist/kernel.min.js", //will used when exported to HTML
    "kernel": "src/Kernel.wl", //loaded to Evaluation Kernel
    "frontend": "src/Frontend.wl", //loaded to Main Kernel
    "category": "<catergory-name>",
    "priority": 5000, 
    "menu": [ //top-menu items
        {
          "label": "<label>",
          "event": "<unique-event-id>",
          "section": "kernel" | "edit" | "view" | "file" | "misc",
          "spawnWindow": true | false, 
          "accelerator": [
            "<hotkey-mac>",
            "<hotkey-winlin>"
	      ],         
          "type": "button" //reserved
        }
    ]
  },
  "repository": {
    "type": "git",
    "url": "<url-to-repository-for-updates>"
  },
  ...
}
```

All fields inside `wljs-meta` are optional, there is no need in putting all listed in the example above.


:::warning
Documentation is not yet complete. Please open on issue on Github for us to prioritize this direction.
:::

Please see examples in this section for more information.

