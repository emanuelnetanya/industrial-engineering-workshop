import * as BABYLON from '@babylonjs/core';
import type { GameStateType } from '../types';

/**
 * מצב המשחק הגלובלי
 */
export const GameState: GameStateType = {
  path: [
    new BABYLON.Vector3(0, 0, -40),
    new BABYLON.Vector3(0, 0, -10),
    new BABYLON.Vector3(-20, 0, 0),
    new BABYLON.Vector3(-20, 0, 30),
    new BABYLON.Vector3(20, 0, 30),
    new BABYLON.Vector3(20, 0, 0),
    new BABYLON.Vector3(0, 0, 50)
  ],
  currentPoint: 0,
  isMoving: false,
  speed: 0.15,
  playerHeight: 2.5
};
