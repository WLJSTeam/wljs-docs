---
draft: false
---
One can combine the power of [Interpretation](frontend/Reference/Formatting/Interpretation.md) and [Offload](frontend/Reference/Interpreter/Offload.md) to generate dynamic symbols, which can be controlled by its syntax sugar or decoration box!

## Easy solution
Use [``Offload`FromEventObject``](frontend/Reference/Interpreter/OffloadFromEventObject.md) expression to transform any [InputRange](frontend/Reference/GUI/InputRange.md), [InputText](frontend/Reference/GUI/InputText.md), [InputJoystick](frontend/Reference/GUI/InputJoystick.md) into a dynamic symbol

It feels similar to what Mathematica's dynamic keyword produce

```mathematica title="evaluate"
Offload`FromEventObject[InputRange[-1,1,0.1]]
```

__cut and paste it into__

```mathematica @
Rectangle[{-1,-1}, { (*BB[*)(*here*)(*,*)(*"1:eJxTTMoPSmNhYGAo5gcSAUX5ZZkpqSn+BSWZ+XnFaYwgCS4g4Zyfm5uaV+KUXxEMUqxsbm6exgSSBPGCSnNSg9mAjOCSosy8dLBYSFFpKpoKkDkeqYkpEFXBILO1sCgJSczMQVYCAOFrJEU="*)(*]BB*), 1}]
```

![](./../../../Generated.mov%20to%20GIF%201.gif)

Consider to use the following symbols as well to trick a user or yourself

- [FrontEditorSelected](frontend/Reference/Interpreter/FrontEditorSelected.md)
- [Interpretation](frontend/Reference/Formatting/Interpretation.md)
- [MakeBoxes](frontend/Reference/Formatting/MakeBoxes.md)
- [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md)
- [Offload](frontend/Reference/Interpreter/Offload.md)

