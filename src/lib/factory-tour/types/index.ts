import * as BABYLON from '@babylonjs/core';

/**
 * מידע על תחנה בסיור
 */
export interface Station {
  position: BABYLON.Vector3;
  name: string;
  description: string;
  hasInfo: boolean;
}

/**
 * מצב המשחק
 */
export interface GameState {
  isActive: boolean;
  currentStation: number;
  isMoving: boolean;
  walkSpeed: number;
  rotationSpeed: number;
  waitingForInput: boolean;
}

/**
 * מטא-דאטה של חלקי השחקן
 */
export interface PlayerParts {
  root: BABYLON.TransformNode;
  body: BABYLON.Mesh;
  head: BABYLON.Mesh;
  leftArm: BABYLON.Mesh;
  rightArm: BABYLON.Mesh;
  leftLeg: BABYLON.Mesh;
  rightLeg: BABYLON.Mesh;
}
