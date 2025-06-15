---
sidebar_position: 1
---

:::info
A ready to-go example is in [this repository](https://github.com/JerryI/wljs-plugin-example-1)

__Option 1__:
Open `Settings` menu and paste 

```
https://github.com/JerryI/wljs-plugin-example-1
```

To the following box:

![](./../../../../Screenshot%202025-06-15%20at%2012.37.10.png)


__Option 2__:
Clone it to `<AppData>/wljs-notebook/wljs_packages` using:

```bash
git clone https://github.com/JerryI/wljs-plugin-example-1
```

Then restart WLJS Notebook and click `Update` in the launcher menu or click check updates from the *settings menu*.
:::

Here is the simples example on what you can do with extensions. Why not to add [ApexCharts](https://apexcharts.com/)? They looks beautiful and already animated. What we need

- Kernel package, which implements `ApexCharts[]` symbols
- Javascript bundle, which should include *ApexCharts* and bridge it with Wolfram Kernel using [WLJS Functions](frontend/Advanced/Frontend%20interpretation/WLJS%20Functions.md) 

__Summary__ what will be done
- package for *evaluation kernel*, which adds a new symbol `ApexCharts`
- Javascript module, which renders the content of `ApexCharts` expression

## Preparations
Use [wljs-plugin-template](https://github.com/JerryI/wljs-plugin-template) template and create a new repository or use a ready-to-go example given in the heading of this tutorial.

Then edit the content of `package.json`

```json title="package.json"
{
    "name": "wljs-plugin-example-1",
    "version": "0.0.1",
    "scripts": {
        "build": "node --max-old-space-size=8192 ./node_modules/.bin/rollup --config rollup.config.mjs"
    },
    "description": "An example plugin for WLJS Notebook. Library functions",
    "wljs-meta": {
        "kernel": [
            "src/Kernel.wl"
        ],
        "js": "dist/kernel.js",
        "minjs": "dist/kernel.min.js",
        "priority": 5000,
        "category": "Notebook Extensions"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/JerryI/wljs-plugin-example-1"
    },
    "dependencies": {
        "@rollup/plugin-commonjs": "^25.0.4",
        "@rollup/plugin-json": "^6.0.0",
        "@rollup/plugin-node-resolve": "^15.2.1",
        "@rollup/plugin-terser": "^0.4.4",
        "rollup": "^3.21.6"
    }
}
```

By the default a template implies, that we will use *rollup.js* for bundling. Run in the root directory of this package

```bash
npm i
```

And then install `apexcharts`

```bash
npm i apexcharts
```

## Kernel package
Create a new file in `src/Kernel.wl`, which is going to be our package for evaluation kernel. Looking at ApexCharts API, it is easy to imagine the way how it can be used

```mathematica
ApexCharts[<|
    "series" -> {44, 55, 67, 83},
    "labels" -> {"Apples", "Oranges", "Bananas", "Berries"},
    "chart" -> <|
        "height" -> 350, 
        "type" -> "radialBar"
    |>
|>]
```

or any other way, one can pre-transform the data and use intermediate symbols. Following the simplest path, we write to our Kernel file

```mathematica title="src/Kernel.wl"
BeginPackage["CoffeeLiqueur`Extensions`ApexCharts`"]

(* Public context *)

ApexCharts::usage = "ApexCharts[a_Association] constructor"

Begin["`Private`"]


End[]
EndPackage[]
```

We can put a few checks to ensure that input is an association

```mathematica
nonAssocHeadQ[_] = True
nonAssocHeadQ[_Association] = False

ApexCharts::notassoc = "Input is not an association"
ApexCharts[_?nonAssocHeadQ ] := (Message[ApexCharts::notassoc]; $Failed)
```

Now we can think about `ApexCharts` as if it was a new entity, and the interpretation of this entity will be our graphs. To draw actual graphs instead of a symbolic representation we need to define an output form. For that [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md) comes in hand, which is provided in ``CoffeeLiqueur`Extensions`Boxes` `` context

```mathematica
BeginPackage["CoffeeLiqueur`Extensions`ApexCharts`", {
    "CoffeeLiqueur`Extensions`Boxes`"
}]

(* Public context *)

...

(* Output forms *)

ApexCharts /: MakeBoxes[a: ApexCharts[_Association], StandardForm ] := With[{},
    ViewBox[a, a]
]
```

First `a` will be an underlying expression (behind the graph), while second `a` is going to be rendered instead of it. However, if you try to evaluate this with defined output form, you get a similar error

![](./../../../../Screenshot%202025-02-10%20at%2023.27.26.png)

[ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md) tries to execute the expression provided as the second argument in the browser, but `ApexCharts` does not exist there.

## Javascript Library
Now we need to implement `ApexCharts` on the frontend. The idea is simple: take the provided data and using Apex API render a graph on the given DOM element

```js title="src/kernel.js"
let ApexCharts;

core.ApexCharts = async (args, env) => {
    if (!ApexCharts) ApexCharts = (await import('apexcharts')).default; //lazy loading

    const options = await interpretate(args[0], env);
    const chart = new ApexCharts(env.element, options);
    chart.render();
}
```

Our association will be in `options` object after the interpretation. 

:::tip
Implement dynamic imports (lazy) if possible
:::

Now we need to bundle this

```bash
npm run build
```

After the restart, it should work with our extension like a charm

![](./../../../../radial-ezgif.com-optimize.gif)

However, after several evaluation dead instances of `ApexCharts` will pile up as a garbage in Javascript memory. It is recommended to properly remove them. For that we need to identify each instance of `ApexCharts` and assign destructor function

```js title="src/kernel.js"
let ApexCharts;

core.ApexCharts = async (args, env) => {
    if (!ApexCharts) ApexCharts = (await import('apexcharts')).default; //lazy loading

    const options = await interpretate(args[0], env);
    const chart = new ApexCharts(env.element, options);
    chart.render();

    env.local.chart = chart;
}

core.ApexCharts.destroy = (args, env) => {
    env.local.chart.destroy();
} 

core.ApexCharts.virtual = true
```

Now we need to bundle this

```bash
npm run build
```

After the restart it should work with our extension like a charm

![](./../../../../radial-ezgif.com-optimize.gif)


## Polishing
We might do a few more tweaks. If our `ApexCharts` expression becomes too big, it might slow down the editor. For that reason we use [Frontend Objects](frontend/Advanced/Frontend%20interpretation/Frontend%20Objects.md)

```mathematica
BeginPackage["CoffeeLiqueur`Extensions`ApexCharts`", {
    "CoffeeLiqueur`Extensions`Boxes`",
    "CoffeeLiqueur`Extensions`FrontendObject`"
}]

(* Public context *)
```

```mathematica
ApexCharts /: MakeBoxes[a: ApexCharts[_Association], form: StandardForm ] := With[{o = CreateFrontEndObject[a]},
    MakeBoxes[o, form]
] /; ByteCount[a] > 1024*4 
```

Frontend objects has a special predefined StandardForm (and WLXForm), where it uses a reference to a Wolfram Expression stored separately.

Another improvement can be [WLXForm](frontend/Reference/Formatting/WLXForm.md), if we decide to use those charts on [Slides](frontend/Cell%20types/Slides.md) 

```mathematica
ApexCharts /: MakeBoxes[a: ApexCharts[_Association], form: WLXForm ] := With[{o = CreateFrontEndObject[a]},
    MakeBoxes[o, form]
]
```


:::tip
Full source code can be found in [this repository](https://github.com/JerryI/wljs-plugin-example-1)
:::