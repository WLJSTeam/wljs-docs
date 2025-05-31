---
draft: true
---

__Embed nice interactive figures to your blog__

:::danger
No longer supported due to low interest rates of the community. Please use [Static HTML](frontend/Exporting/Static%20HTML.md) or [Dynamic HTML](frontend/Exporting/Dynamic%20HTML.md) 
:::

There is a way to embed individual graphs from your notebook to a web. You need just a little knowledge about HTML technology.

![](../../imgs/Screenshot%202024-03-13%20at%2019.37.13.png)

![](./../../Screenshot%202024-07-22%20at%2010.59.15.png)

Then you select which plot to export and as a result you get two section of HTML/JS code: *head* and *figure itself*

The head contains all libraries and core scripts and can be reused for all figures on the same page.

## Use cases
- Embed an interactive 2D/3D figure or even a sound sample to a blog


:::tip
Remove libraries, which are not used in your plots from the head section to reduce the loading time of your website. WLJS cannot guess it automatically.
:::

The code section for the figure can be embedded to any place in your HTML document. Feel free to customize CSS.