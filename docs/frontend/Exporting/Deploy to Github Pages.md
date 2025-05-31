It is possible to host your interactive notebook on GitHub Pages, allowing everyone to view it, interact with sliders, and download the original notebook with a single click.

## Exporting
We assume you exported it using [Static HTML](frontend/Exporting/Static%20HTML.md) or [Dynamic HTML](frontend/Exporting/Dynamic%20HTML.md).

:::info
Exported notebooks do not require any build process—__only hosting__.
:::

## Publishing
This involves creating a repository, uploading your `.html` documents, and setting up GitHub Pages. Follow these steps:

1. Create a __public__ repository. If you have `git` installed, run `git init`, and add your HTML documents. You can organize them into folders and create navigation links using [Markdown](frontend/Cell%20types/Markdown.md) cells.

#### Using GitHub Pages

2. Open the repository `Settings`, navigate to `Code and automation`, and locate `Pages`. For example:

![](./../../Screenshot%202024-12-16%20at%2013.06.45.png)

#### Using GitHub Actions
Alternatively, you can use GitHub Actions and explicitly select `Pages` and `Static HTML`.

![](./../../Screenshot%202024-12-16%20at%2013.07.52.png)

Here is a sample configuration file that serves static pages from the `build` folder and the `main` branch of the repository:

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
Since the exported notebook or presentation does not contain any Wolfram technologies—only pure JavaScript, HTML, CSS, open-source, and custom-written libraries—__there are no restrictions on end usage__.

This is equivalent to printing figures from the notebook to a PDF and posting it on your website.

## Alternative Hosting Options
There are plenty of alternatives. Search for `static HTML hosting`.

- [Static Website Hosting](https://static.app/)
- [TinyHost](https://tiiny.host/free-static-website-hosting/)
- [Cloudflare](https://pages.cloudflare.com/)
- Some quick file sharing services renders HTML files by the default