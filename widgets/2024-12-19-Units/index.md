# Optics units converter

There are many physical units converters on the internet. Here we made one for our optics THz lab in University of Augsburg 🇩🇪

![](./../Pasted%20image%2020250106142127.png)

__Features__
Bidirectional convertion between

- Energy units (ev, cm, Hartree...)
- Wavelengths
- Frequency
- Temperature
- Magnetic fields

<a
  href={ require('./Units Converter.wlw').default }
  className="p-2 text-sm font-medium w-full flex ring-1 ring-inset text-gray-600 shadow ring-gray-300 bg-gray-300 my-2"
>
  Download App v.02
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="w-5 h-5 ml-auto"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 17h.01m.39-3h.6c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C21 15.602 21 16.068 21 17s0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C19.398 20 18.932 20 18 20H6c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C3 18.398 3 17.932 3 17s0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C4.602 14 5.068 14 6 14h.6m5.4 1V4m0 11-3-3m3 3 3-3"
    ></path>
  </svg>
</a>

<!--truncate-->

:::note
For magnetic field units we assume spin 1/2
:::

## How it works
As a base we define a general transformation rules for units as follows

```mathematica @
rules = {
  "Centimeters" -> "Centimeters",
  "eV" -> "Centimeters" / 8065.6,
  "meV" -> 1000 "Centimeters" / 8065.6,
  "Micrometers" -> 10000 / "Centimeters",
  "Nanometers" -> (*SpB[*)Power[10(*|*),(*|*)7](*]SpB*) / "Centimeters",
  "Angstrem" -> (*SpB[*)Power[10(*|*),(*|*)8](*]SpB*) / "Centimeters",
  "MHz" -> (*SpB[*)Power[10(*|*),(*|*)4](*]SpB*) 2.9979 "Centimeters",
  "GHz" -> (*SpB[*)Power[10(*|*),(*|*)4](*]SpB*) 2.9979 "Centimeters" 0.001,
  "THz" -> (*SpB[*)Power[10(*|*),(*|*)4](*]SpB*) 2.9979 "Centimeters" 0.001 0.001,
  "K" -> 1.428 "Centimeters",

  "ps" -> 0.004136 / ("Centimeters" / 8065.6),

  
  "T" -> 4.26602  "Centimeters",
  "Oe" -> 10000 4.26602  "Centimeters",
  
  "kJ/Mol" -> 0.0120 "Centimeters",
  "Hartree" ->   "Centimeters" / (27.2114 8065.6)
};
```

Then one can naturally use `NSolve` to get this or that unit. 

:::tip
Change the extension to `wln` to see the source code
:::

For the inputs we designed a custom input element using WLX and JS following [this guide](https://jerryi.github.io/wljs-docs/frontend/Advanced/Javascript/Communication#using-wlx--2-ways-binding)

```jsx
.wlx

CustomInput[sym_, OptionsPattern[]] := Module[{
  Label = OptionValue["Label"],
  Ev = OptionValue["Event"],
  Pattern = OptionValue["Pattern"],
  Handler
},

  With[{Template = 
    <div class="mt-2 flex">
      <div style="width: 7rem" class="flex shrink-0 items-center rounded-l-md bg-white px-3 text-base text-gray-500 outline outline-1 -outline-offset-1 outline-gray-300 sm:text-sm/6"><Label/></div>
      <input type="number" step="1" class="-ml-px block w-full grow rounded-r-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="0.0"/>
    <script type="module">
      core['<Handler/>'] = async (args, env) => {
        const input = env.element.getElementsByTagName('input')[0];


        const data = await interpretate(args[0], env);
        input.value = +data.toFixed(4);
        env.local.input = input;

        input.addEventListener('change', () => {
          
          console.warn(input.value);
          env.local.skip = true;
          server.kernel.emitt('<Ev/>', input.value, '<Pattern/>');
        });        
      }

      core['<Handler/>'].update = async (args, env) => {
        if (env.local.skip) {
          env.local.skip = false;
          return;
        }
        
        console.log('Update');
        env.local.input.value = +(await interpretate(args[0], env)).toFixed(4);
      }

      core['<Handler/>'].destroy = () => {
        delete core['<Handler/>'];
      }

      core['<Handler/>'].virtual = true;
    </script>
  </div>
  },
    HTMLView[Template, Epilog->(Handler[sym])]
  ]
]

Options[CustomInput] = {"Label"->"", "Event"->"", "Pattern"->"Default"};
```
what happens here:

1. we define a template for our custom input field
2. we define a support script with a generated `Handler` function, which reads and updates this input field
3. we pack in into [HTMLView](https://jerryi.github.io/wljs-docs/frontend/Reference/GUI/HTMLView), which calls our `Handler` on a provided argument after this component has been mounted

For example

```mathematica @
values = {1,1};

event = CreateUUID[];

EventHandler[event, {
  "x" -> Function[val,
    values = {val, (*SpB[*)Power[val(*|*),(*|*)2](*]SpB*)} // N;
  ],

  "x2" -> Function[val,
    values = {(*SqB[*)Sqrt[val](*]SqB*), val} // N // Re;
  ]
}]

{
  CustomInput[values[[1]] // Offload, "Event"->event, "Pattern"->"x", "Label"->"x"],
  CustomInput[values[[2]] // Offload, "Event"->event, "Pattern"->"x2", "Label"->"x<sup>2</sup>"]
} // Column
```

![](./../fields-ezgif.com-video-to-gif-converter-553959e2d416c2aa4cc82261b90aa3f0.gif)


