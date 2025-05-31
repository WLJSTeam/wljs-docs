# Markdown

__Turn plain Markdown into a WLJS Notebook__

Once exported to a `.md` file using [Markdown](frontend/Exporting/Markdown.md), a notebook can be __converted back into a regular notebook__ when opened in the WLJS Notebook app. Simply place the `.md` file in your project folder and open it.

For example, here’s a Markdown note that mixes JavaScript and Wolfram Language:

````markdown title="Test.md"
# Connecting External JavaScript Library
## How to Make Interactive 3D Force-Directed Graphs

There is an amazing [JavaScript library](https://github.com/vasturiano/3d-force-graph) for building 3D force-directed graphs using THREE.js.

We can build it into a standalone module for our notebooks using ESM cells. But first, let's fetch this library using NPM:

```sh
npm i 3d-force-graph
```

Now define our function. WLJS Notebook has a system of shared JavaScript libraries, which already includes some dependencies.

```esm
import ForceGraph3D from '3d-force-graph';

core.ForceGraph3D = async (args, env) => {
  await interpretate.shared.SpriteText.load();
  const data = await interpretate(args[0], env);

  const SpriteText = interpretate.shared.SpriteText.SpriteText;
  const opts = await core._getRules(args, env);

  const labels = (opts.VertexLabels || []).reduce((acc, { lhs, rhs }) => {
    acc[lhs] = rhs;
    return acc;
  }, {});

  const nodeIds = new Set();
  const links = data.map(({ lhs, rhs }) => {
    nodeIds.add(lhs);
    nodeIds.add(rhs);
    return { source: String(rhs), target: String(lhs) };
  });

  const nodes = Array.from(nodeIds).map(id => ({
    id: String(id),
    label: labels[id] || String(id),
  }));

  let imageSize = opts.ImageSize || 350;
  if (!Array.isArray(imageSize)) {
    imageSize = [imageSize, imageSize * 0.7];
  }

  const Graph = ForceGraph3D({})(env.element)
    .width(imageSize[0])
    .height(imageSize[1])
    .cooldownTicks(100)
    .graphData({ nodes, links })
    .nodeThreeObject(node => {
      const sprite = new SpriteText(node.label);
      sprite.material.depthWrite = true;
      sprite.color = 'white';
      sprite.textHeight = 12;
      return sprite;
    })
    .nodeThreeObjectExtend(false);

  if ('Charge' in opts) {
    Graph.d3Force('charge').strength(opts.Charge);
  }

  Graph.onEngineStop(() => Graph.zoomToFit(400));

  env.local.Graph = Graph;
};

core.ForceGraph3D.destroy = () => {
  console.warn('3D graph was removed');
};

core.ForceGraph3D.virtual = true;
```

Note: ==You don’t need to recompile or reevaluate the cell above== — an invisible output cell stores the JS module within the notebook.

Now we need to register this symbol in Wolfram Language:

```wolfram
ForceGraph3D /: MakeBoxes[f_ForceGraph3D, StandardForm] := With[{
  o = CreateFrontEndObject[f]
},
  ViewBox[o, o]
]
```

## Testing
Let’s create a simple graph:

```wolfram
ForceGraph3D[{
  1 -> 2, 2 -> 3, 3 -> 4, 4 -> 2, 3 -> 5
}, "VertexLabels" -> {1 -> "one", 4 -> "four", 5 -> "five"}, ImageSize -> 500]
```

Try dragging the nodes around.

More nodes!

```wolfram
words = DictionaryLookup["pea*"];
Flatten[Map[(Thread[# -> DeleteCases[Nearest[words, #, 3], #]]) &, words]];

ForceGraph3D[%, ImageSize -> 500]
```
````

All code cells will be converted to [Input cells](frontend/Cell%20types/Input%20cell.md), while plain text will be turned into [Markdown](frontend/Cell%20types/Markdown.md) cells with hidden input.

Let’s open this in WLJS Notebook:

![](./../../Screenshot%202024-12-19%20at%2019.21.16.png)


