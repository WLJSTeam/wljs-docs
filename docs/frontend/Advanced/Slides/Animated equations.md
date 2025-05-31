We use separate engine to animate TeX equations more efficiently. This subsystem is integrated with [Fragments](frontend/Advanced/Slides/Fragments.md), you can combine both if needed.

> This particular technique was developed by [Cian Luke Martin](https://www.cianlm.dev/), which is basically a post-processing engine for SVGs generated from LaTeX equations


import testVideo from './../../../aniamtedLatex.mov';

<video width={"100%"} controls>
  <source src={testVideo}/>
</video>

The minimal example

```tex
.slide

## Animated LaTeX

$$
\\begin{align*}
\\mathbf{E}(t,x) &= \\sum_{\\omega} \\mathbf{E}_0^{\\omega} ~ exp\\Big( i\\omega t - \\frac{i\\hat{n}(\\omega) \\omega x}{c}\\Big) \\\\ &= \\sum\\mathbf{E}_0^{\\omega} \\colorbox{white}{$exp(-\\frac{\\alpha x}{2})$} ~exp\\Big(i\\omega t - \\frac{i n \\omega x}{c}\\Big)
\\end{align*}
$$ <!-- .element: data-eq-speed="0.1" -->
```

:::info
The animation will be applied only if at least one of those attributes is defined

- `data-eq-speed`
- `data-eq-gradient`
- `data-eq-color-precess`
- `data-eq-delay`
- `data-eq-static` (bypass the animation)
:::

:::note
__MathJax__ is used for producing animated equation instead of a default engine __KaTeX__. Consider this when writing your equations, there might be some differences in available TeX packages and etc.
:::

## Options
*source  [Github](https://github.com/CianLM/reveal-animated-latex)*
### Animation Speed (`data-eq-speed`)
The increment of time (in seconds) between each stroke

```tex
.slide

## Animated LaTeX

$$
m a = F
$$ <!-- .element: data-eq-speed="0.7" -->

$$
m a = F
$$ <!-- .element: data-eq-speed="0.1" -->
```

### Color/Color Gradient (`data-eq-gradient`)
Any number of colors n≥1 is accepted (as well as rgb/hex values)

```tex
.slide

## Animated LaTeX

$$
m a = F
$$ <!-- .element: data-eq-gradient="['red', 'gold']" -->
```

### Color Precession (`data-eq-color-precess`)
The gradient precesses in a loop

```tex
.slide

## Animated LaTeX

$$
m a = F
$$ <!-- .element: data-eq-gradient="['red', 'gold']" data-eq-color-precess="true" -->
```

### Bypass the animation (`data-eq-static`)
It is used to skip animation, but still use Mathjax for rendering instead of standard KaTeX. It can be used for unifying the look of all equation.

```
data-eq-static="true"
```

## Fragments
One can also combine it with [Fragments](frontend/Advanced/Slides/Fragments.md) in the usual way. The only condition is `fragment` class has to be at the same `.element` selector as options for animating

```tex
.slide

## Animated LaTeX

$$
m a = m g
$$ <!-- .element: class="fragment" data-eq-speed="0.3" -->

$$
m a = m g + F_{ext}
$$ <!-- .element: class="fragment" data-eq-speed="0.3" -->
```



