## FAQ

### How to *restart* chat
Type and send the following message:

```
reset chat
```

### Asking to fix any errors
When your cursor is inside a cell (whether *JavaScript*, *Wolfram Language*, or any other), it is called the `focused cell`.

AI can access it. Mention this explicitly:

> Fix my errors in the focused cell

### Fixing typos in selected text
When you select text inside a cell, you can ask the AI bot to perform actions on it. For example, press `Ctrl/Cmd + P` and type:

> Fix selected

or more explicitly:

> Fix grammar in selected

### Reading or editing selected text
AI can also access currently selected text. However, it does not receive information about the language. By default, it assumes the main language is WL.

For example, you can ask:

> What is this symbol I selected?

### Removing or adding cells
You can place your cursor in any cell and request to remove all cells starting from the focused one:

> Remove all cells starting from the focused

### Saying "do it" in a single message
If the assistant hesitates to apply changes and only prints them in chat, simply say:

> Apply changes

### Creating new cells
You can ask:

> Show me an example in JavaScript

By default, it will be added to the end of your notebook. To specify a location, mention the `focused` cell:

> Show me an example in JavaScript and print it in the cell below the focused one

### Changing attributes of cells
AI can toggle input cell visibility:

> Unhide all input markdown cells

### Evaluating cells
You can ask AI to evaluate specific types of cells. For example:

> Evaluate all markdown cells

You can also chain commands:

> Evaluate all markdown cells and hide inputs

### Asking to redo something
If AI made a mistake or if you want something different, ask it to edit the cell it created:

> I need a red background instead of white. Edit your cell

### Asking for comments
You can ask AI to check all code cells and add descriptions:

:::warning
If you have large cells or many small ones, this may use a lot of tokens.
:::

You can also chain commands:

> Read all my cells and comment on them using Markdown. Insert your Markdown cells at the corresponding places in the notebook. Evaluate them and hide them.

If the AI prints code blocks as well, you can specify:

> Read all my cells and comment (no code blocks) on them using Markdown. Insert your Markdown cells at the corresponding places in the notebook. Evaluate them and hide them.

### Accessing the internet
By default, AI can use Wolfram Alpha to retrieve real-time data.

> Where am I?

### AI is not responding ⌛️
Sometimes operations take 1-2 minutes to complete. If that's not the case, try waking it up with a dummy message:

> So?

If that doesn't work:
- Type and send `reset chat` to restart the session.
- You may have run out of tokens. Check the OpenAI API page under `Billing`.

## Note on cell types
The assistant is aware of being in a notebook environment. The following cell types are described in the initial system prompt:

- [Input cell](frontend/Cell%20types/Input%20cell.md)
- [JavaScript](frontend/Cell%20types/JavaScript.md)
- [HTML](frontend/Cell%20types/HTML.md)
- [Slides](frontend/Cell%20types/Slides.md)
- [Mermaid diagrams](frontend/Cell%20types/Mermaid.md)

Additionally, differences between Wolfram Mathematica and WLJS Notebook are included in the initial prompt, covering topics such as [Dynamics](frontend/Dynamics.md), [InputButton](frontend/Reference/GUI/InputButton.md), [InputRange](frontend/Reference/GUI/InputRange.md), [ManipulatePlot](frontend/Reference/Plotting%20Functions/ManipulatePlot.md), and various [Events](frontend/Reference/Misc/Events.md).

## Library
All additional information is sorted into an `AI Library`, accessible in the settings menu:

![](./../../../Screenshot%202024-09-02%20at%2012.03.25.png)

This means AI can access relevant topics on demand __without using your tokens if your request does not match the topic__.

## Prompt Examples

### Fixing Errors
For example, if you type:

```mathematica title="cell"
Plot[x, {x,0,1,0.1}]

               ^^^
```

Then, with your cursor inside the cell, open the command palette with `Cmd/Ctrl+P` and type:

```
Fix my errors in the focused cell
```

If the assistant hesitates to apply changes, add:

```
Apply changes
```

:::note
The assistant can help with any language. Make sure your cursor is inside the correct cell.
:::

### Fixing Grammar
Simply ask:

```
Fix my grammar in the focused cell
```

If it does not apply changes, add:

```
Apply changes
```

### Working with Dynamics
The assistant is aware of new libraries. For example:

```
Make a dynamic example where a green ball follows your cursor on a 2D graph
```

```mathematica title="sample output"
pt = {0.,0.};

Graphics[{
  White, EventHandler[Rectangle[{-10,-10}, {10,10}], {
    "mousemove" -> Function[pos, pt = pos]
  }],
  Green, Disk[pt // Offload, 0.5]
}, PlotRange -> {{-10, 10}, {-10, 10}}]
```

![](./../../../MovingBall%20video%20to%20gif.gif)

### Creating Code Examples
Ask directly in the command palette:

``` title="prompt"
Make an example slide
```

This creates a new [Slides](frontend/Cell%20types/Slides.md) cell.

```jsx title="sample output"
.slide
# Welcome to the Presentation

This slide introduces you to the world of presentations in notebooks.

---

# The Power of Slides

Slides can convey complex ideas succinctly and engagingly.

---

# Thank You!

We hope you found this introduction useful.
```

![](./../../../Screenshot%202024-04-20%20at%2021.34.20.png)

Or, for a JavaScript example with animation:

``` title="prompt"
Write some JavaScript with animation
```

```js title="sample output"
.js
let posX = 0;
let speed = 2;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'red';
  ctx.fillRect(posX, 75, 50, 50);
  posX += speed;
  if (posX > canvas.width || posX < 0) speed *= -1;
}

animate();
```

### Restarting the Session
To flush the session, type:

```
reset chat