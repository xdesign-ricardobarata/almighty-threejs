import * as THREE from "three";

import "./style.css";
import { debounce } from "./utils/debounce";
import { createLetterTexture } from "./utils/createLetterTexture";
import { adjustCamera } from "./utils/adjustCamera";

// Define your string array
const inputString = "memes";
const stringArray = [...inputString.toUpperCase()];

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube geometry
const geometry = new THREE.BoxGeometry();

// Create materials with textures for each letter
const cubes: THREE.Mesh<
  THREE.BoxGeometry,
  THREE.MeshBasicMaterial[],
  THREE.Object3DEventMap
>[] = [];

const materialEdges = new THREE.LineBasicMaterial({ color: 0x000000 });

// Create cubes with each letter on all faces
stringArray.forEach((letter, i) => {
  const materials = Array(6).fill(
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: createLetterTexture(letter),
    })
  );

  const cube = new THREE.Mesh(geometry, materials);

  // Create an edges object to display the cube's edges
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    materialEdges
  );

  cube.add(edges);

  cubes.push(cube);

  // Position the cubes
  cube.position.set(i * 2, 0, 0);

  // Add the cube to the scene
  scene.add(cube);
});

// Function to dynamically adjust the camera to fit all cubes

// Create an animation function
const animate = () => {
  requestAnimationFrame(animate);
  // Rotate the cubes
  cubes.forEach((cube) => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  });

  // Render the scene
  renderer.render(scene, camera);
};

// Call the animation function
animate();

// Call the function to initially adjust the camera
adjustCamera(scene, camera, cubes);

// Update the camera if the window is resized

// Set your desired debounce delay (in milliseconds)
const debounceDelay = 250; // Adjust as needed

window.addEventListener(
  "resize",
  debounce(() => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
    adjustCamera(scene, camera, cubes); // Adjust the camera when the window is resized
  }, debounceDelay)
);
