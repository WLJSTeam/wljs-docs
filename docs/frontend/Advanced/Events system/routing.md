# Routing

:::tip
Remember the number 1 rule: __1 pattern of an event object__ = __1 handler__

To assign more, you need to clone ([`EventClone`](frontend/Reference/Misc/Events.md#`EventClone`)) the original object or use other pattern or topic.
:::

Since the notebook is usually a playground, you need to have an opportunity to undo actions, when you reevaluate the cell. Therefore there is concept of explicit routing of one event to some other handlers.

For example you have a generator of events (does not necessary has to be a button)

```mathematica
generator[uid_String] := With[{btn = InputButton["Click"]},
	(* we use input button only for demonstration purposes *)
	(* one can fire any EventObject manually using EventFire[] *)

	EventHandler[btn, Function[Null,
		EventFire[uid, "some data"];
	]];
	
	btn
]
```

here we used the representation of events object as a string `uid` (it is also valid) and fire it using a button (which also returns [`EventObject`](frontend/Reference/Misc/Events.md#`EventObject`)).

Now we need an arbitrary handler

```mathematica
handler[uid_String, func_:Print] := With[{ev = EventClone[uid]},
	(* clean up, if the cell has been destroyed *)
	EventHandler[ResultCell[], {"Destroy" -> Function[Null, Delete[ev]]}];

	(* assign Print for instance *)
	EventHandler[ev, func];
]
```

:::info
You do not need to clone [EvaluationCell](frontend/Reference/Cells%20and%20Notebook/EvaluationCell.md) or [ResultCell](frontend/Reference/Cells%20and%20Notebook/ResultCell.md) to assign many handlers to it. it is cloned automatically once appeared in [`EventHandler`](frontend/Reference/Misc/Events.md#`EventHandler`)
:::

The cool thing, that we can have many of those `handler`s attached to the same event, since it clones it every-time and removes handler function, when you reevaluate the cell. Let us see it on the following example

```mathematica
generator["random-word-you-like"]
handler["random-word-you-like"]
```

and in some other cell, if you like you can add other handler to the same event

```mathematica
handler["random-word-you-like", FrontSubmit[Alert[#]]&]
```

By pressing the button, it will call the whole list of attached handlers.

This approach comes very handy, when you are constructing complex animation on [Slides](frontend/Cell%20types/Slides.md)

