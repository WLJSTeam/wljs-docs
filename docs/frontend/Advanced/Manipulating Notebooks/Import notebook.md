You can treat notebooks as sort of modules with its own isolated context. It might come handy, if you don't want to create a library, but still like to reuse some functions or templates from the other notebook.

We have registered a special importer `"WLN"` for that reason 

```mathematica
Import[path_String, "WLN"] _Promise
```

What it does?

1. Evaluate all initialization cells in the isolated context (**can be any kind of cell**)
2. Evaluate the last input cell in the notebook and return the result (**must be wolfram language cell**)

Since it involves breaking the order of evaluation, `Import` will return `Promise`, that you would need to resolve

```mathematica
Then[Import[
  "path_to_my_notebook.wln",
  "WLN"
], Function[result,
	(* do something with the result *)
]];
```

## Example
Let's make a notebook with WLX template, that you would like to reuse in other presentation notebooks

1. Create a regular notebook with any structure you like
2. Create a cell with our template (no need in evaluation)

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

3. Make it `initialization cell`
4. Create a last single input cell

```mathematica
MakeTitle
```

This will basically "return" generated symbol from our notebook.

5. Save you notebook as `template.wln`

Now, it's time to test it!

1. In your new notebook import the defined template

```mathematica
Then[Import[
  "template.wln",
  "WLN"
], Function[result,
	BigTitle = result;
]];
```

2. Use it in the desired context

```md
.slide
 
<!-- .slide: class="text-left h-full" style="height:100%" -->  
  
<BigTitle>$Fe_x Zn_{2-x} Mo_3 O_8$ is a platform for</BigTitle>

Content goes...
Content goes...
Content goes...
```

![](./../../../Screenshot%202025-04-24%20at%2017.36.27.png)

It does not have to be WLX template, it can be anything: regular Wolfram Expressions, dynamic content, module, a library and etc.

## Benefits
- You can place tests, documentation in the same single file
- Fully lexically isolated
- Easier to deal with compared to Wolfram Packages
- Technically supports mixed content (Javascript code, HTML, WL)