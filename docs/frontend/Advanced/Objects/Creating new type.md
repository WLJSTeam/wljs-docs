---
sidebar_position: 1
---
# 1. Creating new type

OOP elements fit Wolfram Language very nicely if you thing about in more general sense as an abstract isolated entities of something which can communicate with each other using messages and have their own internal states.

## Properties and methods
Let it be an object with a single field default `"State"`

```mathematica
CreateType[StateMachine, init, {"State"->1}]
init[o_] := o["UId"] = CreateUUID[];
```

Here we also assigned a unique text ID to it for the future using __constructor function__ `init`. By calling now `StateMachine` we *create an instance of this type*

```mathematica
machine = StateMachine[]
```

![](./../../../Screenshot%202024-05-01%20at%2019.02.35.png)

Think about it if it as an `Association`.

One can assign any properties, but __just be aware that `Set` has `HoldFirst` attribute and set any properties using__ `With` 

```mathematica
With[{o = machine},
	o["State"] = 33
]
```

One can also see all properties using a special key

```mathematica
machine["Properties"]
```


:::info
See the full guide from Kirill Belov on *Objects* core package at [Wolfam Community](https://community.wolfram.com/groups/-/m/t/3092778)
:::

:::note
There is no need in installing *Objects* paclet. This is already a part of WLJS Notebook Kernel
:::

Time to define sort of *methods* of created types:

```mathematica
StateMachineChange[s_StateMachine, state_Integer] := With[{},
  s["State"] = state;
  s
]

StateMachine /: Delete[s_StateMachine] := With[{},
  DeleteObject[s]
]
```

then to update the state we only need to call this on our object instance

```mathematica
StateMachineChange[machine, 1];
machine["State"]
```

```mathematica
1
```

### Namespaces (Optional)
In a case if you want to use reserved symbol names (or possible reserved in the future) such as `Update` or `Change` directly - use namespaces aka context separation:

```mathematica
CreateType[StateMachine`StateMachine, init, {"State"->1}]
init[o_] := o["UId"] = CreateUUID[];

StateMachine`Change[s_StateMachine`StateMachine, state_Integer] := With[{},
  s["State"] = state;
  s
]

StateMachine`Delete[s_StateMachine`StateMachine] := With[{},
  DeleteObject[s]
]
```

Then make an alias:

```mathematica
$ContextAliases["s`"] = "StateMachine`";
```

:::tip
If you make it into a Wolfram Package later you can import it using `Needs` as following

```mathematica
Needs["StateMachine`" -> "s`"]
```
:::

```mathematica
machine = s`StateMachine[];
s`Change[machine, 1];
machine["State"]
```

## Event system
Subscription / published model is quite often applied to objects in OOP. Moreover this comes handy when we need to perform asynchronous tasks and needles to say it plays a great role in communicating between different objects. Here we will integrate it with [Events](frontend/Reference/Misc/Events.md) system we built.

Firstly, since [Events](frontend/Reference/Misc/Events.md) uses mostly text-strings as an identifiers for event objects, we rely on `"UId"` field generated in a constructor function

```mathematica
StateMachine /: EventFire[s_StateMachine, opts__] := EventFire[s["UId"], opts]

StateMachine /: EventHandler[s_StateMachine, opts__] := EventHandler[s["UId"], opts]

StateMachine /: EventClone[s_StateMachine] := EventClone[s["UId"]]
StateMachine /: EventRemove[s_StateMachine] := EventRemove[s["UId"]]
```

To notify all subscribers we need to modify our method of settings the state

```mathematica
StateMachineChange[s_StateMachine, state_Integer] := With[{},
  s["State"] = state;
  EventFire[s, "State", state]; (* THIS LINE *)
  s
]

StateMachine /: Delete[s_StateMachine] := With[{},
  EventFire[s, "Destroy", Null];
  DeleteObject[s]
]
```

Let us check how it works!

```mathematica
machine = StateMachine[];
EventHandler[StateMachine, Beep]; (* make sound *)
```

```mathematica
StateMachineChange[machine, RandomInteger[{1,10}]];
```

Every time you change the state *it will make sound*.

:::info
See more about event system [here](frontend/Reference/Misc/Events.md)
:::

One can also subscribe to a particular pattern or topic
```mathematica
EventHandler[StateMachine, {
	"State" -> Function[state, Print[state]]
}]; 
```

:::info
This is a core mechanism in WLJS notebook interface
:::