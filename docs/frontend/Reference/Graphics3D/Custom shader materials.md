Using [Shared libraries](frontend/Advanced/Javascript/Shared%20libraries.md) and [WLJS Functions](frontend/Advanced/Frontend%20interpretation/WLJS%20Functions.md) one can define a custom vertex / fragment shaders to be used by [Graphics3D](frontend/Reference/Graphics3D/Graphics3D.md) primitives.

*Adapted example from [DEV.io](https://dev.to/maniflames/creating-a-custom-shader-in-threejs-3bhi)*

```js title="Javascript cell"
.js
function vertexShader() {
  return `
    varying vec3 vUv; 

    void main() {
      vUv = position; 

      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `;
}

function fragmentShader()  {
  return `
      uniform vec3 colorA; 
      uniform vec3 colorB; 
      varying vec3 vUv;

      void main() {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
      }
  `;
}

let THREE;
interpretate.shared.THREE.load().then(() => {
  THREE = interpretate.shared.THREE.THREE;
})

core.CustomMaterial = async (args, env) => {
  let uniforms = {
    colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
    colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)}
  }

  return (function() {
    return new THREE.ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: fragmentShader(),
      vertexShader: vertexShader(),
    });
  })
}
```

Now hook it up to some basic graphics primitives

```mathematica title="WL cell"
Graphics3D[{
  Translate[PolyhedronData["Dodecahedron"][[1]]//N , {-2,-3,0}],
  MeshMaterial[CustomMaterial[]],
  Translate[PolyhedronData["Dodecahedron"][[1]]//N , {2,3,0}]
}]
```

![](./../../../Screenshot%202024-11-10%20at%2020.21.16.png)