import React, { useEffect, useRef } from 'react';
import styles from './styles.css';

import * as fflate from 'fflate';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';


function strToBin(s) {
    const a = [];
    for (let i = 0; i < s.length; i++) 
        a.push(s.charCodeAt(i));

    return a
}

if (ExecutionEnvironment.canUseDOM) {
    window.eventAttr = {};
    window.OfflineMode = true;
}

function generateGuid() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    }

export default function Notebook({children, code, name, width, height}) {
    /*const zipped = Pako.ungzip(atob(code).split('').map(function (e) {
        return e.charCodeAt(0);
      }));

    console.log(zipped);
    
    const data = JSON.parse(String.fromCharCode.apply(null, new Uint16Array(zipped)));*/
    

//window.OfflineMode = true;
    useEffect( () => {
      if (ExecutionEnvironment.canUseDOM) {
        //alert('use effect... on' + name);
        const uid = generateGuid();
        
        
        const func = async () => {
            window.LoadedWLJSForSure = true
            //if (name in window.loadedNotebooks) return;
            if (uid in window.eventAttr) {
                //alert('rejected on' + name);
                return;
            }

            //window.loadedNotebooks[name] = true;
            window.eventAttr[uid] = true;

            //alert('add cells '+name);
            const decompressed = fflate.decompressSync(fflate.strToU8(atob(code), true));
            const origText = fflate.strFromU8(decompressed);
            
            const data = JSON.parse(origText);
            
            
            
            console.warn(name);
            
            for (const obj of data[0]) {
                const o = new ObjectStorage(obj[0]);
                o.cache = obj[1];
                o.cached = true;
            }

            if (data.length > 2) {
                console.warn('symbols restore');
                console.log(data);
                for (const obj of data[2]) {
                    console.log(obj);
                    //FrontEndRestoreSymbol
                }
            }

        


            for (const obj of data[1]) {
                let global = {};
                const env = {local:{}, global:global};
                console.log(obj);
                await interpretate(obj, env);
            }

            //window.removeEventListener("load-wljs", func);
        }

        if (window.LoadedWLJSForSure) func(); else window.addEventListener("load-wljs", func);

        return () => {
            //alert('removed');
            Object.values(window.CellHashStorage).forEach((c)=>{
                console.log(c);
                if (c?.type === "input") c.dispose();
            });
            //document.getElementById(name).parentNode.parentNode.remove();
          };
    }
    

    }, []);

    return(
        <main id="frontend-editor" className="main-container styles-container-editor">

            <div id="frontend-editor-content" className="group-container" >
                <div id={name}></div>
        </div>
        </main>
    )
}


