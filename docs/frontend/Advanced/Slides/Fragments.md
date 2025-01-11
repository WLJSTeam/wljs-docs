This allows to reveal, remove or highlight some objects on a slide using built-in [animation framework of RevealJS](https://revealjs.com/fragments/).

For example

```md
.slide

# Fragments example

This will be here all the time

<span style="color:red">Appears later</span> <!-- .element: class="fragment" data-fragment-index="1" -->

And this one <!-- .element: class="fragment fade-up" data-fragment-index="2" -->
```

:::info
A selector `.element` is applied to a single Markdown line, or a single HTML or WLX tag
:::

## Animation types
Here is the list of available classes

|Name|Effect|
|---|---|
|fade-out|Start visible, fade out|
|fade-up|Slide up while fading in|
|fade-down|Slide down while fading in|
|fade-left|Slide left while fading in|
|fade-right|Slide right while fading in|
|fade-in-then-out|Fades in, then out on the next step|
|current-visible|Fades in, then out on the next step|
|fade-in-then-semi-out|Fades in, then to 50% on the next step|
|grow|Scale up|
|semi-fade-out|Fade out to 50%|
|shrink|Scale down|
|strike|Strike through|
|highlight-red|Turn text red|
|highlight-green|Turn text green|
|highlight-blue|Turn text blue|
|highlight-current-red|Turn text red, then back to original on next step|
|highlight-current-green|Turn text green, then back to original on next step|
|highlight-current-blue|Turn text blue, then back to original on next step|


## Custom Fragments
Following the [original guide](https://revealjs.com/fragments/) we can craft our own effects. For example for blur effect one can do it in two cells

```jsx title="cell 1"
.wlx

<style>
  .fragment.blur {
    filter: blur(5px);
  }
  .fragment.blur.visible {
    filter: none;
  }
</style>
```

```md title="cell 2"
.slide

# Example

A sample line <!-- .element: class="fragment blur" data-fragment-index="1" -->
```


### Replacing transition
What if you need to replace one content with another one? There is no built-in feature, but we can use HTML and two fading fragments. For example

```markdown
.slide

# The Art of Material Parameters

<div class="text-left">

Optics is a great tool to describe static and dynamic properties of the medium such as $\\sigma$ (or $\\alpha$), $n$ and their derivatives

</div>

<div>

$$
\\begin{align*}
\\mathbf{E}(t,x) &= \\sum_{\\omega} \\mathbf{E}_0^{\\omega} ~ exp\\Big( i\\omega t - \\frac{i\\hat{n}(\\omega) \\omega x}{c}\\Big) \\\\
&= \\sum\\mathbf{E}_0^{\\omega} \\colorbox{white}{$exp(-\\frac{\\alpha x}{2})$} ~exp\\Big(i\\omega t - \\frac{i n \\omega x}{c}\\Big)
\\end{align*}
$$ <!-- .element: class="fragment fade-in-then-out absolute" data-fragment-index="1" -->

$$
\\begin{align*}
\\mathbf{E}(t,x) &= \\sum_{\\omega} \\mathbf{E}_0^{\\omega} ~ exp\\Big( i\\omega t - \\frac{i\\hat{n}(\\omega) \\omega x}{c}\\Big) \\\\
&= \\sum\\mathbf{E}_0^{\\omega} \\colorbox{yellow}{$exp(-\\frac{\\alpha x}{2})$} ~exp\\Big(i\\omega t - \\frac{i n \\omega x}{c}\\Big)
\\end{align*}
$$ <!-- .element: class="fragment absolute" data-fragment-index="2" -->


</div>
```

Here we positioned the container relatively (normal way), while both children has `absolute` class set. It makes them overlay each other and stay aligned. Then the transition kicks in, it hides the first one and reveals the second.