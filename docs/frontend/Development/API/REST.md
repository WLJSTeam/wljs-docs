API is provided by a core extension `wljs-api`. All communication is done via HTTP POST request in JSON format. In a nutshell it allows to

- create transactions to evaluate Wolfram, WLX, any other support languages (see Cell Types) code and get back the result
- fetch [Frontend Objects](frontend/Advanced/Frontend%20interpretation/Frontend%20Objects.md) used for 3D, 2D graphics automatically

In principle public REST API is rich __enough to write your own small notebook interface with full support of all available cell types, 3D graphics, sound and etc__. However, this is a natural limitation - dynamics or event-based expressions such as [InputRange](frontend/Reference/GUI/InputRange.md) or [Manipulate](frontend/Reference/GUI/Manipulate.md) __are not going to work__.

![](./../../../Screenshot%202025-05-07%20at%2021.39.38.png)

*A basic example of a single HTML file REPL interface made using this API*
*See at the bottom*

:::warning
WLJS System due to its architecture requires to have a few objects / interfaces to be exposed to the global `window` scope.
:::

:::note
WLJS packages includes both Wolfram Language and Javascript code, therefore for the simplicity we inject JS modules to the runtime using sort of IIFE approach.
:::

## Setting up server
You need to have running WLJS server (via docker or directly) or WLJS Notebook desktop app. See [instruction](frontend/instruction.md)

## Steps to set up REPL
To make a sort of interactive evaluation environment using REST API and WLJS Notebook runtime you need to

1. Configure server link (optional)
2. Wait for the connection
3. Find available kernel
4. Make a transaction for evaluation
5. Wait for the result
6. Print the result using view-component

## Required scripts and styles
WLJS Notebook consists of multiple modules and extensions including WLJS Interpreter (a tiny Wolfram Language interpreter written in Javascript), Graphics, Graphics3D, sound libraries and view components for various cell types (optional). For styling we use Tailwind, however we do recommend to use JIT-version like `Twind` for the simplify.

Here is a full set of scripts and styles required

```html
<script type="module" src="https://cdn.skypack.dev/twind/shim"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JerryI/wljs-api@base/assets/minimal.css">
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-interpreter@base/dist/interpreter.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-interpreter@base/src/core.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-interpreter@base/src/settings.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-cells@base/src/module.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-sharedlib-mk@base/dist/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@base/dist/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@base/src/boxes.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@base/src/objects.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@base/src/autocomplete.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@base/src/frontsubmit.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@base/src/dir.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@base/src/metamarkers.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@base/src/misc.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-sharedlib-d3@base/dist/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-sharedlib-three@base/dist/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/Mathematica-ThreeJS-graphics-engine@base/dist/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-html-support@base/src/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-js-support@base/src/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-markdown-support@base/src/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-mermaid-support@base/dist/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-plotly@base/dist/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-graphics-d3@base/dist/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-wlx-support@base/src/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-inputs@base/dist/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-sound@base/dist/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-revealjs@base/dist/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-manipulate@base/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-print-redirect-fix@base/kernel.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-wxf-accelerator@base/override.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-api@base/assets/polyfill.js"></script>
```

Most of them support *lazy loading*. Feel free to remove some of the dependencies (cell types or IO libraries) if you are not going to use them. 

## Javascript server API
We provide a helper interface via `polyfill.js` script (included above) to manage evaluation, and links automatically.

**The interface is exposed via global object** `server`. 

### `server.configure(opts)`

```js
server.configure({
	address = 'http://127.0.0.1:20560', 
	fetchOptions = {}, 
	polingDelay = 300
}) : null
```

Here `fetchOptions` will be used globally for all POST requests to the server.

### `server.waitForConnection`

```js
server.waitForConnection() : Promise
```

**Async** function, that waits for a server link to be ready

### `server.findKernel`

```js
server.findKernel() : Promise<String>
```

**Async** function. It finds and returns `string` uuid of the first available evaluation kernel

### `server.createTransaction`

```js
server.createTransaction(
	kernel : String, 
	data   : String
) : Promise<String>
```

**Async** function. Submits raw `data` (as string) for the evaluation to `kernel` and returns a transaction uuid as a string. See also [Transactions](#Transactions)

### `server.getResult`

```js
server.getResult(
	kernel : String | null,
	transaction: String
) : Promise<Array>
```

**Async function**. Requests the results of the transaction provided by uuid. Kernel parameter is optional. It returns the results in a form of `Array`

```js
[
	{Display: <String>, Data: <String>},
	...
]
```

where `Display` can be `codemirror`, `html`, `markdown` and etc describing a view-component (see [View components](#View%20components)).

### `server.abortKernel`

```js
server.abortKernel(kernel : String) : Promise<String>
```

aborts the evaluation on the given kernel

### `server.cachingFunction`
Is a global async function definition used internally to fetch [Frontend Objects](frontend/Advanced/Frontend%20interpretation/Frontend%20Objects.md) from the server. You can alter it in order to cache these object. **By the default the definition is**

```js
server.cachingFunction = async (objectId) => {
	//here you can do caching if needed
	//for offline work
	const res = await server.requestObject(null, objectId);
	return res;
}
```

### `server.requestCDNExtensionsList`

```js
server.requestCDNExtensionsList() : Promise<Array<String>>
```

Returns a list of enabled extensions / modules used on the server as `Array` of `String`

```js
[
	"wljs-interpreter",
	...
]
```

### `server.requestCDNJavascript`

```js
server.requestCDNJavascript(
	list : Array<String>
) : Promise<Array<String>>
```

requests a list of URLs to CDN for provided list of extensions

### `server.requestCDNStyles`

```js
server.requestCDNStyles() : Promise<Array<String>>
```

requests a list of URLs to CDN for CSS files

## Transactions
Transactions work in the same way as input cells in the normal notebook. Any expression has to be provided as a string in [InputForm](frontend/Reference/Formatting/InputForm.md)

```js
const expression = `Plot[x, {x,0,1}]`
```

The expression will be automatically split into multiple transactions (only internally) if separated by a top-level line break

```js
const expression = `Plot[x, {x,0,1}]
1+1
`
```

As a result `server.getResult` will return an array of **two output expressions**.

### Cell types
WLJS Notebook supports multiple cell types (see [Cell types](Cell%20types)), it is specified in the first line of a transaction text

```js
const expression = `.md
# Hello World
`
```

The view component will be specified in the object of the first element of array returned by `server.getResult`.  See [View components](#View%20components)

## View components
To render the results you need to operate with view-components provided by a global Javascript object `SupportedCells`

```js
new window.SupportedCells[Display: String].view(
	{element: HTMLElement}, Data: String
) : CellTypeLike
```

where `Display` and `Data` can be acquired from the result object in array returned by `server.getResult`. `element` is DOM element where a component will be mounted.

`CellTypeLike` instance has the following methods:
- `.dispose()` removes a view component from DOM and frees all requested objects

## Minimal example
Here is a basic HTML page template, which can perform evaluation using a WLJS server running on a default port

<details>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script type="module" src="https://cdn.skypack.dev/twind/shim"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JerryI/wljs-api@base/assets/minimal.css">
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-interpreter@base/dist/interpreter.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-interpreter@base/src/core.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-interpreter@base/src/settings.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-cells@base/src/module.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-sharedlib-mk@base/dist/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@base/dist/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@base/src/boxes.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@base/src/objects.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@base/src/autocomplete.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@base/src/frontsubmit.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@base/src/dir.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@base/src/metamarkers.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@base/src/misc.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-sharedlib-d3@base/dist/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-sharedlib-three@base/dist/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/Mathematica-ThreeJS-graphics-engine@base/dist/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-html-support@base/src/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-js-support@base/src/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-markdown-support@base/src/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-mermaid-support@base/dist/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-plotly@base/dist/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-graphics-d3@base/dist/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-wlx-support@base/src/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-inputs@base/dist/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-sound@base/dist/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-revealjs@base/dist/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-manipulate@base/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-print-redirect-fix@base/kernel.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-wxf-accelerator@base/override.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/gh/JerryI/wljs-api@base/assets/polyfill.js"></script>

    <title>Textarea Template</title>
   
</head>
<body>
  <div class="max-w-2xl mx-auto p-6 space-y-4 bg-white shadow-md rounded-2xl">
    <!-- State Display -->
    <div class="text-gray-700 text-sm">
      <strong class="font-semibold">State:</strong>
      <span id="stateField" class="ml-1 text-blue-600">Waiting for wljs connection</span>
    </div>
  
    <!-- Code Area -->
    <textarea
      id="code_area"
      placeholder="Type your text here..."
      class="w-full min-h-[150px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y text-sm font-mono"
    >Plot[{x, x^2}, {x,0,1}, PlotLegends->Automatic]</textarea>
  
    <!-- Results Div -->
    <div id="resultsDiv" class="p-4 bg-gray-100 rounded-lg min-h-[100px] text-sm"></div>
  
    <!-- Submit Button -->
    <button
      id="submit_button"
      type="button"
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Submit
    </button>
  </div>
    <script type="module">
        const stateField = document.getElementById("stateField");
        const submitButton = document.getElementById("submit_button");
        const codeArea = document.getElementById("code_area");
        const resultsDiv = document.getElementById('resultsDiv');

        async function start() {
          console.warn('Initialization complete!');
          stateField.innerText = 'Connecting to Kernel';
            
          const kernel = await server.findKernel();
          console.warn('Obtained Kernel '+kernel);
          stateField.innerText = 'Ready!';
            
          submitButton.addEventListener('click', async () => {

                const transaction = await server.createTransaction(kernel, codeArea.value.trim());
                stateField.innerText = 'Evaluation...';
                console.log(transaction);
                
                const results = await server.getResult(kernel, transaction);

                console.warn('Ready');
                console.log(results);
                stateField.innerText = 'Ready!';
                
                results.forEach((data) => {
                    
                    const display = data.Display || 'codemirror';
                    const parentelement = document.createElement('div');
                    resultsDiv.appendChild(parentelement);

                    const origin = {
                        element: parentelement
                    };

                    const cell = new window.SupportedCells[display].view(origin, data.Data);
                    //to remove cell use

                    //cell.dispose()
                })

            })
        }

        (async () => {
          await server.waitForConnection();
          start();
        })();        
    </script>
</body>
</html>
```

</details>
