// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

const matchCM = new RegExp(/^```(?:\w+) @ *\n([\s\S]*?)``` *$/gm);

const replacer = (string, match) => {
  const wrapped = '<CodeMirror>{`' + match.trim().replaceAll('`', '\\`') + '`}</CodeMirror>'
  return wrapped 
}

const workaround = (string) => string.replaceAll(matchCM, replacer)

const math = require('remark-math');
const katex = require('rehype-katex');

const scripts = [
  "/wljs-interpreter/dist/interpreter.js",
  "/wljs-interpreter/src/core.js",
  "/wljs-cells/src/module.js",
  "/wljs-editor/dist/kernel.js",
  "/wljs-editor/src/boxes.js",  
  "/wljs-editor/src/metamarkers.js",
  "/wljs-editor/src/objects.js",
  "/wljs-editor/src/frontsubmit.js",
  "/wljs-js-support/src/kernel.js",
  "/wljs-magic-support/src/kernel.js",
  "/wljs-mermaid-support/dist/kernel.js",
  "/wljs-sound@master/dist/kernel.js",   
  "/wljs-inputs/dist/kernel.js",
  "/wljs-html-support/src/kernel.js",
  "/wljs-wlx-support/src/kernel.js", 
  "/wljs-sharedlib-mk/dist/kernel.js", 
  "/wljs-sharedlib-d3/dist/kernel.js",
  "/wljs-sharedlib-three/dist/kernel.js",
  "/wljs-manipulate/kernel.js",
  "/wljs-revealjs/dist/kernel.js",
  "/wljs-graphics-d3/dist/kernel.js",
  "/wljs-plotly/dist/kernel.js",  
  "/wljs-graphics3d-threejs/dist/kernel.js"

].map((link) => {
  return {tagName: 'script', attributes: {
    type: 'module',
    src: link
  }}
});


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'WLJS Notebook',
  tagline: 'WLJS Notebook is an interactive web-based computing platform, a lightweight alternative to Mathematica, built on top of the Wolfram Engine.',
  favicon: 'img/favicon.ico',

  staticDirectories: ['static'],
  
  
  url: 'http://127.0.0.1:20540',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',


  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'CoffeeLiqueur', // Usually your GitHub org/user name.
  projectName: 'wolfram-js-frontend', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  markdown: {
    mermaid: true,
    preprocessor: ({filePath, fileContent}) => {
      return workaround(fileContent);
    }
  },
  themes: ['@docusaurus/theme-mermaid'],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X',
      crossorigin: 'anonymous',
    },
  ],



  headTags: scripts,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          remarkPlugins: [math],
          routeBasePath: '/',
          rehypePlugins: [katex],

        exclude: ['/docs/Excalidraw', 'Excalidraw', '/docs/imgs', '/docs/blog'],
          
        showLastUpdateTime: true,
        },
        pages: {
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },    
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {name: 'msvalidate.01', content: '558ACAAD3C892A685EC4981186E3711D'},
        {name: 'google-site-verification', content: "EfqZCis7_qdi7v5e_xZFG-q1I2nGROZLaqCDsVDlt0Y"},
        {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'}
      ],

  
      remarkPlugins: [math],
      rehypePlugins: [katex],
      // Replace with your project's social card
      navbar: {
        title: 'WLJS',
        logo: {
          alt: 'WLJS Notebook',
          src: 'img/logo3.svg',
          srcDark: "img/logo2.svg"
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {to: 'https://wljs.io/blog', label: 'Blog', position: 'left'}, // or position: 'right'
          {to: 'https://wljs.io/releases', label: 'Release notes', position: 'left'}, // or position: 'right'
          {to: 'https://wljs.io/wljs-demo', label: 'Demonstration Project', style: {"border": 0, "border-radius": "6px"} , position: 'left'},
          {to: 'https://wljs.io/widgets', label: 'Mini apps', position: 'left'}, // or position: 'right'
          {to: "https://github.com/JerryI/wolfram-js-frontend/discussions", label: "Discuss", style: {"border": 0, "border-radius": "6px"} , position: 'right'},
          {to: "sponsorship", label: "Support us", style: {"border": 0, "border-radius": "6px"} , position: 'right'},
          {
            href: 'https://github.com/JerryI/wolfram-js-frontend',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/JerryI/wolfram-js-frontend',
              },
              {
                label: 'Discussions',
                href: 'https://github.com/JerryI/wolfram-js-frontend/discussions',
              },                            
              {
                label: 'Telegram',
                href: 'https://t.me/wljs_support',
              },
            ],
          },
        ],
        copyright: `WLJS Notebook Project is open-source and licensed under GPL3`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['wolfram']

      },
      markdown: {
        mermaid: true,
      },
      themes: ['@docusaurus/theme-mermaid'],

      
    }),
    plugins: [
          
    [ require.resolve('docusaurus-lunr-search'), {
      disableVersioning: true
    }],
    function myCustomPlugin(context, options) {
      return {
        name: 'custom-webpack-plugin',
        configureWebpack(config, isServer, utils, content) {
          return {
            module: {
              rules: [
                {
                  test: /\.pdf$/,
                  use: ["file-loader"],
                },
                {
                  test: /\.txt$/,
                  use: ["file-loader"],
                },  
                {
                  test: /\.wlw$/,
                  use: ["file-loader"],
                },               
                {
                  test: /\.wln$/,
                  use: ["file-loader"],
                }
              ],
            },
          };
        },
      };
    }]
};

export default config;
