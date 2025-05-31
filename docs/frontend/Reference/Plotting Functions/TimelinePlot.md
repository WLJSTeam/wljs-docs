---
env:
  - Wolfram Kernel
update: false
---
```mathematica
TimelinePlot[{dates__}]
```

makes a timeline plot with dates
## Examples
A plot for a list of dates

```mathematica
TimelinePlot[{DateObject[{2000, 7, 31}, "Day", "Gregorian", -6.0], 
  DateObject[{2003, 10, 23}, "Day", "Gregorian", -6.0], 
  DateObject[{2008, 2, 25}, "Day", "Gregorian", -6.0], 
  DateObject[{2010, 5, 17}, "Day", "Gregorian", -6.0]}]
```

<Wl>{`TimelinePlot[{DateObject[{2000, 7, 31}, "Day", "Gregorian", -6.0], 
  DateObject[{2003, 10, 23}, "Day", "Gregorian", -6.0], 
  DateObject[{2008, 2, 25}, "Day", "Gregorian", -6.0], 
  DateObject[{2010, 5, 17}, "Day", "Gregorian", -6.0]}]`}</Wl>


Plot date intervals

```mathematica
TimelinePlot[{DateInterval[{DateObject[{2000, 7, 31}, "Day", "Gregorian", -6.0], DateObject[{2003, 10, 23}, "Day", "Gregorian", -6.0]}], DateInterval[{DateObject[{2008, 2, 25}, "Day", "Gregorian", -6.0], DateObject[{2010, 5, 17}, "Day", "Gregorian", -6.0]}]}]
```

<Wl>{`TimelinePlot[{DateInterval[{DateObject[{2000, 7, 31}, "Day", "Gregorian", -6.0], DateObject[{2003, 10, 23}, "Day", "Gregorian", -6.0]}], DateInterval[{DateObject[{2008, 2, 25}, "Day", "Gregorian", -6.0], DateObject[{2010, 5, 17}, "Day", "Gregorian", -6.0]}]}]`}</Wl>

Plot multiple sets of intervals

```mathematica
TimelinePlot[{{DateInterval[{DateObject[{2003, 4, 28}, "Day", "Gregorian", -6.0], DateObject[{2013, 3, 1}, "Day", "Gregorian", -6.0]}], DateObject[{2009, 3, 27}, "Day", "Gregorian", -6.0], DateInterval[{DateObject[{2002, 12, 20}, "Day", "Gregorian", -6.0], DateObject[{2006, 9, 11}, "Day", "Gregorian", -6.0]}]}, {DateInterval[{DateObject[{2004, 1, 15}, "Day", "Gregorian", -6.0], DateObject[{2010, 9, 9}, "Day", "Gregorian", -6.0]}], DateObject[{2000, 7, 31}, "Day", "Gregorian", -6.0], DateInterval[{DateObject[{2009, 7, 27}, "Day", "Gregorian", -6.0], DateObject[{2014, 8, 6}, "Day", "Gregorian", -6.0]}]}}]
```

<Wl>{`TimelinePlot[{{DateInterval[{DateObject[{2003, 4, 28}, "Day", "Gregorian", -6.0], DateObject[{2013, 3, 1}, "Day", "Gregorian", -6.0]}], DateObject[{2009, 3, 27}, "Day", "Gregorian", -6.0], DateInterval[{DateObject[{2002, 12, 20}, "Day", "Gregorian", -6.0], DateObject[{2006, 9, 11}, "Day", "Gregorian", -6.0]}]}, {DateInterval[{DateObject[{2004, 1, 15}, "Day", "Gregorian", -6.0], DateObject[{2010, 9, 9}, "Day", "Gregorian", -6.0]}], DateObject[{2000, 7, 31}, "Day", "Gregorian", -6.0], DateInterval[{DateObject[{2009, 7, 27}, "Day", "Gregorian", -6.0], DateObject[{2014, 8, 6}, "Day", "Gregorian", -6.0]}]}}]`}</Wl>