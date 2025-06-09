---
draft: false
---
The most basics styling

## Global settings
One can set a global style applied for all slides in your notebook. You need to use [HTML](frontend/Cell%20types/HTML.md) or [WLX](frontend/Cell%20types/WLX.md) cels for it and redefine `.reveal` class

```html title="cell 1"
.wlx

<style>
  .reveal {
    font-family: Arial;
  }
</style>
```

now the default font will be `Arial`

```jsx title="cell 2"
.slide

# Hey, I am Arial!
```

There are similar classes for the standard elements such as `p`, `li`, `img`, headings `h1`, `h2` and etc

```css
.reveal h1
.reveal h2
...
.reveal ul
.reveal ol
.reveal img
.reveal p
```

## Local
One can do the same with an individual slide by wrapping the text into HTML or [WLX](frontend/Cell%20types/WLX.md) tags

```jsx
.slide

<div style="font-family: Arial">

# Title, I am Arial

</div>

I am not Arial
```

:::warning
In order to mix Markdown with HTML or [WLX](frontend/Cell%20types/WLX.md) correctly, remove white spaces from the beginning markdown, i.e.

```html
.slide

<div>
	# It wont work
</div>
```

but instead

```html
.slide

<div>

# It will work

</div>
```


:::

Or one can define a class for it early

```html title="cell 1"
.wlx

<style>
  .specialClass {
    font-family: Arial;
  }
</style>
```

```jsx title="cell 2"
.slide

<div class="specialClass">

# Title, I am Arial

</div>

I am not Arial
```

### Using data attributes
It might come handy to use RevealJS styling option for individual elements instead of writing plain XML

```jsx
.slide

<!-- .slide: data-background-color="black" -->


# Hey, I am white <!-- .element: style="color:white" -->

# Hey, I am red <!-- .element: style="color:red" -->
```

Here `slide` is applied to an entire slide, while `element` is localized to the last markdown element.

## Misc



### Align things on a slide
There are many ways on how to do that, here is one of the examples

#### Standard slide
To use PPT-like layout: __text left__, __content height 100%__ use a shortcut with a special class predefined in WLJS Notebook

```markdown
.slide

<!-- .slide: class="slide-standard" -->

# Title

Content
```

#### Local style
Define your own class inside slide or outside in [HTML](frontend/Cell%20types/HTML.md) cell for example

```md
.slide

<style>
  .center-x{
    margin-left:auto; 
    margin-right:auto;
    margin-top: 2rem;
    border: none; 
    border-radius: 4px
  }
</style>

## Programming Languages
### Wolfram Language

<iframe class="center-x" width="800" height="500" src="https://www.wolfram.com"/>

```

#### Inline styles
The same as before, but explicitly as `style` attribute

```md
...

<iframe style="margin-left: auto; margin-right:auto" width="800" height="500" src="https://www.wolfram.com"/>
```

#### Tailwind utility classes
The same as before, but explicitly as `class` attribute

```md
...

<iframe class="mr-auto ml-auto" width="800" height="500" src="https://www.wolfram.com"/>
```


### Collapse / Expand section
Use native HTML5 tag for it

```md
.slide

# Title

<details>
<summary>Hidden section</summary>

## Subtitle

</details>
```

![](./../../../Screenshot%202024-09-03%20at%2009.16.28.png)

### Scroll bar
If the content is too large, but you still want to keep it on a single slide, one can tune the settings for a slide element

```md
.slide

<!-- .slide: style="height:100%; overflow-y:scroll" -->

...large content goes

```

### Align content

```md
.slide

<!-- .slide: style="text-align:left" -->

# Heading

Some text

```