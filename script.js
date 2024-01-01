import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene(); // add new scean
// first par = display angle| 2. width, height | 3. maximum zoom in | 4. maximum zoom out
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // add camera
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement); //make the camera movable
const clock = new THREE.Clock(); // read the time
let mixer;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const geometry = new THREE.BoxGeometry( 0.01, 0.01, 0.01 ); // add geometryform
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); //add color to geometryform
const cube = new THREE.Mesh( geometry, material ); // mix form and color together
scene.add( cube );

camera.position.z = 5;


const gloader = new GLTFLoader(); // load the model in gltf format
gloader.load('models/girl_on_bike/scene.gltf', (bikergirl) => { // change path for other models

    mixer = new THREE.AnimationMixer(bikergirl.scene); //get the animation
    bikergirl.animations.forEach((clip) => {
        mixer.clipAction(clip).play(); //play on every render animation the of the bikergirl
    });

    scene.add(bikergirl.scene);
});
const light = new THREE.AmbientLight( 0xFFFFFF ); //add color to see the color at the model
scene.add(light);



const loader = new THREE.CubeTextureLoader();
const texture = loader.load([ //load background img's
    'textures/envmap_stormydays/bluecloud_ft.jpg',
    'textures/envmap_stormydays/bluecloud_bk.jpg',
    'textures/envmap_stormydays/bluecloud_up.jpg',
    'textures/envmap_stormydays/bluecloud_dn.jpg',
    'textures/envmap_stormydays/bluecloud_rt.jpg',
    'textures/envmap_stormydays/bluecloud_lf.jpg'
]);
scene.background = texture; // render backgroundImg's

function animate() {
	requestAnimationFrame( animate ); // constantly calling the functions = function loop
	renderer.render( scene, camera );
    let delta = clock.getDelta();
    if (mixer){
        mixer.update(delta);
    }

    // cube.rotation.x += 0.01; // rotate animation
	// cube.rotation.y += 0.01; // rotate animation
}

animate();