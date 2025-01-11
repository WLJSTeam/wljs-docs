---
tags:
  - text
---
A simple wrapper for placing QR codes on [Slides](frontend/Reference/Slides/Slides.md)

![](./../../../Screenshot%202024-11-26%20at%2020.19.08.png)

For example

```html
.slide

Here is my repo

<QRCode ImageSize={350}>https://github.com/JerryI/wolfram-js-frontend</QRCode>
```

## Source code
Copy and evaluate

```mathematica
QRCode[lnk_, OptionsPattern[]] := BarcodeImage[lnk, "QR", OptionValue["ImageSize"]]
Options[QRCode] = {"ImageSize" -> 300}
```