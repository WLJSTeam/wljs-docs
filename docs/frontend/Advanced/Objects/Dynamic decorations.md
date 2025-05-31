---
sidebar_position: 3
---

# 3. Dynamic decorations

In this part we will try to synchronize the state of our symbols or objects with corresponding decorations we created in the previous part.

:::tip
If you are looking for a simpler way, please, see [Deferred mode ❤️](#Deferred%20mode%20❤️)
:::

## Dynamic summary item
We have already explored the possibility of animated icons in [Animated decoration in Summary Item](frontend/Advanced/Objects/Static%20decorations.md#Animated%20decoration%20in%20Summary%20Item), therefore there is no obstacles in doing the same in sync with state changes of our object.

```mathematica
StateMachine /: MakeBoxes[s: StateMachine[symbol_Symbol?AssociationQ], form: (StandardForm | TraditionalForm)] := Module[{
	state = s["State"] // ToString,
    instances = 0,
    eventObject, construct, destruct
}, With[{
	textField = EditorView[state // Offload],
	controller = CreateUUID[],
    win = CurrentWindow[]
},

    (* if notebook was closed *)
    EventHandler[win, {"Closed" -> Function[Null,
          Print["All removed"];
          destruct;
    ]}];

    construct := With[{},
      (* subscribe to object events and update decoration *)
      eventObject = EventClone[s];
      EventHandler[eventObject, {
        "State" -> Function[new, state = new // ToString]
      }];     
    ];

    destruct := With[{},
      Echo["Removed"];
	  EventRemove[eventObject];    
      instances = 0;
    ];

	EventHandler[controller, {
		"Mounted" -> Function[Null,

          If[instances === 0, construct];
          instances = instances + 1;

		],
		
		"Destroy" -> Function[Null, 
			instances = instances - 1;
			
	        (* unsubscribe when there is no instances *)
	        If[instances === 0, destruct];
          ]
	}];

	With[{
		summary = {BoxForm`SummaryItem[{"State: ", textField}]}
	},
		BoxForm`ArrangeSummaryBox[
			StateMachine,
			s,
			None,
			summary,
            Null,

			"Event" -> controller
		]
	]
] ]
```

The idea is the same, but instead of static value, we substituted to  ``BoxForm`SummaryItem`` a dynamic element [EditorView](frontend/Reference/GUI/EditorView.md) which is updated by the a handler function subscribed to updates of our instance.

Let us test it
```mathematica
instance = StateMachine[]
```

*you can copy and paste instances with no issues, since it is tracked by a variable in the box decoration code*

and change the state

```mathematica
StateMachineChange[instance, RandomInteger[{1,10}]];
```

![](./../../../DynamicDeco%20video.gif)

## Controllers
We can also mutate our object from the decoration by substituting [InputRange](frontend/Reference/GUI/InputRange.md) or something like this to a widget. Right..?

```mathematica
StateMachine /: MakeBoxes[s: StateMachine[symbol_Symbol?AssociationQ], form: (StandardForm | TraditionalForm)] := Module[{
	state = s["State"] // ToString,
    instances = 0,
    eventObject, construct, destruct, slider
}, With[{
	textField = EditorView[state // Offload],
	controller = CreateUUID[],
    win = CurrentWindow[]
},

    (* if notebook was closed *)
    EventHandler[win, {"Closed" -> Function[Null,
          Print["All removed"];
          destruct;
    ]}];

    
    slider = InputRange[0, 10, 1, s["State"]];
    EventHandler[slider, Function[n, 
      StateMachineChange[s, n]
    ]];

    construct := With[{},
      (* subscribe to object events and update decoration *)
      eventObject = EventClone[s];
      EventHandler[eventObject, {
        "State" -> Function[new, state = new // ToString]
      }];     
    ];

    destruct := With[{},
      Echo["Removed"];
	  EventRemove[eventObject];    
      instances =0;
    ];

	EventHandler[controller, {
		"Mounted" -> Function[Null,
          Print["Mounted"];
          
          If[instances === 0, construct];
          instances = instances + 1;

		],
		
		"Destroy" -> Function[Null, 
			instances = instances - 1;
			
	        (* unsubscribe when there is no instances *)
	        If[instances === 0, destruct];
          ]
	}];

	With[{
		summary = {
          BoxForm`SummaryItem[{"State: ", textField}],
          BoxForm`SummaryItem[{"", slider}]
        }
	},
		BoxForm`ArrangeSummaryBox[
			StateMachine,
			s,
			None,
			summary,
            Null,

			"Event" -> controller
		]
	]
] ]
```

We added only a few line for `slider`. The rest is the same

![](./../../../Screen%20Recording%20May%2001.gif)

:::warning
[InputRange](frontend/Reference/GUI/InputRange.md) does not support multiple instances and might have a conflict with DOM ids if copied and pasted from the same generated output.

To solve this issue, we your own slider, which is generated purely from Javascript on each run. See how in [Communication](frontend/Advanced/Javascript/Communication.md)
:::

## Deferred mode ❤️
This is a new feature introduced recently for [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md), aimed to solve all hassle required for maintaining the instances of the same object. The idea is to create decorations upon rendering.

Please see on how to implement it in [Decorating symbols](frontend/Advanced/Syntax%20sugar/Decorating%20symbols.md#Deferred)

