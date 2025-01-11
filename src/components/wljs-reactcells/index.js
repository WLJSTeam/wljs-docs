import React, { useEffect, useRef } from 'react';
import {useState} from 'react'

import { md5 } from 'js-md5';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import SvgIcon from './download.svg';

import { useColorMode } from '@docusaurus/theme-common';

import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { interpolate } from '@docusaurus/Interpolate';
import useIsBrowser from '@docusaurus/useIsBrowser';

//import { Mma } from 'mma-uncompress/src/mma.js';

export function WLJSStore({json, notebook, kernel}) {
  const {colorMode, setColorMode} = useColorMode();

  useEffect( () => {
    console.warn('Create store');
    console.warn(json);

    const promises = {};
    const symbols =  {};
    const eventsPool = [];

    const allGood = new Deferred();

    let fetchFile = async () => {
      fetchFile = async () => {}

      fetch(json).then((data) => {
        console.warn('Store loaded!');
        data.json().then((result) => {


          interpretate(result.objects, {hold:true}).then((i) => {
            console.warn('Objects loaded!');
            Object.keys(i).forEach((oName) => {
              const obj = new ObjectStorage(oName);
              obj.cache = i[oName];
              obj.cached = true;
            });

            Object.keys(promises).forEach((key) => {
              if (Array.isArray(promises[key])) {
                promises[key].forEach((el) => el.resolve(i[key]));
              } else {
                promises[key].resolve(i[key]);
              }
            })
          })

          interpretate(result.symbols, {hold:true}).then((i) => {
            console.warn('Symbols loaded!');
            Object.keys(i).forEach((oName) => {
              core[oName] = async (args, env) => {
                const data = await interpretate(core[oName].data, env);
                return data;
              }
              core[oName].data = i[oName]
              core[oName] = async (args, env) => {
                console.log('IE: calling our symbol...');
                //evaluate in the context
                const data = await interpretate(core[oName].data, env);
            
                if (env.root && !env.novirtual) core[oName].instances[env.root.uid] = env.root; //if it was evaluated insdide the container, then, add it to the tracking list
                //if (env.hold) return ['JSObject', core[name].data];
            
                return data;
              }
            
              core[oName].update = async (args, env) => {
                //evaluate in the context
                //console.log('IE: update was called...');
            
                //cache good for numerics
                if (env.useCache) {
                  if (!core[oName].cached || core[oName].currentData != core[oName].data) {
                    core[oName].cached = await interpretate(core[oName].data, env);
                    core[oName].currentData = core[oName].data; //just copy the reference
                    //console.log('cache miss');
                  } 
            
                  return core[oName].cached;
                }
            
                const data = await interpretate(core[oName].data, env);
                //if (env.hold) return ['JSObject', data];
                return data;
              }  
            
              core[oName].destroy = async (args, env) => {
            
                delete core[oName].instances[env.root.uid];
                console.warn(env.root.uid + ' was destroyed')
                console.warn('external symbol was destoryed');
              }  
            
              core[oName].data = i[oName]; //get the data
            
              core[oName].virtual = true;
              core[oName].instances = {};

            });

            Object.keys(symbols).forEach((key) => {
              console.warn(key);
              symbols[key].resolve(i[key]);
            });

            allGood.resolve(); // final point

          })
          

        });
      });

    }

    const loadKernel = async () => {console.warn('Kernel');
    if (kernel) {
      console.warn('KERNEL');
      if (!interpretate.unzlib64String) {
        const p = new Deferred();
        const scriptTag = document.createElement('script');
        scriptTag.src = "https://cdn.jsdelivr.net/gh/JerryI/wljs-export-html@main/dist/zip.min.js";
        scriptTag.addEventListener('load', () => p.resolve());
        document.head.appendChild(scriptTag);
        await p.promise;
        console.warn('ZIP loaded!');
      }

      if (!window.KernelState) {
        const p = new Deferred();
        const scriptTag = document.createElement('script');
        scriptTag.src = "https://cdn.jsdelivr.net/gh/JerryI/wljs-export-html@main/dist/decoder.min.js";
        scriptTag.addEventListener('load', () => p.resolve());
        document.head.appendChild(scriptTag);
        await p.promise;
        console.warn('KernelState lib loaded!');
      }        

      fetch(kernel).then((data) => {
        console.log(data);
        data.json().then(async (result)  =>  {
          let mesh = result;
          mesh = mesh.map((m) => interpretate.unzlib64String(m));
          mesh = mesh.map(KernelMesh.unpack);
          console.warn('Mesh loaded!');

          //await allGood.promise;

          window.server.kernel.emitt = function(uid, data, type = 'Default') {
            setTimeout(() => {
              const message = {type: 'event', uid: uid, pattern: type, data:data};
              //console.warn(message);
              const kernels = mesh;

              for (let i=0; i<kernels.length; ++i) {
                if (!kernels[i].test(message)) continue;

                if (!kernels[i].state) {
                  if (kernels[i].database.has('$initialization')) {
                    const init = kernels[i].database.get('$initialization');
                    init.forEach((ie) => kernels[i].state = new KernelState(kernels[i].state, ie, true));
                  } 
                  
                  kernels[i].state = new KernelState(kernels[i].state, message, true);

                } else {
                  kernels[i].state = new KernelState(kernels[i].state, message, true);
                }

                //console.warn(kernels[i]);

                kernels[i].state.exec(kernels[i].database, (fn) => {
                  //console.warn(fn);
                  for (const f of Object.keys(fn)) {
                    //console.warn(f);
                    if (f === '$state') continue;

                    if (fn[f].set.length === 1) {       
                      core[f].data = fn[f].set[0];
                      for (const inst of Object.values(core[f].instances)) {
                        inst.update();
                      };
                    } else {
                      //console.warn(core[f]);
                      //console.warn(f);
                      fn[f].i += 1;
                      if (fn[f].i >= fn[f].set.length) fn[f].i = 0;
                      core[f].data = fn[f].set[fn[f].i];
                      for (const inst of Object.values(core[f].instances)) {
                        inst.update();
                      };
                    }
                  }

                  
                });
              }
            }, 2);
          } 
          
          eventsPool.forEach((ev) => window.server.kernel.emitt(ev.uid, ev.data, ev.type));
        });
      });
    }   };



    core.Offload = (args, env) => {
      if (args.length > 1) {
          //alternative path - checking options
          //do it in ugly superfast way
          if (args[1][1] === "'Static'") {
              if (args[1][2]) {
                  return interpretate(args[0], {...env, static: true});
              }
          } else if (args.length > 2) {
              if (args[2][1] === "'Static'") {
                  if (args[2][2]) {
                      return interpretate(args[0], {...env, static: true});
                  }                
              }
          }
      }
    
      return interpretate(args[0], env);
    }
    
    core.Offload.update = (args, env) => {
      if (args.length > 1) {
          //alternative path - checking options
          //do it in ugly superfast way
    
          //Volitile -> False -> Reject updates
    
          //low-level optimizations, we dont' need to spend time on parsing options
          if (args[1][1] === "'Volatile'") {
              if (!args[1][2]) {
                  console.log('Update was rejected (Nonvolatile)');
                  return;
              }
          } else if (args.length > 2) {
              if (args[2][1] === "'Volatile'") {
                  if (!args[2][2]) {
                      console.log('Update was rejected (Nonvolatile)');
                      return;
                  }                
              }
          }
      }
    
      return interpretate(args[0], env);
    }

    window.server = {
      kernel: {}
    };
      window.server.ask = (what) => {
        const p = new Deferred();
        
        if (what.length < 42) {
          console.error('Unknown command');
          console.error(what);
          return false;
        }

        if (Array.isArray(promises[what.slice(42,-2)])) {
          promises[what.slice(42,-2)].push(p);
        } else {
          promises[what.slice(42,-2)] = [p];
        }
        
        fetchFile();
        return p.promise;
      }

      window.server.getSymbol = (name) => {
        const p = new Deferred();

        console.warn('Asking for symbol' + name);

        symbols[name] = p;
        return p.promise;
      }

      window.server.kernel.emitt = function(uid, data, type = 'Default') {
        eventsPool.push({uid: uid, data: data, type: type});
      }

      interpretate.anonymous = async (d, org) => {
        //TODO Check if it set delayed or set... if set, then one need only to cache it
        console.log('Anonimous symbol: ' + JSON.stringify(d));  
      
        let name;
        //check it is a plain symbol
        if (d instanceof Array) {
          console.error(d);
          //console.error(jsonStringifyRecursive(org.global.stack));
          throw('unknown WL expression. Error at '+d[0]);
        } else {
          name = d;   //symbol
        }
      
        let data;
        const p = new Deferred();

        console.warn('Asking for symbol' + name);

        symbols[name] = p;
        data = await p.promise;
        
      
        //if it is OK
      
        core[name] = async (args, env) => {
          console.log('IE: calling our symbol...');
          //evaluate in the context
          const data = await interpretate(core[name].data, env);
      
          if (env.root && !env.novirtual) core[name].instances[env.root.uid] = env.root; //if it was evaluated insdide the container, then, add it to the tracking list
          //if (env.hold) return ['JSObject', core[name].data];
      
          return data;
        }
      
        core[name].update = async (args, env) => {
          //evaluate in the context
          //console.log('IE: update was called...');
      
          //cache good for numerics
          if (env.useCache) {
            if (!core[name].cached || core[name].currentData != core[name].data) {
              core[name].cached = await interpretate(core[name].data, env);
              core[name].currentData = core[name].data; //just copy the reference
              //console.log('cache miss');
            } 
      
            return core[name].cached;
          }
      
          const data = await interpretate(core[name].data, env);
          //if (env.hold) return ['JSObject', data];
          return data;
        }  
      
        core[name].destroy = async (args, env) => {
      
          delete core[name].instances[env.root.uid];
          console.warn(env.root.uid + ' was destroyed')
          console.warn('external symbol was destoryed');
        }  
      
        core[name].data = data; //get the data
      
        core[name].virtual = true;
        core[name].instances = {};
      
        //interpretate it AGAIN!
        return interpretate(d, org);
      }


  loadKernel();    
  });


  

 
 
  return (<>
    <a href={notebook} className={(colorMode == 'dark' ? 'p-2 text-xs w-full flex ring-1 ring-inset shadow ring-gray-300 text-gray-300 my-2' : 'p-2 text-xs w-full flex ring-1 ring-inset text-gray-600 shadow ring-gray-300 bg-gray-300 my-2')} >Download original notebook <SvgIcon/></a>
  </>);
}

export function WLJSHTML({children, data}) {
  const markup = { __html:  decodeURIComponent(children)};
  return <div dangerouslySetInnerHTML={markup} />;
}

export function WLJSEditor({children, nid, id, type, display, opts}) {
  const ref = useRef(null);

  const {colorMode, setColorMode} = useColorMode();

  const decoded = decodeURIComponent(children);

  const [faded, setFaded]   = useState(opts.Fade);
  const [loaded, setLoaded] = useState(false);

  useEffect( () => {
    const element = ref.current;
    console.warn('Create Codemirror');
    console.warn(display);

    
    console.log(decoded);
    

    setLoaded(true);
    let s;
    console.warn('Created: '+display);
    if (display == 'print') return;
    if (!window.SupportedCells[display]) {
      console.warn('Not found: '+display); 
      return;
    }   
    if (window.SupportedCells[display].view) s = new window.SupportedCells[display].view({element: element}, decoded);
    

    if (s.editor && opts.Fade) {
   

      ref.current.addEventListener('focusin', () => {
        //console.error('FOCUS');
        setFaded(false);
      });

      ref.current.addEventListener('focusout', () => {
        //console.error('FOCUS');
        setFaded(true);
      });

    }

    return () => {
      if (s) s.dispose();
    }
  }, []);

  return (
    <div style={{filter: (colorMode == 'dark' ? 'invert(1) contrast(0.8) hue-rotate(-185deg)' : 'none')}} className="language-mathematica codeBlockContainer_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Container-styles-module theme-code-block">
       <div className={ faded ? "h-fade-20 codeBlockContent_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module" : "codeBlockContent_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module"}>
          <pre tabIndex="0" className="prism-code language-mathematica codeBlock_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module thin-scrollbar" style={{color: 'rgb(57, 58, 52)', backgroundColor: 'rgb(246, 248, 250)'}}>
          {!loaded &&
            <code style={{'whiteSpace': 'pre-wrap'}} className="codeBlockLines_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module">{decoded}</code>
          }
            <code ref={ref} className="codeBlockLines_node_modules-@docusaurus-theme-classic-lib-theme-CodeBlock-Content-styles-module"></code> 
          </pre>
       </div>
    </div>   
  )
}







