---
sidebar_position: 0
---


Here is a FAQ list for the design choices

## Notebook interface

### Something isn't working like in Mathematica
If you don't like how WLJS Notebook renders your figures, please, try a fallback option [MMAView](frontend/Reference/GUI/MMAView.md)

![](./../../neverasked-ezgif.com-optimize.gif)

### Why Not Jupyter Notebook, VSCode, Pluto, etc.  

Our primary focus was to bring easy, fast, and snappy dynamics to Wolfram Notebooks— similar to Observable or Pluto — while keeping portability and the ability to run some calculations offline (without requiring a running kernel or server).  

We initially experimented with the Jupyter API and later with Observable, but neither provided enough flexibility to implement syntax sugar, editable math expressions, and interactive output cells. Storing and rendering elements like interactive 3D plots with embedded JavaScript is particularly challenging. The official Wolfram Language Extension only supports rasterized static images as output. While it's possible to embed JavaScript in output cells, this approach is highly inefficient for dynamic evaluation.  

In contrast, WLJS stores raw Wolfram Language (WL) data in the notebook, which the frontend then interprets as plots or 2D/3D images. This increases file size but enables more functionality, such as panning or rotating a plot and adjusting some sliders entirely offline without a working kernel.  

### Why in Jupyter WL Extension this or that looks different
The main difference between Jupyter and WLJS is that Jupyter rasterizes all plots into static images. (You can do that in WLJS too—just use [MMAView](frontend/Reference/GUI/MMAView.md)) In contrast, WLJS reimplements most graphical primitives one by one using JavaScript, SVG, custom WebGL shaders, and other technologies, allowing everything to run directly in the browser in-place. As a result, plots remain interactive and vector-based, fully compatible with features like [ManipulatePlot](frontend/Reference/Plotting%20Functions/ManipulatePlot.md) , [AnimatePlot](frontend/Reference/Plotting%20Functions/AnimatePlot.md), and more (see [Dynamics](frontend/Dynamics.md)). 


### Summary of Limitations in Existing Solutions  

- **Uneditable output cells**  
- **No support for syntax sugar or 2D math input**  
  - We rely on a customized CodeMirror 6 editor with extensive optimizations for speed.  
- **Significant overhead from the ZMQ protocol used in Jupyter Kernels**  
  - Dedicated WebSocket links for each evaluation kernel enables much faster performance.  
- **Maintaining two separate systems**  
  - Supporting both a Python/Julia interpreter and the Wolfram Engine would add complexity.  

If we removed our key features, WLJS would be no different from VSCode Notebooks or Jupyter/Pluto with an attached Wolfram Kernel.  

<details>
<summary>Feedback from *Anton Antonov, Accendo Data LLC*</summary>

### Do I know what I am talking about?

- I have developed a few Jupyter packages in Python and Raku.
    
    - See ["JupyterChatbook"](https://pypi.org/project/JupyterChatbook/) (pypi.org) and ["Jupyter::Chatbook"](https://raku.land/zef:antononcube/Jupyter::Chatbook) (raku.land).
- Those are "full featured" chatbooks, which I use everyday in different contexts.
    
    - See for example this [recent video of mine](https://www.youtube.com/watch?v=5qXgqqRZHow).
- Here is a [comparison](https://community.wolfram.com/groups/-/m/t/3053519) of Python, Raku, and WL on LLM functionalities that includes chatbooks.
    

### Deficiencies of Jupyter

- For a long time Jupyter notebooks were clunky and buggy.
- Many of the user experience designs for Jupyter are questionable.
    - Some sort of "vi mode" is employed!!
- It is not trivial to make magic cells with different types of output.
    - Say, [Mermaid-JS](https://mermaid.js.org/), featured in the main post.
- There is no reliable way to make JavaScript graphics display in Jupyter notebooks.
    - Certain hacks are used and they do not always work.
- I tried to develop further Wolfram Language Jupyter Kernel without much success.
    - This a personal point of view, of course.
    - After studying the code, I decided it is not worth _my time_ to change or develop it further.

### On WLJS

- If you are going to use a "web-browser" solution, it should be better if it is "directly" based on JavaScript.
- Jupyter itself has JavaScript roots: a fundamental design decision is to use JSON.
    - Similar to the use of M-expressions by Mathematica notebooks.
- A front end programmed in JavaScript gives much more "immediate" interactive functionalities.
    - Including graphics, `Manipulate`-like interfaces, `Dataset`, etc.


</details>

### Code editor
We reply on [Code Mirror 6](https://codemirror.net/) in the combination with a few custom-written replacing decorations


## Dynamics

### Dynamics Works Differently Compared to Mathematica 
We have a [Manipulate](frontend/Reference/GUI/Manipulate.md) expression that is semi-compatible with Mathematica. However, in general, we enforce different approaches for interactive evaluation, such as an event-based approach and partial reevaluation (see [Dynamics](frontend/Dynamics.md)). Our methods provide much faster and more efficient dynamic evaluation compared to Mathematica, though they are more limited in terms of supported symbols. In this sense, we see no point in replicating the same architecture using open-source tools.  

## General
### Would you join Mathics to go fully open-source
It is possible in the future 🧙🏼‍♂️ since [Mathics project](https://mathics.org/) reimplement the core features of Wolfram Language in Python. We should try it at some point.

### Our goals
We make our decisions based on the considerations

- a notebook should work properly even after 10 years or more
- stable API, no possibilities for breaking changes, no migration guides
- no external dependencies, which cannot be localized
- write once and forget (if no issues found)

## Javascript

### Why not to use X-framework

- The direct DOM manipulations are always faster. 
- To reduce the number of "moving" parts.
- We are trying to allocate as much room for the user's application and madness as possible. 
- We should be able to ship notebook as a standalone HTML file.


### Why Not Use a Centralized Build System  

We do use ESM and JavaScript bundlers within a dedicated component. Each component is loaded lazily and can have optional interconnections with other components. Managing such a system—where users can load or unload any part without duplicating dependencies—is extremely challenging.  

To address this, all interconnections are handled through a few global objects and classes, such as `interpretate`, `server`, `SupportedCells`, `CellWrapper`.

__Another reason we use the global scope__ is to provide users with easy access to the WLJS Interpreter (see [WLJS Functions](frontend/Advanced/Frontend%20interpretation/WLJS%20Functions.md)).  Call it __user-first__ approach and __developers-second__ 
