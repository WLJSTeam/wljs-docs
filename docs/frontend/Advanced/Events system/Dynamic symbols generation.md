---
draft: false
---
One can combine the power of [Interpretation](frontend/Reference/Formatting/Interpretation.md) and [Offload](frontend/Reference/Interpreter/Offload.md) to generate dynamic symbols, which can be controlled by their syntactic sugar or decorative box!

## Easy Solution
Use the [``Offload`FromEventObject``](frontend/Reference/Interpreter/OffloadFromEventObject.md) expression to transform any [InputRange](frontend/Reference/GUI/InputRange.md), [InputText](frontend/Reference/GUI/InputText.md), or [InputJoystick](frontend/Reference/GUI/InputJoystick.md) into a dynamic symbol.

It feels similar to what Mathematica's `Dynamic` keyword produces:

```mathematica title="evaluate"
Offload`FromEventObject[InputRange[-1,1,0.1]]
```

__Cut and paste it into:__

```mathematica @
Rectangle[{-1,-1}, { (*BB[*)(*here*)(*,*)(*"1:eJxTTMoPSmNhYGAo5gcSAUX5ZZkpqSn+BSWZ+XnFaYwgCS4g4Zyfm5uaV+KUXxEMUqxsbm6exgSSBPGCSnNSg9mAjOCSosy8dLBYSFFpKpoKkDkeqYkpEFXBILO1sCgJSczMQVYCAOFrJEU="*)(*]BB*), 1}]
```

![](./../../../Generated.mov%20to%20GIF%201.gif)

Consider using the following symbols as well to trick a user—or yourself:

- [FrontEditorSelected](frontend/Reference/Interpreter/FrontEditorSelected.md)
- [Interpretation](frontend/Reference/Formatting/Interpretation.md)
- [MakeBoxes](frontend/Reference/Formatting/MakeBoxes.md)
- [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md)
- [Offload](frontend/Reference/Interpreter/Offload.md)

