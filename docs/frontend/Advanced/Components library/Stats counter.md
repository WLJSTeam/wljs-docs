---
tags:
  - animation
---
It provides an intuitive counter for some stats  to be used on [FrontSlidesSelected](frontend/Reference/Slides/FrontSlidesSelected.md). This component is designed to incrementally count up to a specified value

![](./../../../dynamicstats-ezgif.com-video-to-gif-converter.gif)

For example

```jsx
.slide

# Dynamic stats
Here is our data

<div class="justify-center flex flex-row ml-auto mr-auto">

<Stat Count={128}>Label 1</Stat>
<Stat Count={256}>Label 2</Stat>

</div>
```

It automatically tracks the slides and resets the counter if needed.
## Source code
Copy and paste this into an input cell and evaluate

```jsx
.wlx

StatCounter[Text_, OptionsPattern[]] := LeakyModule[{
  cnt = 0, 
  task
}, With[{
  ev = CreateUUID[],
  HTMLCounter = HTMLView[cnt // Offload],
  max = OptionValue["Count"]
},
  EventHandler[ev, {
    "Destroy" -> Function[Null,
      EventRemove[ev]; 
      If[task["TaskStatus"] === "Running", TaskRemove[task]];
      ClearAll[task];
    ],

    "Left" -> Function[Null,
      cnt = 0;
    ],

    "Slide" -> Function[Null,
      If[task["TaskStatus"] === "Running", TaskRemove[task]];
      task = SetInterval[
        If[cnt < max, cnt = cnt + 1,
          TaskRemove[task];
        ];
      , 15];
    ]
  }];

  <div class="text-center text-gray-600 m-4 p-4 rounded bg-gray-100 flex flex-col">
    <HTMLCounter/>
    <span class="text-md"><Text/></span>
    <SlideEventListener Id={ev}/>
  </div>
] ]

Options[StatCounter] = {"Count"->1};
```