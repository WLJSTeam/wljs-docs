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

function flattenDeep(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), 
  []);
}

function separateTypes(vector) {
  return vector.reduce((acc, val, idx) => {
    if (typeof val === 'string') {
      acc.categorical.push({ index: idx, value: val });
    } else {
      acc.numerical.push({ index: idx, value: val });
    }
    return acc;
  }, { numerical: [], categorical: [] });
}

function categoricalMatchScore(vector, targetCats) {
  return targetCats.reduce((score, cat) => {
    return vector[cat.index] === cat.value ? score + 1 : score;
  }, 0);
}

function groupByMatchingCategoricals(basis, targetCats) {
  const groups = new Map();
  for (let i = 0; i < basis.length; i++) {
    const vector = basis[i];
    const score = categoricalMatchScore(vector, targetCats);
    if (!groups.has(score)) groups.set(score, []);
    groups.get(score).push(i); // store index
  }
  return Array.from(groups.entries()).sort((a, b) => b[0] - a[0]);
}

function getNumericalVector(vector, indices) {
  return indices.map(i => vector[i]);
}
function isArray(val) {
  return Array.isArray(val);
}

function zeroLike(val) {
  if (!isArray(val)) return 0;
  return val.map(zeroLike);
}

function add(a, b) {
  if (!isArray(a)) return a + b;
  return a.map((ai, i) => add(ai, b[i]));
}

function scale(val, factor) {
  if (!isArray(val)) return val * factor;
  return val.map(v => scale(v, factor));
}

function weightedAverage(values, weights) {
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let sum = zeroLike(values[0]);
  for (let i = 0; i < values.length; i++) {
    sum = add(sum, scale(values[i], weights[i]));
  }
  return scale(sum, 1 / totalWeight);
}

function distance(p1, p2) {
  return Math.sqrt(p1.reduce((sum, v, i) => sum + (v - p2[i]) ** 2, 0));
}

function isString(val) {
  return typeof val === 'string' || val instanceof String;
}

function decomposeString(str) {
  const regex = /(\d*\.?\d+|\D+)/g;
  const parts = str.match(regex);
  const template = [];
  const numbers = [];
  
  for (const part of parts) {
    if (/^\d*\.?\d+$/.test(part)) {
      numbers.push(parseFloat(part));
      template.push(null);
    } else {
      template.push(part);
    }
  }
  return { template, numbers };
}

function recomposeString(template, numbers) {
  let numIndex = 0;
  return template.map(t => t === null ? numbers[numIndex++] : t).join('');
}

async function interpolateMultilinear(query, basisVectors, hashMapGet) {
  const { numerical: queryNum, categorical: queryCat } = separateTypes(query);
  const queryNumOnly = queryNum.map(n => n.value);
  const numIndices = queryNum.map(n => n.index);

  const catGroups = groupByMatchingCategoricals(basisVectors, queryCat);
  let matchingIndices = null;
  for (const [score, group] of catGroups) {
    if (group.length >= 2) {
      matchingIndices = group;
      break;
    }
  }

  if (!matchingIndices) throw new Error("No matching basis found.");

  const points = matchingIndices.map(i => getNumericalVector(basisVectors[i], numIndices));
  const values = await Promise.all(matchingIndices.map(i => hashMapGet(i)));

  const d = queryNumOnly.length;
  let K = Math.pow(2, d);
  K = Math.min(K, matchingIndices.length);

  const withDist = points.map((p, i) => ({
    index: i,
    dist: distance(queryNumOnly, p),
  }));

  withDist.sort((a, b) => a.dist - b.dist);
  const nearest = withDist.slice(0, K);
  const weights = nearest.map(({ dist }) => dist === 0 ? 1e6 : 1 / dist);
  const nearestValues = nearest.map(({ index }) => values[index]);

  const firstVal = nearestValues[0];

  if (isString(firstVal)) {
    const decomposed = nearestValues.map(str => decomposeString(str));

    const firstTemplateStr = JSON.stringify(decomposed[0].template);
const allTemplatesMatch = decomposed.every(d => JSON.stringify(d.template) === firstTemplateStr);
if (!allTemplatesMatch) {
  console.error('Output string differs. Cannot interpolate!');
  // Fallback: return value from the nearest neighbor
  return nearestValues[0];
}

    const numericValues = decomposed.map(d => d.numbers);
    const interpolatedNums = weightedAverage(numericValues, weights);
    const rounded = interpolatedNums.map(n => Number(n.toFixed(2)));

    return recomposeString(decomposed[0].template, rounded);

  } else if (Array.isArray(firstVal)) {
    return weightedAverage(nearestValues, weights);

  } else {
    return weightedAverage(nearestValues, weights);
  }
}

export function WLJSStore({json, notebook, kernel}) {
  const {colorMode, setColorMode} = useColorMode();

  useEffect( () => {
    console.warn('Create store');
    console.warn(json);

    const promises = {};
    const symbols =  {};
    let eventsPool = [];

    const allGood = new Deferred();

    window.server = {
      kernel: {
        io: {
          fire(uid, payload, pattern="Default") {
            eventsPool.push(['fire', uid, payload, pattern]);
          },
          poke(uid) {
            eventsPool.push(['poke', uid]);
          }
        }
      }
    };  
    
    window.server.kernel.emitt = () => {
      console.warn('Emitt is not supported anymore');
    }

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
            
              core[oName].data = structuredClone(i[oName]); //get the data
            
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


      
      fetch(kernel).then((data) => {
        console.log(data);
        data.json().then(async (result)  =>  {
     

          const BlackBox = {};

          const cryptoHash = async (message) => {
            const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
            const hashBuffer = await window.crypto.subtle.digest("SHA-1", msgUint8); // hash the message
            const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
            const hashHex = hashArray
              .map((b) => b.toString(16).padStart(2, "0"))
              .join(""); // convert bytes to hex string
            return hashHex;
          }
        
          BlackBox.StateMachine = class {
            constructor() {
              this.map = new Map();
              this.state = [];
              this.symbol = null;
              this.eventsMap = new Map();
            }
      
            async init(machineData) {
              const string = await interpretate.unzlib64String(machineData.CompressedMap);
              const parsed = JSON.parse(string);
        
              this.map = new Map(parsed);
              this.symbol = machineData.Symbol;
               if (machineData.Basis) {
      this.basis = machineData.Basis;
      this.flattenbasis = machineData.Basis.map((el) => flattenDeep(el));
    }
              
              this.state = [...machineData.InitialValues];
              this.eventsMap = new Map();
              const self = this;
              
              machineData.Events.forEach((el, index) => {
                self.eventsMap.set(el[0]+'::'+el[1], index);
              });
        
              delete machineData.CompressedMap;
              return this;
            }
      
 async run(evId, payload, pattern) {
    const uid = evId+'::'+pattern;
    if (!this.eventsMap.has(uid)) return;
    const index = this.eventsMap.get(uid);
    this.state[index] = payload;
    
    const hash = await cryptoHash(JSON.stringify(this.state));
    const symbol = core[this.symbol];

    if (!this.map.has(hash)) {
      console.log("Hash miss. Attempting to interpolate");
      symbol.data = await this.interpolate();
    } else {
      symbol.data = ['JSObject', structuredClone(this.map.get(hash))];
    }

    
    

    for (const inst of Object.values(symbol.instances)) {
      if (inst.dead) continue;
      await inst.update();
    };
  }

  async interpolate () {
    if (!this.basis) throw 'no basis';

    const self = this;;

    const flatState = flattenDeep(this.state);
    console.log(flatState);
    const interpolated = await interpolateMultilinear(flatState, this.flattenbasis, async (index) => {
      const hash = await cryptoHash(JSON.stringify(self.basis[index]));
      return structuredClone(self.map.get(hash));
    });

    return ['JSObject', interpolated];

  }
          }
      
          BlackBox.PavlovMachine = class {
            constructor() {
              this.map = new Map();
              this.eventsMap = new Map();
            }
      
            async init(machineData) {
              const string = await interpretate.unzlib64String(machineData.CompressedMap);
              const parsed = JSON.parse(string);
        
              this.map = new Map(parsed);
              
              this.eventsMap = new Map();
              const self = this;
              
              machineData.Events.forEach((el) => {
                self.eventsMap.set(el[0]+'::'+el[1]);
              });
        
              delete machineData.CompressedMap;
              return this;
            }
      
            async run(evId, payload, pattern) {
              const uid = evId+'::'+pattern;
              if (!this.eventsMap.has(uid)) return;
              
              const hash = await cryptoHash(JSON.stringify([evId, pattern, payload]));
              if (!this.map.has(hash)) return;
              
              const global = {};
              const local = {};
              interpretate(JSON.parse(this.map.get(hash)), {global: global, local: local});
            }
          }    
      
          BlackBox.AnimationMachine = class {
            constructor() {
      
            }
      
            async init(machineData) {
              const string = await interpretate.unzlib64String(machineData.Compressed);
              const parsed = JSON.parse(string);
        
              this.values = parsed;
              this.count = 0;
              this.parity = true;
      
              this.symbol = machineData.Symbol;
              this.hash = machineData.HashState;
              this.eventId = machineData.Event[0];
              
      
              return this;
            }
      
            async run(evId, payload, pattern) {
              if (this.eventId != evId) return;
              
              const symbol = core[this.symbol];
              symbol.data = ['JSObject', structuredClone(this.values[this.count])];
      
              for (const inst of Object.values(symbol.instances)) {
                if (inst.dead) continue;
                await inst.update();
              };        
      
              if (!this.parity) this.count++;
              this.parity = !this.parity; //animate on 2
              if (this.values.length == this.count) this.count = 0;
            }
          } 
      
          const virtualMachinesData = await interpretate(result, {});
          const virtualMachines = [];
      
          for (const machine of virtualMachinesData) {
            const bbox = new BlackBox[machine.Class]();
            await bbox.init(machine);
      
            virtualMachines.push(bbox);
          }
      
          const length = virtualMachines.length;
      
          window.server.kernel = {
            io: {
              fire: (evId, payload, pattern="Default") => {
                for (let i=0; i<length; ++i)
                  virtualMachines[i].run(evId, payload, pattern);
              },
      
              poke: (evId) => {
                for (let i=0; i<length; ++i)
                  virtualMachines[i].run(evId, true, 'Default');
              }
            }
          } 
          
          eventsPool.forEach((ev) => {
            if (ev[0] == 'fire') {
              window.server.kernel.io.fire(ev[1], ev[2], ev[3]);
            } else if (ev[0] == 'poke') {
              window.server.kernel.io.poke(ev[1]);
            }
          });
          eventsPool = [];
          
          //eventsPool.forEach((ev) => window.server.kernel.emitt(ev.uid, ev.data, ev.type));
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

    core.Medium = () => 0.7
    
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


      window.server.ask = (what) => {
        const p = new Deferred();
        
        if (what.length < 42) {
          console.error('Unknown command');
          console.error(what);
          return false;
        }
        //throw what;
        const offset = 'CoffeeLiqueur`Extensions`FrontendObject`Internal`GetObject["'.length;
        if (Array.isArray(promises[what.slice(offset,-2)])) {
          promises[what.slice(offset,-2)].push(p);
        } else {
          promises[what.slice(offset,-2)] = [p];
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


  console.log('DONE loading mesh');

  if (notebook) {
    return (<>
      <a href={notebook} className={(colorMode == 'dark' ? 'p-2 text-xs w-full flex ring-1 ring-inset shadow ring-gray-300 text-gray-300 my-2' : 'p-2 text-xs w-full flex ring-1 ring-inset text-gray-600 shadow ring-gray-300 bg-gray-300 my-2')} >Download original notebook <SvgIcon/></a>
    </>);
  } 

  return <></>

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







