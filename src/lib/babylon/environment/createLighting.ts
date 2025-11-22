import * as BABYLON from '@babylonjs/core';

/**
 * יוצר את מערכת התאורה והצללים
 */
export function createLighting(scene: BABYLON.Scene): BABYLON.ShadowGenerator {
  // תאורת רקע כללית
  const hemi = new BABYLON.HemisphericLight(
    'hemi',
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  hemi.intensity = 0.3;

  // זרקור ראשי עם צללים
  const spot = new BABYLON.SpotLight(
    'spot',
    new BABYLON.Vector3(0, 30, 0),
    new BABYLON.Vector3(0, -1, 0),
    Math.PI / 2,
    2,
    scene
  );
  spot.intensity = 4000;
  spot.shadowEnabled = true;

  // מחולל צללים
  const shadowGenerator = new BABYLON.ShadowGenerator(1024, spot);
  shadowGenerator.useBlurExponentialShadowMap = true;
  shadowGenerator.blurKernel = 32;

  return shadowGenerator;
}
