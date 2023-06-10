import React, { useEffect, useRef } from 'react';
import styles from './styles.css';

import * as fflate from 'fflate';

import useIsBrowser from '@docusaurus/useIsBrowser';


//window.OfflineMode = true;

function strToBin(s) {
    const a = [];
    for (let i = 0; i < s.length; i++) 
        a.push(s.charCodeAt(i));

    return a
}

export default function Notebook({children, code, name, width, height}) {
    /*const zipped = Pako.ungzip(atob(code).split('').map(function (e) {
        return e.charCodeAt(0);
      }));

    console.log(zipped);
    
    const data = JSON.parse(String.fromCharCode.apply(null, new Uint16Array(zipped)));*/


    useEffect(async () => {
        /*await import("https://cdn.jsdelivr.net/gh/JerryI/wljs-interpreter@master/dist/interpreter.js")
        await import("https://cdn.jsdelivr.net/gh/JerryI/wljs-interpreter@master/dist/core.js")
        
        await import("./frontend.js")
        
        await import("https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@master/dist/kernel.js")
        await import("https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@master/src/boxes.js")
        await import("https://cdn.jsdelivr.net/gh/JerryI/wljs-markdown-support@master/dist/kernel.js")
        await import("https://cdn.jsdelivr.net/gh/JerryI/wljs-js-support@master/dist/kernel.js")
        await import("https://cdn.jsdelivr.net/gh/JerryI/wljs-html-support@master/dist/kernel.js")
        
        await import("https://cdn.jsdelivr.net/gh/JerryI/wljs-graphics-d3@master/dist/kernel.js")*/

        const decompressed = fflate.decompressSync(fflate.strToU8(atob(code), true));
        const origText = fflate.strFromU8(decompressed);
    
        const data = JSON.parse(origText);
    
    
    
        console.log(name);
    
        for (const obj of data[0]) {
            const o = new ObjectStorage(obj[0]);
            o.cache = obj[1];
            o.cached = true;
        }



        for (const obj of data[1]) {
            let global = {};
            const env = {local:{}, global:global};
            console.log(obj);
            await interpretate(obj, env);
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


