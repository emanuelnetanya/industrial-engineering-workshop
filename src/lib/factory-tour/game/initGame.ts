import * as BABYLON from '@babylonjs/core';
import { createFloor } from '../environment/createFloor';
import { createBuilding } from '../environment/createBuilding';
import { createStairs } from '../environment/createStairs';
import { createPlayer } from '../player/createPlayer';
import { createAllMachines } from '../machines/createMachines';
import { createFollowCamera, createLighting } from '../camera/createCamera';
import { gameState, stations } from './gameState';
import type { PlayerParts, Station } from '../types';

/**
 * מאתחל את כל המשחק
 */
export function initGame(
  engine: BABYLON.Engine,
  canvas: HTMLCanvasElement,
  onStationReached: (station: Station) => void
): { scene: BABYLON.Scene; player: PlayerParts } {
  const scene = new BABYLON.Scene(engine);

  // הגדרות סצנה - optimized for mobile
  scene.clearColor = new BABYLON.Color4(0.88, 0.92, 0.96, 1);

  // ערפל קל יותר למובייל
  scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
  scene.fogDensity = 0.003;
  scene.fogColor = new BABYLON.Color3(0.88, 0.92, 0.96);

  // אופטימיזציות נוספות
  scene.autoClear = false;
  scene.autoClearDepthAndStencil = false;

  // יצירת סביבה
  createFloor(scene);
  createBuilding(scene);
  createStairs(scene);

  // יצירת שחקן
  const player = createPlayer(scene, stations[0].position);

  // יצירת מצלמה
  createFollowCamera(scene, player);

  // תאורה
  createLighting(scene);

  // יצירת מכונות
  createAllMachines(scene);

  return { scene, player };
}
