---
sidebar_position: 5
---
:::danger
Currently not supported on Windows
:::

> Type `.esm` in the first line of an input cell

This is a sub-type of [Javascript](frontend/Cell%20types/Javascript.md) cells, where it uses globally installed NodeJS to compile the code to a ESM module.

The main motivation behind this is to utilize `npm` packages and build a standalone script, which can be executed right in the notebook and then stored there.

:::info
It automatically creates `package.json` in the directory of your notebook.
:::

:::warning
This requires NodeJS to be installed on your system. 
:::

Unlike [Javascript](frontend/Cell%20types/Javascript.md) it is not possible to return anything from ESM module, however global context allows to return asynchronously

```js
.esm

const dom = document.createElement('span');
dom.style.color = "red";
dom.innerText = 'Hello World';

this.return(dom);
```

![](./../../Screenshot%202024-11-17%20at%2023.15.03.png)

## Context
There is a few quite useful built-in objects accessible from the cell. 

### this.ondestroy
This object is called when a cell has been destroyed. Assign any clean-up function to the given object

```js
this.ondestroy = () => {
	//clean up the stuff
}
```

:::danger
Always clean up any timers using `this.ondestroy` property. Otherwise those timers and animation loops will continue to work even after reevaluating the cell.
:::

### this.return
This is a function, which return a given object to the output cell

```js
this.return(dom);
```


## Example
Let us make Siri animation. Firstly, install dependencies

```bash
.sh
npm i siriwave --prefix .
```

Now make a simple animation

```js
.esm

import SiriWave from "siriwave";

const dom = document.createElement('div');
this.return(dom);

let siriWave;

siriWave = new SiriWave({
	container: dom,
	height:300,
    style: "ios9",
	width:600
});

siriWave.start();

this.ondestroy = () => {
  siriWave.dispose();
  console.warn('removed');
}
```

After running this cell you will see this

![](./../../ggsiri-ezgif.com-video-to-gif-converter.gif)

## FAQ

### How to install `npm` package?
Use [Shell](frontend/Cell%20types/Many%20more.md#Shell) cell and run

```bash
.sh
npm i <name> ---prefix .
```

### How to import a module?
Since it is ESM module, one can use `import` as normal

```js
.esm

import { obj } from 'package'
```


