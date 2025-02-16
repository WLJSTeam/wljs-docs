---
sidebar_position: 2
---


![](./../../Pasted%20image%2020250210130401.png)

WLJS Notebook is an application built on top of the Wolfram Engine (a freeware distribution of Wolfram Language) with a web-based GUI. Naturally, we isolate evaluation to a separate process of the Wolfram Engine, similar to Mathematica. Both can directly interact with the content rendered on the page.

## Windows and GUI
We use a superset of Wolfram Language and HTML—[WLX](https://jerryi.github.io/wlx-docs/)—to build app components (similar to JSX) and the entire GUI. Together with a small UI framework, it allows seamless integration of JS into windows, which is why we do not explicitly separate backend and frontend parts in the architecture. The state is not stored on the client; all UI updates are performed by the main Wolfram Engine.

## Notebooks
The notebook interface is simply a separate view-component of the app that loads a notebook file, renders it, and evaluates its cells using specialized evaluators. The evaluator to use is determined by the cell type via special patterns at the beginning of the cell content. Evaluators vary significantly, from [JavaScript](frontend/Cell%20types/Javascript.md) cells that do not involve the Wolfram Kernel to [Slides](frontend/Cell%20types/Slides.md) and [Wolfram Language](frontend/Cell%20types/Input%20cell.md) input cells. All notebooks are stored as associations, with input/output expressions presented as plain strings. The main kernel does not interpret a cell's content.

## WLJS Interpreter
A key component of WLJS Notebook is its deep integration with JavaScript. Unlike most notebook solutions, we do not convert cell content into a special format before rendering it on the page. To display a graph, code, or button, we send the Wolfram Expression directly to the browser and let JavaScript interpret it in place. To enable this, we implemented a compact (~3 kB) JavaScript-based WL interpreter called the *WLJS Interpreter*. In fact, our API also relies on Wolfram Expressions—handling all dynamics, graphics, sound, and even GUI management through the WLJS Interpreter. There is a 1:1 correspondence between most JavaScript objects and Wolfram Expressions.

## Communication
We use as much SSR (Server-Side Rendering) as possible via a basic HTTP channel. The *main kernel* establishes a WebSocket connection to provide interactivity and avoid long polling. Each *evaluation kernel* (limited to one by the freeware license) has its own dedicated WebSocket connection to the page. This approach ensures optimal performance for dynamic evaluations involving real-time video streaming or updating $10^6$ polygons in a 3D plot. We use a binary protocol instead of a text-based one to update data within expressions.

## Wolfram Paclets
Despite differences between Mathematica and WLJS Notebook, both share the same Wolfram Language with its standard library set. Consequently, we support standard WL packages in any form.

## Extensions (Plugins)
Extensions or plugins are a significant part of WLJS Notebook. They function as composite packages, which may include:

- Features for the main kernel
- Features for the evaluation kernel
- JavaScript libraries
- UI elements for the notebook interface
- Implementations of new cell types
- Interactive documentation in the form of small applications

Each package has its own context name, which can be required by other extensions. WLJS Notebook is split into more than ten such modules.

You can write and distribute your own extensions via GitHub. See more details in [Structure](frontend/Development/Plugins/Structure.md).

