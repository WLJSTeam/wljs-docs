---
sidebar_position: 1
---
The whole notebook interface is made using plain Javascript, HTML powered by a [web-server and template engine](https://github.com/JerryI/tinyweb-mathematica) running locally on Wolfram Kernel. It means you can work remotely by running a server anywhere you want. 

Some calculations are performed partially by your browser, you can have a control over it, if you want. All UI elements, cells operations are written in Javascript and Wolfram Language and performed by [WLJS](../../interpreter/intro.md) interpreter. 

:::note
Frontend saves cell's data every-time you type something to RAM. To unload the data to a file you can click manually on `clock` symbol or wait 3 minutes until autosave feature will fire.
:::

Moving from the native desktop applications to a web stack has some drawbacks in terms of latency in communication between Wolfram Kernel and a browser, performance, however it shows many useful features, which are not possible in Mathematica. Sharing notebooks as `html` files, embedding them into your blog, customizing visualization of data using moderns and flexible tools like any Javascript framework, plain HTML and CSS together with Wolfram Language.

## File system
This is not cloud-based project, therefore all notebooks are actual files on you drive. 
:::info
Every notebook is stored as human-readable/editable `.wl` file imported by Wolfram Engine. 
:::
Once you open a file it is stored in RAM, even if you close a notebook. Save operations perform serialization and stores the data into a file.

The approach on how to organize your directories was inspired by Obsidian, where your notes are located in so-called *vaults*. Once you open a folder it becomes a vault and Wolfram Kernel sets the directory to it. So you can work with files using relative path.

:::note
You can open the same notebook in multiple tabs, the dynamics and update operations will be synchronized
:::

## UI
In general the whole UI is a rip-off from Notion-like web-based editors bringing clarity and minimalistic controls over your document. 
Let's have a look at the basic UI elements
### Topbar
<div style={{width: '100%',  margin: 'auto', left: 0, right: 0, display: 'block', background: 'white' }}>

![](../../imgs/Screenshot%202023-06-10%20at%2014.56.41.png)

</div>

The `path` text box stands for renaming notebook file, by clicking on it you can edit the name and it will save it automatically.

`Local Kernel` is a menu and a status bar for the secondary kernel to which you frontend is connected. It can be `Remote Kernel` as well. Firstly you need to start you local kernel by clicking on it pressing `Create Link`

Black rectangle is `Abort` button to interrupt the evaluation.

Circular arrow acts like `EvaluateAll` command, that evaluates all cells in the opened notebook.

Clocks is actually an indicator, that your connection to the frontend is ok, it rotates every second by a command sent via web-sockets protocol. __This is also a save button__.

`Share` button stands for exporting you notebook as an `html` standalone file or `react` component to be embedded on you website/blog (see more [React component](../Export/React%20component.md))

### Sidebar
On the left side the file explorer is located, by clicking on a magnification glass icon, you can open a dedicated file explorer to locate a particular file or folder on you PC.  

<div style={{width: '100%',  margin: 'auto', left: 0, right: 0, display: 'block', background: 'white' }}>

![](../../imgs/Screenshot%202023-06-10%20at%2015.39.22.png)

</div>