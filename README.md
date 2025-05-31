DOCS for WLJS Notebook Project 💫

## Contributing

- [ ] Detailed descriptions of all functions used for visualizing the data
- [ ] Tutorials for the beginners
- [ ] Wolfram Language documentation / basics ?..

We recommend to use [Obsidian](https://obsidian.md/) for editing and creating notes.

1. Clone this repo and install npm packages
```bash
git clone https://github.com/JerryI/wljs-docs
cd wljs-docs
npm i
```

2. Open `docs` folder using Obsidian (optional)

3. To test, use
```bash
npm start
```

4. To build
```bash
npm run build
```

5. To rebuild Wolfram Language figures (usually they are wrapped in WL tags in some markdown files)
```bash
wolframscript -f compile.wls
```


## License
GNU GPLv3

