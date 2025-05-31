```mathematica
Item[expr_, opts___]
```

represents an item within constructs such [Grid](frontend/Reference/Formatting/Grid.md)

It modifies on outer container applying custom styles specified in `opts`

```mathematica
Grid[{{Item[a, Frame -> True], b}, {c, d}}]
```

```mathematica @
(*GB[*){{a(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUotZgQy3osTcVLBQSFFpKpoCHiAjuKQos8A/zzOvoLQEoiMxpzgVAMnhGG0="*)(*]VB*)(*|*),(*|*)b}(*||*),(*||*){c(*|*),(*|*)d}}(*]GB*)
```

Another example

```mathematica
a = {{1, 2}, {3, 4}};
Grid[KroneckerProduct[IdentityMatrix[5], a]] /. {0 -> 0, 
   x_?NumberQ -> Item[x, Background -> Orange]}
```

```mathematica @
(*GB[*){{1(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)2(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0}(*||*),(*||*){3(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)4(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)1(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)2(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)3(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)4(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)1(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)2(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)3(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)4(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)1(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)2(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)0(*|*),(*|*)0}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)3(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)4(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)0(*|*),(*|*)0}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)1(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)2(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)3(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)4(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)}}(*]GB*)
```

## Options
The same as for [Style](frontend/Reference/Graphics/Style.md)