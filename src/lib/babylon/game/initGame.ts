import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import { createMaterials } from '../materials/createMaterials';
import { createEnvironment } from '../environment/createEnvironment';
import { createLighting } from '../environment/createLighting';
import { createPlayer, startPlayerAnimation } from '../player/createPlayer';
import { createMachines } from '../machines/createMachines';
import { createStartScreen, animateCameraZoom } from '../gui/startScreen';
import { setupGameLoop } from './gameLoop';
import { GameState } from './gameState';

/**
 * מאתחל את כל המשחק
 */
export function initGame(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
  const scene = new BABYLON.Scene(engine);

  // הגדרות סצנה
  scene.clearColor = new BABYLON.Color4(0.02, 0.02, 0.03, 1);
  scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
  scene.fogDensity = 0.008;
  scene.fogColor = new BABYLON.Color3(0.02, 0.02, 0.03);

  // יצירת חומרים
  const materials = createMaterials(scene);

  // יצירת סביבה
  createEnvironment(scene, materials);

  // תאורה וצללים
  const shadowGenerator = createLighting(scene);

  // יצירת שחקן
  const player = createPlayer(
    scene,
    materials,
    GameState.path[0],
    shadowGenerator
  );

  // מצלמה
  const camera = new BABYLON.ArcRotateCamera(
    'camera',
    -Math.PI / 2,
    Math.PI / 3,
    25,
    player.position,
    scene
  );
  camera.lowerRadiusLimit = 10;
  camera.upperRadiusLimit = 40;
  camera.lowerBetaLimit = 0.1;
  camera.upperBetaLimit = Math.PI / 2.2;
  camera.attachControl(canvas, true);

  // מכונות ומכשולים
  createMachines(scene, materials, shadowGenerator);

  // Post Processing
  const pipeline = new BABYLON.DefaultRenderingPipeline(
    'pipeline',
    true,
    scene,
    [camera]
  );
  pipeline.bloomEnabled = true;
  pipeline.bloomThreshold = 0.6;
  pipeline.bloomWeight = 0.4;
  pipeline.fxaaEnabled = true;

  // GUI
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
  createStartScreen(advancedTexture, () => {
    GameState.isMoving = true;
    startPlayerAnimation(player);
    animateCameraZoom(camera, scene);
  });

  // לולאת משחק
  setupGameLoop(scene, player, camera, advancedTexture);

  return scene;
}
