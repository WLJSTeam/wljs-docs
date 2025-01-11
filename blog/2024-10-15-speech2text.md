---
title: Speech to text using local WL neural network
authors: jerryi
tags:
  - AI
  - short
  - javascript
enableComments: true
---
Speech2Text using built-in WL's neural network

<!--truncate-->

Microphone capture function

```js
.js

const label = document.createElement('div');
label.classList.add('rounded', 'p-1', 'text-small');
label.innerText = "Not recording";
label.style.background = 'lightgray';

core.GetVoice = async (args, env) => {
const interval = await interpretate(args[0], env);
const promise = new Deferred();
  
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const mediaRecorder = new MediaRecorder(stream);
    let chunks = [];

    mediaRecorder.ondataavailable = event => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
      const reader = new FileReader();

      reader.onloadend = () => {
        label.style.background = 'lightgray';
        label.innerText = "Finished";
        const base64data = reader.result.split(',')[1];
        promise.resolve(base64data);
      };

      reader.readAsDataURL(audioBlob);
    };

    mediaRecorder.start();
    label.innerText = "Recording...";
    label.style.background = 'green';

    setTimeout(() => {
      mediaRecorder.stop();
    }, interval);
  })
  .catch(error => {
    console.error('Error accessing microphone:', error);
    label.innerText = "Error accessing microphone";
    label.style.background = 'red';
  });


  return promise.promise;
};

return label;

```

Widget

```mathematica
Module[{text = " ", win = CurrentWindow[], status = " "}, Panel[Column[{
  {EventHandler[InputButton["Speak"], Function[Null,
    status = "Listerning...";
    Then[FrontFetchAsync[GetVoice[3000], "Window"->win], Function[str,
      status = "Processing...";
      text = StringJoin[text, "\n", SpeechRecognize[ImportString[str, "Base64"], Method->"NeuralNetwork"]];
      status = " ";
    ]]
  ]], TextView[status // Offload]} // Row,

  HTMLView[text // Offload, "Style"->"width:500px"]
}], Style["Click and speak", 10]]]
```