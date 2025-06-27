In most cases, if you have [Manipulate](frontend/Reference/GUI/Manipulate.md) or [Animate](frontend/Reference/GUI/Animate.md) expressions in your Mathematica code, __no changes are required__ to run them in the WLJS Notebook environment. The only concern is __performance__:

- `Manipulate` and `Animate` are very general and perform full reevaluation of your manipulated expression.
- Wolfram Mathematica attempts to optimize reevaluation internally, while WLJS Notebook does not have this feature.
- `Manipulate`, `Animate`, and `Refresh` are considered __anti-patterns__ for displaying rapidly changing data points and will work even slower compared to Mathematica.

## How to Optimize

### Dynamic Plots
If you want to manipulate the parameters of a given function and plot the curves, __consider using [ManipulatePlot](frontend/Reference/Plotting%20Functions/ManipulatePlot.md)__ or related functions.

Low-level dynamics (see [Dynamics](frontend/Dynamics.md)) is also a viable option.

#### If changes are not possible
As alternative way we can suggest to wrap `Manipulate` with [MMAView](frontend/Reference/GUI/MMAView.md), it will use native Mathematica's renderer (rasterized graphics) and create an interactive widget. However, this makes it impossible to export to [Dynamic HTML](frontend/Exporting/Dynamic%20HTML.md).

### Animations
To animate curves or other graphical primitives, consider providing a custom `"UpdateFunction"` for [Animate](frontend/Reference/GUI/Animate.md), which will only change the symbols your graphics primitives depend on.

See the __step-by-step guide in the same section__: [Porting: Animation](frontend/Advanced/Dynamics/Porting%20from%20MMA/Animation.md).

For static pre-calculated animation try: [AnimatePlot](frontend/Reference/Plotting%20Functions/AnimatePlot.md).

For more complex animations, consider using: [AnimationFrameListener](frontend/Reference/Graphics/AnimationFrameListener.md), the entire [Animation Framework](frontend/Advanced/Animation%20Framework/Animation%20Framework.md) section, and the [Animation](frontend/Advanced/Dynamics/Animation.md) subsection in the `Advanced` section.

#### If changes are not possible
##### MMAView 
As alternative way we can suggest to wrap `Animate` with [MMAView](frontend/Reference/GUI/MMAView.md), it will use native Mathematica's renderer and return rasterized image. However, this makes it impossible to export to [Dynamic HTML](frontend/Exporting/Dynamic%20HTML.md).

##### Rasterize all frames
Map [Rasterize](frontend/Reference/Image/Rasterize.md) over all "frames" of your animation and then apply [ListAnimate](frontend/Reference/GUI/ListAnimate.md) or convert to a video.


## DynamicModule
This concept is not supported in WLJS Notebook and likely never will be. The closest alternative is using low-level dynamics with GUI blocks (see [Mouse and Keyboard](frontend/Advanced/Events%20system/Mouse%20and%20keyboard.md)), [Offload](frontend/Reference/Interpreter/Offload.md), and a standard `Module` expression.