#!/usr/bin/env wolframscript


SetDirectory[DirectoryName[$InputFileName] ];

If[RunProcess["ls"]["ExitCode"] =!= 0, Echo["Not gonna work"]; Exit[-1]; ];

originalConfig = Import["docusaurus.config.js", "Text"];
wljsConfig = Import["docusaurus.config.wljs.js", "Text"];

(*DeleteDirectory["build", DeleteContents->True];
DeleteDirectory["releases", DeleteContents->True];
DeleteDirectory["blog", DeleteContents->True];
DeleteDirectory["src/pages/wljs-demo", DeleteContents->True];*)

Export["docusaurus.config.js", wljsConfig, "Text"];

p = RunProcess["npm run build"];
If[p["ExitCode"] =!= 0, 
    Print[p["StandardError"] ]; 
    Export["docusaurus.config.js", originalConfig, "Text"];
    Exit[-1]; 
];

Export["docusaurus.config.js", originalConfig, "Text"];