---
env:
  - WLJS
package: wljs-editor
source: https://github.com/JerryI/wljs-editor/blob/dev/src/EditorKernel.wl
context: Notebook`EditorUtils`
---
Manipulates the last selected input cell's editor

```mathematica
FrontEditorSelected[op_String, arguments__, opt___] Null | _String
```


:::warning
This has to be executed in WLJS interpreter, i.e. using [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md) or [FrontFetchAsync](frontend/Reference/Frontend%20IO/FrontFetchAsync.md)
:::
## Methods
There are following methods available

### Get selected content

```mathematica
FrontEndEditorSelected["Get", opt___] _String
```

Returns __selected string__. For example

```mathematica
With[{win = CurrentWindow[]},
  EventHandler[InputButton[], Function[Null, 
    
      Then[FrontFetchAsync[FrontEditorSelected["Get"], "Window"->win], Function[result,
        Print[result];
      ]
    ]
  ]]
]
```

### Insert or replace selected content

```mathematica
FrontEndEditorSelected["Set", data_String, opt___] 
```

Inserts or replaces selected text with a provided string

```mathematica
With[{win = CurrentWindow[]},
  EventHandler[InputButton["Replace"],
    Function[Null, 
      FrontSubmit[FrontEditorSelected["Set", "Yo"], "Window"->win];
    ]
  ]
] 
```


### Get cursor position

```mathematica
FrontEditorSelected["Cursor", opt___] 
```

### Get all content from the editor

```mathematica
FrontEditorSelected["GetDoc", opt___] 
```

### Set content of the editor

```mathematica
FrontEditorSelected["SetDoc", doc_String, opt___] 
```

### Get UID of the last used editor

```mathematica
FrontEditorSelected["Editor"] _String 
```

See [Options](#Options) for applications.

### Evaluate

:::danger
Not implemented
:::

## Options

### `"Editor"`
Specify an editor, from which the all properties will be taken or modified. __By the default it takes the last editor, that a user operated__

You can get an `id` or an editor using [Get UID of the last used editor](#Get%20UID%20of%20the%20last%20used%20editor)

