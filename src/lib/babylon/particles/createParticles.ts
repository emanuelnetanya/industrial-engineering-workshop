import * as BABYLON from '@babylonjs/core';

/**
 * יוצר מערכת חלקיקי אדים
 */
export function createSteamParticles(
  position: BABYLON.Vector3,
  scene: BABYLON.Scene
): BABYLON.ParticleSystem {
  const particleSystem = new BABYLON.ParticleSystem('steam', 1000, scene);

  // טקסטורת חלקיק (flare)
  particleSystem.particleTexture = new BABYLON.Texture(
    'https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/packages/tools/playground/public/textures/flare.png',
    scene
  );

  // מיקום הפליטה
  particleSystem.emitter = position;
  particleSystem.minEmitBox = new BABYLON.Vector3(-0.5, 0, -0.5);
  particleSystem.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0.5);

  // צבעים
  particleSystem.color1 = new BABYLON.Color4(0.8, 0.8, 0.8, 0.5);
  particleSystem.color2 = new BABYLON.Color4(0.5, 0.5, 0.5, 0.0);

  // גדלים
  particleSystem.minSize = 0.1;
  particleSystem.maxSize = 1.0;

  // חיים
  particleSystem.minLifeTime = 0.3;
  particleSystem.maxLifeTime = 1.5;

  // קצב פליטה
  particleSystem.emitRate = 100;

  // כוח הגרביטציה (למעלה)
  particleSystem.gravity = new BABYLON.Vector3(0, 2, 0);

  particleSystem.start();

  return particleSystem;
}
