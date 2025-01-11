---
env:
  - Wolfram Kernel
update:
---
Plots a 2D array with an arbitrary data inside with axes
```mathematica
MatrixPlot[
 Fourier[Table[
   UnitStep[i, 4 - i] UnitStep[j, 7 - j], {i, -25, 25}, {j, -25, 
    25}]]]
```

<Wl >{`MatrixPlot[
 Fourier[Table[
   UnitStep[i, 2 - i] UnitStep[j, 3 - j], {i, -7, 7}, {j, -7, 
    7}]], ImageSize->{350,350}]`}</Wl>

or with a simpler example

```mathematica
MatrixPlot[PauliMatrix[3]]
```

<Wl >{`MatrixPlot[PauliMatrix[3], ImageSize->{350,350}]`}</Wl>

## Options
:::warning
`ColorFunction` is not supported option for now
:::

## Dev notes
It produces [`Raster`](frontend/Reference/Graphics/Raster.md) graphics object placed into [`Graphics`](frontend/Reference/Graphics/Graphics.md)
