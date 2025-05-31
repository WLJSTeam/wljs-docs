import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

import CodeBlock from '@theme/CodeBlock';

import {CodeMirror} from '@site/src/components/wljs';
import { WLJSHTML, WLJSEditor, WLJSStore } from "@site/src/components/wljs-notebook-react";



const FeatureList = [
  {
    title: 'Feels like Mathematica and Jupyter',
    width: 'col col--6',
    feature: (
      <>
      <CodeMirror>
{`Table[If[PrimeQ[i], Framed[i, Background->(*VB[*)(RGBColor[1, 1, 0])(*,*)(*"1:eJxTTMoPSmNiYGAo5gUSYZmp5S6pyflFiSX5RcEsQBHn4PCQNGaQPAeQCHJ3cs7PyS8qYgCDD/boDAYGAO7rEHU="*)(*]VB*)], i], {i, 1, 20}]

{1,(*BB[*)(2)(*,*)(*"1:eJxTTMoPSmNmYGAo5gMSwSWVOakuqcn5RYkl+UVpTCBxFiARVJqTWswFZDglJmenF+WX5qVANHGAJN2dnPNz8osyGYEcCAHEDGi6ecDGF2UW+Od55hWUlhSzAgXcEnOKU1EVBoPFixJzU8FCIUWlqQAABiTb"*)(*]BB*),(*BB[*)(3)(*,*)(*"1:eJxTTMoPSmNmYGAo5gMSwSWVOakuqcn5RYkl+UVpTCBxFiARVJqTWswFZDglJmenF+WX5qVANHGAJN2dnPNz8osyGYEcCAHEDGi6ecDGF2UW+Od55hWUlhSzAgXcEnOKU1EVBoPFixJzU8FCIUWlqQAABiTb"*)(*]BB*),4,(*BB[*)(5)(*,*)(*"1:eJxTTMoPSmNmYGAo5gMSwSWVOakuqcn5RYkl+UVpTCBxFiARVJqTWswFZDglJmenF+WX5qVANHGAJN2dnPNz8osyGYEcCAHEDGi6ecDGF2UW+Od55hWUlhSzAgXcEnOKU1EVBoPFixJzU8FCIUWlqQAABiTb"*)(*]BB*),6,(*BB[*)(7)(*,*)(*"1:eJxTTMoPSmNmYGAo5gMSwSWVOakuqcn5RYkl+UVpTCBxFiARVJqTWswFZDglJmenF+WX5qVANHGAJN2dnPNz8osyGYEcCAHEDGi6ecDGF2UW+Od55hWUlhSzAgXcEnOKU1EVBoPFixJzU8FCIUWlqQAABiTb"*)(*]BB*),8,9,10,(*BB[*)(11)(*,*)(*"1:eJxTTMoPSmNmYGAo5gMSwSWVOakuqcn5RYkl+UVpTCBxFiARVJqTWswFZDglJmenF+WX5qVANHGAJN2dnPNz8osyGYEcCAHEDGi6ecDGF2UW+Od55hWUlhSzAgXcEnOKU1EVBoPFixJzU8FCIUWlqQAABiTb"*)(*]BB*),12,(*BB[*)(13)(*,*)(*"1:eJxTTMoPSmNmYGAo5gMSwSWVOakuqcn5RYkl+UVpTCBxFiARVJqTWswFZDglJmenF+WX5qVANHGAJN2dnPNz8osyGYEcCAHEDGi6ecDGF2UW+Od55hWUlhSzAgXcEnOKU1EVBoPFixJzU8FCIUWlqQAABiTb"*)(*]BB*),14,15,16,(*BB[*)(17)(*,*)(*"1:eJxTTMoPSmNmYGAo5gMSwSWVOakuqcn5RYkl+UVpTCBxFiARVJqTWswFZDglJmenF+WX5qVANHGAJN2dnPNz8osyGYEcCAHEDGi6ecDGF2UW+Od55hWUlhSzAgXcEnOKU1EVBoPFixJzU8FCIUWlqQAABiTb"*)(*]BB*),18,(*BB[*)(19)(*,*)(*"1:eJxTTMoPSmNmYGAo5gMSwSWVOakuqcn5RYkl+UVpTCBxFiARVJqTWswFZDglJmenF+WX5qVANHGAJN2dnPNz8osyGYEcCAHEDGi6ecDGF2UW+Od55hWUlhSzAgXcEnOKU1EVBoPFixJzU8FCIUWlqQAABiTb"*)(*]BB*),20}`}
      </CodeMirror>        
        
      </>
    ),
    description: (
      <>
        WLJS Notebook is compatible with Wolfram Mathematica and has a flat and minimal notebook structure like in Jupyter Lab. All power of Wolfram Language standard library is at your hands
      </>
    ),
  },

  {
    title: 'Interactive & Powerful',
    width: 'col col--5',
    feature: (
      <>
  

      <div className={clsx('col col--6'), 'justify-center'} style={{'overflow':'hidden'}}><div style={{'marginTop':'-100px'}}>
      <WLJSEditor display={"codemirror"} nid={"c0ccbdc5-acc8-4894-b9b2-daae8b112e17"} id={"2e72b444-f033-488c-9546-dcbf4f6f2170"} type={"Output"} opts={{}} >{`%28%2AVB%5B%2A%29%28FrontEndRef%5B%225416d320-7c3d-4a77-9314-36665130c40c%22%5D%29%28%2A%2C%2A%29%28%2A%221%3AeJxTTMoPSmNkYGAoZgESHvk5KRCeEJBwK8rPK3HNS3GtSE0uLUlMykkNVgEKm5oYmqUYGxnomicbp%2BiaJJqb61oaG5roGpuZmZkaGhskmxgkAwBvJRR5%22%2A%29%28%2A%5DVB%2A%29`}</WLJSEditor>
      </div>
      </div>
        
      </>
    ),
    description: (
      <>
        WLJS Notebook is optimized for interactive computing and allows to make complex real-time simulations like this one above
      </>
    ),
  },

  {
    title: 'Driven by real-world problem solving',
    width: 'col col--6',
    feature: (
      <>

   
        
      </>
    ),
    description: (
      <>
        Developed through the collaboration of physicists and programmers at University of Augsburg 🇩🇪 it is continuously refined in a feedback loop by solving problems in science, math, and education.
      </>
    ),
  },   

  
  
  {
    title: 'Most common narrative tools are included',
    width: 'col col--6',
    feature: (
      <>
      <div className='flex flex-row justify-center'>
      <CodeMirror>
{`.md
# My note
`}
      </CodeMirror>     

      <CodeMirror>
{`.slide
# My slide
`}
      </CodeMirror>    
      <CodeMirror>
{`.latex
My~equation
`}
      </CodeMirror>               
      </div>
      </>
    ),
    description: (
      <>
        Make interactive <a href="/frontend/Cell types/Slides.md"><b>data-driven slides</b></a>, embed live figures into reports and share your notes
      </>
    ),
  },  

  {
    title: 'Super portable',
    width: 'col col--6',
    feature: (
      <>
 
    </>
    ),
    description: (
      <>
        <a href="/frontend/Exporting/Static HTML.md"><b>Export and share</b></a> your notebook as a standalone <code>.html</code> or <code>.md</code> file—plots stay interactive, and sliders remain draggable. <small>Exported notebooks are no longer subject to the license limitations of the freeware Wolfram Engine.</small>
      </>
    ),
  },

    {
    title: 'Batteries included',
    width: 'col col--6',
    feature: (
      <>
 
 <div className={clsx('col')}>
      <CodeMirror>
{`t = Import["table.tsv"];
t // TableView`}</CodeMirror>
</div>
      </>
    ),
    description: (
      <>
        <b>More than 200</b> importers/exporters formats. Vast standard library of Wolfram Mathematica (Language) for every computational need, from data analysis to visualization, symbolic computation, and beyond
      </>
    ),
  },  

  {
    title: 'Javascript Sandbox',
    width: 'col col--6',
    feature: (
      <>
 
 <div className={clsx('col')}>
 <WLJSEditor display={"codemirror"} nid={"957b65bd-8da6-4625-bdb6-368eb441549b"} id={"d3dc1821-b94a-4af6-97e2-7721d89b3175"} type={"Input"} opts={{}} >{`.js%0Aconst%20r%20%3D%20document.createElement%28%27div%27%29%3B%0AObject.assign%28r.style%2C%20%7Bwidth%3A%274rem%27%2Cheight%3A%273rem%27%2CbackgroundImage%3A%27linear-gradient%28to%20right%2C%20red%2C%20green%29%27%7D%29%3B%0Areturn%20r%3B`}</WLJSEditor>

<WLJSEditor display={"js"} nid={"957b65bd-8da6-4625-bdb6-368eb441549b"} id={"51efb6cc-c968-4e60-81fb-8f79e4a4d04f"} type={"Output"} opts={{}} >{`const%20r%20%3D%20document.createElement%28%27div%27%29%3B%0AObject.assign%28r.style%2C%20%7Bwidth%3A%274rem%27%2Cheight%3A%273rem%27%2CbackgroundImage%3A%27linear-gradient%28to%20right%2C%20red%2C%20green%29%27%7D%29%3B%0Areturn%20r%3B`}</WLJSEditor>   
</div>
      </>
    ),
    description: (
      <>
        <b>First class support</b> of Javascript and with a dedicated IPC channel to Wolfram Kernel. Use any library from NPM to enhance your visuals
      </>
    ),
  },


  {
    title: 'Build internal tools',
    width: 'col col--6',
    feature: (
      <>
 
    </>
    ),
    description: (
      <>
        Turn a notebook into a <a href="/frontend/Exporting/Standalone Widgets.md">small app</a> or <a href="/frontend/Advanced/Manipulating Notebooks/Import notebook.md">a library</a> without the hassle of custom frontends, deployment, namespaces and packaging
      </>
    ),
  },


];

function Feature({feature, title, description, width}) {
  return (
    <div className={clsx(width)} style={{"padding-top": "1em"}}>
      <div>
        {feature}
      </div>
      <div className="text--center padding-horiz--md">
        <h3 style={{"color": "var(--ifm-color-primary)"}}>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}