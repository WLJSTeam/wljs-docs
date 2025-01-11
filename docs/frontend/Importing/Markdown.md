__Turn plain Markdown to WLJS Notebook__

Once exported to a `.md` file - [Markdown](frontend/Exporting/Markdown.md), a notebook can be __converted back to a normal notebook__ once opened using WLJS Notebook app. Place `.md` file to the project folder and open it. 

For example here is a Markdown note with a mixture Javascript and WL

````markdown title="Test.md"
# Connecting external Javascript library 
## How to make interactive 3D Force-Directed Graphs

There is an amazing [Javascript library](https://github.com/vasturiano/3d-force-graph) for building 3D force graphs using THREE.js. 

We can build it into a standlone module for our notebooks using ESM cells. But firstly, lets fetch this library using NPM
```sh
npm i 3d-force-graph
```
Now define our function. WLJS Notebook has a system of shared Javascript libraries, which already provides some of the dependencies.
```esm
import ForceGraph3D from '3d-force-graph';

core.ForceGraph3D = async (args, env) => { 
  //load shared library from WLJS Notebook store
  await interpretate.shared.SpriteText.load();
  //interprete input data
  const data = await interpretate(args[0], env);

  const SpriteText = interpretate.shared.SpriteText.SpriteText;
  const opts = await core._getRules(args, env);

  // Build labels mapping
  const labels = (opts.VertexLabels || []).reduce((acc, { lhs, rhs }) => {
    acc[lhs] = rhs;
    return acc;
  }, {});

  // Collect node IDs and construct links
  const nodeIds = new Set();
  const links = data.map(({ lhs, rhs }) => {
    nodeIds.add(lhs);
    nodeIds.add(rhs);
    return { source: String(rhs), target: String(lhs) };
  });

  // Create nodes with labels
  const nodes = Array.from(nodeIds).map(id => ({
    id: String(id),
    label: labels[id] || String(id),
  }));

  let imageSize = (opts.ImageSize) || 350;

  if (!Array.isArray(imageSize)) {
    imageSize = [imageSize, imageSize * 0.7];
  }

  // Initialize the 3D force graph
  const Graph = ForceGraph3D({})(env.element)
    .width(imageSize[0])
    .height(imageSize[1])
    .cooldownTicks(100)
    .graphData({ nodes, links })
    .nodeThreeObject(node => {
      const sprite = new SpriteText(node.label);
      sprite.material.depthWrite = true; // Make sprite background transparent
      sprite.color = 'white';
      sprite.textHeight = 12;
      return sprite;
    })
    .nodeThreeObjectExtend(false);

  // Apply optional charge strength
  if ('Charge' in opts) {
    Graph.d3Force('charge').strength(opts.Charge);
  }

  Graph.onEngineStop(() => Graph.zoomToFit(400));

  env.local.Graph = Graph;
};

core.ForceGraph3D.destroy = () => {
  console.warn('3D graph was removed');
}

//make each instance unique
core.ForceGraph3D.virtual = true  
```
Note, ==you don't need to compile and reevaluate the cell above== an invisible output cell stores JS module in this notebook.

Now we need to register this symbol in Wolfram Language
```wolfram
ForceGraph3D /: MakeBoxes[f_ForceGraph3D, StandardForm] := With[{
  
  o = CreateFrontEndObject[f] 
},
  
  ViewBox[o, o]
]
```
## Testing
Let us make a simple graph
```wolfram
ForceGraph3D[{
  1->2, 2->3, 3->4, 4->2, 3->5
}, "VertexLabels"->{1->"one", 4->"four", 5->"five"}, ImageSize->500]
```
Try to drag around the nodes.

More nodes!
```wolfram
words = DictionaryLookup["pea*"];
Flatten[Map[(Thread[# -> 
       DeleteCases[Nearest[words, #, 3], #]]) &, words]];

ForceGraph3D[%, ImageSize->500]
```
````

All code cells will be converted to [Input cell](frontend/Cell%20types/Input%20cell.md), while plain text will be turned into [Markdown](frontend/Cell%20types/Markdown.md) cells with hidden input. 

Let's open this in WLJS Notebook 

![](./../../Screenshot%202024-12-19%20at%2019.21.16.png)

