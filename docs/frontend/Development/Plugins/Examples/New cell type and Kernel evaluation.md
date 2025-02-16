---
sidebar_position: 3
---
:::info
A ready to-go example is in [this repository](https://github.com/JerryI/wljs-plugin-example-3), Clone it to `<AppData>/wljs-notebook/wljs_packages`

```bash
git clone https://github.com/JerryI/wljs-plugin-example-3
```

and restart WLJS Notebook
:::

In this tutorial we will add new cell type, which implements basic Wolfram expression evaluation and returns the result in [InputForm](frontend/Reference/Formatting/InputForm.md). Our new cell type will start from a simple

```mathematica
.m
Red
```

to avoid conflicts with a default wolfram language input.

__Summary__ what will be done
- package for *main kernel*, which implement a new evaluator
- working with kernel transactions
- loading packages on-demand to *evaluation kernel*



## Preparations
Use [wljs-plugin-template](https://github.com/JerryI/wljs-plugin-template) template and create a new repository. Then clone new repository to `<AppData>/wljs-notebook/wljs_packages` folder. For example

```bash
git clone https://github.com/JerryI/wljs-plugin-example-3
```

Then edit the content of `package.json`

```json title="package.json"
{
    "name": "wljs-plugin-example-3",
    "version": "0.0.1",
    "description": "An example plugin for WLJS Notebook",
    "wljs-meta": {
        "frontend": [
            "src/Frontend.wl"
        ],
        "priority": 5000,
        "category": "Notebook Extensions"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/JerryI/wljs-plugin-example-3"
    }
}
```

In principle we need `.wl` files for both *main kernel* and *evaluation kernel*. However, the last one we can defer and load only when a user firstly evaluates our new cell type. This will reduce the total loading time of a new evaluation kernel.
## Main kernel package
Let's define our package and include the necessary libraries

```mathematica title="src/Frontend.wl"
BeginPackage["CoffeeLiqueur`Extensions`BasicEval`", {
    "CoffeeLiqueur`Notebook`Transactions`",
    "CodeParser`"
}]

Needs["CoffeeLiqueur`Notebook`Kernel`" -> "GenericKernel`"];
Needs["CoffeeLiqueur`Notebook`Evaluator`" -> "StandardEvaluator`"];

Begin["`Private`"]



End[]
EndPackage[]
```

Here we import a few important contexts

```mathematica
CoffeeLiqueur`Notebook`Transactions`
```

provides `Transaction[]` constructor. Evaluation of any content is done via such objects, which contain the evaluation data and meta-data and abstracted from the actual cells. `CodeParser` we need for syntax check of our expressions before the evaluation.

The rest two

```mathematica
CoffeeLiqueur`Notebook`Kernel`
CoffeeLiqueur`Notebook`Evaluator`
```

we need for submitting transactions to evaluation kernels, while the last one defines an abstract class for *evaluator*. For each cell type one can define an *evaluator*, which is applied and perform the evaluation of the transaction based on the pattern matching. 

Here is how we can do that for our `.m` cells

```mathematica
Q[t_Transaction] := StringMatchQ[t["Data"], ".m\n"~~___]

evaluator  = StandardEvaluator`StandardEvaluator["Name" -> "Basic InputForm Evaluator", "Pattern" -> (_?Q), "Priority"->(2)];
```

`Q` function simply checks the content of the transaction for our notation. Now we can define the necessary methods for our `evaluator`

```mathematica
StandardEvaluator`ReadyQ[evaluator, k_] := (
    If[! TrueQ[k["ReadyQ"] ] || ! TrueQ[k["ContainerReadyQ"] ],
        EventFire[t, "Error", "Kernel is not ready"];
        Print[evaluator, "Kernel is not ready"];
        False
    ,
        True
    ]
);
```

This one checks if kernel is ready. The evaluation itself is abstracted from kernels. Some of cell types do not involve *evaluation kernel* at all: [Javascript](frontend/Cell%20types/Javascript.md), [Shell](frontend/Cell%20types/Many%20more.md#Shell), [Mermaid](frontend/Cell%20types/Many%20more.md#Mermaid). That is the reason, we have those checks on the level of evaluators. 

The second mandatory method is actual evaluation

```mathematica
StandardEvaluator`EvaluateTransaction[evaluator, k_, t_] := Module[{list},
     t["Data"] = StringDrop[t["Data"], 3];

     If[StringLength[StringTrim[t["Data"] ] ] === 0,
        EventFire[t, "Error", "No input"];
        Echo["Syntax Error!"];
        Return[$Failed];
     ];

     With[{check = CheckSyntax[t["Data"] ]},
        If[! TrueQ[check],
            EventFire[t, "Error", check];
            Echo["Syntax Error!"];
            Return[$Failed];
        ];

        list = SplitExpression[t["Data"] ];
        
        MapIndexed[
            With[{message = StringTrim[#1], index = #2[[1]], transaction = Transaction[]},
                If[StringTake[message, -1] === ";", 
                    transaction["Nooutput"] = True;
                    transaction["Data"] = StringDrop[message, -1];
                ,
                    transaction["Data"] = message;
                ];
                
                transaction["Evaluator"] = Internal`Kernel`BasicEval;
                
                (* check if it is the last one *)
                If[index === Length[list],
                    EventHandler[transaction, {
                        (* capture successfull event of the last transaction to end the process *)  
                        "Result" -> Function[data, 
                            EventFire[t, "Result", data];
                            EventFire[t, "Finished", True];
                        ],
                        (* fwd the rest *)
                        name_ :> Function[data, EventFire[t, name, data] ]
                    }];          
                ,
                    EventHandler[transaction, {
                        name_ :> Function[data, EventFire[t, name, data] ]
                    }];                
                ];

                Print[evaluator, "Submit transaction!"];
                GenericKernel`SubmitTransaction[k, transaction];
            ]&
        ,  list];
    ];      
];  
```

Many things happen. First we check the syntax of the provided transaction data, then split a multiple lines of expressions to separate transactions aka

```wolfram
1+1
(* <- break *)
2+2
```

We assign for each new transaction an evaluation function

```mathematica
Internal`Kernel`BasicEval
```

that will be called on the *evaluation kernel* on the given transaction. We will define it later. Transaction objects have defined up-values for event-system methods. It means you can listen and fire events on them. After the line

```
GenericKernel`SubmitTransaction[k, transaction];
```

a transaction goes to *evaluation kernel* and depending on evaluation function and the content 2 event patterns can usually be emitted

- `"Result"` evaluation has been finished and the result is provided in payload
- `"Error"` an error occurred

However your initial transaction object you receive as a method's argument `t` has __one more pattern__

- `"Finished"` indicates that the evaluation is fully complete. Must be fired after all possible `"Result"` events

This one ensures, that all extra steps are done (if the expression was split into multiple transactions) and a cell or other handler can change its state to `idle`. 

The remaining functions for syntax check and splitting are 

```mathematica
SplitExpression[str_] := With[{},
  Select[Select[(StringTake[str, Partition[Join[{1}, #, {StringLength[str]}], 2]] &@
   Flatten[{#1 - 1, #2 + 1} & @@@ 
     Sort@
      Cases[
       CodeParser`CodeConcreteParse[str, 
         CodeParser`SourceConvention -> "SourceCharacterIndex"][[2]], 
       LeafNode[Token`Newline, _, a_] :> Lookup[a, Source, Nothing]]]), StringQ], (StringLength[#]>0) &]
];

CheckSyntax[str_String] := 
    Module[{syntaxErrors = Cases[CodeParser`CodeParse[str],(ErrorNode|AbstractSyntaxErrorNode|UnterminatedGroupNode|UnterminatedCallNode)[___],Infinity]},
        If[Length[syntaxErrors]=!=0 ,
            

            Return[StringRiffle[
                TemplateApply["Syntax error `` at line `` column ``",
                    {ToString[#1],Sequence@@#3[CodeParser`Source][[1]]}
                ]&@@@syntaxErrors

            , "\n"], Module];
        ];
        Return[True, Module];
    ];
```


## Evaluation kernel package
This package file implements the missing evaluation function  

```mathematica title="src/Preload.wl"
BeginPackage["CoffeeLiqueur`Extensions`BasicEval`", {
    "JerryI`Misc`Events`"
}]

Begin["`Private`"]

Internal`Kernel`BasicEval = Function[t, 
    With[{hash = CreateUUID[]},
        With[{result = (ToExpression[ t["Data"], InputForm, Hold]) // ReleaseHold },
            If[KeyExistsQ[t, "Nooutput"],
                EventFire[Internal`Kernel`Stdout[ t["Hash"] ], "Result", <|"Data" -> Null |> ];
            ,   
                With[{string = ToString[result, InputForm]},
                    EventFire[Internal`Kernel`Stdout[ t["Hash"] ], "Result", <|"Data" -> string, "Display"->"codemirror", "Meta"->Sequence["Hash"->hash] |> ];
                ]
            ];
        ];
    ] 
];

End[]
EndPackage[]
```

There is nothing special here. We accept the transaction in a form of `Association` (the serialization of transaction object) and apply `ToExpression` almost directly.

The result is then sent using event interface with an additional wrapper symbol `Stdout` which indicates, that the it has to be fired to a remote Wolfram Kernel. In the payload a meta data regarding the output cell type and display function is shared.  Display functions are pre-defined on Javascript side.

As a rule, if it is possible to defer the loading of some package, you shout do it. This exactly this case, we can load `src/Preload.wl` only when our cell is about to be sent for the evaluation. For that reason we can extend `ReadyQ` method, which is called before the evaluation

```mathematica
rootFolder = $InputFileName // DirectoryName // ParentDirectory;
preload = Import[FileNameJoin[{rootFolder, "src", "Preload.wl"}], "Text"];

StandardEvaluator`ReadyQ[evaluator, k_] := (
    If[! TrueQ[k["ReadyQ"] ] || ! TrueQ[k["ContainerReadyQ"] ],
        EventFire[t, "Error", "Kernel is not ready"];
        Print[evaluator, "Kernel is not ready"];
        False
    ,

        Print[evaluator, "Preload"];

        With[{preload = preload},
            GenericKernel`Init[k, 
                ImportString[preload, "WL"]
            , "Once"->True];
        ];

        True
    ]
);
```

:::note
It is also possible to define a custom display function in Javascript for your new cell type (both: input and output), but this is a topic for the next tutorial.
:::

Now restart WLJS Notebook and enjoy pure [InputForm](frontend/Reference/Formatting/InputForm.md) 

![](./../../../../Screenshot%202025-02-12%20at%2019.25.50.png)

:::tip
Full source code can be found in [this repository](https://github.com/JerryI/wljs-plugin-example-3)
:::