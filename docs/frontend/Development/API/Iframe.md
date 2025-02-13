WLJS Notebook (both desktop app and server) does support special embedding of a notebook window to `iframe` 

![](./../../../Screenshot%202025-01-18%20at%2017.07.10.png)

*App running inside Obsidian*

In this regime your hotkeys are redirected to a parent window, top-bar, sidebar as well as control buttons __are not drawn__

```url
/iframe/<PATH>
```

Use `/iframe/` in the the URL to open any resource in this regime

```html
<iframe id="yourIframe" src="http://127.0.0.1:20560/iframe/<PATH>"></iframe>
```

where `<PATH>` must be an absolute path on your machine to a given notebook, markdown file (see [Markdown](frontend/Importing/Markdown.md) or regular `wl` files) or any other supported input format encoded using `encodeURIComponent()` or equivalent. 

Ports and hosts can be configured at the startup

```shell
wolframscript -f Scripts/start.wls host 0.0.0.0 http 20560 ws 20561 ws2 20562 docs 20563
```

### URL parameters (optional)
#### `root`
Provides a "root" folder to lookup files. Any provided path will be added to exposed directories of the web-server

```url
/iframe/<PATH>/?root=<ROOT>
```

:::tip
It comes handy, when the working directory is higher by the hierarchy than the notebook folder.
:::


## Communication

:::note
Iframe API effectively replaces the communication between Electron main process and WLJS Notebook used in desktop application (`electronAPI`).
:::

The communication from the parent window to `iframe` is done using [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) API, which works even if your window is hosted on other domain.

On WLJS Notebook side a global Javascript object `iframeAPI` (similar to `electronAPI`) is responsible for handling in-/out- events.

### Incoming messages
Attach event listener to `window` object in the parent window as usual

```js
window.addEventListener('message', console.warn)
```

All messages has the following form

```js
{
	"type": <eventType>
	...
}
```
#### Hotkeys
Since it is cumbersome to capture keypresses inside iframe from the parent window, we redirect all "important" hotkey used in WLJS to the parent window using the following structure

```js
{
	"type": 'shortcut'
	"data": <keyCombination>
}
```

where `keyCombination` can be

- `save`
- `abort`
- `togglefocusedcell`

#### File dialogs
In some situations WLJS can request a file-dialog window to save a notebook. An incoming request has the following form

```js
{
	"type": 'request',
	"method": 'requestFileWindow',
	"params": <params>,
	"promise": <promise>
}
```

where `<params>` is an __array of strings__ with file extensions to filter in a dialog window, `<promise>` is uuid __used to resolve the request__.

The reply from parent window to iframe should have the following form

```js title="reply"
{
	"type": "promise",
	"promise": <promise>,
	"data": <path>
}
```

where `<path>` is __url-encoded absolute path a notebook__ or other object picked as a destination. To reject the request (a user cancelled dialog) send `false`

```js title="reply"
{
	"type": "promise",
	"promise": <promise>,
	"data": false
}
```

#### Open request
WLJS might request to open a new window with a provided url (for example after `newnotebook` has been called)

```json
{
	"type": "open",
	"data": <uriEncodedPath>
}
```

### Outgoing messages
To send a command to WLJS Notebook or resolve a request use `postMessage` method

```js
yourIframe.contentWindow.postMessage(message, "*")
```

where `message` follows

```js
{
	'type': <type>, 
	...
}
```

The following `<type>` of messages are supported

#### Promises
To resolve or reject the request a parent window should send a message in a form

```js
{
	'type': 'promise',
	'promise': <promise>,
	'data': <data>
}
```

where `<promise>` is uuid of the request and `<data>` is payload.

#### Commands
There are several commands you can send to WLJS, most of them originates from UI control buttons and hotkeys of the desktop application. You don't have to support all of them to get the working notebook interface

```js
{
	'type': 'controls',
	'name': <name>
	...
}
```

where `<name>` is a command name. The following list covers most internal commands

- `save` fires save action in WLJS app

- `saveas` first save action with provided absolute path to a file in `data` field, i.e.

```js
{
	'type': 'controls',
	'name': 'saveas',
	'data': <urlEncodedPath>
}
```

- `abort` fires abort signal to attached kernel and interrupts evaluation
- `changekernel` opens an internal dialog to choose kernel
- `unhideallcells` unhides all hidden cells
- `clearoutputs` cleans up all output cells (deletes)
- `togglecell` hides/reveals focused input cell
- `deletecell` deletes focused cell
- `evaluateinit` evaluates initialization cells
- `newnotebook` creates new notebook (see [Open request](#Open%20request))
- `checkupdates` forces to check updates



:::note
Different extensions may also register their commands, this has to be checked separately.
:::
