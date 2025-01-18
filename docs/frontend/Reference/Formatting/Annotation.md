---
package: wljs-editor
---
```mathematica
Annotation[expr_, data_]
```

represents an expression `expr` annotated with `data`. This kind of annotation is not visible on output

```mathematica
a = Table[Annotation[i, PrimeQ[i]], {i, 20}]
```

```mathematica
{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20}
```

Now find annotated data

```mathematica
Cases[a, Annotation[_, True]]
```

```mathematica
{2,3,5,7,11,13,17,19}
```

Another use-case with graphs

```mathematica
Annotation[item_, key_->value_]
```

associates key-value pairs with items in objects such as [Graph](https://reference.wolfram.com/language/ref/Graph.html), [MeshRegion](https://reference.wolfram.com/language/ref/MeshRegion.html) etc. For example

```mathematica
Graph[{Annotation[1 <-> 2, EdgeLabels -> "hello"], 
  2 <-> 3, 3 <-> 1}]
```

```mathematica @
(*VB[*)(Graph[{1, 2, 3}, {UndirectedEdge[1, 2], UndirectedEdge[2, 3], UndirectedEdge[3, 1]}, {EdgeLabels -> {UndirectedEdge[1, 2] -> "hello"}}])(*,*)(*"1:eJy9UzFLAzEUvmqrthUE/4G/wUkQDrXWCkVLr4NrvHvXhqZNSa6115/g7KKD4CIiuLp2VXBwd1AoiOLi4qyXXHNy12t1EN/wSPJeXr5833tL+7RsJzRN40nPFSix7Cmxm/PcFkOtGja5fyLiRcwdOxnayVjacznMwHRwB/xys57bbSETOy6zpT3r9rSICFdoA1uWNtCDMNOkPemRB8M7WT3juTXG6EENkMWHFzXNT02p4KQ67KK499K7fuuzj09hj/1IPHN4WlxxL1eHxd91dlNavDsbHEXhJRQDHl9uETpAsMQS8FSBrmMIUDUghEaeOZcwHvpsRj5zr/v1sp7bbqAqGCYiYEUuKaJiGCu3CUg064iD4bgEjAla/heZV35cZ1kfcH8imX8AaES93wP6sb/ju/jkWNitWrwOhRTkb1pVyFPWGDssMd0zfoiCj+Qwr4PIEydKASVADMGhfEXQhO4O5SvCRvlKxcsgG1EoKX6OnIrbAr4gpoEhCzuYNhH55iR8gaEGVLBZ5/J8hzYhkjWvpqOELAs3q+Py0sEU4R7gbtBDQYJQZ4M2HUYJl52VR4TDFzU3VBs="*)(*]VB*)
```

