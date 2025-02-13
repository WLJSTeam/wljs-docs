What you see in the cell below

```mathematica @
(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)
```

or

```mathematica @
(*VB[*)(Graphics[{RGBColor[0.87, 0.94, 1], Disk[{0, 0}, 1], RGBColor[1, 0.5, 0.5], Disk[{0, 0}, 0.6]}])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRAeB5BwL0osyMhMLk5jgcn7ZBaXpDHD5IPcnZzzc/KLiq4vLrDluv7avkhknfvDKpF39pkgM9KYYNpcMouzETyQIZlAmgFCgJVimAkWLmIAgwf2cAZxZhYZg8FjewCvfy0F"*)(*]VB*)
```

is called [StandardForm](frontend/Reference/Formatting/StandardForm.md). It is still valid for evaluation and can be copied and pasted. If you look on the underlying text using any text-editor you will see

```mathematica
(*FB[*)((1)(*,*)/(*,*)(2))(*]FB*)
```

and 

```mathematica
(*VB[*)(Graphics[{RGBColor[0.87, 0.94, 1], Disk[{0, 0}, 1], RGBColor[1, 0.5, 0.5], Disk[{0, 0}, 0.6]}])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRAeB5BwL0osyMhMLk5jgcn7ZBaXpDHD5IPcnZzzc/KLiq4vLrDluv7avkhknfvDKpF39pkgM9KYYNpcMouzETyQIZlAmgFCgJVimAkWLmIAgwf2cAZxZhYZg8FjewCvfy0F"*)(*]VB*)
```

Looking closely at it, we can see that it is still a normal `(1/2)` expression as well as a normal [Graphics](frontend/Reference/Graphics/Graphics.md) expression. If you remove all comments, it becomes a valid [InputForm](frontend/Reference/Formatting/InputForm.md). Here comes a __rule__: 

> Any `StandardForm` output is a decorated `InputForm`.

These *special* comment blocks instruct an editor on how to render the content. For many common decorations, such as fractions or powers, we use a specialized shorthand notation. For arbitrary blocks (such as `Graphics` or `DateObject`), we provide a base64-encoded string containing Wolfram Expressions, which are displayed instead of the original input. You can read more about this in [ViewBox](frontend/Reference/Formatting/Low-level/ViewBox.md).

## Large Expressions
Storing an entire `Plot` inside a cell can be problematic for a standard text editor. To handle this, we use a compromise: if a displayable expression exceeds a certain threshold, we convert it into a [Frontend Object](frontend/Advanced/Frontend%20interpretation/Frontend%20Objects.md). For example, the output of:

```mathematica
Plot[x, {x,0,1}]
```

is actually stored as:

```mathematica
(*VB[*)(FrontEndRef["ad6334f1-31ea-40c2-bf53-7a18320bc17e"])(*,*)(*"1:eJxTTMoPSmNkYGAoZgESHvk5KRCeEJBwK8rPK3HNS3GtSE0uLUlMykkNVgEKJ6aYGRubpBnqGhumJuqaGCQb6SalmRrrmicaWhgbGSQlG5qnAgCDbBWK"*)(*]VB*)
```

Here, `"ad6334f1-31ea-40c2-bf53-7a18320bc17e"` is a unique identifier for the Wolfram Expression, which is stored separately in a JSON database. This process does not alter the expression and remains entirely controllable (determining what and when to convert). 

Such JSON objects are automatically retrieved from the memory of either the *main kernel* or the *evaluation kernel*, depending on which is available first. Typically, they are created on the *evaluation kernel* and then fetched by a browser. When you save a notebook, all "used" objects on the page are synchronized with the *main kernel* and serialized into the notebook file. This mechanism ensures that unused expressions do not accumulate in the *main kernel* memory.
