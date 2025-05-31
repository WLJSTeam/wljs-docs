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

