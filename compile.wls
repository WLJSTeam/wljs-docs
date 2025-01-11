#!/usr/bin/env wolframscript

SetAttribute[Offload, HoldFirst]

Offload = Hold

Plotly[f_, range_, op : OptionsPattern[Plot]] := Plot[f, range, op] // Cases[#, Line[x_] :> x, All] & // ListLinePlotly[#, op] & 

TextNode /: ToString[TextNode[x_]] := x["data"];
WLNode /: ToString[WLNode[x_]] := "<Wl data={`"<>x["data"]<>"`}"<>">"<>x["src"]<>"</Wl>";

Enc[expr_] := ExportString[expr, "ExpressionJSON", "Compact"->1]
(*Enc[expr_] := "\""<>Compress[expr]<>"\"";*)

compile[str_] := Module[{tokens, open, close},
    open = StringPosition[str, RegularExpression["<Wl[^<|>]*>"] ];
    close = StringPosition[str, RegularExpression["</Wl>"] ];
    tokens = Join[(<|"type"->"open", "pos"-> #|>) &/@ open,
    (<|"type"->"close", "pos"-> #|>) &/@ close];

    tokens = Partition[SortBy[tokens, #["pos"][[1]]&],2];
    tokens = Map[<|"pos"->{#[[1]]["pos"][[1]], #[[2]]["pos"][[2]]}, "src"->StringDrop[StringTake[str, #[[2]]["pos"][[1]]-1], #[[1]]["pos"][[2]]]|>&, tokens];
    Map[With[{t = #}, 
        With[{hash = Hash[StringTrim[ StringDrop[StringDrop[t["src"],2],-2] ], "MD5", "HexString"]},
    
            Export[FileNameJoin[{"static", "expressions", StringTemplate["``.json"][hash]}], Enc[ToExpression[StringDrop[StringDrop[t["src"],2],-2], InputForm] ], "Text"];
        ];
    ] &, tokens];
]

DeleteFile /@ FileNames["*.json", FileNameJoin[{"static", "expressions"}] ];

files = Join[FileNames["*.md", FileNameJoin[{Directory[], "docs"}], Infinity], FileNames["*.md", FileNameJoin[{Directory[], "blog"}], Infinity]];
files = Select[files, StringMatchQ[Import[#, "String"], ___~~"</Wl>"~~___]&];
With[{t = Print[#], res = compile[Import[#, "String"] ]},
    Null
] &/@ files;