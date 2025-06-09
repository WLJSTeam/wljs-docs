---
env:
  - Wolfram Kernel
source: https://github.com/JerryI/wljs-editor/blob/dev/src/FrontSubmitKernel.wl
package: wljs-editor

---
asynchronously evaluates (aka [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md)) and fetches the resulting expression back to the Wolfram Kernel from the frontend (browser)

```mathematica
FrontFetchAsync[expr_, opts___] _Promise
```

and returns [Promise](frontend/Reference/Misc/Promise.md) object.

## Options
### `"Window"`
specifies a window socket, to which an expression will be sent. Use [CurrentWindow](frontend/Reference/Frontend%20IO/CurrentWindow.md) to fetch a window object from the evaluation context explicitly.

### `"Format"`
The default expression form used to import raw data acquired from the frontend. It effectively applies `ImportString` on raw JSON data. The possible values
- `"RawJSON"` (*the default*)
- `"JSON"`
- `"ExpressionJSON"`
- `"Raw"` bypasses parser and returns a string


## Usage with FrontInstanceReference
Using an extension [FrontInstanceReference](frontend/Reference/Frontend%20IO/FrontInstanceReference.md), one can execute an expression in the context of a specified container and fetch the result back

```mathematica
FrontFetchAsync[expr_, m_FrontInstanceReference, opts___] _Promise
```

See examples on [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md#Usage%20with%20Meta-Markers)

## Examples
To read the selected text from a cell and print it to another cell

```mathematica
With[{cell = ResultCell[]},
  EventHandler[InputButton["Read selected text"], Function[Null, 
    
      Then[FrontFetchAsync[FrontEditorSelected["Get"]], Function[result,
      CellPrint[result 
        , "After"->cell];
      ]
    ]
  ]]
]
```

or to read a clipboard of a user

```mathematica
With[{cell = ResultCell[]},
  EventHandler[InputButton["Read clipboard"], Function[Null, 
    
      Then[FrontFetchAsync[ReadClipboard[]], Function[result,
      CellPrint[result 
        , "After"->cell];
      ]
    ]
  ]]
]
```