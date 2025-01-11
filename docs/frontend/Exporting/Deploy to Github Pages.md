It is possible to host your interactive notebook on Github pages, so that everyone can view it, drag some sliders and download the original notebook in a one click.

## Exporting
We assume you exported it using [Static HTML](frontend/Exporting/Static%20HTML.md) or [Dynamic HTML](frontend/Exporting/Dynamic%20HTML.md)

:::info
Exported notebooks do not require any building procedure, __only hosting__.
:::
## Publishing
It involves creating a repository, uploading `.html` documents and settings up Github Pages. Follow the steps

1. Create a __public__ repository (if you have `git` installed, run `git init`) and add there your HTML documents. You can form a folder structure and make navigation links using [Markdown](frontend/Cell%20types/Markdown.md) cells

#### Using Github Pages

2. Open `Settings` of the repository, then `Code and automation` and locate `Pages`. For example

![](./../../Screenshot%202024-12-16%20at%2013.06.45.png)

#### Using Github Actions
Or alternatively use Github Actions and explicitly select `Pages`, `Static HTML`

![](./../../Screenshot%202024-12-16%20at%2013.07.52.png)

Here is sample configuration file for it, which serves static pages from `build` folder and `main` branch of the repository

```yaml
# Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Single deploy job since we're just deploying
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          # Upload entire repository
          path: 'build'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

## Licensing
Since the exported notebook or presentation do not contain any of Wolfram technologies, but pure Javascript, HTML, CSS, open-source and custom written libraries, __there is in fact no restriction on the end-usage__. 

It is an equivalent of printing figures from the notebook to PDF and posting on a your website.


## Alternative hosting options
There are plenty of them. Search for `static html hosting`

- [Static Website Hosting](https://static.app/)
- [TinyHost](https://tiiny.host/free-static-website-hosting/)
- [Cloud Flare](https://pages.cloudflare.com/)