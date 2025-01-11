---
sidebar_position: 5
draft: false
---
Wolfram Language itself comes with a vast standard library, which is suitable for most problem solving, where Python or Julia are used.

The complexity for some utility tasks such as plotting data in the a given range __might even be comparable with a level of Microsoft Excel__.

Wolfram Language is symbolic programming language, which is in a nutshell 
- *code and data* are expressions
- computations are executed by applying rules
- what you see is one of the forms of interpretation

## Introduction
Let us have a look at an example

```mathematica @
{1,1,2,2,2,2} /. {2 -> 1, 1 -> 0}
```

```mathematica @
{0,0,1,1,1,1}
```

Integer numbers are so-called atoms of the language on which we can apply any transformation rule. Or we can use more general pattern

```mathematica @
{0,0,1,1,1,1} /. {any_Integer :> any / 2}
```

```mathematica @
{0,0,(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*),(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*),(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*),(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)}
```

Here what you see 

$$
\frac{1}{2}
$$
is actually written in the code editor as 

```mathematica title="raw text"
(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)
```

Looking closely on it, we can se that the it is still a normal `(1/2)` expression like in any other programming language. However, it is wrapped with some *special* comment blocks, that tells an editor how to render it. One can go quite far with it

![](./../GIF%20speed%20changer%20(1).gif)

__Any output expression is editable and can be reevaluated as well__

One can go even further in exploring the idea of symbolics and syntax sugar of our editor by applying more complicated rule

```mathematica @
{0,0,1/2,1/2,1/2,1/2} /. {any_?NumericQ :> {RGBColor[any, 1-any, 1], any} }
```

```mathematica @
{{(*VB[*)(RGBColor[0, 1, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxQAGU8cEezgAAAxwUjA=="*)(*]VB*),0},{(*VB[*)(RGBColor[0, 1, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxQAGU8cEezgAAAxwUjA=="*)(*]VB*),0},{(*VB[*)(RGBColor[1/2, 1/2, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEDe3TGB3sAGJkVmw=="*)(*]VB*),(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)},{(*VB[*)(RGBColor[1/2, 1/2, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEDe3TGB3sAGJkVmw=="*)(*]VB*),(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)},{(*VB[*)(RGBColor[1/2, 1/2, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEDe3TGB3sAGJkVmw=="*)(*]VB*),(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)},{(*VB[*)(RGBColor[1/2, 1/2, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEDe3TGB3sAGJkVmw=="*)(*]VB*),(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)}}
```

As one can see, Wolfram Language does not differentiate  what you are entering: a color, a function, a number. All of them are normal Wolfram Language expressions.

There are also built-in expression used for styling the output

```mathematica @
% // Transpose // TableForm 
```

*here % means to use the previous output*

```mathematica @
(*GB[*){{(*VB[*)(RGBColor[0, 1, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxQAGU8cEezgAAAxwUjA=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[0, 1, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxQAGU8cEezgAAAxwUjA=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1/2, 1/2, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEDe3TGB3sAGJkVmw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1/2, 1/2, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEDe3TGB3sAGJkVmw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1/2, 1/2, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEDe3TGB3sAGJkVmw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1/2, 1/2, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEDe3TGB3sAGJkVmw=="*)(*]VB*)}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)(*|*),(*|*)(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)(*|*),(*|*)(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)(*|*),(*|*)(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)}}(*]GB*)
```

Or something more complicated

```mathematica @
Table[If[PrimeQ[i], Framed[i, Background->Yellow], i], {i, 1, 20}]
```

*this expression will make an array of numbers and highlight primes*

```mathematica @
{1,(*BB[*)(2)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkHArSsxNdcqvgIiA5INKc1KLuYAMp8Tk7PSi/NK8lDRmmPIgdyfn/Jz8okyQcRACiBnQdPMAGcElRZkF/nmeeQWlJcWsIJsSc4pTAcQ1Hcg="*)(*]BB*),(*BB[*)(3)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkHArSsxNdcqvgIiA5INKc1KLuYAMp8Tk7PSi/NK8lDRmmPIgdyfn/Jz8okyQcRACiBnQdPMAGcElRZkF/nmeeQWlJcWsIJsSc4pTAcQ1Hcg="*)(*]BB*),4,(*BB[*)(5)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkHArSsxNdcqvgIiA5INKc1KLuYAMp8Tk7PSi/NK8lDRmmPIgdyfn/Jz8okyQcRACiBnQdPMAGcElRZkF/nmeeQWlJcWsIJsSc4pTAcQ1Hcg="*)(*]BB*),6,(*BB[*)(7)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkHArSsxNdcqvgIiA5INKc1KLuYAMp8Tk7PSi/NK8lDRmmPIgdyfn/Jz8okyQcRACiBnQdPMAGcElRZkF/nmeeQWlJcWsIJsSc4pTAcQ1Hcg="*)(*]BB*),8,9,10,(*BB[*)(11)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkHArSsxNdcqvgIiA5INKc1KLuYAMp8Tk7PSi/NK8lDRmmPIgdyfn/Jz8okyQcRACiBnQdPMAGcElRZkF/nmeeQWlJcWsIJsSc4pTAcQ1Hcg="*)(*]BB*),12,(*BB[*)(13)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkHArSsxNdcqvgIiA5INKc1KLuYAMp8Tk7PSi/NK8lDRmmPIgdyfn/Jz8okyQcRACiBnQdPMAGcElRZkF/nmeeQWlJcWsIJsSc4pTAcQ1Hcg="*)(*]BB*),14,15,16,(*BB[*)(17)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkHArSsxNdcqvgIiA5INKc1KLuYAMp8Tk7PSi/NK8lDRmmPIgdyfn/Jz8okyQcRACiBnQdPMAGcElRZkF/nmeeQWlJcWsIJsSc4pTAcQ1Hcg="*)(*]BB*),18,(*BB[*)(19)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkHArSsxNdcqvgIiA5INKc1KLuYAMp8Tk7PSi/NK8lDRmmPIgdyfn/Jz8okyQcRACiBnQdPMAGcElRZkF/nmeeQWlJcWsIJsSc4pTAcQ1Hcg="*)(*]BB*),20}
```

If you try to evaluate it, all decorations will be gone and you get a normal-looking Wolfram Language array with numbers up to 20.


The same symbolic features count for [Graphics](frontend/Reference/Graphics/Graphics.md). For example

```mathematica @
Plot[x, {x,0,1}, PlotStyle -> RGBColor[1/2, 1/2, 1]]
```

![](./../Screenshot%202024-04-28%20at%2011.36.54.png)

One might think, that this is an image, but not

![](./../Screenshot%202024-04-28%20at%2011.37.46.png)

![](./../Screenshot%202024-04-28%20at%2011.38.19.png)

:::info
Everything is a set of Wolfram Expressions covered with a decoration. Underneath there is still a working code than can be copied
:::

:::info
Most symbols are abstract objects that represent ideas, which, then can be interpreted in many ways.
:::

This is also valid for 3D graphics

```mathematica @
Graphics3D[Sphere[]]
```

![](./../Screenshot%202024-04-28%20at%2022.23.34.png)

![](./../Screenshot%202024-04-28%20at%2022.24.14.png)

__This is all a question of interpretation__ 

What you see is only one form, however, taking the same symbol of [Cuboid](frontend/Reference/Graphics3D/Cuboid.md), we can treat it as a an abstract object that represents a corresponding geometric object, i.e.

```mathematica @
Cuboid[{a1,a2,a3}, {b1,b2,b3}] // Volume
```

```mathematica @
Abs[(-a1+b1) (-a2+b2) (-a3+b3)]
```

Raster images are also expressions. Try to drag and drop your image to an editor

![](./../Screenshot%202024-04-29%20at%2011.26.13.png)

What can you do with it? Anything! For instance

```mathematica @
i // ColorNegate
```

![](./../Screenshot%202024-04-29%20at%2011.27.22.png)

or analyze a color distribution in LAB space

```mathematica @
BubbleChart[
 Append @@@ 
  Tally[Round[
    Flatten[ImageData[ColorConvert[i, "LAB"]], 1][[All, {2, 3}]], 
    10^-1]], ColorFunction -> (LABColor[.6, ##] &), 
 ColorFunctionScaling -> False, BubbleSizes -> {0.01, 0.1}]
```

![](./../Screenshot%202024-04-29%20at%2011.29.32.png)

If you like math like me, you will probably find it useful to work in `MatrixForm`

```mathematica @
{{a,b}, {c,d}} // MatrixForm
```

```mathematica @
((*GB[*){{a(*|*),(*|*)b}(*||*),(*||*){c(*|*),(*|*)d}}(*]GB*))
```

And it is still fine to work with it like if it was *a normal list of lists* (matrix)

```mathematica @
((*GB[*){{a(*|*),(*|*)b}(*||*),(*||*){c(*|*),(*|*)d}}(*]GB*)) . ((*GB[*){{a(*|*),(*|*)b}(*||*),(*||*){c(*|*),(*|*)d}}(*]GB*))
```

```mathematica @
{{(*SpB[*)Power[a(*|*),(*|*)2](*]SpB*)+b c,a b+b d},{a c+c d,b c+(*SpB[*)Power[d(*|*),(*|*)2](*]SpB*)}}
```

:::tip
Use [Command palette](frontend/Command%20palette.md) for easy matrix drawing
:::

Or combining it with other syntax sugar, one can do quite weird things

```mathematica @
Table[RGBColor[1,a,b], {a,0,1,0.25}, {b,0,1,0.25}]// MatrixForm
```

```mathematica @
((*GB[*){{(*VB[*)(RGBColor[1, 0., 0.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyiDgQHOAAALpBNd"*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0., 0.25])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyiDgQHKuGAPAA2DFGw="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0., 0.5])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyiDgQHKeGAPAA2jFHw="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0., 0.75])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyiDgQHKeGEPAA2zFIQ="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0., 1.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyiDgQEuAgANwxSM"*)(*]VB*)}(*||*),(*||*){(*VB[*)(RGBColor[1, 0.25, 0.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjAozBwAAAFwoUbA=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.25, 0.25])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjAoIBABjpFXs="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.25, 0.5])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjAozxwB4AGQkViw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.25, 0.75])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjAozxwh4AGRkVkw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.25, 1.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjgj1cBAAZKRWb"*)(*]VB*)}(*||*),(*||*){(*VB[*)(RGBColor[1, 0.5, 0.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjAYzBwAAAF7oUfA=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.5, 0.25])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjAYxxwR4AGZkViw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.5, 0.5])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjAYIBABm5FZs="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.5, 0.75])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjAYzxwh4AGckVow=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.5, 1.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjgT1cBAAZ2RWr"*)(*]VB*)}(*||*),(*||*){(*VB[*)(RGBColor[1, 0.75, 0.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjBYzBwAAAGBIUhA=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.75, 0.25])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjBYxxwR4AGfEVkw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.75, 0.5])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjBYzxwB4AGhEVow=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.75, 0.75])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjBYIBABohFas="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.75, 1.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjhT1cBAAaMRWz"*)(*]VB*)}(*||*),(*||*){(*VB[*)(RGBColor[1, 1., 0.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHe3QGAwMAGGoUjA=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 1., 0.25])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHe3TGBXsAGkkVmw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 1., 0.5])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHe3TGA3sAGmkVqw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 1., 0.75])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHe3TGC3sAGnkVsw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 1., 1.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHe0wGABqJFbs="*)(*]VB*)}}(*]GB*))
```

Syntax sugar and decorations also serves the purpose of abstracting classical OOP objects providing a short summary

```mathematica @
NumericArray[{1,2,3,4,5,6}]
```

![](./../Screenshot%202024-04-29%20at%2013.50.28.png)

which is still a normal symbol, which can be copied somewhere else. 

For instance `DateObject` is rendered as a date
```mathematica @
Now
```

```mathematica @
(*VB[*)(DateObject[{2024,5,19,12,39,34.05428},"Instant","Gregorian",2.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeEJBwSSxJ9U/KSk0uCUnNLcgB8oKlgMJKwaV5CoaWCr6JlQpGBkYmCoZGVsaWVsYmSgCu/RIR"*)(*]VB*)
```

Time-series has also its own representation

```mathematica @
v = {2, 1, 6, 5, 7, 4};
t = {1, 2, 5, 10, 12, 15};

ts = TimeSeries[v, {t}]
```

![](./../Screenshot%202024-04-29%20at%2014.04.41.png)

:::tip
Read more on how to create such object 

- [Decorating symbols](frontend/Advanced/Syntax%20sugar/Decorating%20symbols.md)
- [Creating new type](frontend/Advanced/Objects/Creating%20new%20type.md)
:::

Color data function will show the preview of color palette

```mathematica
ColorData[24]
```

![](./../Screenshot%202024-12-15%20at%2015.50.53.png)

And the last example of a syntax sugar is [ListPlay](frontend/Reference/Sound/ListPlay.md), which is quite experimental, but allows to play or generate sound right in the notebook

```mathematica @
ListPlay[Table[Sin[2 π 50 t], {t, 0, 1, 1./2000}]]
```

![](./../Screenshot%202024-04-29%20at%2014.08.42.png)

If you have too much data, then turn it into an icon using [Iconize](frontend/Reference/Decorations/Iconize.md)

```mathematica @
Table[i, {i, 100}] // Iconize
```

![](./../Screenshot%202024-04-29%20at%2014.10.11.png)

It uses `zlib` to compress it and store as BASE64 string inside the notebook. However, it the size does exceed a few kilobytes the data will be offloaded to a file and an icon will be turned into a short reference. 

:::info
Those are built-in features, there is no extra privilege for them compared to user's code. You may implement your own objects with beautiful syntax sugar and etc. 
:::