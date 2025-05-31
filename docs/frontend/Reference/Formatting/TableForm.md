---
env:
  - Wolfram Kernel
---
```mathematica
TableForm[table_List, opts___]
```
shows the given `table` (list) in a traditional form using [Grid](frontend/Reference/Formatting/Grid.md) decoration

:::info
For an editable formatted table, please see  [TableView](frontend/Reference/GUI/TableView.md). It fits especially for a large datasets
:::

## Options
### `TableHeading`


## Modifiers
See [Item](frontend/Reference/Formatting/Item.md)

## Examples
A fully formatted table 

```mathematica
TableForm[{{5, Item[7, Background->Yellow]}, {4, 2}, {10, 3}}, 
 TableHeadings -> {{"Group A", "Group B", "Group C"}, {"y1", "y2"}}]
```

```mathematica @
(*GB[*){{(*BB[*)()(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRAeB5AILqnMSXXKr0hjgskHleakFouApDLyy4NLijLz0p0zEosSk0tSi4qLWYESbok5xakAImsVPw=="*)(*]BB*)(*|*),(*|*)"y1"(*|*),(*|*)"y2"}(*||*),(*||*){"Group A"(*|*),(*|*)5(*|*),(*|*)7(*VB[*)(**)(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KWlMIB47kPAsSc11yq+ACICkg0pzUou5gAynxOTs9KL80ryUNGaQJAdI0t3JOT8nvygTZBqEAGIGNN08QEZwSVFmgX+eZ15BaUkxK1DALTGnOBUAl00daw=="*)(*]VB*)}(*||*),(*||*){"Group B"(*|*),(*|*)4(*|*),(*|*)2}(*||*),(*||*){"Group C"(*|*),(*|*)10(*|*),(*|*)3}}(*||*)(*1:eJxTTMoPSmNkYGAoZgESHvk5KRAeO5BwL8pMccqvSGOCSQeV5qQW8yNkXDLLMlNSi4oRKnwyi0tQ1QeDTHLOzynNzStOY0FWV8wKZLgl5hSngoVCikpTES5BUwBnoRkOZuSXU8NkAKaJOTA=*)(*]GB*)
```