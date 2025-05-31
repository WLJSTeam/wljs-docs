# Routing

:::tip
Remember the number one rule: __1 pattern of an event object__ = __1 handler__.

To assign more, you need to clone ([`EventClone`](frontend/Reference/Misc/Events.md#`EventClone`)) the original object or use another pattern or topic.
:::

Since the notebook is usually a playground, you need to have the ability to undo actions when you reevaluate the cell. Therefore, there is a concept of explicitly routing one event to other handlers.

For example, you can have a generator of events (it doesn't necessarily have to be a button):

```mathematica
generator[uid_String] := With[{btn = InputButton["Click"]},
	(* We use the input button only for demonstration purposes *)
	(* You can fire any EventObject manually using EventFire[] *)

	EventHandler[btn, Function[Null,
		EventFire[uid, "some data"];
	]];
	
	btn
]
```

Here, we used the representation of the event object as a string `uid` (which is also valid) and fired it using a button (which also returns an [`EventObject`](frontend/Reference/Misc/Events.md#`EventObject`)).

Now we need an arbitrary handler:

```mathematica
handler[uid_String, func_:Print] := With[{ev = EventClone[uid]},
	(* Clean up if the cell has been destroyed *)
	EventHandler[ResultCell[], {"Destroy" -> Function[Null, Delete[ev]]}];

	(* Assign Print, for instance *)
	EventHandler[ev, func];
]
```

:::info
You do not need to clone [EvaluationCell](frontend/Reference/Cells%20and%20Notebook/EvaluationCell.md) or [ResultCell](frontend/Reference/Cells%20and%20Notebook/ResultCell.md) to assign many handlers to them. They are cloned automatically once they appear in [`EventHandler`](frontend/Reference/Misc/Events.md#`EventHandler`).
:::

The cool thing is that we can have many of these `handler`s attached to the same event, since it is cloned every time and the handler function is removed when you reevaluate the cell. Let's see this in the following example:

```mathematica
generator["random-word-you-like"]
handler["random-word-you-like"]
```

And in some other cell, if you like, you can add another handler to the same event:

```mathematica
handler["random-word-you-like", FrontSubmit[Alert[#]]&]
```

By pressing the button, it will call the entire list of attached handlers.

This approach comes in very handy when you are constructing complex animations on [Slides](frontend/Cell%20types/Slides.md).