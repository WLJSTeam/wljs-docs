---
sidebar_position: 1
enableComments: true
sidebar_class_name: green
slug: /
---

# Quick start
WLJS Notebook __requires  `wolframscript` (see Freeware [Wolfram Engine](https://www.wolfram.com/engine/) or Wolfram Kernel)__ installed on your PC/Mac. *If not, WLJS application will redirect you to the official download page*

import img from './../1_oEnvgJSyL-PNDTW8arOehw.webp';

> All algorithms, functions, and other components of the Wolfram Language provided by the Wolfram Engine are the intellectual property of Wolfram Research, Inc.



<img src={img} style={{marginLeft:'auto', marginRight:'auto', display:'block'}}/>

<div style={{'text-align':'center'}}><b style={{color:"var(--ifm-link-color)"}}>A lightweight alternative to Mathematica built using open-source tools and freeware Wolfram Engine</b></div> 


<h3 style={{'text-align':'center'}}> 

[Overview 🚀](frontend/Overview.md)      [Demo 📺](https://jerryi.github.io/wljs-docs/wljs-demo) 

</h3> 

Use it to __publish your interactive notebooks__ on web

<h4 style={{'text-align':'center'}}> 

[Live and interactive 🖖](https://jerryi.github.io/wljs-docs/wljs-demo/mid-thz-tds) 

</h4> 

or __as a runtime for your small desktop apps__ made using WL, WLX, HTML, JS ...

<h4 style={{'text-align':'center'}}> 

[Standalone widgets 🪟](widgets) 

</h4> 

:::note
WLJS Notebook **is a freeware software**, which is based on Wolfram Engine.
 
You do not need to have Mathematica installed to run WLJS Notebook. **No subscription model**, only one-time registration at *wolfram.com* is needed for a personal use. Please check the [license agreement](https://www.wolfram.com/legal/terms/wolfram-engine.html).
:::

If you are __new to Wolfram Language__, please, check the [corresponding page](./Wolfram%20Language.md).


There are two ways you can choose from

import Tabs from '@theme/Tabs';  
import TabItem from '@theme/TabItem';

## Desktop application
Notebook interface is shipped as an Electron application, which is cross-platform and has most benefits of a native desktop app. __This is the easiest way__

[__➡️ Releases__](https://github.com/JerryI/wolfram-js-frontend/releases)

It comes with a launcher, that takes care about all updates, files extension association and etc. 

#### Normal vs offline version
Binaries are given in two formats on releases page. An offline version does contain the fixed versions of all necessary modules, documentation and examples, while a normal one will download the most recent ones from Github during the installation and will keep them to work fully offline.

#### CLI
You will be prompted to install cli binary. If you agree, it will make a symlink available from the terminal like VSCode. It will allow you to open a folder in WLJS Notebook by the command

```bash
wljs .
```

#### URL Protocol
App will automatically register `wljs-message` url protocol, so you can open any published notebooks from web-pages. 

### Installation on Windows
Use x64 binaries `.exe` from the releases.

### Installation on GNU/Linux

#### Using `deb` package
You might need to install `libuv` dependency, then install the executable.

*A note for Ubuntu users*
There might be a problem with starting related to a new [AppArmor issue](https://github.com/electron/electron/issues/42510#issuecomment-2171583086) om Ubuntu 24.04. A temporal fix will be to lift the restrictions

```bash
sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0
```

and then start an app from the terminal `wljs-notebook`

#### Using `zip` archive
Open an extracted folder and run an executable directly.



### Installation on MacOS

#### Using `dmg`
If you have Apple Silicon, please, download and run `-arm64.dmg` binary from the releases page, otherwise use just `.dmg` version.

#### Using `homebrew`
If you have [Homebrew](https://brew.sh/) installed, you can install this app using:
```shell
brew install --cask wljs-notebook
```


## Standalone Server
Desktop application is just a wrapper with a built-in Chromium browser, context menu bindings and file associations. WLJS Notebook itself __is a web-based application and can run using just `wolframscript` with no external services or any other programs__.

### Docker Container
*contributed by [@yloose](https://github.com/yloose)*

Please follow [the instructions](https://github.com/JerryI/wolfram-js-frontend/blob/main/container/README.md)

### Local run
Clone this repository and run:

```shell
wolframscript -f Scripts/start.wls
```

or on a specific hostname

```shell
wolframscript -f Scripts/start.wls host 0.0.0.0 http 8080 ws 8081 ws2 8082 docs 8085
```

that will open __an HTTP server__ on `8080` port with `8081`, `8082` __used for realtime communication__ and __docs pages__ at `8085`

#### Extra arguments

- set the home folder (overrides settings)
```
wolframscript -f Scripts/start.wls folder "Demos"
```

- disable autolaunch of the evaluation kernel
```
wolframscript -f Scripts/start.wls noautolaunch True
```


## Showcase
**[Blog posts](https://jerryi.github.io/wljs-docs/blog)**

[🔗 Link](https://jerryi.github.io/wljs-docs/blog) Pages of real-life problems solved using WLJS Notebook and published as interactive notebooks running in your browser. Try it out


**[WLJS Notebook Demonstration Project](https://jerryi.github.io/wljs-demo/)**

[🔗 Link](https://jerryi.github.io/wljs-demo/)
Notebooks posted as static web pages showcase various examples that demonstrate how to use the Wolfram Language and the dynamic features of our frontend. 


## Publications 📢
- *Habrahabr* October 2024: [Динамическая презентация или как закодить слайд с помощью Markdown и WL](https://habr.com/ru/articles/853496/) (Russian language only)
- *Habrahabr* Septempber 2024: [Обзор изменений в WLJS Notebook](https://habr.com/ru/articles/839140/) (Russian language only)
- *Medium* May 2024: [Reinventing dynamic and portable notebooks with Javascript and Wolfram Language](https://medium.com/@krikus.ms/reinventing-dynamic-and-portable-notebooks-with-javascript-and-wolfram-language-22701d38d651)
- *Yandex Open Source Jam* April 2024: [Dynamic notebook interface + Wolfram Language](https://www.youtube.com/watch?v=tmAY_5Wto-E) (Russian language only)
- *DPG2024 Berlin March 2024*: [Computational Notebook as a Modern Multitool for Scientists](https://www.dpg-verhandlungen.de/year/2024/conference/berlin/part/agi/session/4/contribution/4), [Slides](https://www.dpg-physik.de/vereinigungen/fachuebergreifend/ag/agi/veranstaltungen/tagungen-und-workshops/berlin_2024/agi-4_4-kirill-vasin.pdf)
- *Habrahabr* October 2023 [Open-source блокнот Wolfram Language или как воссоздать минимальное ядро Mathematica на Javascript и не только](https://habr.com/ru/articles/767490/) (Russian language only)
- *Habrahabr* October 2023 [Wolfram Language JavaScript Frontend](https://habr.com/ru/articles/766360/) (Russian language only)