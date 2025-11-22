import * as BABYLON from '@babylonjs/core';

/**
 * מצב המשחק הגלובלי
 */
export interface GameStateType {
  path: BABYLON.Vector3[];
  currentPoint: number;
  isMoving: boolean;
  speed: number;
  playerHeight: number;
}

/**
 * חומרים של המשחק
 */
export interface GameMaterials {
  floor: BABYLON.PBRMaterial;
  metal: BABYLON.PBRMaterial;
  glowBlue: BABYLON.PBRMaterial;
  glowOrange: BABYLON.PBRMaterial;
  hazard: BABYLON.PBRMaterial;
}

/**
 * מטא-דאטה של השחקן
 */
export interface PlayerMetadata {
  wheel: BABYLON.Mesh;
  armL: BABYLON.Mesh;
  armR: BABYLON.Mesh;
}
