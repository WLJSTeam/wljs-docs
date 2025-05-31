__A user does not need any app installed to view the notebook__

Since the interpretation of the output cells happens in a browser, then we can pack all data into a single `.html` file and easily share it with other people by clicking on the icon

![](./../../Screenshot%202025-05-22%20at%2019.08.07.png)

![](./../../Screenshot%202024-07-08%20at%2021.57.00.png)

:::warning
Do not forget to save your notebook before exporting! It is important for garbage collecting
:::

## Use cases
- Share a notebook with a colleague (no WLJS App installed)
- Share your work on the internet or embed it to a blog post. Using [URL Protocol](frontend/Importing/URL%20Protocol.md) other users can convert it back to a normal WLJS notebook
- Lecture notes & offline presentations
- Make a report on data analysis, experiment
- Documentation 
- Cross-platform personal notes

Example

![](./../../Screenshot%202024-07-07%20at%2016.29.33.png)

:::info
All dynamic content will be *frozen* at the latest state you have evaluated
:::

## Hosting notebooks
### Offline mode
This is a default behavior, when it packs all libraries for graphics and ui into a single HTML file. It results in a quite bulky file *~5-15 mb* depending how many things were included (see [Portability](#Portability)), that can work **fully offline**.

### CDN mode
This is can be enabled form the settings menu

![](./../../Screenshot%202024-07-28%20at%2019.11.13.png)

Then the bare minimum of data will be compressed into a single HTML, mostly an actual data of the notebook. It results in a much smaller file size, however, requires an internet connection. We use [JSDelivr](https://www.jsdelivr.com/) to ship all libraries from the corresponding Github repositories. 

Then one can embed a notebook as `<iframe>` into your blog or as a normal static page using services such as [Static App](https://static.app/) for example.

## Portability 
See here [HTML](frontend/Importing/HTML.md)

## URL Protocol
See more in [URL Protocol](frontend/Importing/URL%20Protocol.md)


## File size
You can specify what to include to the bundle and what to exclude in `Settings` menu

![](./../../Pasted%20image%2020240510101914.png)
### Limitations for user's dynamic content
Things such as [ManipulatePlot](frontend/Reference/Plotting%20Functions/ManipulatePlot.md), [InputRange](frontend/Reference/GUI/InputRange.md), [Offload](frontend/Reference/Interpreter/Offload.md) technic, animations made using [AnimationFrameListener](frontend/Reference/Graphics/AnimationFrameListener.md) or [`SetInterval`](frontend/Reference/Misc/Async.md#`SetInterval`) and similar __will not work and display the last state__ in your HTML document.

#### Option 1
To overcome this limitations one can use [Dynamic HTML](frontend/Exporting/Dynamic%20HTML.md) instead, which is still experimental feature.

#### Option 2
__However__, functions such as 
- [AnimatePlot](frontend/Reference/Plotting%20Functions/AnimatePlot.md)
- [AnimateParametericPlot](frontend/Reference/Plotting%20Functions/AnimateParametericPlot.md)
- and etc

__will still work being exported to a static HTML file__ out of the box, since they pre-calculate all frames in advance and store them in the notebook.


## Examples
See some interactive examples from __our blog page__ and demonstration project
- [2D Fourier Image Filtering](https://jerryi.github.io/wljs-docs/wljs-demo/intro-2df)
- [Electric field 3D plot](https://jerryi.github.io/wljs-demo/pointcharge3D.html)