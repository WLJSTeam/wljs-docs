---
sidebar_position: 3
---
> Type `.html` in the first line of an input cell

![](../../imgs/Screenshot%202024-03-13%20at%2019.26.09.png)

__[GitHub repo](https://github.com/JerryI/wljs-html-support)__  
You can also write plain HTML along with embedded Wolfram Language expressions.

The WSP template engine allows you to use the Wolfram Language to process text similarly to PHP (see [more here](https://github.com/JerryI/tinyweb-mathematica)).

```html
.html

<h3>Today is <?wsp Now // TextString ?></h3>
```


