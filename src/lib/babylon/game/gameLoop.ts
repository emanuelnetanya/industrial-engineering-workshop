import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import { GameState } from './gameState';
import { startPlayerAnimation, stopPlayerAnimation } from '../player/createPlayer';
import { createQuestionModal } from '../gui/questionModal';

/**
 * מאתחל את לולאת המשחק העיקרית
 */
export function setupGameLoop(
  scene: BABYLON.Scene,
  player: BABYLON.TransformNode,
  camera: BABYLON.ArcRotateCamera,
  advancedTexture: GUI.AdvancedDynamicTexture
): void {
  scene.registerBeforeRender(() => {
    if (GameState.isMoving) {
      movePlayer(player, camera, advancedTexture, scene);
    } else {
      // אנימציית idle - תנודה קלה
      player.position.y = Math.sin(Date.now() * 0.002) * 0.1;
    }
  });
}

/**
 * מנהל תנועת השחקן לאורך הנתיב
 */
function movePlayer(
  player: BABYLON.TransformNode,
  camera: BABYLON.ArcRotateCamera,
  advancedTexture: GUI.AdvancedDynamicTexture,
  scene: BABYLON.Scene
): void {
  const target = GameState.path[GameState.currentPoint];
  const moveDir = target.subtract(player.position);
  moveDir.y = 0;
  const dist = moveDir.length();

  if (dist < 0.5) {
    // הגענו לנקודה - עבור לנקודה הבאה
    GameState.currentPoint++;
    if (GameState.currentPoint >= GameState.path.length) {
      GameState.currentPoint = 0; // חזור להתחלה
    }

    // עצור בנקודות אי-זוגיות להצגת שאלה
    if (GameState.currentPoint % 2 !== 0) {
      GameState.isMoving = false;
      stopPlayerAnimation(player);
      createQuestionModal(advancedTexture, () => {
        GameState.isMoving = true;
        startPlayerAnimation(player);
      });
    }
  } else {
    // המשך לנוע לעבר היעד
    moveDir.normalize();
    player.position.addInPlace(moveDir.scale(GameState.speed));

    // סיבוב חלק לכיוון התנועה
    const targetRotation = Math.atan2(moveDir.x, moveDir.z);
    player.rotation.y = BABYLON.Scalar.Lerp(
      player.rotation.y,
      targetRotation,
      0.1
    );
  }

  // המצלמה עוקבת אחרי השחקן בצורה חלקה
  const targetPosition = player.position.add(new BABYLON.Vector3(0, 3, 0));
  camera.target = BABYLON.Vector3.Lerp(camera.target, targetPosition, 0.05);
}
