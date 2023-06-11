import React, { useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const list = [
    "https://cdn.jsdelivr.net/gh/JerryI/wljs-interpreter@master/dist/interpreter.js",
    "https://cdn.jsdelivr.net/gh/JerryI/wljs-interpreter@master/dist/core.js",
    "https://cdn.jsdelivr.net/gh/JerryI/wolfram-js-frontend@master/public/dist/merged.js",
    "https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@master/dist/kernel.js",
    "https://cdn.jsdelivr.net/gh/JerryI/wljs-editor@master/src/boxes.js",
    "https://cdn.jsdelivr.net/gh/JerryI/wljs-markdown-support@master/dist/kernel.js",
    "https://cdn.jsdelivr.net/gh/JerryI/wljs-js-support@master/dist/kernel.js",
    "https://cdn.jsdelivr.net/gh/JerryI/wljs-html-support@master/dist/kernel.js",
    "https://cdn.jsdelivr.net/gh/JerryI/wljs-graphics-d3@master/dist/kernel.js"
];


export function loadScript(url) {
    return new Promise((resolve, reject) => {
    if (ExecutionEnvironment.canUseDOM) {
      var script = document.createElement('script')
      script.src = url
      script.type = "module";
      script.onload = () => {
        resolve()
      }
      script.onerror = () => {
        reject('cannot load script '+ url)
      }
      document.getElementById('helmet').appendChild(script);
    }
    })
  }

  const event = new Event("load-wljs");

export default function Component() {
    useEffect(async () => {
        if (ExecutionEnvironment.canUseDOM) {
        for (const a of list) {
            await loadScript(a);
        }
        
            window.dispatchEvent(event);
        }
    }, []);

    return (
        <div id="helmet">
        </div>          
    )
  }