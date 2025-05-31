---
sidebar_position: 12
---


If something isn't working as intended, please post an [__issue on GitHub__](https://github.com/JerryI/wolfram-js-frontend/issues) and include information evaluated in your Wolfram Engine, such as:

```mathematica
$Version
$SystemID
```

Also specify how you are running the app (via Desktop App or as a script).

## Cache Issues
Sometimes after an update, your browser's cache may still be outdated. Try the following options depending on your browser:

- `Ctrl + F5`
- `Shift + F5`
- `Force Reload` (from the top menu of the Desktop Application)
- `Reload Window` (from the top menu of the Desktop Application)
- `Clear Cache and Reload` (from the top menu of the Desktop Application)

## Outdated Modules
Try running `Update` from the launcher window.

## Cells Didn't Load Correctly
This rarely occurs when asynchronous loading fails and scripts execute in the wrong order.

Perform a __Force Reload__ of the window/page (from the main top menu or your browser).

## Browser Console
Any errors caused by cell evaluation will appear here:

![](./../../346045552-c7261f1b-5e6d-48e2-aa1a-f4b11d50d9c9.png)

Clicking the bug icon opens the JavaScript developer tools.

## Bypass WLJS Renderer and use MMA's
To bypass the standard form of expression used in WLJS Notebook, use [MMAView](frontend/Reference/GUI/MMAView.md)

```mathematica
Plot[x, {x,0,1}] // MMAView
```

WLJS Notebook does not cover all possible styling options for plots, graphics and diagram types. For that reason we give an option to use the default renderer of Wolfram Engine.

## Logs Dump
If you're comfortable sharing logs (and it doesn't violate your privacy), you can enable `DEBUG` mode at startup:

1. Restart the app and click `DEBUG` in the launcher window.
2. Perform the actions that lead to the error.
3. Close the app normally.
4. A window with the collected log file will appear.
5. Send the log to us via Telegram, email, or GitHub Issues.

## Hotline & General Discussion Chat
Feel free to join our [Telegram Group](https://t.me/wljs_support).

:::tip
Submit issues through [GitHub](https://github.com/JerryI/wolfram-js-frontend/issues)
:::

