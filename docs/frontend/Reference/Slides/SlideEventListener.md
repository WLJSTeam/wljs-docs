---
env:
  - Wolfram Kernel
context: Notebook`Editor`Kernel`Slides`
source: https://github.com/JerryI/wljs-revealjs/blob/dev/src/Kernel.wl
package: wljs-revealjs
---
```mathematica
SlideEventListener[opts__]
```

attaches an event listener to a current slide

```md
.slide
# Slide 1

---

# Slide 2

Here is will fire

<SlideEventListener Id={"event"}/>
```

and then a handler on WL side

```mathematica
EventHandler["event", Echo]
```

:::info
There is no restrictions on the number of attached listeners to a single slide. One can generate them on-fly from components. See [Example 4 🔄 Simple stat counter](frontend/Advanced/Slides/animations.md#Example%204%20🔄%20Simple%20stat%20counter)
:::

## Options
### `"Id"`
a string representation of an event identifier, that will be used

## Event generation
It fires an event for a given slide (where it is placed) when it is revealed with a topic `"Slide"` and for each slide-fragment revealed `"fragment-x"` topic / pattern.

i.e.

### Patterns
#### `"Slide"`
fires when a slide was revealed (even the first one)
#### `"fragment-_"`
where `_` is a number of a fragment revealed on a slide
#### `"Mounted"`
fires, once an HTML content for a slide is ready
#### `"Left"`
fires, once a user leaves the slide (goes to the next or previous one) with an integer as a payload, that gives the direction
#### `"Destroy"`
fires, once a presentation was closed for some reason




Try

```mathematica
EventHandler["myEvent", {any_String :> (Print[StringTemplate["::``:: ``"][any, #]]&)}];
```

```md
.slide

# 1st Slide
Nothing

---

# 2nd Slide
A message pops up

Another message <!-- .element: class="fragment" data-fragment-index="1" -->

<SlideEventListener Id={"myEvent"}/>
```


## Supported output forms
- [WLXForm](frontend/Reference/Decorations/WLXForm.md)