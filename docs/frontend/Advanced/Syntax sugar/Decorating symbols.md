Giving a rich visual representation to a symbol while programming elevates the whole user experience to another level. There are a couple of ways to do this in the WLJS Notebook.

:::info
Read about syntax sugar in [Symbolic programming](frontend/Symbolic%20programming.md).
:::

## Temporal
You can replace a symbol with an icon by applying [Interpretation](frontend/Reference/Formatting/Interpretation.md). After the first evaluation, the representation is lost and the true expression is revealed:

```mathematica
Interpretation[Graphics[Circle[], ImageSize->{20,20}, ImagePadding->None], 1]
```

The result is a circle symbol, which can be copied multiple times in any cell.

![](./../../../Screenshot%202024-05-02%20at%2023.06.10.png)

:::note
The decoration itself does not modify the original expression. You can check this by pasting the result into any text editor:

```mathematica
(*VB[*)(1)(*,*)(*"1:eJxTTM..."*)(*]VB*)  - 1 
```
:::

### Examples in action
A navigation gizmo [snippet](frontend/Command%20palette.md) is made using this technique combined with dynamically generated symbols wrapped in [Offload](frontend/Reference/Interpreter/Offload.md).

<details>

![](./../../../Screen%20Recording%20Apr%208%20(3).gif)

</details>

### Using JavaScript
You can use the full power of the web to decorate your symbols. For example, create a [JavaScript](frontend/Cell%20types/Javascript.md) cell with the following content:

```js
core.SmileyDecorator = async (args, env) => {
  const canvas = document.createElement('canvas');
  canvas.width = 50;
  canvas.height = 50;
  const ctx = canvas.getContext('2d');

  // Draw a smiley face
  ctx.beginPath();
  ctx.arc(25, 25, 20, 0, Math.PI * 2, true); // Outer circle
  ctx.moveTo(35, 25);
  ctx.arc(25, 25, 8, 0, Math.PI, false);  // Mouth
  ctx.moveTo(22, 20);
  ctx.arc(20, 20, 2, 0, Math.PI * 2, true);  // Left eye
  ctx.moveTo(32, 20);
  ctx.arc(30, 20, 2, 0, Math.PI * 2, true);  // Right eye
  ctx.stroke();

  env.element.appendChild(canvas);
}
```

This function appends a canvas with an image to the provided element. To force the Wolfram Kernel to execute this symbol on [the frontend](frontend/Advanced/Frontend%20interpretation/WLJS%20Functions.md), use [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md):

```mathematica title="test"
SmileyDecorator /: MakeBoxes[s_SmileyDecorator, StandardForm] := With[{},
  ViewBox[s, s]
]

SmileyDecorator[]
```

![](./../../../Screenshot%202024-11-29%20at%2017.50.43.png)

Now we can apply a similar trick:

```mathematica
Interpretation[SmileyDecorator[], 1]
```

![](./../../../Screenshot%202024-11-29%20at%2017.51.06.png)

### Magic joystick
We can hide all event bindings from the user by providing a symbol that can be used in dynamic expressions:

```mathematica
createDynamic2DSymbol[] := Module[{symbol = {0,0}}, With[{
  eventObject = InputJoystick[],
  helper = InputJoystick`IntegrationHelper[][Function[xy, symbol = xy]]
},
  EventHandler[eventObject, helper];
  Interpretation[eventObject, Offload[symbol]]
]]
```

You can create an instance by evaluating the following in a new cell:

```mathematica
createDynamic2DSymbol[]
```

This outputs a joystick:

![](./../../../Screenshot%202024-05-04%20at%2013.17.33.png)

Now cut and paste it into the cell below:

```mathematica
Plot[Sin[x], {x, -5Pi, 5Pi}, Epilog->{
  Disk[ (* paste it here *), 0.5]
}]
```

Once evaluated, you'll get a controllable [Disk](frontend/Reference/Graphics/Disk.md) using the joystick inside the input cell:

![](./../../../Dragdjoy%20GIF%20speed.gif)

*A slightly more optimized version follows...*

<details>

Here, we do not spawn an additional wrapper widget. The result is the same but with less overhead on the editor:

```mathematica
createDynamic2DSymbol[] := Module[{symbol = {0,0}}, With[{
  eventObject = InputJoystick[],
  helper = InputJoystick`IntegrationHelper[][Function[xy, symbol = xy]]
},
  EventHandler[eventObject, helper];
  With[{display = eventObject[[1]]["View"] // CreateFrontEndObject},
    Interpretation[display, Offload[symbol]]
  ]
]]
```

Why? See the reference on [Interpretation](frontend/Reference/Formatting/Interpretation.md).

</details>

## Permanent
In this approach, [RGBColor](frontend/Reference/Graphics/RGBColor.md), most mathematical equations, [Graphics](frontend/Reference/Graphics/Graphics.md), and other visual syntactic sugars are implemented. For example:

```mathematica
Now
Red
```

![](./../../../Screenshot%202024-05-04%20at%2013.51.35.png)

### InterpretationBox
This is a low-level symbol used by [Interpretation](frontend/Reference/Formatting/Interpretation.md). However, we can make a permanent version from temporal decoration by defining [MakeBoxes](frontend/Reference/Formatting/MakeBoxes.md) for [StandardForm](frontend/Reference/Formatting/StandardForm.md).

**Advantages ✅**
- High-level, accepts anything as a display expression
- **Compatible with Mathematica**

**Drawbacks ❌**
- Slightly heavier than [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md); in fact, a wrapper around it
- Cannot use JavaScript decorators

**Neutral 💭**
- Immutable
- Preserves the original expression in the cell

#### Basic example

```mathematica
boxObject[_Real]
```

Let's decorate it:

```mathematica
boxObject /: MakeBoxes[boxObject[s_], form: StandardForm] := With[{
  g = Graphics[{Blue, Disk[{0,0},1], Opacity[0.5], Red, Disk[{0,0},s]}, ImageSize->80, Controls->False, ImagePadding->None]
},
  InterpretationBox[MakeBoxes[g, form], boxObject[s]]
]
```

Test it:

```mathematica
boxObject[3.2]
```

#### Morse code
Let's create syntax sugar for Morse code. Our special symbol will be:

```mathematica
morse[code_String]
```

Define conversion rules:

```mathematica
morseTable = {"a" -> ".- ", "b" -> "-... ", "c" -> "-.-. ", 
  "d" -> "-.. ", "e" -> ". ", "f" -> "..-. ", "g" -> "--. ", 
  "h" -> ".... ", "i" -> ".. ", "j" -> ".--- ", "k" -> "-.- ", 
  "l" -> ".-.. ", "m" -> "-- ", "n" -> "-. ", "o" -> "--- ", 
  "p" -> ".--. ", "q" -> "--.- ", "r" -> ".-. ", "s" -> "... ", 
  "t" -> "- ", "u" -> "..- ", "v" -> "...- ", "w" -> ".-- ", 
  "x" -> "-..- ", "y" -> "-.-- ", "z" -> "--.. ", " " -> "/ "};

ToMorseCode[text_String] := StringReplace[ToLowerCase[text], morseTable];

morse /: TextString[morse[s_String]] := s;
```

Now create boxes for it:

```mathematica
morse /: MakeBoxes[m: morse[s_], f:StandardForm] := With[{
  code = ToMorseCode[s]
},
  InterpretationBox[MakeBoxes[Style[code, 18, Italic], f], m]
]
```

Test it:

```mathematica
morse["SOS"]
```

![](./../../../Screenshot%202024-05-03%20at%2022.31.12.png)

Back transformation is possible because the original expression is preserved:

![](./../../../Screenshot%202024-05-03%20at%2022.32.11.png)

Finally, make it audible:

```mathematica
silence = Table[0, {t,0,40Pi,0.1}];
dot = Table[Sin[5 t], {t,0,40Pi,0.1}];
dash = Join[dot, dot];

morse /: Play[morse[t_String]] := With[{
  code = ToMorseCode[t]
},
  Join @@ (Switch[#, ".", Join[dot, silence], "-", Join[dash, silence], _, Join[silence, silence]] & /@ StringSplit[code, ""]) // ListPlay
];
```

```mathematica
morse["SOS"] // Play 
```

![](./../../../Screenshot%202024-05-03%20at%2022.33.28.png)

### ArrangeSummaryBox
This is another built-in function useful for representing objects.

**Advantages ✅**
- High-level and easy to use
- **Compatible with Mathematica**

**Drawbacks ❌**
- Primarily displays text fields and a single icon

**Neutral 💭**
- Practically immutable
- Preserves the original expression in the cell

:::tip
If you want to hear more about OOP-like objects in Wolfram Language, check out this guide: [Creating new type](frontend/Advanced/Objects/Creating%20new%20type.md).
:::

For example, we have a symbol with information inside its arguments:

```mathematica
specialSymbol[<|"Date" -> Now, "Color" -> Red, "State" -> True|>]
```

Let's decorate it:

```mathematica
specialSymbol /: MakeBoxes[obj : specialSymbol[asc_Association], StandardForm] := 
    Module[{above},
        above = { 
          {BoxForm`SummaryItem[{"Date: ", asc["Date"]}]},
          {BoxForm`SummaryItem[{"Color: ", asc["Color"]}]}, 
          {BoxForm`SummaryItem[{"State: ", asc["State"]}]}
        };

        BoxForm`ArrangeSummaryBox[
           specialSymbol,
           obj,
           None,
           above,
           Null
        ]
    ];
```

The result looks like this:

```mathematica
specialSymbol[<|"Date" -> Now, "Color" -> Red, "State" -> True|>]
```

![](./../../../Screenshot%202024-05-04%20at%2012.48.32.png)

*This symbol is still valid for evaluation; what you see is only syntax sugar.*

Now add an icon based on the `"Color"` field:

```mathematica
specialSymbol /: MakeBoxes[obj : specialSymbol[asc_Association], StandardForm] := 
    Module[{above, icon},
        above = { 
          {BoxForm`SummaryItem[{"Date: ", asc["Date"]}]},
          {BoxForm`SummaryItem[{"Color: ", asc["Color"]}]}, 
          {BoxForm`SummaryItem[{"State: ", asc["State"]}]}
        };

        icon = Graphics[{
          Lighter[asc["Color"]], Disk[{0,0}, 1],
          asc["Color"], Disk[{0,0}, 0.8]
        }, 
          ImageSize -> {50, 50}, 
          ImagePadding -> None, 
          Controls -> False,
          PlotRange -> {{-1,1},{-1,1}}
        ];

        BoxForm`ArrangeSummaryBox[
           specialSymbol,
           obj,
           icon,
           above,
           Null
        ]
    ];
```

![](./../../../Screenshot%202024-05-04%20at%2012.54.20.png)

:::info
See how to make **dynamic decorations** in the guide: [Creating new type](frontend/Advanced/Objects/Creating%20new%20type.md).
:::

### ViewBox
*A low-level building block used by `Interpretation`, `InterpretationBox`, `ArrangeSummaryBox`, and others.*

**Advantages ✅**
- Fully customizable
- Can emit events
- Usually the fastest approach
- Saves memory—no frontend object is created by default

**Drawbacks ❌**
- Requires a symbol defined as [WLJS Functions](frontend/Advanced/Frontend%20interpretation/WLJS%20Functions.md)
- **Not compatible with Mathematica**

**Neutral 💭**
- Mutable (see [Mutability](frontend/Reference/Formatting/Low-level/ViewBox.md#Mutability))
- Preserves the original expression in the cell

#### Simple example
The easiest way to use it is to replace an expression with graphics, an image, or something similar:

```mathematica
boxObject[_Real]
```

Let's decorate it:

```mathematica
boxObject /: MakeBoxes[boxObject[s_], StandardForm] := With[{
  g = Graphics[{Blue, Disk[{0,0},1], Opacity[0.5], Red, Disk[{0,0},s]}, ImageSize -> 80, Controls -> False, ImagePadding -> None]
},
  ViewBox[boxObject[s], g]
]
```

:::warning
Normal expressions won't work as a display value in `ViewBox`. Use existing types like [Graphics](frontend/Reference/Graphics/Graphics.md), [Graphics3D](frontend/Reference/Graphics3D/Graphics3D.md), or [Image](frontend/Reference/Image/Image.md). Otherwise, define them as [WLJS Functions](frontend/Advanced/Frontend%20interpretation/WLJS%20Functions.md).
:::

:::tip
If your display expression is large, consider using `CreateFrontEndObject` on `g` before passing it to `ViewBox`. This stores the data in shared memory.
:::

```mathematica
Table[boxObject[i], {i, 3}]
```

![](./../../../Screenshot%202024-05-01%20at%2016.02.59.png)

You can also trigger a frontend beep when the widget is destroyed:

```mathematica
boxObject /: MakeBoxes[boxObject[s_], StandardForm] := With[{
  g = Graphics[{Blue, Disk[{0,0},1], Opacity[0.5], Red, Disk[{0,0},s]}, ImageSize -> 80, Controls -> False, ImagePadding -> None],
  uid = CreateUUID[]
},
  EventHandler[uid, {"Destroy" -> Beep}];
  ViewBox[boxObject[s], g, "Event" -> uid]
]
```

#### External decorators 1
You can also use JavaScript to decorate a symbol. We'll rewrite `MakeBoxes` for it:

```mathematica
boxObject /: MakeBoxes[boxObject[s_], StandardForm] := With[{},
  ViewBox[boxObject[s], customDecorator[s]]
]
```

:::info
We didn't use [CreateFrontEndObject](frontend/Reference/Frontend%20Objects/CreateFrontEndObject.md) here since our decorator is simple and lightweight.
:::

Now define the decorator function:

```javascript
.js

core.customDecorator = async (args, env) => {
  const state = await interpretate(args[0], env);
  const element = env.element;

  element.classList.add('flex', 'rounded-md', 'p-2');
  element.style.border = "1px solid #999";
  element.style.boxShadow = "inset 0 2px 4px 0 rgb(0 30% 0 / 0.05)";

  element.style.transitionDuration = '0.8s';
  element.style.transitionProperty = 'transform';

  setTimeout(() => {
    element.style.transform = "rotate(360deg)";
  }, 100);

  element.innerText = state;
}
```

Test it:

```mathematica
boxObject[33]
```

![](./../../../Screenshot%202024-05-04%20at%2013.47.06.png)

You can also make it dynamic by defining a `.update` method for `customDecorator`. (See [WLJS Functions](frontend/Advanced/Frontend%20interpretation/WLJS%20Functions.md))

#### External decorators 2
Adapted from the [Full interpretation](#Example) section.

Define a gauge meter:

```mathematica
gauge[level_Real]
```

Decorate it like before:

```mathematica
gauge /: MakeBoxes[g_gauge, StandardForm] := With[{},
  ViewBox[g, g]
]
```

:::note
For use with [FrontSlidesSelected](frontend/Reference/Slides/FrontSlidesSelected.md) or [WLX](frontend/Cell%20types/WLX.md), define `WLXForm` in `MakeBoxes`.
:::

Decorator implementation:

```javascript
.js

core.gauge = async (args, env) => {
  const gauge = document.createElement('div');
  gauge.style.width = '100px';
  gauge.style.height = '50px';
  gauge.style.border = '1px solid #000';
  gauge.style.borderRadius = '50px 50px 0 0';
  gauge.style.position = 'relative';
  gauge.style.background = 'linear-gradient(to right, red 0%, yellow 50%, green 100%)';

  const needle = document.createElement('div');
  needle.style.width = '2px';
  needle.style.height = '40px';
  needle.style.background = '#000';
  needle.style.position = 'absolute';
  needle.style.bottom = '0';
  needle.style.left = '50%';
  needle.style.transformOrigin = 'bottom';

  function setNeedlePosition(value) {
    value = Math.max(0, Math.min(1, value));
    const angle = value * 180 - 90;
    needle.style.transform = `rotate(${angle}deg)`;
  }

  const pos = await interpretate(args[0], env);
  setNeedlePosition(pos);

  gauge.appendChild(needle);
  env.element.appendChild(gauge);
}
```

```mathematica
gauge[0.3]
```

![](./../../../Screenshot%202024-05-20%20at%2018.48.35.png)

Even when copied to a plain text editor, the original symbol remains:

```mathematica
(*VB[*)(gauge[Offload[gvalue]])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRAeP5BwK8rPK3HNSwnLLCopTcyBSLACifTE0vRUCJcdSPinpeXkJ6YUs4GkyhJzSlMBOCoUGw=="*)(*]VB*)
```

##### Updates
Make the gauge dynamic:

```javascript
core.gauge = async (args, env) => {
  const gauge = document.createElement('div');
  gauge.style.width = '100px';
  gauge.style.height = '50px';
  gauge.style.border = '1px solid #000';
  gauge.style.borderRadius = '50px 50px 0 0';
  gauge.style.position = 'relative';
  gauge.style.background = 'linear-gradient(to right, red 0%, yellow 50%, green 100%)';

  const needle = document.createElement('div');
  needle.style.width = '2px';
  needle.style.height = '40px';
  needle.style.background = '#000';
  needle.style.position = 'absolute';
  needle.style.bottom = '0';
  needle.style.left = '50%';
  needle.style.transformOrigin = 'bottom';

  function setNeedlePosition(value) {
    value = Math.max(0, Math.min(1, value));
    const angle = value * 180 - 90;
    needle.style.transform = `rotate(${angle}deg)`;
  }

  const pos = await interpretate(args[0], env);
  setNeedlePosition(pos);

  gauge.appendChild(needle);
  env.element.appendChild(gauge);
  env.local.update = setNeedlePosition;
}

core.gauge.update = async (args, env) => {
  const val = await interpretate(args[0], env);
  env.local.update(val);
}

core.gauge.destroy = () => {
  console.log('Nothing to do');
}

core.gauge.virtual = true;
```

```mathematica
gauge /: MakeBoxes[g_gauge, StandardForm] := With[{},
  ViewBox[g, g]
]
```

Test with a slider:

```mathematica
gvalue = 0.1;
EventHandler[InputRange[0, 1, 0.1, 0.1], (gvalue = #) &];

gauge[gvalue // Offload]
```

![](./../../../gauge-ezgif.com-video-to-gif-converter.gif)


## Deferred
The key difference here is that the decoration is created only when the symbol appears in the editor. For this, we construct a dummy [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md) to emit a mount event:

```mathematica
dummy /: MakeBoxes[dummy[handler_], StandardForm] := With[{
  uid = CreateUUID[]
},
  EventHandler[uid, {"Mounted" :> Function[ref,
    FrontSubmit[handler[ref], FrontInstanceReference[ref]]
  ]}];
  
  ViewBox[Null, Null, "Event" -> uid]
]
```

The `handler` function populates the instance of `ViewBox` with content. Here's a simple example generating random shapes:

```mathematica
handler[ref_] := With[{
  g = With[{d = 2 Pi/RandomInteger[{2, 16}]}, 
    Graphics[
      Table[{
        EdgeForm[Opacity[.6]], Hue[(-11 + q + 10 r)/72, 1, 1], 
        Polygon[{
          (8 - r) {Cos[d (q - 1)], Sin[d (q - 1)]}, 
          (8 - r) {Cos[d (q + 1)], Sin[d (q + 1)]}, 
          (10 - r) {Cos[d q], Sin[d q]}
        }]
      }, {r, 6}, {q, 12}], 
      ImageSize -> {50, 50}, ImagePadding -> None
    ]
  }
},
  g
]
```

Try it:

```mathematica
dummy[handler]
```

![](./../../../DeferredDeco-ezgif.com-speed.gif)

Even if the widget is copied, it will still be a unique instance. The `handler` runs whenever the symbol appears in the editor.

:::tip
Use deferred decoration if you need each instance to be unique—even when copied.
:::

### State Preservation
Where do you store the state? Use [``ViewBox`InnerExpression``](frontend/Reference/Formatting/Low-level/ViewBox.md#``ViewBox`InnerExpression``) to keep data inside the cell.

Example with sliders:

```mathematica
handler[state_String, ref_, window_] := Module[{
  object = InputRange[0,1, 0.1, ToExpression[state]]
},
  EventHandler[object, Function[value,
    FrontSubmit[ViewBox`InnerExpression[ToString[value]], ref];
  ]];
  
  object[[1, "View"]] // CreateFrontEndObject
]
```

```mathematica
slider /: MakeBoxes[slider[initial_:0.5], StandardForm] := With[{
  uid = CreateUUID[]
},
  EventHandler[uid, {"Mounted" :> Function[assoc,
    Then[
      FrontFetchAsync[ViewBox`InnerExpression[], FrontInstanceReference[assoc["Instance"]]], 
      Function[payload,
        FrontSubmit[
          handler[First@Flatten@{payload}, FrontInstanceReference[assoc["Instance"]]],
          FrontInstanceReference[assoc["Instance"]]
        ]
      ]
    ]
  ]}];
  
  ViewBox[initial, Null, "Event" -> uid]
]
```

Try it:

```mathematica
slider[0.7]
```

![](./../../../Screenshot%202024-05-12%20at%2014.02.19.png)

When you drag the slider, it updates the original value hidden behind the decoration. Copying and pasting generates unique sliders:

![](./../../../Screenshot%202024-12-03%20at%2015.41.25.png)
