There is a [built-in engine](https://revealjs.com/transitions/) for transitions between slides in RevealJS

```html
.slide

# Hey, I am blue <!-- .element: style="color:blue" -->

---
<!-- .slide: data-transition="zoom" -->

# Hey, I am red <!-- .element: style="color:red" -->
```

here on the next slide we have a line,  that specifies the transition type

## Full list

| Name    | Effect                                                                   |
| ------- | ------------------------------------------------------------------------ |
| none    | Switch backgrounds instantly                                             |
| fade    | Cross fade — _default for background transitions_                        |
| slide   | Slide between backgrounds — _default for slide transitions_              |
| convex  | Slide at a convex angle                                                  |
| concave | Slide at a concave angle                                                 |
| zoom    | Scale the incoming slide up so it grows in from the center of the screen |
