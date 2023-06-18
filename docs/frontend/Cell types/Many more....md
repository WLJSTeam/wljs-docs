---
sidebar_position: 5
---
You can extend output cell types via a few lines of code and you favorite framework / package!

:::info
[WSP](https://github.com/JerryI/tinyweb-mathematica) Template engine is supported. Use tags 
```php
<?wsp Now//TextString ?>
```
to embed any wolfram expressions.
:::

#### Mermaid
__[Github repo](https://github.com/JerryI/wljs-mermaid-support)__
Draw beautiful diagrams by code 
```bash
.mermaid
pie title NETFLIX
         "Time spent looking for movie" : 90
         "Time spent watching it" : 10
```

![](../../imgs/Screenshot%202023-03-31%20at%2016.01.28.png)

##### Image/File viewer/editor
__[Github repo](https://github.com/JerryI/wljs-magic-support)__
It is questionable if it a good idea to implement it in the following syntax. The prefix itself defines the urls and the type of the processor. 

However, for now you can drop any image available in the folder of your notebook
```shell
randompic.png
```

![](../../imgs/Screenshot%202023-03-31%20at%2016.06.38.png)

to print the content of any file
```
filename.txt
```

to create or to write to a file
```
filename.txt
Hello World
```

![](../../imgs/Screenshot%202023-03-31%20at%2016.07.58.png)

##### SVG Art
__[Github repo](https://github.com/JerryI/wljs-svgbob-support)__
This feature was added mostly for fun. If you like to draw using symbols, you should definitely try a new creating - [SVGBob](https://github.com/ivanceras/svgbob). Written in Rust and packed as a WASM module

```shell
.svgbob
--------->
```

![](../../imgs/Screenshot%202023-03-31%20at%2015.59.37.png)

