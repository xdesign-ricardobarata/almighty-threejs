import * as THREE from "three";

export const adjustCamera = (
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  cubes: THREE.Mesh<
    THREE.BoxGeometry,
    THREE.MeshBasicMaterial[],
    THREE.Object3DEventMap
  >[]
) => {
  if (cubes.length === 0) {
    // No cubes to calculate bounding box
    return;
  }

  const boundingBox = new THREE.Box3().setFromObject(scene);
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  boundingBox.getCenter(center);
  boundingBox.getSize(size);

  const maxDimension = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180); // Convert FOV to radians
  const distance = Math.abs(maxDimension / Math.sin(fov / 2));

  camera.position.copy(center);
  camera.position.z = distance;

  camera.near = distance / 1000;
  camera.far = distance * 1000;

  // Calculate the number of cubes in the scene
  const numCubes = cubes.length;
  const maxCubeSize = 2; // Assuming each cube has a fixed size of 2 units

  // Calculate the new field of view based on the number of cubes
  const newFov =
    Math.atan((numCubes * maxCubeSize) / (2 * distance)) * (180 / Math.PI);

  // Update the camera's field of view
  camera.fov = newFov;

  camera.updateProjectionMatrix();
};
