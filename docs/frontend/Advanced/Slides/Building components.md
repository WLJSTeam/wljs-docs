---
draft: false
sidebar_position: 1
---
# Components

:::info
See the collection of components in the [Components library](frontend/Advanced/Components%20library/QR%20Code.md)
:::

Creating presentations is a repetitive process. It is quite common to have some elements shared between different slides.

To overcome this small issue, one can use the [WLX](frontend/Cell%20types/WLX.md) language to define a heading, for instance:

```jsx
.wlx
Heading[OptionsPattern[]] := With[{Title = OptionValue["Title"]},
  <dummy>
    <h1><Title/></h1>
    Some repetitive text you need
  </dummy>
] 

Options[Heading] = {"Title" -> "Nope"}
```

:::tip
[WLX](frontend/Cell%20types/WLX.md) always requires a single parent element if you define a function using XML tags. Use `<dummy>` or `<div>` to wrap them.
:::

You can then use it on your slides as if it were a normal tag:

```jsx
.slide

<Heading title={"Some title"}/>

<br/><br/>

The actual content

Maybe some equations $m \\mathbf{a} = \\mathbf{F}$
```

Unfortunately, it is tricky to use standard Markdown inside components, because it requires carriage returns between XML/HTML and Markdown tags, which are trimmed by default. However, for equations, it still works:

```jsx
.wlx

Heading[OptionsPattern[]] := With[{Title = OptionValue["Title"]},
  <dummy>
    <h1><Title/></h1>
    Some repetitive text you need
    Here is a random equation $x^2 + y^2 + z^2 = r^2$
  </dummy>
] 

Options[Heading] = {"Title" -> "Nope"}
```

## Decorators

Decorators with [WLXForm](frontend/Reference/Formatting/WLXForm.md), such as [Row](frontend/Reference/Formatting/Row) and [Column](frontend/Reference/Formatting/Column.md), can be used on slides natively. [ManipulatePlot](frontend/Reference/Plotting%20Functions/ManipulatePlot.md) is also a combination of those, which makes it possible to output it directly without using [EditorView](frontend/Reference/GUI/EditorView.md).

```mathematica title="cell 1"
Figure = Plot[x, {x, 0, 1}];
Editor = EditorView["Plot[x, {x, 0, 1}] -> "];
```

```html title="cell 2"
.slide

<Row>
	<Editor/>
	<Figure/>
</Row>
```

![](./../../../Screenshot%202024-09-25%20at%2015.37.02.png)

## Layout Helpers

This is a common case where components come in handy. Imagine a typical situation where we need to organize columns in a presentation:

```jsx
.wlx

Columns[cols__] := With[{width = 99 / (List[cols] // Length) // Floor},

  With[{Layout = Table[
    <div style="width: {width}%">
      <Col/>
    </div>  
   , {Col, List[cols]}]
  },

    <div style="display:flex">
      <Layout/> 
    </div>
  ]
  
]
```

Here we first calculate the width of each column based on their number, and then use standard HTML with CSS to style them.

Since the input argument is not typed, you can use nested tags or WL expressions as content for each column. Here's one of the slides from [@JerryI](https://github.com/JerryI)'s presentation at a recent 2023 talk:

```jsx
.slide

# Different ways of calculating properties for magnetic materials

<br/><br/>

<Columns>
  <p style="text-align:left">

## DFT+U
DFT with Coulomb repulsion between sites allows modeling of localized magnetic moments
    
- lacks ~1 cm$^{-1}$ accuracy
- slow and time-consuming
- hard to control intermediate steps
- feels like working with a "black box"
    
  </p>
  <p style="text-align:left">

## Effective Hamiltonians
Spin Hamiltonian, Heisenberg, etc... randomly picked
    
- not consistent (completely different from compound to compound)
- overparameterized
    
  </p>
  <p style="text-align:left">

## Microscopic theory <!-- .element: class="fragment highlight-red" data-fragment-index="1" -->
Builds energy levels step-by-step from the isolated ion, considering crystal structure and interactions <!-- .element: class="fragment highlight-red" data-fragment-index="1" -->
    
- considered outdated
- ~~requires a lot of calculations~~
- hard to treat collective excitations

<span style="color:red">Use Computer Algebra!</span> <!-- .element: class="fragment" data-fragment-index="1" -->
    
  </p>
</Columns>
```

As you can see, this is again a mixture of HTML/XML and Markdown. Each tag inside `<Columns>` is treated as a separate argument.

But nothing stops you from using plain text:

```jsx
.slide

<Columns>

# Title
First column
  
<Identity>

# Other title
Second one
    
</Identity>

</Columns>
```

:::info
`Identity`, `dummy`, `p`, or `div` help WLX differentiate between the first and second arguments. It's similar to how the `li` tag is used in the `ul` HTML tag for lists.
:::

You can use the full power of modern CSS to style it however you like.
