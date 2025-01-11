---
sidebar_position: 3
---
> Type `.html` in the first line of an input cell


![](../../imgs/Screenshot%202024-03-13%20at%2019.26.09.png)



__[Github repo](https://github.com/JerryI/wljs-html-support)__
You can also write plain HTML together with embedded Wolfram Language expressions


WSP template engine allows to use Wolfram Language to process the text like PHP (see [more here](https://github.com/JerryI/tinyweb-mathematica))

```html
.html

<h3>Today is <?wsp Now // TextString ?></h3>
```