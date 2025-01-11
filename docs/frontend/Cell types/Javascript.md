---
sidebar_position: 4
---
> Type `.js` in the first line of an input cell


Try to evaluate

```js title="cell"
.js
return 1+1
```

or

```js
.js
const dom = document.createElement('span');
dom.innerText = "Hello World";
dom.style.color = 'lightblue';

return dom;
```


__[Github repo](https://github.com/JerryI/wljs-js-support)__
Javascript code is evaluated as a module, i.e. __all defined variables are isolated to the cell__.

:::tip
To define global variables, use `window` or `core` object.
```js
window.variable = 1
```
:::

## Output cell
The returned value from the function can be a Javascript object or DOM element. The last one will be displayed in the output cell

```js
.js
const canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

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
}



return canvas;
```

![](./../../Balls-ezgif.com-video-to-apng-converter.png)


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

### requestAnimationFrame
It is well-common method used in Javascript to synchronize with a framerate of the browser and render some graphics



:::danger
Do not forget to `cancelAnimationFrame` using `this.ondestroy` method
:::

## Communication with Wolfram Kernel
In general one can define any function for WLJS Interpreter using Javascript cells, please see guide here [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md) and [Integration with server / client via WebSockets](frontend/Advanced/Events%20system/event-generators.md#Integration%20with%20server%20/%20client%20via%20WebSockets)

Also see [Communication](frontend/Advanced/Javascript/Communication.md)

For the most applications event-based system is used, see [Dynamics](frontend/Dynamics.md)

