<|"notebook" -> <|"name" -> "Cenobitic", "id" -> "doing-ffb48", 
   "kernel" -> LocalKernel, "objects" -> 
    <|"b8d98b3e-30df-4f62-8525-6e87b61ce637" -> 
      <|"json" -> "[\"RangeView\",[\"List\",0,6,0.5,3.0],[\"Rule\",\"'Event'\
\",\"'d0cca3ab-2079-42c6-a7a7-16f39169c078'\"]]", 
       "date" -> DateObject[{2023, 6, 12, 15, 59, 
          17.043656`7.984137744573426}, "Instant", "Gregorian", 3.]|>, 
     "92ec51cf-84bb-4626-a875-2ebb5f241391" -> 
      <|"json" -> "[\"RangeView\",[\"List\",0,6,0.5,\"v\"]]", 
       "date" -> DateObject[{2023, 6, 12, 16, 7, 8.415729`7.677666729032422}, 
         "Instant", "Gregorian", 3.]|>, 
     "7801fd1c-f714-453e-9a64-1e8e7ce9f783" -> 
      <|"json" -> "[\"Graphics\",[\"List\",[\"RGBColor\",0,1,1],[\"Line\",[\"\
Hold\",[\"With\",[\"List\",[\"Set\",\"y\",\"v\"]],[\"Table\",[\"List\",[\"Cos\
\",\"x\"],[\"Sin\",[\"Times\",\"y\",\"x\"]]],[\"List\",\"x\",0,[\"Times\",2,\
\"Pi\"],1.0e-2]]]]]]]", "date" -> DateObject[{2023, 6, 12, 16, 7, 
          8.424273`7.67810741928552}, "Instant", "Gregorian", 3.]|>|>, 
   "path" -> "/Volumes/Data/Github/wolfram-js-frontend/Demo/Experimental/Slid\
erExampleStandalone.wl", "cell" :> Exit[], 
   "date" -> DateObject[{2023, 6, 12, 16, 7, 1.717621`6.987502330124641}, 
     "Instant", "Gregorian", 3.]|>, 
 "cells" -> {<|"id" -> "7e5a41fb-9ca0-458a-bf58-1df776ea7dbb", 
    "type" -> "input", "data" -> ".mdslider = InputRange[0,6, 0.5] \nTo \
define slider use `InputRange` symbol (simillar to one you have in HTML)", 
    "display" -> "codemirror", "sign" -> "doing-ffb48", 
    "props" -> <|"hidden" -> True|>|>, 
   <|"id" -> "1c4801ff-5fb1-4b88-9355-84ff0c68b902", "type" -> "output", 
    "data" -> "\nTo define slider use `InputRange` symbol (simillar to one \
you have in HTML)", "display" -> "markdown", "sign" -> "doing-ffb48", 
    "props" -> <|"hidden" -> False|>|>, 
   <|"id" -> "d8b34085-1f45-46ea-9af2-520b3f13eda2", "type" -> "input", 
    "data" -> "RangeView[{0,6,0.5, v}]//CreateFrontEndObject", 
    "display" -> "codemirror", "sign" -> "doing-ffb48", 
    "props" -> <|"hidden" -> False|>|>, 
   <|"id" -> "7c6ac6d9-af88-4445-bca1-20125f9c20cf", "type" -> "output", 
    "data" -> "FrontEndExecutable[\"92ec51cf-84bb-4626-a875-2ebb5f241391\"]", 
    "display" -> "codemirror", "sign" -> "doing-ffb48", 
    "props" -> <|"hidden" -> False|>|>, 
   <|"id" -> "18859a2b-d502-42aa-ba66-de18c19715b9", "type" -> "input", 
    "data" -> ".md\nThere is no need in assigning a handler function, since \
it works just in browser", "display" -> "codemirror", 
    "sign" -> "doing-ffb48", "props" -> <|"hidden" -> True|>|>, 
   <|"id" -> "778c22d3-0687-4d54-baa7-4bc92e85998b", "type" -> "output", 
    "data" -> "\nThere is no need in assigning a handler function, since it \
works just in browser", "display" -> "markdown", "sign" -> "doing-ffb48", 
    "props" -> <|"hidden" -> False|>|>, 
   <|"id" -> "4f6b5aca-b973-4755-bfe0-de9f651221d6", "type" -> "input", 
    "data" -> ".md\nLet's attach to our variable something interesting", 
    "display" -> "codemirror", "sign" -> "doing-ffb48", 
    "props" -> <|"hidden" -> True|>|>, 
   <|"id" -> "a172e9b7-58a1-4fd1-b889-a4790aee6a01", "type" -> "output", 
    "data" -> "\nLet's attach to our variable something interesting", 
    "display" -> "markdown", "sign" -> "doing-ffb48", 
    "props" -> <|"hidden" -> False|>|>, 
   <|"id" -> "eb234683-3f7b-4e30-94c8-7d0bc4931828", "type" -> "input", 
    "data" -> "Graphics[{Cyan, Line[With[{y = v}, Table[{Cos[x], Sin[y x]}, \
{x,0,2$Pi$, 0.01}]] // Hold]}]", "display" -> "codemirror", 
    "sign" -> "doing-ffb48", "props" -> <|"hidden" -> False|>|>, 
   <|"id" -> "956defb0-e421-465e-b4d6-770b5bf197c5", "type" -> "output", 
    "data" -> "FrontEndExecutable[\"7801fd1c-f714-453e-9a64-1e8e7ce9f783\"]", 
    "display" -> "codemirror", "sign" -> "doing-ffb48", 
    "props" -> <|"hidden" -> False|>|>, 
   <|"id" -> "410a8ff5-3c76-4d70-b4cf-122f8cfe3a46", "type" -> "input", 
    "data" -> ".md\nIt will work offline, there is no data-transfer to \
Wolfram Kernel needed", "display" -> "codemirror", "sign" -> "doing-ffb48", 
    "props" -> <|"hidden" -> True|>|>, 
   <|"id" -> "d9cc9455-a652-45dc-b821-11bb78d75a79", "type" -> "output", 
    "data" -> "\nIt will work offline, there is no data-transfer to Wolfram \
Kernel needed", "display" -> "markdown", "sign" -> "doing-ffb48", 
    "props" -> <|"hidden" -> False|>|>}, "serializer" -> "jsfn3"|>
