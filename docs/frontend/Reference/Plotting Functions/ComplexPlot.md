```mathematica
ComplexPlot[f, {z, zmin, zmax}]
```
generates a plot of `Arg[f]` over the complex rectangle

For example
```mathematica @
ComplexPlot[(*FB[*)(((*SpB[*)Power[z(*|*),(*|*)2](*]SpB*) + 1)(*,*)/(*,*)((*SpB[*)Power[z(*|*),(*|*)2](*]SpB*) - 1))(*]FB*), {z, -2 - 2 I, 2 + 2 I}, 
 PlotLegends -> Automatic]
```

![](./../../../Screenshot%202025-03-23%20at%2011.44.05.png)