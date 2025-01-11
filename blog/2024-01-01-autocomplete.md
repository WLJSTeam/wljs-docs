---
authors: jerryi
tags:
  - short
  - speech
---
# Autocomplete Input
We added a new standard input element! `InputAutocomplete`. Here is a short demo on that together with a text-to-speech example

```mathematica
EventHandler[InputAutocomplete[Function[{data, cbk},
  cbk[DictionaryLookup[data<>"*", 6]];
], "ClearOnSubmit"->False], Function[text,
  SpeechSynthesize[text, GeneratedAssetLocation -> None] // EmitSound
]]
```