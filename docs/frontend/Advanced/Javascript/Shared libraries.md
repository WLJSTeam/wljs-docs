There are shared Javascript libraries used by various modules available in `interpretate.shared`  object.

Here is an example with THREE.js used by [Graphics3D](frontend/Reference/Graphics3D/Graphics3D.md)

```js
.js
const dom = document.createElement('div');
let animation;

async function buildScene() {
  await interpretate.shared.THREE.load(); //here
  const THREE = interpretate.shared.THREE.THREE;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( 400, 300);

  dom.appendChild( renderer.domElement );

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5 

  function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
    animation = requestAnimationFrame(animate);

  } 

  animate();
}

this.ondestroy = () => {
  cancelAnimationFrame(animation);
  console.log('removed');
}

buildScene();


return dom;
```

![](./../../../Screenshot%202024-11-29%20at%2017.45.30.png)