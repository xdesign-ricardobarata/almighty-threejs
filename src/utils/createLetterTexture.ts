import * as THREE from "three";

export const createLetterTexture = (letter: string): THREE.Texture => {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas 2D context is not supported.");
  }

  canvas.width = 256;
  canvas.height = 256;
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "black";
  context.font = "bold 150px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(letter, canvas.width / 2, canvas.height / 2);

  const texture: THREE.Texture = new THREE.CanvasTexture(canvas);
  return texture;
};
