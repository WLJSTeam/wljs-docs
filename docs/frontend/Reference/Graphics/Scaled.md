```mathematica
Scaled[{xA, yA}]
```

represents scaled coordinates from `0` to `1` relative to the plot range of the [Graphics](frontend/Reference/Graphics/Graphics.md) expression (even if it is `Automatic`).

```mathematica
Scaled[{xD, yD}, {x0, y0}]
```

uses `x0`, `y0` as normal coordinates and adds offset in absolute `xD` and `yD`.

It can be used as part of coordinates for various primitives such as [Text](frontend/Reference/Graphics/Text.md), [Line](frontend/Reference/Graphics/Line.md), [Point](frontend/Reference/Graphics/Point.md), [Disk](frontend/Reference/Graphics/Disk.md) and etc.