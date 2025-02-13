List of all packages contexts available for the developer in WLJS Notebook

## Core packages

### Notebook and cells
__Master Kernel package__

Abstract notebook and cells implementation
```mathematica
CoffeeLiqueur`Notebook`
CoffeeLiqueur`Notebook`Cells`
```

Abstraction for projected cells (see [Projector](frontend/Advanced/Projector.md)) 
```mathematica
CoffeeLiqueur`Notebook`Windows`
```

### Evaluation
__Master Kernel package__

Implementation of transaction objects used for evaluation and abstract evaluator
```mathematica
CoffeeLiqueur`Notebook`Transactions`
CoffeeLiqueur`Notebook`Evaluator`
```

See extensions to find actual implementation of evaluators.

### Kernels
__Master Kernel package__

Abstract kernel (aka abstract class)

```mathematica
CoffeeLiqueur`Notebook`Kernel`
```

Kernel implementation - __Local Kernel__

```mathematica
CoffeeLiqueur`Notebook`LocalKernel`
```

### Extensions
__Master Kernel package__

Manager for `wljs extensions` (plugins)

```mathematica
CoffeeLiqueur`ExtensionManager`
```

API for plugins and templates

```mathematica
CoffeeLiqueur`Notebook`AppExtensions`
```

### Transport
__Master and Evaluation Kernel package__

HTTP, WS servers

```mathematica
KirillBelov`HTTPHandler`
KirillBelov`WebSocketHandler`
```

Misc extensions for WS transport layer between the frontend and Kernel used for dynamics ([Offload](frontend/Reference/Interpreter/Offload.md)) and Javascript API

```mathematica
JerryI`Misc`WLJS`Transport`
```

### Template engine
__Master and Evaluation Kernel package__

WLX template engine, importer and WebUI framework

```mathematica
JerryI`WLX`
JerryI`WLX`Importer`
JerryI`WLX`WebUI`
```

### Events system
__Master and Evaluation Kernel package__

Core events system, promises implementation

```mathematica
JerryI`Misc`Events`
JerryI`Misc`Events`Promise`
```

### Async tools
__Master and Evaluation Kernel package__

Timers, parallel kernels

```mathematica
JerryI`Misc`Async`
JerryI`Misc`Parallel`
```

### OOP Patterns
__Master and Evaluation Kernel package__

```mathematica
KirillBelov`Objects`
```

### Memory tools
__Master and Evaluation Kernel package__

[`LeakyModule`](frontend/Reference/Misc/Language.md#`LeakyModule`) implementation

```mathematica
JerryI`Misc`Language`
```

## Extensions

### Command palette
__Master Kernel package__

Use for adding more items to command palette
```mathematica
CoffeeLiqueur`Extensions`CommandPalette`
```

### Runtime tools
__Evaluation Kernel package__

Use for dynamically adding JS, CSS assets in the runtime
```mathematica
CoffeeLiqueur`Extensions`RuntimeTools`
```

### Frontend communication
__Evaluation Kernel package__

Use for firing notifications, loaders, communicating data to the frontend via [FrontSubmit](frontend/Reference/Frontend%20IO/FrontSubmit.md) and etc

```mathematica
CoffeeLiqueur`Extensions`Notifications`
CoffeeLiqueur`Extensions`Communication`
```

### Frontend objects
__Master and Evaluation Kernel package__

```mathematica
CoffeeLiqueur`Extensions`FrontendObject`
```

### Editor and cell view components
__Evaluation Kernel package__

Implements [CellView](frontend/Reference/GUI/CellView.md), [EditorView](frontend/Reference/GUI/EditorView.md)
```mathematica
CoffeeLiqueur`Extensions`EditorView`
```

### Multimedia
__Evaluation Kernel package__

Implements extra features for `Graphics` and `Graphics3D`
```mathematica
CoffeeLiqueur`Extensions`Graphics`
CoffeeLiqueur`Extensions`Graphics3D`
```

Implements [Plotly](frontend/Reference/Plotting%20Functions/Plotly.md) interface
```mathematica
CoffeeLiqueur`Extensions`Plotly`
```

Implements extra features for `Audio` such as [PCMPlayer](frontend/Reference/Sound/PCMPlayer.md)
```mathematica
CoffeeLiqueur`Extensions`Video`
```

Implements helper tools for [Slides](frontend/Cell%20types/Slides.md) cells
```mathematica
CoffeeLiqueur`Extensions`SlidesTools`
```

Implements input elements such as [InputRange](frontend/Reference/GUI/InputRange.md), and etc
```mathematica
CoffeeLiqueur`Extensions`InputsOutputs`
```

### WLJS Interpreter
__Evaluation Kernel package__

Defines utility commands for WLJS interpreter such as [Alert](frontend/Reference/Interpreter/Alert.md) and etc

```mathematica
CoffeeLiqueur`Extensions`WLJSInterpreter`
```