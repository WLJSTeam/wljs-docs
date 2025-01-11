---
env:
  - Wolfram Kernel
update: 
needsContainer: 
registered: true
origin: https://reference.wolfram.com/language/ref/StackedListPlot.html
---
```mathematica
StackedListPlot[{data1, data2, ...}]
```

plots lines for each of the $data_i$, with the $i^{th}$ curve being the accumulation of values in $data_1$ through $data_i$
## Example
Plot a stacked list of $y$ values
```mathematica
StackedListPlot[{{3, 2, 1, 6, 4, 7, 7, 2, 3, 1}, {7, 8, 8, 3, 5, 9, 10, 3, 10, 10}, {10, 2, 4, 8, 4, 10, 8, 4, 5, 3}}]
```

<Wl >{`StackedListPlot[{{3, 2, 1, 6, 4, 7, 7, 2, 3, 1}, {7, 8, 8, 3, 5, 9, 10, 3, 10, 10}, {10, 2, 4, 8, 4, 10, 8, 4, 5, 3}}, ImageSize->500]`}</Wl>