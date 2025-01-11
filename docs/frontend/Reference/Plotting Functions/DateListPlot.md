---
env:
  - Wolfram Kernel
update: false
---

```mathematica
DateListPlot[{{date1,y1},{date2,y2},...,{daten,yn}}]
```

plots points with values `yi` at a sequence of dates.

```mathematica
DateListPlot[{y1,y2,..,yn},datespec]
```

plots points with dates at equal intervals specified by `datespec`.

## Examples

Historical stock price
```mathematica
DateListPlot[FinancialData["IBM", "Jan. 1, 2004"]]
```

<Wl>{`DateListPlot[FinancialData["IBM", "Jan. 1, 2004"]]`}</Wl>


Plot data gathered at regular intervals and stored without explicit dates
```mathematica
data = {56.1, 60.7, 51.6, 52., 57.5, 56.7, 67.4, 69.9, 72.9, 69.7, 70.3, 72.1};
DateListPlot[data, {{2006, 6, 1, 8}, Automatic, "Hour"}]
```

<Wl>{`DateListPlot[{56.1, 60.7, 51.6, 52., 57.5, 56.7, 67.4, 69.9, 72.9, 69.7, 70.3, 72.1}, {{2006, 6, 1, 8}, Automatic, "Hour"}]`}</Wl>