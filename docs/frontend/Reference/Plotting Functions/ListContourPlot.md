---
env:
  - Wolfram Kernel
update: 
needsContainer: 
origin: https://reference.wolfram.com/language/ref/ListContourPlot.html
---
A list version of [ContourPlot](frontend/Reference/Plotting%20Functions/ContourPlot.md)
## Example
Generate contours from an array of heights
```mathematica
ListContourPlot[Table[Sin[i + j^2], {i, 0, 3, 0.1}, {j, 0, 3, 0.1}]]
```

<Wl >{`ListContourPlot[Table[Sin[i + j^2], {i, 0, 3, 0.1}, {j, 0, 3, 0.1}], ImageSize->500]`}</Wl>

Or give explicit $x,y,z$ coordinates for the data
```mathematica
data = Table[{x = RandomReal[{-2, 2}], y = RandomReal[{-2, 2}], Sin[x y]}, {1000}];
ListContourPlot[data]
```

<Wl >{`ListContourPlot[Table[{x = RandomReal[{-2, 2}], y = RandomReal[{-2, 2}], Sin[x y]}, {1000}], ImageSize->500]`}</Wl>