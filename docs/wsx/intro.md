---
sidebar_position: 1
---

# A subset of Wolfram Language
Smearing out the border between Markup Language and Meta Expressions

## Simple rules

### HTML Tag or WL Expression?
This is rather simple

*html tag*
```jsx
<div></div>
```

*WL expression*
```jsx
<Div></Div>
```

There is no `html/xml` tag, that starts for the capital letter.

:::info
A tag name starting __from Capital letter__ refers to Wolfram Language expression
:::

### OwnValues and SubValues
Thankfully HTML/XML tag syntax allows to make it clear, where the own-values or sub-values of a given are called.

*from*
```mathematica
MySymbol[1]
```
*to*
```jsx
<MySymbol><1/></MySymbol>
```

:::info
Child element is a first argument of a function
:::

*from*
```mathematica
MySymbol
```
*to*
```jsx
<MySymbol/>
```

## Passing arguments

*from*
```mathematica
TextString[Now]
```
*to*
```jsx
<TextString><Now/></TextString>
```

Interconnection between components

*from*
```mathematica
Block[{value = data},
	MySymbol
]
```
*to*
```jsx
<MySymbol value={data} />
```

Attribute to the HTML element

*from*
```mathematica
StringTemplate["<div class=\"``\"></div>"][className]
```
*to*
```jsx
<div class="{className}"></div>
```


static properties are untouched. remains the same HTML unlike in JSX
```jsx
<div style="background-color: red"></div>
```


### Components

```jsx
Logo = Import["c.wsx"];
Header = Import["c.wsx"];

<Header>
	<Logo title={"WSX is awesome"}/>
</Header>
```


### Defining function
```jsx
TOC := Table[
	<li></li>
]

<ul>
	<TOC/>
</ul>
```

### Branching
HTML is a markcup language, therfore there is no way of doing branching in proper way.