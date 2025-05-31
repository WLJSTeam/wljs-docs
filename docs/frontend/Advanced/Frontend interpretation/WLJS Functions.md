---
draft: false
---

## Quick and Dirty
Create a new cell, then define a function inside the `core` [context](interpreter/Advanced/architecture.md):

```js
.js
core.MyFunction = async (args, env) => {
  const data = await interpretate(args[0], env);
  alert(data);
}
```

To call it directly from the Wolfram Kernel, use:

```mathematica
MyFunction["Hello World!"] // FrontSubmit;
```

Or in the cell's output:

```mathematica
CreateFrontEndObject[MyFunction["Hello World!"]]
```

This should produce a pop-up message with the given text.

## A Deeper Look
First, one needs to understand how the function is called. There are a few different ways:

- Direct calls (as shown above)
- Indirect calls using containers

The first one is straightforward, and most UI and core built-in functions are written this way.

### Simple Direct Call
As simple as this:

![](./../../../imgs/Simple%20call.excalidraw.svg)

A called function has no persistent memory (call and forget), except for the `env` variable, which can share data with other functions in the same subtree. 

__Any defined function must return a JavaScript object or nothing.__
Arguments (`args`) are always Wolfram Expressions, so use `interpretate` to convert them into JavaScript data types.

For example, `env` is very handy when working with graphics:

```js
core.RGBColor = async (args, env) => {
  const r = await interpretate(args[0], env);
  const g = await interpretate(args[1], env);
  const b = await interpretate(args[2], env);

  // Modify env
  env.color = new whatever.Color(r, g, b);

  // Return in case it's used directly
  return env.color;
};
```

You can then call `core.RGBColor` somewhere in a list:

```mathematica
{Blue[], {Red[], Sphere[] (* I am red *)}, Cuboid[] (* I am blue *)} // Graphics3D
```

In the parent function:

```js
core.Graphics3D = async (args, env) => {
  ...
  const scene = {};
  await interpretate(args[0], { ...env, scene });
  rendered.add(scene); // All objects are there!
};

core.Sphere = async (args, env) => {
  ...
  env.scene.add(new sphere({ color: env.color }));
};
```

Thus, the desired data ends up in the scene. This is the power of pointers.

##### 🎡 Example 1: Game of Life
To have a bit of fun, let's define some supporting structures.

Create a new cell with the following code:

```js title="cell 1"
.js
// Create JS canvas
const canvas = document.createElement("canvas");
canvas.width = 400;
canvas.height = 400;

let context = canvas.getContext("2d");
context.fillStyle = "lightgray";
context.fillRect(0, 0, 500, 500);

// An array to store the previous state
let old = new Array(40);
for (let i = 0; i < old.length; i++) {
  old[i] = new Array(40).fill(0); 
}

// A function to draw on it
core.MyFunction = async (args, env) => {
  const data = await interpretate(args[0], env);

  // Draw our boxes
  for (let i = 0; i < 40; ++i) {
    for (let j = 0; j < 40; ++j) {
      // Old pixels leave blue traces
      if (old[i][j] > 0) {
        context.fillStyle = "rgba(0,0,255,0.2)"; 
        context.fillRect(i * 10 + 2, j * 10 + 2, 6, 6);
      }
      // New pixels
      if (data[i][j] > 0) {
        context.fillStyle = "rgba(255,0,0,0.4)"; 
        context.fillRect(i * 10 + 1, j * 10 + 1, 8, 8);
      } else {
        context.fillStyle = "rgba(255,255,255,0.4)"; 
        context.fillRect(i * 10 + 1, j * 10 + 1, 8, 8);
      }

      // Store the previous frame
      old[i][j] = data[i][j];
    }
  }
};

return canvas;
```

This function will draw a 40x40 array of 1 and 0 pixels on the page. Let's try it out with a typical cellular automaton like Conway's Game of Life:

```mathematica title="cell 2"
gameOfLife = {224, {2, {{2, 2, 2}, {2, 1, 2}, {2, 2, 2}}}, {1, 1}};
board = RandomInteger[1, {40, 40}];
Do[
  board = CellularAutomaton[gameOfLife, board, {{0, 1}}] // Last;
  MyFunction[board] // FrontSubmit;
  Pause[0.1];
, {i, 1, 100}]
```

The output is shown in the GIF below, but you can try it yourself by opening `GOL.wln` from the examples folder.

:::note
See more about JS cells in [Cell Types](Cell%20types.md)
:::

Of course, this is not the most efficient way to make animations. A better method would be to let JS run the animation on its own and wait for or request new data using a system of events.

#### A Remark About Subsymbols | Methods
Sometimes a function or a tree of functions is called in response to some event. This information is stored in `env.method`. See also [Symbols](../../../../interpreter/Advanced/symbols.md).

If there is a data update, i.e. `env.method = 'update'`, then the interpreter will try to find a subsymbol or function to call (read more about how the interpreter handles them in [WLJS Interpreter](https://github.com/JerryI/wljs-interpreter)).

![](./../../../imgs/Simple%20call%202dn.excalidraw.svg)

Imagine if every defined function was like a class with a constructor and methods (subsymbols):

```js
core.MyFunction = (args, env) => {}

core.MyFunction.update = (args, env) => {}
core.MyFunction.destroy = (args, env) => {}
core.MyFunction.whatever = (args, env) => {}
```

Then, you can specify which method to call during evaluation:

```js
core.OurParentFunction = (args, env) => {
  const data = interpretate(args[0], { ...env, method: 'update' });
  ...
}
```

This is extremely useful for updating graphs or plots. Instead of redrawing everything, you can perform lightweight operations:

```js
core.ListLinePlotly = (args, env) => {
  // Create the element, draw axes, etc... (SLOW)
  Plotly.newPlot(...);
};

core.ListLinePlotly.update = (args, env) => {
  // Quickly redraw only changed elements
  Plotly.animate(...) or extend...
};
```

__Destroy and update methods are usually features of [Virtual Functions](#Containers%20Executables).__


#### Contexts
To prevent name collisions and clutter, you can specify a context (or library) of symbols using:

```js
var library = {};
library.name = "It is important to write a name";
interpretate.extendContext(library);

library.Symbol = (args, env) => {
  // ...
};
```

The interpreter will check all available contexts and __use the first match__. However, you **can prioritize the context** by providing it in the `env` object:

```js
core.GrantSymbol = (args, env) => {
  const data = interpretate(args, { ...env, context: library });
  // ...
  // First match should be in the `library` object
};
```

If you have multiple prioritized contexts, you __can pass them as an array__:

```js
core.GrantSymbol = (args, env) => {
  const data = interpretate(args, { ...env, context: [library1, library2] });
  // ...
  // First match in `library1`, if not found, then in `library2`, and finally in the `core` context
};
```

### Virtualization
Each time the interpreter encounters a virtual function (or call it a symbol), it creates a unique object that scopes the `env` variable and provides local memory for all Wolfram Expressions located inside the container.

The interpreter can automatically create a container for any WLJS symbol when it sees a special property defined:

```js
core.MySymbol.virtual = true;
```

Then `MySymbol` takes advantage of virtualization behavior, even if it’s called anonymously via [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md).

The most important features of virtual functions:
- They can be **destroyed** or **updated** (see [Subsymbols | Methods](#a-remark-about-subsymbols--methods))
- They automatically bind to child virtual functions instances, enabling reevaluation when changes are made in children (foundation for [Dynamics](frontend/Dynamics.md))

#### Properties
Virtualized execution is powerful because each call creates a separate instance with local memory. The `env` variable provides access to:

```js
core.MyFunction = (args, env) => {
  env.local    // local memory for this instance
  env.global   // global memory for the call tree
  env.exposed  // memory shared outside the instance
  env          // sharable memory within the instance and its children
};
```

- **Global memory** is created with each widget or scope via `FrontSubmit`.
- **Local memory** is specific to each instance.
- When executed in the output cell (aka [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md)) or on a slide, `env.element` provides access to the DOM placeholder.

Let’s look at an example using local memory:

##### 🎡 Example 2: Clocks
```js
.js
core.PlaceholderClock = async (args, env) => {
  env.local.start = new Date();
  env.local.clock = setInterval(() => {
    const d = new Date() - env.local.start;
    env.element.innerHTML = d;
  }, 10);
};

core.PlaceholderClock.destroy = async (args, env) => {
  clearInterval(env.local.clock);
  const passed = new Date() - env.local.start;
  alert(`${passed}ms passed`);
};

core.PlaceholderClock.virtual = true;
```

Then we can use it like this using [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md) to execute Javascript

```mathematica
PlaceholderClock /: MakeBoxes[p_PlaceholderClock, StandardForm] := ViewBox[p, p];

PlaceholderClock[]
```

Here the first argument of `ViewBox` is actual input form of the expression, while the second one will be used to render the view, which covers input form in the editor.

Copy/paste it across cells. When you delete a widget, `.destroy` runs and stops the clock showing a pop up message

![](../../../imgs/Screen%20Recording%202023-04-09%20at%2018.43.08.gif)


This is especially useful for things like `Graphics3D`, where a rendering function might run 60 times per second. You don’t want it to keep running if the widget is removed:

```js
core.Graphics3D.destroy = async (args, env) => {
  cancelAnimationFrame(env.local.aid);
};
```

#### Default Methods
Users can define their own subsymbols (methods) via `env.method`.

For container-based functions, you should define these:
- `.destroy` — triggered when a widget is removed (runs top-down)
- `.update` — triggered when data changes (runs bottom-up)

```js
core.MyFunction.update = async (args, env) => {};
core.MyFunction.destroy = async (args, env) => {};
```

Without these, deleting a widget can cause errors.

#### A Note on Packed and Numeric Arrays
When sending large chunks of numeric data, the Wolfram Kernel may use `PackedArray`, which becomes a `NumericArrayObject` in JavaScript (a wrapper for `TypedArray`).

Always check for this:

```js
let data = await interpretate(args[0], env);
if (data instanceof NumericArrayObject) {
  // handle TypedArray
} else {
  // handle normal array
}
```

You can convert to a normal JS array with:

```js
data = data.normal();
```

##### 🎡 Example 3: Game of Life (Improved)
Let’s enhance our animation with containers:

```js
.js
core.MyFunction = async (args, env) => {
  let data = await interpretate(args[0], env);
  if (data instanceof NumericArrayObject) {
    data = data.normal();
  }
  //we are not going to use data here 
  //only needs for dynamic link between child and parent

  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 400;

  let context = canvas.getContext("2d");
  context.fillStyle = "lightgray";
  context.fillRect(0, 0, 500, 500);

  let old = new Array(40);
  for (let i = 0; i < old.length; i++) {
    old[i] = new Array(40).fill(0);
  }

  env.element.appendChild(canvas);
  env.local.old = old;
  env.local.ctx = context;
};

core.MyFunction.virtual = true;
```

Update method:

```js
.js
core.MyFunction.update = async (args, env) => {
  let data = await interpretate(args[0], env);
  if (data instanceof NumericArrayObject) {
    data = data.normal();
  }
  //now we are using data

  const context = env.local.ctx;
  for (let i = 0; i < 40; ++i) {
    for (let j = 0; j < 40; ++j) {
      if (env.local.old[i][j] > 0) {
        context.fillStyle = "rgba(0,0,255,0.2)";
        context.fillRect(i * 10 + 2, j * 10 + 2, 6, 6);
      }
      if (data[i][j] > 0) {
        context.fillStyle = "rgba(255,0,0,0.4)";
        context.fillRect(i * 10 + 1, j * 10 + 1, 8, 8);
      } else {
        context.fillStyle = "rgba(255,255,255,0.4)";
        context.fillRect(i * 10 + 1, j * 10 + 1, 8, 8);
      }
    }
  }
  env.local.old = data;
};

core.MyFunction.destroy = (args, env) => {};
```

Let us try to use it with a defined output forms

```mathematica
gameOfLife = {224, {2, {{2, 2, 2}, {2, 1, 2}, {2, 2, 2}}}, {1, 1}};
board = RandomInteger[1, {40, 40}];

MyFunction /: MakeBoxes[m_MyFunction, StandardForm | WLXForm] := ViewBox[m,m]
```

and then create out first instance

```mathematica
MyFunction[board]
```

It will show you a blank gray screen, since `core.MyFunction` only draws the data when it changes. To bind `MyFunction` to `board` symbol, we need to hold the last one from the evaluation. This can be done using [Offload](frontend/Reference/Interpreter/Offload.md)

```mathematica
MyFunction[board // Offload]
```

> See more about it in [Dynamic Symbols](#Dynamic%20Symbols)

When `board` changes:

```mathematica
Do[
  board = CellularAutomaton[gameOfLife, board, {{0, 1}}] // Last;
  Pause[0.1];
, {i, 1, 100}]
```

All instances update live! Even if you copy and paste the same expressions, its display will be unique

![](../../../GOL-ezgif.com-optimize.gif)


#### Dynamic Symbols
> As one could see from the previous example `board` symbol triggers update of our GOL canvas. `board` can be classified exactly as `dynamic symbol`

Any defined Wolfram Language symbol with an `OwnValue` like:

```mathematica
radius = 1;
```

Wrapped in [Offload](frontend/Reference/Interpreter/Offload.md) becomes a `core.radius` virtual symbol:

```mathematica
Graphics[Disk[{0., 0.}, Offload[radius]]]
```

The Kernel tracks changes to `OwnValues`, so if `Disk` is also virtual, both are coupled. For example:

```mathematica
EventHandler[InputRange[0, 1, 0.1], Function[r, radius = r]]
```

Will trigger `.update` on `Disk`.

#### Injection into a Virtual Instance
Sometimes you want to add new objects into an existing instance (like a `Graphics` scene) without reevaluating everything. You can do this using [FrontInstanceReference](frontend/Reference/Frontend%20IO/FrontInstanceReference.md) + [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md).

##### 🎡 Example with Lines
Create a reference to an instance:

```mathematica
ref = FrontInstanceReference[];
Plot[x, {x, 0, 1}, Epilog -> {ref}]
```

Then inject a new object:

```mathematica
FrontSubmit[Line[{{0.2, 0.6}, {0.1, 0.5}}], ref]
```

:::tip
See [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md) and [FrontInstanceReference](frontend/Reference/Frontend%20IO/FrontInstanceReference.md) for more.
:::

#### Frontend Objects
If you copy and paste any expressions from the given examples to a normal text editor, it will reveal [InputForm](frontend/Reference/Formatting/InputForm.md) 

```text
(*VB[*)(MyFunction[Offload[board]])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRAeF5DwrXQrzUsuyczPg4ixAwn/tLSc/MSUYlYgOyk/sSgFAL6LDrY="*)(*]VB*)
```

What if the inner expressions are too big to be displayed? For example [Graphics3D](frontend/Reference/Graphics3D/Graphics3D.md) can include 10000 of polygons. To cope with this problem you can wrap it into [Frontend Objects](frontend/Advanced/Frontend%20interpretation/Frontend%20Objects.md), i.e.

```mathematica
MyFunction /: MakeBoxes[m_MyFunction, StandardForm | WLXForm] := With[{
	o = CreateFrontEndObject[m]
}, 
	ViewBox[Null, o]
]
```

then you get

```text
(*VB[*)(Null)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeEJBwK8rPK3HNS3GtSE0uLUlMykkNVgEKJ5oaGBukpBnomlqYGOmapFgY6CZamJnoGllYmJukGRqkWpqaAAB12BS3"*)(*]VB*)
```

- expression is compressed to JSON and will be loaded via separate channel
- expression no longer keeps its original form and will return `Null`

To improve this situation, one can use a standard form of [FrontEndExecutable](frontend/Reference/Frontend%20Objects/FrontEndExecutable.md) 

```mathematica
MyFunction /: MakeBoxes[m_MyFunction, form: StandardForm | WLXForm] := With[{
	o = CreateFrontEndObject[m]
}, 
	MakeBoxes[o, form]
]
```

Then we get

```text
(*VB[*)(FrontEndRef["382744b2-d98e-49ef-9858-d15675873a2b"])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeEJBwK8rPK3HNS3GtSE0uLUlMykkNVgEKG1sYmZuYJBnpplhapOqaWKam6VpamFrophiampmbWpgbJxolAQB3iBUG"*)(*]VB*)
```

- expression is compressed to JSON and will be loaded via separate channel
- expression keeps its original form, since [FrontEndRef](frontend/Reference/Frontend%20Objects/FrontEndRef.md) directly points to the internal storage of the original expression