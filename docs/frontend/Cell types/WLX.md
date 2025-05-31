

> Type `.wlx` in the first line of an input cell

This allows you to use [Wolfram Language XML](https://jerryi.github.io/wlx-docs/docs/Reference/WLX/) in your cell. It's especially useful when creating complex cell structures or enhancing them with the power of HTML, CSS, and JavaScript.

## Embed Figures into a Custom Layout
Plot a figure into a symbol **starting with a capital letter**:

```mathematica
Figure = Plot[Sinc[5x], {x, -5, 5}]
```

Then, in a new cell, type:

```jsx
.wlx

<div>
  <style>
    @keyframes tilt-shaking {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(5deg); }
      50% { transform: rotate(0deg); }
      75% { transform: rotate(-5deg); }
      100% { transform: rotate(0deg); }
    }
  </style>
  <div style="animation: tilt-shaking 0.35s infinite">
    <Figure/>
  </div>
</div>
```

Now your plot will shake infinitely! ;)

## Creating Components
Let's define a hybrid WL function:

```jsx
.wlx

Heading[Text_, OptionPattern[]] := With[{color = OptionValue["Color"]},
  <h2 style="color: {color}"><Text/></h2>;
]

Options[Heading] = {"Color" -> "black"}
```

You can now use it in your layout:

```jsx
.wlx

<Heading Color={"blue"}>
  Hello World!
</Heading>
```

:::tip
Leverage the power of WLX when making [Slides](frontend/Cell%20types/Slides.md).
:::

All WL expressions **are accessible from within WLX**:

```jsx
.wlx

GetTime := TextString[Now]

<GetTime/>
```

## Two-Column Layout Using Flexbox
You can fine-tune the layout since you're working directly with HTML and CSS. For example, here's a slider and a plot aligned in a row:

```jsx
.wlx

Module[{Slider = InputRange[0.1, 1, 0.1, 0.5], Figure, lines},
  EventHandler[Slider, Function[data, lines = {#, Sinc[#/data]} & /@ Range[-5, 5, 0.1]]];
  Slider // EventFire;

  Figure = Graphics[Line[lines // Offload], ImageSize -> 350];

  <div style="display: flex">
    <div><Slider/></div>
    <div><Figure/></div>
  </div>
]
```

![](./../../WLXwidget-ezgif.com-video-to-apng-converter.png)
