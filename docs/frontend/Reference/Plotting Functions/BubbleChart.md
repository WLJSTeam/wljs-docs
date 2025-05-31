---
env:
  - Wolfram Kernel
update: false
origin: https://reference.wolfram.com/language/ref/BubbleChart.html
---
```mathematica
BubbleChart[{{x1,y1,z1}, ...}]
```
creates a bubble chart for a list of triples

## Examples
Simple bubble plot of random triplets

```mathematica
BubbleChart[RandomReal[1, {10, 3}]]
```

<Wl >{`BubbleChart[RandomReal[1, {10, 3}], ImageSize->350]`}</Wl>

multiple datasets

```mathematica
BubbleChart[RandomReal[1, {5, 7, 3}]]
```

<Wl >{`BubbleChart[RandomReal[1, {5, 7, 3}], ImageSize->350]`}</Wl>
