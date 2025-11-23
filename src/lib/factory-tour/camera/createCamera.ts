import * as BABYLON from '@babylonjs/core';
import type { PlayerParts } from '../types';

/**
 * יוצר מצלמה עוקבת אחרי השחקן
 */
export function createFollowCamera(
  scene: BABYLON.Scene,
  player: PlayerParts
): BABYLON.FollowCamera {
  const followCamera = new BABYLON.FollowCamera(
    'followCamera',
    new BABYLON.Vector3(0, 0, 0),
    scene
  );

  // מאוד קרוב למובייל - כמו מצלמה מעל הכתף
  followCamera.radius = 8;
  followCamera.heightOffset = 5;
  followCamera.rotationOffset = 180;
  followCamera.cameraAcceleration = 0.1;
  followCamera.maxCameraSpeed = 15;
  followCamera.lockedTarget = player.body;

  scene.activeCamera = followCamera;

  return followCamera;
}

/**
 * יוצר מערכת תאורה משופרת
 */
export function createLighting(scene: BABYLON.Scene): void {
  // תאורת רקע - מותאם למובייל
  const hemi = new BABYLON.HemisphericLight(
    'hemi',
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  hemi.intensity = 0.7;
  hemi.diffuse = new BABYLON.Color3(1, 1, 1);
  hemi.groundColor = new BABYLON.Color3(0.5, 0.5, 0.55);

  // תאורה ראשית מהשמש - ללא צללים למובייל
  const mainLight = new BABYLON.DirectionalLight(
    'mainLight',
    new BABYLON.Vector3(-0.3, -1, 0.4),
    scene
  );
  mainLight.intensity = 0.8;
  mainLight.position = new BABYLON.Vector3(50, 60, -50);
  mainLight.shadowEnabled = false; // כבוי למובייל

  // תאורת מילוי - קלה יותר
  const fillLight = new BABYLON.PointLight(
    'fillLight',
    new BABYLON.Vector3(0, 15, 0),
    scene
  );
  fillLight.intensity = 0.3;
  fillLight.range = 60;
}
