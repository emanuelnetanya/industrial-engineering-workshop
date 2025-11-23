import * as BABYLON from '@babylonjs/core';

/**
 * יוצר בניין מפעל עם קירות, גג וחלונות
 */
export function createBuilding(scene: BABYLON.Scene): void {
  const wallHeight = 18;

  const wallMat = new BABYLON.StandardMaterial('wallMat', scene);
  wallMat.diffuseColor = new BABYLON.Color3(0.94, 0.94, 0.96);
  wallMat.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);

  // קיר שמאלי
  const leftWall = BABYLON.MeshBuilder.CreateBox(
    'leftWall',
    { width: 1.5, height: wallHeight, depth: 100 },
    scene
  );
  leftWall.position = new BABYLON.Vector3(-42, wallHeight / 2, 0);
  leftWall.material = wallMat;

  // קיר ימני
  const rightWall = BABYLON.MeshBuilder.CreateBox(
    'rightWall',
    { width: 1.5, height: wallHeight, depth: 100 },
    scene
  );
  rightWall.position = new BABYLON.Vector3(42, wallHeight / 2, 0);
  rightWall.material = wallMat;

  // קיר אחורי
  const backWall = BABYLON.MeshBuilder.CreateBox(
    'backWall',
    { width: 84, height: wallHeight, depth: 1.5 },
    scene
  );
  backWall.position = new BABYLON.Vector3(0, wallHeight / 2, 35);
  backWall.material = wallMat;

  // קיר קדמי עם שער כניסה
  const frontWallLeft = BABYLON.MeshBuilder.CreateBox(
    'frontWallLeft',
    { width: 30, height: wallHeight, depth: 1.5 },
    scene
  );
  frontWallLeft.position = new BABYLON.Vector3(-27, wallHeight / 2, -35);
  frontWallLeft.material = wallMat;

  const frontWallRight = BABYLON.MeshBuilder.CreateBox(
    'frontWallRight',
    { width: 30, height: wallHeight, depth: 1.5 },
    scene
  );
  frontWallRight.position = new BABYLON.Vector3(27, wallHeight / 2, -35);
  frontWallRight.material = wallMat;

  // שלט כניסה
  const signMat = new BABYLON.StandardMaterial('signMat', scene);
  signMat.diffuseColor = new BABYLON.Color3(0.15, 0.35, 0.75);
  signMat.emissiveColor = new BABYLON.Color3(0.08, 0.18, 0.38);

  const entranceSign = BABYLON.MeshBuilder.CreateBox(
    'entranceSign',
    { width: 18, height: 3, depth: 0.5 },
    scene
  );
  entranceSign.position = new BABYLON.Vector3(0, 13, -35.5);
  entranceSign.material = signMat;

  // עמודי כניסה
  const pillarMat = new BABYLON.StandardMaterial('pillarMat', scene);
  pillarMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.52);
  pillarMat.specularColor = new BABYLON.Color3(0.6, 0.6, 0.6);

  for (const side of [-1, 1]) {
    const pillar = BABYLON.MeshBuilder.CreateBox(
      `pillar${side}`,
      { width: 2, height: wallHeight, depth: 2 },
      scene
    );
    pillar.position = new BABYLON.Vector3(side * 12, wallHeight / 2, -35);
    pillar.material = pillarMat;
  }

  // גג שקוף
  const roof = BABYLON.MeshBuilder.CreateBox(
    'roof',
    { width: 84, height: 0.8, depth: 100 },
    scene
  );
  roof.position.y = wallHeight;

  const roofMat = new BABYLON.StandardMaterial('roofMat', scene);
  roofMat.diffuseColor = new BABYLON.Color3(0.7, 0.8, 0.9);
  roofMat.specularColor = new BABYLON.Color3(1, 1, 1);
  roofMat.alpha = 0.15;
  roof.material = roofMat;

  // חלונות
  createWindows(scene, wallHeight);
}

/**
 * יוצר חלונות בקירות
 */
function createWindows(scene: BABYLON.Scene, wallHeight: number): void {
  const windowMat = new BABYLON.StandardMaterial('windowMat', scene);
  windowMat.diffuseColor = new BABYLON.Color3(0.6, 0.75, 0.9);
  windowMat.alpha = 0.3;
  windowMat.specularColor = new BABYLON.Color3(1, 1, 1);

  // חלונות בקיר שמאלי
  for (let i = 0; i < 5; i++) {
    const window = BABYLON.MeshBuilder.CreateBox(
      `windowL${i}`,
      { width: 0.2, height: 4, depth: 6 },
      scene
    );
    window.position = new BABYLON.Vector3(-42, 10, -30 + i * 15);
    window.material = windowMat;
  }

  // חלונות בקיר ימני
  for (let i = 0; i < 5; i++) {
    const window = BABYLON.MeshBuilder.CreateBox(
      `windowR${i}`,
      { width: 0.2, height: 4, depth: 6 },
      scene
    );
    window.position = new BABYLON.Vector3(42, 10, -30 + i * 15);
    window.material = windowMat;
  }
}
