import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';


const FeatureList = [
  {
    title: 'Wolfram Language & WLJS',
    width: 'col col--6',
    feature: (
      <>
      <ul>
        <li className={styles.featureLi}>
          <Link className={styles.featureLink} to={"/wljs-demo/intro-notebook"}><b>Notebook Interface</b> An overview of UI and cell types</Link>
        </li>   
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/intro-mathinput"}><b>2D Math Input</b> Learn how to handle equations in a new way</Link>
        </li> 
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/intro-import-plot"}><b>Import & Plot</b> How to drop the data and visualize it</Link>
        </li>
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/intro-static-animation"}>Simple animation</Link>
          <div className={styles.badgeHolder}>
            <span className={styles.badge} style={{background: 'var(--ifm-color-warning-light)'}}>Animated</span>
          </div>          
        </li>
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/demo-formatting"}>Formatted output</Link>
        </li>   
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/intro-image-sym"}>Images as symbols</Link>
        </li>
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/intro-audio"}>Audio generation and processing</Link>
        </li>        
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/intro-image3d"}>Volumetric Data</Link>
        </li>        
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/intro-2df"}><b>2D Fourier filtering</b> A classic example on how to remove periodic noise</Link>
        </li>
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/intro-video"}>Tracking objects in a video</Link>
        </li>             
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/intro-manipulate"}><b>Manipulation</b> An example on how to rapidly generate controllable plots and other expressions.</Link>
          <div className={styles.badgeHolder}>
            <span className={styles.badge} style={{background: 'var(--ifm-color-success-light)'}}>Interactive</span>
          </div>
        </li>  
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/math-rick"}>Solving Equations on Rick Astley</Link>
        </li>
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/mid-symbolic-quantum"}><b>Solving Quantuum Mechanics Problem</b> with Symbolic Programming from the ground up</Link>
        </li>    
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/neuralnet-1"}>Neural networks</Link>
        </li>      
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/intro-music"}><b>Music Theory</b> Build scales and chords, play and visualize them on guitar / piano</Link>
        </li>   
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/intro-earth"}><b>Earth Model</b> GeoData and Marching Cubes</Link>
          <div className={styles.badgeHolder}>
            <span className={styles.badge} style={{background: 'var(--ifm-color-warning-light)'}}>Animated</span>
          </div>
        </li>            
      </ul>       
        
      </>
    ),
    description: (
      <>
        Become familiar with the user interface, cell concepts, symbolic programming, and powerful syntactic sugar.
      </>
    ),
  },

  {
    title: 'Exploring Dynamic Evaluation',
    width: 'col col--6',
    feature: (
      <>
      <ul>
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/intro-atom"}><b>Atom model</b> An example of animated 3D graphics </Link>
          <div className={styles.badgeHolder}>
            <span className={styles.badge} style={{background: 'var(--ifm-color-warning-light)'}}>Animated</span>
          </div>
        </li>

        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/mid-quantum-well"}><b>Quantuum Well</b> Numerical solution to Schrödinger's Equation</Link>
          <div className={styles.badgeHolder}>
            <span className={styles.badge} style={{background: 'var(--ifm-color-success-light)'}}>Interactive</span>
          </div>        
        </li>

        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/mid-sliders-dynamics"}>Basics of Custom Dynamic Evaluation</Link>
          <div className={styles.badgeHolder}>
            <span className={styles.badge} style={{background: 'var(--ifm-color-success-light)'}}>Interactive</span>
          </div>          
        </li>

        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/mid-inteferogram"}><b>Michelson Interferometer</b> Move mirrors in a virtual experiment and record interferogram</Link>
          <div className={styles.badgeHolder}>
            <span className={styles.badge} style={{background: 'var(--ifm-color-success-light)'}}>Interactive</span>
          </div>        
        </li>
           

        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/mid-thz-tds"}><b>THz-TDS</b> Model the propagation of THz pulse though the dispersive medium in 15 lines of code</Link>
          <div className={styles.badgeHolder}>
            <span className={styles.badge} style={{background: 'var(--ifm-color-success-light)'}}>Interactive</span>
          </div>          
        </li>          

        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/animation-coasce"}><b>Coalesce</b> Deforming an isometric pattern</Link>
          <div className={styles.badgeHolder}>
            <span className={styles.badge} style={{background: 'var(--ifm-color-warning-light)'}}>Animated</span>
          </div>          
        </li>  

        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/mid-pinkorb"}>Pink Orb</Link>
          <div className={styles.badgeHolder}>
            <span className={styles.badge} style={{background: 'var(--ifm-color-success-light)'}}>Interactive</span>
          </div>          
        </li>

        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/intro-dynquick"}>Quick and Dirty</Link>
          <div className={styles.badgeHolder}>
            <span className={styles.badge} style={{background: 'var(--ifm-color-success-light)'}}>Interactive</span>
          </div>          
        </li>
        
      </ul>      
        
      </>
    ),
    description: (
      <>
        Predictable and easy data synchronization, optimized for performance.
      </>
    ),
  },   

  {
    title: 'Data Visualization',
    width: 'col col--5',
    feature: (
      <>
      <ul>
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/plot-1d"}><b>1D Data Visualization</b></Link>         
        </li>       
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/plot-bars"}><b>Bars, Pies</b> and other charts</Link>         
        </li>   
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/plot-baranimated"}>Custom animated Bar chart</Link>      
          <div className={styles.badgeHolder}>
            <span className={styles.badge} style={{background: 'var(--ifm-color-success-light)'}}>Interactive</span>
          </div>             
        </li>       
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/plot-2d"}><b>2D Data Visualization</b></Link>         
        </li>     
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/plot-graphs"}>Graphs Visualization</Link>         
        </li>         
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/plot-3d"}><b>3D Data Visualization</b></Link>         
        </li>       
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/plot-shadows"}>Polygons & Shadows</Link>         
        </li>    
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/plot-rtx"}>Path-tracing feature</Link> 
          <div className={styles.badgeHolder}>
            <span className={styles.badge} style={{background: 'var(--ifm-color-danger-lighter)'}}>RTX</span>
          </div>                  
        </li>        
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/plot-plotly"}><b>Plotly.js Integration</b> A massive library of functions</Link>         
        </li> 
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/apex-charts"}><b>Apex Charts</b> Build and use 3rd-party libraries within the notebook</Link>         
        </li> 
        <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/mix-graph"}><b>3D Force-Directed Graph</b> Hook up a Javascript library right in the notebook</Link>         
        </li>         
        </ul>                   
      </>
    ),
    description: (
      <>
        A set of powerful tools for visualizing anything.
      </>
    ),
  },
  
  {
    title: 'Data-Driven Presentations',
    width: 'col col--6',
    feature: (
      <>
        <ul>   
          <li className={styles.featureLi}>
            <Link className={styles.featureLink}  to={"https://jerryi.github.io/wljs-demo/intro_slides.html"}><b>Figures & Animation</b> Markdown based slides</Link>         
          </li> 
          <li className={styles.featureLi}>
            <Link className={styles.featureLink}  to={"https://jerryi.github.io/wljs-demo/offload_slide.html"}>Embedding code and widgets</Link>    
            <div className={styles.badgeHolder}>
              <span className={styles.badge} style={{background: 'var(--ifm-color-success-light)'}}>Interactive</span>
            </div>                 
          </li> 
          <li className={styles.featureLi}>
            <Link className={styles.featureLink}  to={"https://jerryi.github.io/wljs-demo/fitting_tds_ppt.html"}><b>Scientific Talk</b> A real-life presentation from Augsburg University</Link>         
            <div className={styles.badgeHolder}>
              <span className={styles.badge} style={{background: 'var(--ifm-color-success-light)'}}>Interactive</span>
            </div>          
          </li>                    
        </ul>         
      </>
    ),
    description: (
      <>
        Use markup languages and Wolfram Language (WL) to create interactive slides with real-time calculations, dynamic figures, and draggable elements.
      </>
    ),
  },  

  {
    title: 'Mixing Programming Languages',
    width: 'col col--6',
    feature: (
      <>
        <ul>
          <li className={styles.featureLi}>
            <Link className={styles.featureLink}  to={"/wljs-demo/mix-wlx"}>Use HTML & CSS directly to design the output</Link>    
            <div className={styles.badgeHolder}>
              <span className={styles.badge} style={{background: 'var(--ifm-color-success-light)'}}>Interactive</span>
            </div>                 
          </li>         
          <li className={styles.featureLi}>
          <Link className={styles.featureLink}  to={"/wljs-demo/webgl-heatmap"}><b>Animated heatmap</b> Combined SVG and raster graphics with GPU.js</Link>         
          <div className={styles.badgeHolder}>
            <span className={styles.badge} style={{background: 'var(--ifm-color-success-light)'}}>Interactive</span>
          </div> 
        </li> 
          <li className={styles.featureLi}>
            <Link className={styles.featureLink}  to={"/wljs-demo/mix-gauge"}>Use Javascript to make custom UI elements</Link>   
            <div className={styles.badgeHolder}>
              <span className={styles.badge} style={{background: 'var(--ifm-color-success-light)'}}>Interactive</span>
            </div>                  
          </li>    

          <li className={styles.featureLi}>
            <Link className={styles.featureLink}  to={"/wljs-demo/test-joycon"}><b>Nintendo JoyCon</b> Use as a presenter tool</Link>         
          </li>           

          <li className={styles.featureLi}>
            <Link className={styles.featureLink}  to={"/wljs-demo/mix-esm"}><b>Siri animation</b> using NPM libraries</Link>   
            <div className={styles.badgeHolder}>
            <span className={styles.badge} style={{background: 'var(--ifm-color-warning-light)'}}>Animated</span>
            </div>                  
          </li>       
        </ul>

         
        
      </>
    ),
    description: (
      <>
        We don't force you to use only WL; every programming language has its own application.
      </>
    ),
  }  

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
        <div className={styles.row}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
