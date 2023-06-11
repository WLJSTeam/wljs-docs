import React, { useEffect } from 'react';

export function useExternalScripts( url ){
    useEffect(() => {
      const head = document.querySelector("head");
      const script = document.createElement("script");
  
      script.setAttribute("src", url);
      script.setAttribute("type", "module");
      head.appendChild(script);
  
      return () => {
        head.removeChild(script);
      };
    }, [url]);
  };

  export function addExternalScripts( src ){
    useEffect(() => {
      const head = document.querySelector("head");
      const script = document.createElement("script");
  
      script.setAttribute("type", "module");
      script.innerText = src;
      head.appendChild(script);
  
      return () => {
        head.removeChild(script);
      };
    }, [src]);
  };