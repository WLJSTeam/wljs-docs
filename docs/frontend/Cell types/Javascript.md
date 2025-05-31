---
sidebar_position: 4
---
> Type `.js` in the first line of an input cell

Try evaluating:

```js title="cell"
.js
return 1 + 1;
```

or

```js
.js
const dom = document.createElement('span');
dom.innerText = "Hello World";
dom.style.color = 'lightblue';

return dom;
```

__[GitHub repo](https://github.com/JerryI/wljs-js-support)__  
JavaScript code is evaluated as a module, which means __all defined variables are isolated to the cell__.

:::tip
To define global variables, use the `window` or `core` object:
```js
window.variable = 1;
```
:::

## Output Cell
The return value from the function can be a JavaScript object or a DOM element. DOM elements will be rendered in the output cell.

```js
.js
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

let uid;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  x += dx;
  y += dy;

  uid = requestAnimationFrame(draw);
}

uid = requestAnimationFrame(draw);

this.ondestroy = () => {
  cancelAnimationFrame(uid);
};

return canvas;
```

![](./../../Balls-ezgif.com-video-to-apng-converter.png)

## Context
There are a few useful built-in objects accessible from within a cell.

### `this.ondestroy`
This property is called when a cell is destroyed. Assign a clean-up function to it:

```js
this.ondestroy = () => {
  // Clean up resources
};
```

:::danger
Always clean up any timers or animation loops using the `this.ondestroy` property. Otherwise, they will continue running even after the cell is reevaluated.
:::

### `requestAnimationFrame`
This is a commonly used JavaScript method to sync with the browser’s framerate and render graphics smoothly.

:::danger
Don’t forget to `cancelAnimationFrame` using the `this.ondestroy` method.
:::

## Communication with the Wolfram Kernel
You can define any function for the WLJS interpreter using JavaScript cells. Please refer to these guides:

- [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md)
- [Integration with server/client via WebSockets](frontend/Advanced/Events%20system/event-generators.md#Integration%20with%20server%20/%20client%20via%20WebSockets)

Also see:
- [Communication](frontend/Advanced/Javascript/Communication.md)
- [Dynamics](frontend/Dynamics.md)