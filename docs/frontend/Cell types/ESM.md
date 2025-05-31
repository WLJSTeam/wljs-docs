---
sidebar_position: 5
---
> Type `.esm` in the first line of an input cell

This is a sub-type of [JavaScript](frontend/Cell%20types/Javascript.md) cells, which uses the globally installed Node.js to compile the code as an ESM module.

The main motivation behind this is to utilize `npm` packages and build a standalone script, which can be executed directly in the notebook and stored there as well.

:::info
It automatically creates a `package.json` file in the directory of your notebook.
:::

:::warning
This requires Node.js to be installed on your system.
:::

Unlike [JavaScript](frontend/Cell%20types/Javascript.md), it is not possible to return anything directly from an ESM module. However, the global context allows for asynchronous returns.

```js
.esm

const dom = document.createElement('span');
dom.style.color = "red";
dom.innerText = 'Hello World';

this.return(dom);
```

![](./../../Screenshot%202024-11-17%20at%2023.15.03.png)

## Context
There are a few useful built-in objects accessible from the cell.

### this.ondestroy
This function is called when a cell is destroyed. Assign any clean-up function to this object.

```js
this.ondestroy = () => {
	// Clean up resources
}
```

:::danger
Always clean up any timers using the `this.ondestroy` property. Otherwise, those timers and animation loops will continue to run even after re-evaluating the cell.
:::

### this.return
This is a function that returns a given object to the output cell.

```js
this.return(dom);
```

## Example
Let's create a Siri animation. First, install the dependencies:

```bash
.sh
npm i siriwave --prefix .
```

Now create a simple animation:

```js
.esm

import SiriWave from "siriwave";

const dom = document.createElement('div');
this.return(dom);

let siriWave;

siriWave = new SiriWave({
	container: dom,
	height: 300,
	style: "ios9",
	width: 600
});

siriWave.start();

this.ondestroy = () => {
	siriWave.dispose();
	console.warn('Removed');
}
```

After running this cell, you will see the following animation:

![](./../../ggsiri-ezgif.com-video-to-gif-converter.gif)

## FAQ

### How do I install an `npm` package?
Use a [Shell](frontend/Cell%20types/Many%20more.md#Shell) cell and run:

```bash
.sh
npm i <name> --prefix .
```

### How do I import a module?
Since this is an ESM module, you can use `import` as usual:

```js
.esm

import { obj } from 'package'

