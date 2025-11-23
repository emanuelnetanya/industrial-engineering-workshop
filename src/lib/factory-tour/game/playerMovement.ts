import * as BABYLON from '@babylonjs/core';
import type { PlayerParts, Station } from '../types';
import { gameState, stations } from './gameState';

/**
 * מנהל תנועת השחקן לאורך הסיור
 */
export function movePlayerToStation(
  player: PlayerParts,
  deltaTime: number,
  onStationReached: (station: Station) => void
): void {
  if (!gameState.isMoving || !player.root) return;

  const targetStation = stations[gameState.currentStation];
  const target = targetStation.position;
  const direction = target.subtract(player.root.position);
  direction.y = 0;
  const distance = direction.length();

  // הגענו לתחנה
  if (distance < 0.3) {
    player.root.position.x = target.x;
    player.root.position.z = target.z;

    // התאם גובה לפי מיקום
    if (target.y > 0) {
      player.root.position.y = BABYLON.Scalar.Lerp(player.root.position.y, target.y, 0.1);
    } else {
      player.root.position.y = BABYLON.Scalar.Lerp(player.root.position.y, 0, 0.1);
    }

    gameState.isMoving = false;
    gameState.waitingForInput = true;

    // הצג מידע על התחנה
    if (targetStation.hasInfo) {
      onStationReached(targetStation);
    }

    // עצור אנימציית הליכה
    stopWalkAnimation(player);
    return;
  }

  // תנועה חלקה
  const moveDir = direction.normalize();
  const speed = gameState.walkSpeed * deltaTime * 60;

  player.root.position = BABYLON.Vector3.Lerp(
    player.root.position,
    player.root.position.add(moveDir.scale(speed)),
    0.3
  );

  // התאם גובה בזמן תנועה (מדרגות)
  if (target.y > 0) {
    player.root.position.y = BABYLON.Scalar.Lerp(player.root.position.y, target.y, 0.05);
  } else {
    player.root.position.y = BABYLON.Scalar.Lerp(player.root.position.y, 0, 0.05);
  }

  // סיבוב חלק לכיוון התנועה
  const targetAngle = Math.atan2(moveDir.x, moveDir.z);
  const currentAngle = player.root.rotation.y;
  let angleDiff = targetAngle - currentAngle;

  // נורמליזציה של הזווית
  while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
  while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

  player.root.rotation.y += angleDiff * gameState.rotationSpeed;

  // אנימציית הליכה
  animateWalk(player, distance, deltaTime);
}

/**
 * אנימציית הליכה
 */
function animateWalk(player: PlayerParts, distance: number, deltaTime: number): void {
  const walkSpeed = Math.min(distance * 3, 8);

  // תנודת זרועות
  if (player.leftArm.metadata) {
    player.leftArm.metadata.swingPhase += deltaTime * walkSpeed * 0.8;
    player.leftArm.rotation.x = Math.sin(player.leftArm.metadata.swingPhase) * 0.6;
  }

  if (player.rightArm.metadata) {
    player.rightArm.metadata.swingPhase += deltaTime * walkSpeed * 0.8;
    player.rightArm.rotation.x = Math.sin(player.rightArm.metadata.swingPhase) * 0.6;
  }

  // תנודת רגליים
  if (player.leftLeg.metadata) {
    player.leftLeg.metadata.swingPhase += deltaTime * walkSpeed * 0.8;
    player.leftLeg.rotation.x = Math.sin(player.leftLeg.metadata.swingPhase) * 0.7;
  }

  if (player.rightLeg.metadata) {
    player.rightLeg.metadata.swingPhase += deltaTime * walkSpeed * 0.8;
    player.rightLeg.rotation.x = Math.sin(player.rightLeg.metadata.swingPhase) * 0.7;
  }

  // תנועת bob טבעית
  const bob = Math.abs(Math.sin(Date.now() * 0.005 * walkSpeed)) * 0.15;
  player.body.position.y = 1.5 + bob;
  player.head.position.y = 2.8 + bob * 0.5;
}

/**
 * עוצר אנימציית הליכה
 */
export function stopWalkAnimation(player: PlayerParts): void {
  player.leftArm.rotation.x = 0;
  player.rightArm.rotation.x = 0;
  player.leftLeg.rotation.x = 0;
  player.rightLeg.rotation.x = 0;
  player.body.position.y = 1.5;
  player.head.position.y = 2.8;
}

/**
 * מעבר לתחנה הבאה
 */
export function moveToNextStation(): void {
  if (!gameState.waitingForInput || gameState.isMoving) return;

  gameState.currentStation++;

  if (gameState.currentStation >= stations.length) {
    gameState.isActive = false;
    return;
  }

  gameState.waitingForInput = false;
  gameState.isMoving = true;
}
