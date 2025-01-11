import React, { useEffect, useRef } from 'react';

import { md5 } from 'js-md5';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';


import { useColorMode } from '@docusaurus/theme-common';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { interpolate } from '@docusaurus/Interpolate';
import useIsBrowser from '@docusaurus/useIsBrowser';

//import { Mma } from 'mma-uncompress/src/mma.js';

export function CodeMirror({children, data}) {
  
  const ref = useRef(null);

  const {colorMode, setColorMode} = useColorMode();

  useEffect( () => {
    const element = ref.current;
    console.log('Create Codemirror');

    window.CMInitialized = true;

    if (window.CMInitialized) {

    }

    const s = new window.SupportedCells['codemirror'].view({element: element}, children);

    return () => {
      if (s) {
        //s.destroy();
        console.log('Remove Codemirror');
      }
    }
  }, []);

  return (
<div style={{filter: (colorMode == 'dark' ? 'invert(1) contrast(0.8) hue-rotate(-185deg)' : 'none')}} className="language-mathematica codeBlockContainer_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Container-styles-module theme-code-block">
   <div className="codeBlockContent_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module">
      <pre tabIndex="0" className="prism-code language-mathematica codeBlock_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module thin-scrollbar" style={{color: 'rgb(57, 58, 52)', backgroundColor: 'rgb(246, 248, 250)'}}>
        <code ref={ref} className="codeBlockLines_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module"></code>
      </pre>
   </div>
</div>   
  )
}



export function Wl({children, data}) {
    const ref = useRef(null);

    const {siteConfig} = useDocusaurusContext();
    const {baseUrl, url} = siteConfig;
    
    useEffect( () => {

    
      console.warn('Loading component...');
      const element = ref.current;
      let elt = document.createElement("div");
      elt.classList.add("frontend-object");
      elt.setAttribute('data-object', "loading...");
      element.appendChild(elt);
      
      //callid
      const cuid = Date.now() + Math.floor(Math.random() * 100);
      var global = {call: cuid};
  
      let env = {global: global, element: elt}; //Created in CM6
      console.warn('decrypting...');

      try {
        //let decoded = Mma.DecompressDecode(data);
        //decoded = Mma.toArray(decoded.parts[0]);
        //let decoded = JSON.parse(atob(data));
        //console.log(decoded);
        console.log(url);
        if (baseUrl.length < 3) {
          
          console.log(url +'/expressions/' + md5(children.trim()) + '.json');
          fetch(url +'/expressions/' + md5(children.trim()) + '.json').then(r => {
            r.json().then((r) => {
              interpretate(['FrontEndVirtual', r], env);
            });
          })
        } else {
          console.log(baseUrl +'/expressions/' + md5(children.trim()) + '.json');
          fetch(baseUrl +'/expressions/' + md5(children.trim()) + '.json').then(r => {
            r.json().then((r) => {
              interpretate(['FrontEndVirtual', r], env);
            });
          })
        }


        //const decoded = atob(data);

        //i
      } catch(error) {
        console.warn('Error!');
        console.warn(error);
      }
      
      /*
      console.log('decoded!');
      console.log(json);
      
  
      //this.ref.push(this.fobj);
  
      */

    }, []);

    return (
        <main id="frontend-editor" className="main-container styles-container-editor">
            <div id="frontend-editor-content" className="group-container" >
                <div ref={ref}></div>
            </div>
        </main>
    )
}


