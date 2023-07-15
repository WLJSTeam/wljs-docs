// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'log',
  title: 'WLJS',
  tagline: 'Open-source Wolfram Frontend & Interpreter & Fullstack Framework written in Javascript',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://jerryi.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/wljs-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'JerryI', // Usually your GitHub org/user name.
  projectName: 'wljs-docs', // Usually your repo name.
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X',
      crossorigin: 'anonymous',
    },
  ],

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
         // editUrl:
         //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        remarkPlugins: [math],
        rehypePlugins: [katex],

        },

        blog: {
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        
      }),
    ],
    
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      remarkPlugins: [math],
      rehypePlugins: [katex],
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'WLJS',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'interpreterSidebar',
            position: 'left', 
            label: 'Interpreter',
          },
          {
            type: 'docSidebar',
            sidebarId: 'graphicsSidebar',
            position: 'left',
            label: 'Graphics',
          },      
          {
            type: 'docSidebar',
            sidebarId: 'frontendSidebar',
            position: 'left',
            label: 'Frontend',            
          }, 
          {
            type: 'docSidebar',
            sidebarId: 'webSidebar',
            position: 'left',
            label: 'Hydrator',            
          },              
          {to: '/blog', label: 'Blog', position: 'left'},
          /*{
            href: 'https://github.com/JerryI/wolfram-js-frontend',
            label: 'GitHub',
            position: 'right',
          },*/
        ],
      },
      footer: {
        style: 'dark',
        links: [
          /*{
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },*/
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub Frontend',
                href: 'https://github.com/JerryI/wolfram-js-frontend',
              },
              {
                label: 'GitHub WLJS',
                href: 'https://github.com/JerryI/wljs-interpreter',
              },              
            ],
          },
        ],
        copyright: `${new Date().getFullYear()} WLJS`,
      },
      prism: {
        theme: require('prism-react-renderer/themes/dracula'),
        darkTheme: darkCodeTheme,
        additionalLanguages: ['wolfram']
      },
    }),

    markdown: {
      mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],
};


module.exports = config;


