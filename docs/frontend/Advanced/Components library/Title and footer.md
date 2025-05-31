---
tags:
  - text
  - layout
---
A simple layout helpers to stylize your [FrontSlidesSelected](frontend/Reference/Slides/FrontSlidesSelected.md) 

![](./../../../Screenshot%202024-11-26%20at%2020.13.52.png)

For example

```html
.slide
<!-- .slide: class="text-left h-full" style="height:100%" -->

<MakeTitle>$Fe_x Zn_{2-x} Mo_3 O_8$ is a platform for</MakeTitle>

Content goes...

Content goes...

Content goes...

<Footer/>

```

## Title component
Place here your logo and decorate it with a gradient for instance

```jsx
.wlx

MakeTitle[Title__String] := MakeTitle[StringJoin[Title]]

MakeTitle[Title_String] := With[{
  logo = "https://www.trr360.de/wp-content/uploads/2022/04/cropped-logo_small-1.png"
},
<div class="relative flex w-full text-left flex-row gap-x-4" style="align-items: center; margin-bottom:1.5rem;">
  <div style="bottom:0; z-index:1; position: absolute; background: linear-gradient(to left, red, blue, green); width: 100%; height: 0.7rem;"></div>
  <img style="margin:0; z-index:2; padding:0rem;" width="120" src="{logo}"/>
  <h2><Title/></h2>
</div>
]
```

## Footer component
It uses absolute position of the element in order not to occupy space on an actual slide

```jsx
.wlx

Footer = With[{},
  <div class="w-full ml-auto mr-auto bottom-0 text-sm absolute">
    DFG Retreat Meeting TRR360: <i>C4 Ultrastrong matter-magnon coupling
</i>, Kirill Vasin
  </div>
];
```