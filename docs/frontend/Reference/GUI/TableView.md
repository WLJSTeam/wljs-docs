---
env:
  - WLJS
source: https://github.com/JerryI/wljs-inputs/blob/dev/src/Kernel.wl
package: wljs-inputs

update: false
---
```mathematica
TableView[table_List, opts___]
```

where `table` is a 2D list

Represents a ready-only table preview for an arbitrary 2D set of data. For editable tables, please see [InputTable](frontend/Reference/GUI/InputTable.md)

## Options

### `ImageSize`
specifies the maximum width and hight or just width in pixels

### `TableHeadings`
accepts a list of headings


## Notes
It effectively transforms the data into [Dataset](frontend/Reference/Dataset/Dataset.md)

## TODO
Developers notes
- [ ] Allows updates

