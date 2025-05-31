---
sidebar_position: 5
draft: false
---
# Symbolic Programming

Wolfram Language comes with a vast standard library that is well-suited for most problem-solving tasks—similar to what Python or Julia are used for.

The complexity of many utility tasks, such as plotting data over a given range, __can be comparable to the simplicity of Microsoft Excel__.

Wolfram Language is a symbolic programming language, which in essence means:
- *Code and data* are expressions.
- Computation is driven by applying rules.
- What you see is just one form of interpretation.

## Introduction
Let’s take a look at a simple example:

```mathematica @
{1,1,2,2,2,2} /. {2 -> 1, 1 -> 0}
```

```mathematica @
{0,0,1,1,1,1}
```

Integer numbers are atoms of the language on which we can apply transformation rules. We can also use more general patterns:

```mathematica @
{0,0,1,1,1,1} /. {any_Integer :> any / 2}
```

```mathematica @
{0,0,(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*),(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*),(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*),(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)}
```

What you see as:

$$
\frac{1}{2}
$$

Is actually represented in the code editor as:

```mathematica title="raw text"
(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)
```

Looking closely, it’s still the same `(1/2)` expression, but wrapped in special comment blocks that tell the editor how to render it.

![](./../GIF%20speed%20changer%20(1).gif)

__Any output expression is editable and can be reevaluated.__

Let’s go further and apply a more advanced rule:

```mathematica @
{0,0,1/2,1/2,1/2,1/2} /. {any_?NumericQ :> {RGBColor[any, 1-any, 1], any} }
```

```mathematica @
{{(*VB[*)(RGBColor[0, 1, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxQAGU8cEezgAAAxwUjA=="*)(*]VB*),0},{(*VB[*)(RGBColor[0, 1, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxQAGU8cEezgAAAxwUjA=="*)(*]VB*),0},{(*VB[*)(RGBColor[1/2, 1/2, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEDe3TGB3sAGJkVmw=="*)(*]VB*),(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)},{(*VB[*)(RGBColor[1/2, 1/2, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEDe3TGB3sAGJkVmw=="*)(*]VB*),(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)},{(*VB[*)(RGBColor[1/2, 1/2, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEDe3TGB3sAGJkVmw=="*)(*]VB*),(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)},{(*VB[*)(RGBColor[1/2, 1/2, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEDe3TGB3sAGJkVmw=="*)(*]VB*),(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)}}
```

As you can see, Wolfram Language does not distinguish between data types. Colors, numbers, functions—they are all just symbolic expressions.

You can also format output for readability:

```mathematica @
% // Transpose // TableForm
```

```mathematica @
(*GB[*){{(*VB[*)(RGBColor[0, 1, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxQAGU8cEezgAAAxwUjA=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[0, 1, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxQAGU8cEezgAAAxwUjA=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1/2, 1/2, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEDe3TGB3sAGJkVmw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1/2, 1/2, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEDe3TGB3sAGJkVmw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1/2, 1/2, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEDe3TGB3sAGJkVmw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1/2, 1/2, 1])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEDe3TGB3sAGJkVmw=="*)(*]VB*)}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)(*|*),(*|*)(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)(*|*),(*|*)(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)(*|*),(*|*)(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)}}(*]GB*)
```

More complex styling:

```mathematica @
Table[If[PrimeQ[i], Framed[i, Background -> Yellow], i], {i, 1, 20}]
```

```mathematica @
{1,(*BB[*)(2)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkHArSsxNdcqvgIiA5INKc1KLuYAMp8Tk7PSi/NK8lDRmmPIgdyfn/Jz8okyQcRACiBnQdPMAGcElRZkF/nmeeQWlJcWsIJsSc4pTAcQ1Hcg="*)(*]BB*),(*BB[*)(3)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkHArSsxNdcqvgIiA5INKc1KLuYAMp8Tk7PSi/NK8lDRmmPIgdyfn/Jz8okyQcRACiBnQdPMAGcElRZkF/nmeeQWlJcWsIJsSc4pTAcQ1Hcg="*)(*]BB*),4,(*BB[*)(5)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkHArSsxNdcqvgIiA5INKc1KLuYAMp8Tk7PSi/NK8lDRmmPIgdyfn/Jz8okyQcRACiBnQdPMAGcElRZkF/nmeeQWlJcWsIJsSc4pTAcQ1Hcg="*)(*]BB*),6,(*BB[*)(7)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkHArSsxNdcqvgIiA5INKc1KLuYAMp8Tk7PSi/NK8lDRmmPIgdyfn/Jz8okyQcRACiBnQdPMAGcElRZkF/nmeeQWlJcWsIJsSc4pTAcQ1Hcg="*)(*]BB*),8,9,10,(*BB[*)(11)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkHArSsxNdcqvgIiA5INKc1KLuYAMp8Tk7PSi/NK8lDRmmPIgdyfn/Jz8okyQcRACiBnQdPMAGcElRZkF/nmeeQWlJcWsIJsSc4pTAcQ1Hcg="*)(*]BB*),12,(*BB[*)(13)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkHArSsxNdcqvgIiA5INKc1KLuYAMp8Tk7PSi/NK8lDRmmPIgdyfn/Jz8okyQcRACiBnQdPMAGcElRZkF/nmeeQWlJcWsIJsSc4pTAcQ1Hcg="*)(*]BB*),14,15,16,(*BB[*)(17)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkHArSsxNdcqvgIiA5INKc1KLuYAMp8Tk7PSi/NK8lDRmmPIgdyfn/Jz8okyQcRACiBnQdPMAGcElRZkF/nmeeQWlJcWsIJsSc4pTAcQ1Hcg="*)(*]BB*),18,(*BB[*)(19)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB4HkHArSsxNdcqvgIiA5INKc1KLuYAMp8Tk7PSi/NK8lDRmmPIgdyfn/Jz8okyQcRACiBnQdPMAGcElRZkF/nmeeQWlJcWsIJsSc4pTAcQ1Hcg="*)(*]BB*),20}
```

This creates an array of numbers and highlights primes.

Symbolic features also apply to [Graphics](frontend/Reference/Graphics/Graphics.md):

```mathematica @
Plot[x, {x, 0, 1}, PlotStyle -> RGBColor[1/2, 1/2, 1]]
```

![](./../Screenshot%202024-04-28%20at%2011.36.54.png)

It may look like an image, but it’s not.

![](./../Screenshot%202024-04-28%20at%2011.37.46.png)
![](./../Screenshot%202024-04-28%20at%2011.38.19.png)

:::info
Everything is a set of Wolfram expressions decorated with rendering metadata. Underneath, it’s still real code.
:::

:::info
Most symbols are abstract representations that can be interpreted in many ways.
:::

This also applies to 3D graphics:

```mathematica @
Graphics3D[Sphere[]]
```

![](./../Screenshot%202024-04-28%20at%2022.23.34.png)
![](./../Screenshot%202024-04-28%20at%2022.24.14.png)

__It’s all about interpretation.__

Let’s take a symbolic object like [Cuboid](frontend/Reference/Graphics3D/Cuboid.md) and compute its volume:

```mathematica @
Cuboid[{a1,a2,a3}, {b1,b2,b3}] // Volume
```

```mathematica @
Abs[(-a1 + b1)(-a2 + b2)(-a3 + b3)]
```

Images are expressions too. Try dragging an image into the editor:

![](./../Screenshot%202024-04-29%20at%2011.26.13.png)

Then manipulate it, for example:

```mathematica @
i // ColorNegate
```

![](./../Screenshot%202024-04-29%20at%2011.27.22.png)

Analyze color distribution in LAB space:

```mathematica @
BubbleChart[
 Append @@@ Tally[
   Round[
     Flatten[ImageData[ColorConvert[i, "LAB"]], 1][[All, {2, 3}]],
     0.1]], 
 ColorFunction -> (LABColor[.6, ##] &), 
 ColorFunctionScaling -> False, BubbleSizes -> {0.01, 0.1}]
```

![](./../Screenshot%202024-04-29%20at%2011.29.32.png)

Working with matrices is just as symbolic:

```mathematica @
{{a, b}, {c, d}} // MatrixForm
```

Still behaves like a regular matrix:

```mathematica @
{{a, b}, {c, d}} . {{a, b}, {c, d}}
```

:::tip
Use the [Command Palette](frontend/Command%20palette.md) to draw matrices quickly.
:::

You can even combine symbolics with stylistic expressions:

```mathematica @
Table[RGBColor[1, a, b], {a, 0, 1, 0.25}, {b, 0, 1, 0.25}] // MatrixForm
```

```mathematica @
((*GB[*){{(*VB[*)(RGBColor[1, 0., 0.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyiDgQHOAAALpBNd"*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0., 0.25])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyiDgQHKuGAPAA2DFGw="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0., 0.5])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyiDgQHKeGAPAA2jFHw="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0., 0.75])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyiDgQHKeGEPAA2zFIQ="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0., 1.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyiDgQEuAgANwxSM"*)(*]VB*)}(*||*),(*||*){(*VB[*)(RGBColor[1, 0.25, 0.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjAozBwAAAFwoUbA=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.25, 0.25])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjAoIBABjpFXs="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.25, 0.5])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjAozxwB4AGQkViw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.25, 0.75])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjAozxwh4AGRkVkw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.25, 1.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjgj1cBAAZKRWb"*)(*]VB*)}(*||*),(*||*){(*VB[*)(RGBColor[1, 0.5, 0.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjAYzBwAAAF7oUfA=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.5, 0.25])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjAYxxwR4AGZkViw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.5, 0.5])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjAYIBABm5FZs="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.5, 0.75])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjAYzxwh4AGckVow=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.5, 1.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjgT1cBAAZ2RWr"*)(*]VB*)}(*||*),(*||*){(*VB[*)(RGBColor[1, 0.75, 0.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjBYzBwAAAGBIUhA=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.75, 0.25])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjBYxxwR4AGfEVkw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.75, 0.5])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjBYzxwB4AGhEVow=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.75, 0.75])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjBYIBABohFas="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 0.75, 1.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHeyjjhT1cBAAaMRWz"*)(*]VB*)}(*||*),(*||*){(*VB[*)(RGBColor[1, 1., 0.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHe3QGAwMAGGoUjA=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 1., 0.25])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHe3TGBXsAGkkVmw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 1., 0.5])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHe3TGA3sAGmkVqw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 1., 0.75])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHe3TGC3sAGnkVsw=="*)(*]VB*)(*|*),(*|*)(*VB[*)(RGBColor[1, 1., 1.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeGJAIcndyzs/JLwouTyxJzghJzS3ISSxJTWMGyXMgyRcxgMEHe0wGABqJFbs="*)(*]VB*)}}(*]GB*))
```

Syntax sugar also helps represent abstract objects:

```mathematica @
NumericArray[{1,2,3,4,5,6}]
```

![](./../Screenshot%202024-04-29%20at%2013.50.28.png)

Even something like `DateObject` is visually formatted:

```mathematica @
Now
```

```mathematica @

(*VB[*)(DateObject[{2024,5,19,12,39,34.05428},"Instant","Gregorian",2.])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeEJBwSSxJ9U/KSk0uCUnNLcgB8oKlgMJKwaV5CoaWCr6JlQpGBkYmCoZGVsaWVsYmSgCu/RIR"*)(*]VB*)

```

Time series also render visually:

```mathematica @
v = {2, 1, 6, 5, 7, 4};
t = {1, 2, 5, 10, 12, 15};

ts = TimeSeries[v, {t}]
```

![](./../Screenshot%202024-04-29%20at%2014.04.41.png)

:::tip
Learn how to create such objects:
- [Decorating Symbols](frontend/Advanced/Syntax%20sugar/Decorating%20symbols.md)
- [Creating New Types](frontend/Advanced/Objects/Creating%20new%20type.md)
:::

Preview palettes visually:

```mathematica @
ColorData[24]
```

![](./../Screenshot%202024-12-15%20at%2015.50.53.png)

Play audio inline:

```mathematica @
ListPlay[Table[Sin[2 π 50 t], {t, 0, 1, 1./2000}]]
```

![](./../Screenshot%202024-04-29%20at%2014.08.42.png)

Too much data? Use icons:

```mathematica @
Table[i, {i, 100}] // Iconize
```

![](./../Screenshot%202024-04-29%20at%2014.10.11.png)

These are stored with `zlib` compression and encoded in base64. If the content exceeds a few KB, it gets offloaded and referenced instead.

:::info
These are built-in features. There's no privilege granted to system code that you can't use yourself. You can build your own symbolic objects with syntax sugar and styling.
:::

