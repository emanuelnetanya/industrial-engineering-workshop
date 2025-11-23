import * as BABYLON from '@babylonjs/core';

/**
 * יוצר מדרגות ופלטפורמה עליונה
 */
export function createStairs(scene: BABYLON.Scene): void {
  const stairMat = new BABYLON.StandardMaterial('stairMat', scene);
  stairMat.diffuseColor = new BABYLON.Color3(0.5, 0.52, 0.55);
  stairMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);

  const stairCount = 10;
  const stairHeight = 0.5;
  const stairDepth = 1.5;
  const stairWidth = 8;

  // מדרגות עולות - צד שמאל
  for (let i = 0; i < stairCount; i++) {
    const stair = BABYLON.MeshBuilder.CreateBox(
      `stairL${i}`,
      { width: stairWidth, height: stairHeight, depth: stairDepth },
      scene
    );
    stair.position = new BABYLON.Vector3(
      -25,
      stairHeight / 2 + i * stairHeight,
      15 + i * stairDepth
    );
    stair.material = stairMat;
  }

  // מדרגות יורדות - צד ימין
  for (let i = 0; i < stairCount; i++) {
    const stair = BABYLON.MeshBuilder.CreateBox(
      `stairR${i}`,
      { width: stairWidth, height: stairHeight, depth: stairDepth },
      scene
    );
    stair.position = new BABYLON.Vector3(
      25,
      5 - stairHeight / 2 - i * stairHeight,
      15 - i * stairDepth
    );
    stair.material = stairMat;
  }

  // פלטפורמה עליונה
  const platform = BABYLON.MeshBuilder.CreateBox(
    'platform',
    { width: 70, height: 0.5, depth: 15 },
    scene
  );
  platform.position = new BABYLON.Vector3(0, 5.25, 30);
  platform.material = stairMat;

  // מעקות
  createRailings(scene, stairCount, stairHeight, stairDepth);
}

/**
 * יוצר מעקות בטיחות למדרגות
 */
function createRailings(
  scene: BABYLON.Scene,
  stairCount: number,
  stairHeight: number,
  stairDepth: number
): void {
  const railMat = new BABYLON.StandardMaterial('railMat', scene);
  railMat.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.72);
  railMat.specularColor = new BABYLON.Color3(0.8, 0.8, 0.8);

  // מעקה שמאל
  for (let i = 0; i < stairCount; i++) {
    const rail = BABYLON.MeshBuilder.CreateCylinder(
      `railL${i}`,
      { height: 2, diameter: 0.15 },
      scene
    );
    rail.position = new BABYLON.Vector3(
      -29,
      1 + i * stairHeight,
      15 + i * stairDepth
    );
    rail.material = railMat;
  }

  // מעקה ימין
  for (let i = 0; i < stairCount; i++) {
    const rail = BABYLON.MeshBuilder.CreateCylinder(
      `railR${i}`,
      { height: 2, diameter: 0.15 },
      scene
    );
    rail.position = new BABYLON.Vector3(
      29,
      6 - i * stairHeight,
      15 - i * stairDepth
    );
    rail.material = railMat;
  }
}
