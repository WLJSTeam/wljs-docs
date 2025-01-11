---
env:
  - WLJS
context: JerryI`Notebook`Graphics2D`
package: wljs-graphics-d3
source: https://github.com/JerryI/wljs-graphics-d3/blob/dev/src/kernel.js
update: false
---
```mathematica
BezierCurve[{pts__List}]
```

plots quadratic Bezier curve using every *first point* as a starting point and *forth point* as a destination. If there are more than 4 points provided, it will split them into multiple curves


```mathematica
pts = {{0, 0}, {1, 1}, {2, -1}, {3, 0}, {5, 2}, {6, -1}, {7, 3}};
Graphics[{BezierCurve[pts], Green, Line[pts], Red, Point[pts]}]
```

<Wl>{`Graphics[{BezierCurve[{{0, 0}, {1, 1}, {2, -1}, {3, 0}, {5, 2}, {6, -1}, {7, 3}}], Green, Line[{{0, 0}, {1, 1}, {2, -1}, {3, 0}, {5, 2}, {6, -1}, {7, 3}}], Red, Point[{{0, 0}, {1, 1}, {2, -1}, {3, 0}, {5, 2}, {6, -1}, {7, 3}}]}]`}</Wl>