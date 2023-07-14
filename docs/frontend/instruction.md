---
sidebar_position: 1
enableComments: true
---
# Quick start
Frontend __does not require anything installed__ apart from `wolframscript` (see Freeware [Wolfram Engine](https://www.wolfram.com/engine/) or Wolfram Kernel). 

:::info
Make sure that Wolfram Engine is activated and no other instance of `wolfram` is running on your Mac/PC
:::

Then download `.zip` from [master branch](https://github.com/JerryI/wolfram-js-frontend) or

```bash
git clone https://github.com/JerryI/wolfram-js-frontend
cd wolfram-js-frontend
```

then run the script

```bash
wolframscript -f Scripts/run.wls
```

It will take some time to download all core plugins, after that you can start using it by opening your browser 

```bash
[Fri 9 Jun 2023 13:43:37] WEBServer created
[Fri 9 Jun 2023 13:43:38] ::Tiny Web Server:: starting
[Fri 9 Jun 2023 13:43:38] ::Tiny Web Server:: listening
Open http://127.0.0.1:8090 in your browser
```

:::note
UI works well with most modern browsers, except Safari, where one might expect to see some glitches in an equation editor.
:::


import Notebook from '@site/src/components/wljs-notebook-react';




