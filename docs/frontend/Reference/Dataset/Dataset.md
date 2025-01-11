---
env:
  - Wolfram Kernel
package: wljs-editor
source: https://github.com/JerryI/wljs-editor/blob/dev/src/Boxes.wl
update: false
---
```mathematica
Dataset[list_List | a_Association]
```

represents a structured dataset based on a hierarchy of lists and associations.

:::warning
Docs are not complete. See original [page](https://reference.wolfram.com/language/ref/Dataset.html)
:::

## Optimizations
Use numerical data or `DateObject` or boolean type for an entire column to get better performance.

## Supported output forms
- [StandardForm](frontend/Reference/Decorations/StandardForm.md)
- [WLXForm](frontend/Reference/Decorations/WLXForm.md)


## Examples
Basic examples
```mathematica
ds = Dataset[ Table[<|"a" -> 3 i, "b" -> 3 i + 2, "c" -> 3 i + 5|>, {i, 3}]]
```

Get the second row

```mathematica
ds[2]
```

Get the second column:

```mathematica
ds[All, "b"]
```

Compute the [Total](https://reference.wolfram.com/language/ref/Total.html) of each column:

```mathematica
ds[Total]
```

Load dataset of passengers

```mathematica
titanic = ExampleData[{"Dataset", "Titanic"}]
```

Get a random sample of passengers:

```mathematica
RandomSample[titanic, 5]
```

Count the number of passengers in 1st, 2nd and 3rd class:

```mathematica
titanic[Counts, "class"]
```

Get a histogram of passenger ages:

```mathematica
titanic[Histogram, "age"]
```

```mathematica
titanic[GroupBy["class"], Histogram[#, {0, 80, 4}] &, "age"]
```

Calculate the overall survival ratio:

```mathematica
ratio[list_] := list // Boole // Mean // N;
titanic[GroupBy["sex"], GroupBy["class"], ratio, "survived"]
```

Get dataset for training neural nets

```mathematica
ro = ResourceObject["Audio Cats and Dogs"];
data = ResourceData[ro];
classes = Normal[data[Union, "Label"]];
RandomSample[data, 2]
```



## Notes
It supports lazy loading for a large set with many rows. The data is stored partially on Kernel if it exceeds 0.5 Mb.

The data is saved, when exported using [Static HTML](frontend/Exporting/Static%20HTML.md)