import * as BABYLON from '@babylonjs/core';

/**
 * יוצר רצפת מפעל משופרת
 */
export function createFloor(scene: BABYLON.Scene): void {
  const ground = BABYLON.MeshBuilder.CreateGround(
    'ground',
    { width: 150, height: 150 },
    scene
  );

  const groundMat = new BABYLON.StandardMaterial('groundMat', scene);
  groundMat.diffuseColor = new BABYLON.Color3(0.82, 0.84, 0.87);
  groundMat.specularColor = new BABYLON.Color3(0.15, 0.15, 0.15);

  // טקסטורה של בטון תעשייתי
  const groundTexture = new BABYLON.Texture(
    'https://www.babylonjs-playground.com/textures/floor.png',
    scene
  );
  groundTexture.uScale = 20;
  groundTexture.vScale = 20;
  groundMat.diffuseTexture = groundTexture;
  groundMat.bumpTexture = groundTexture;

  ground.material = groundMat;
  ground.receiveShadows = true;

  // קווי סימון צהובים על הרצפה
  for (let i = -3; i <= 3; i++) {
    if (i !== 0) {
      const line = BABYLON.MeshBuilder.CreateBox(
        `floorLine${i}`,
        { width: 80, height: 0.05, depth: 0.3 },
        scene
      );
      line.position = new BABYLON.Vector3(i * 10, 0.03, 0);

      const lineMat = new BABYLON.StandardMaterial(`lineMat${i}`, scene);
      lineMat.diffuseColor = new BABYLON.Color3(0.9, 0.75, 0.1);
      lineMat.emissiveColor = new BABYLON.Color3(0.3, 0.25, 0.05);
      line.material = lineMat;
    }
  }
}
