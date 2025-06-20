```mathematica
EchoLabel[label_][expr_]
```

is operator form of `Echo` with a label. In WLJS it has extended  properties, which allows user programs to various push notifications:

```mathematica
EchoLabel["Test"]["This is normal one"];
```
Print to notifications:
```mathematica
EchoLabel["Notification"]["This will always appear at the top"];
```
__Warning__ messages:
```mathematica
EchoLabel["Warning"]["This will a warning"];
```
__Error__ message:
```mathematica
EchoLabel["Error"]["This will an error"];
```
__Spinner__:
```mathematica
spinner = EchoLabel["Spinner"]["Hey. I am spinning"];
```
```mathematica
spinner["Cancel"]; 
```
__Progress bar__:
```mathematica
bar = EchoLabel["ProgressBar"]["I am progressing"];
```
```mathematica
bar["Set", 0.5];
```
```mathematica
bar["SetMessage", "Hey!"];
```
```mathematica
bar["Cancel"];
```