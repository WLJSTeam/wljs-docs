---
env:
  - Wolfram Kernel
update: 
needsContainer: 
origin: https://github.com/JerryI/wljs-editor/tree/main
---


Spawns a grid of WL editors with an arbitrary objects inside
```mathematica
Grid[Table[x, {4}, {7}]]
```

![](../../../Screenshot%202024-03-27%20at%2020.27.42.png)

## Options
### Dividers
it has to be explicitly set

```mathematica
Grid[Table[x, {3}, {7}], 
 Dividers -> {{False, False, True}, {False, True}}]
```

```mathematica @
(*GB[*){{x(*|*),(*|*)x(*|*),(*|*)x(*|*),(*|*)x(*|*),(*|*)x(*|*),(*|*)x(*|*),(*|*)x}(*||*),(*||*){x(*|*),(*|*)x(*|*),(*|*)x(*|*),(*|*)x(*|*),(*|*)x(*|*),(*|*)x(*|*),(*|*)x}(*||*),(*||*){x(*|*),(*|*)x(*|*),(*|*)x(*|*),(*|*)x(*|*),(*|*)x(*|*),(*|*)x(*|*),(*|*)x}}(*||*)(*1:eJxTTMoPSmNkYGAoZgESHvk5KRAeO5BwL8pMccqvSGOCSQeV5qQW8yNkXDLLMlNSi4oRKnwyi0tQ1QeDTHLOzynNzStOY0ZWV8wKZLgl5hSnIrFAkiFFpalohoAZ+eVoNmHRBwA5XS0Q*)(*]GB*)
```


## Modifiers
- [`Item`](frontend/Reference/Decorations/Item.md)

`Item` being placed inside `Grid` modifies the outer container

```mathematica
a = {{1, 2}, {3, 4}};
Grid[KroneckerProduct[IdentityMatrix[5], a]] /. {0 -> 0, 
   x_?NumberQ -> Item[x, Background -> Orange]}
```

```mathematica @
(*GB[*){{1(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)2(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0}(*||*),(*||*){3(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)4(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)1(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)2(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)3(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)4(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)1(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)2(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)3(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)4(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)1(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)2(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)0(*|*),(*|*)0}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)3(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)4(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)0(*|*),(*|*)0}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)1(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)2(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)}(*||*),(*||*){0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)0(*|*),(*|*)3(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)(*|*),(*|*)4(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZFoRAxg8sM8EUWgm8AAZwSVFmQX+eZ55BaUlxaxAAbfEnOJUABnOHpI="*)(*]VB*)}}(*]GB*)
```

## Supported output forms
- [StandardForm](frontend/Reference/Decorations/StandardForm.md)
