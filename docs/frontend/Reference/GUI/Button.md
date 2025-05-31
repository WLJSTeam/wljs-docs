```mathematica
Button[label_, action_]
```

represents a shorthand notation for [InputButton](frontend/Reference/GUI/InputButton.md) with event-handler made for compatibility with Mathematica.

For example

```mathematica
Button["Click to beep", Beep[]]
```

This button changes the color of the disk each time you click it:

```mathematica
Module[{b = List @@ Red}, {Button["change", 
   b = RandomReal[{0, 1}, 3]],
   Graphics[{RGBColor[Offload[b]], Disk[]}]}]
```

![](./../../../Screenshot%202025-04-27%20at%2015.14.22.png)

This button changes position each time you click it:

```mathematica
Module[{pt = {0, 0}}, 
 Framed@Graphics[
   Inset[Button["Click Me", pt = RandomReal[{-1, 1}, 2]], Offload[pt]],
    PlotRange -> {{-1,1}, {-1,1}}, Controls->False]]
```

![](./../../../Screenshot%202025-04-27%20at%2015.24.30.png)