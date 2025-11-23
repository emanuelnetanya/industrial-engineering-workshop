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

  followCamera.radius = 25;
  followCamera.heightOffset = 15;
  followCamera.rotationOffset = 180;
  followCamera.cameraAcceleration = 0.05;
  followCamera.maxCameraSpeed = 10;
  followCamera.lockedTarget = player.body; // שימוש ב-mesh במקום transform node

  scene.activeCamera = followCamera;

  return followCamera;
}

/**
 * יוצר מערכת תאורה משופרת
 */
export function createLighting(scene: BABYLON.Scene): void {
  // תאורת רקע
  const hemi = new BABYLON.HemisphericLight(
    'hemi',
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  hemi.intensity = 0.6;
  hemi.diffuse = new BABYLON.Color3(1, 1, 1);
  hemi.groundColor = new BABYLON.Color3(0.4, 0.4, 0.45);

  // תאורה ראשית מהשמש
  const mainLight = new BABYLON.DirectionalLight(
    'mainLight',
    new BABYLON.Vector3(-0.3, -1, 0.4),
    scene
  );
  mainLight.intensity = 1;
  mainLight.position = new BABYLON.Vector3(50, 60, -50);
  mainLight.shadowEnabled = true;

  // תאורת מילוי
  const fillLight = new BABYLON.PointLight(
    'fillLight',
    new BABYLON.Vector3(0, 15, 0),
    scene
  );
  fillLight.intensity = 0.5;
  fillLight.range = 80;
}
