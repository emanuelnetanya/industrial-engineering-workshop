import * as BABYLON from '@babylonjs/core';
import type { PlayerParts } from '../types';

/**
 * יוצר דמות שחקן מפורטת
 */
export function createPlayer(
  scene: BABYLON.Scene,
  initialPosition: BABYLON.Vector3
): PlayerParts {
  const playerRoot = new BABYLON.TransformNode('playerRoot', scene);
  playerRoot.position = initialPosition.clone();
  playerRoot.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5); // קטן פי 2 למובייל

  // גוף מעוצב
  const playerBody = BABYLON.MeshBuilder.CreateCylinder(
    'playerBody',
    { height: 2, diameterTop: 0.7, diameterBottom: 0.8 },
    scene
  );
  playerBody.position.y = 1.5;
  playerBody.parent = playerRoot;

  const bodyMat = new BABYLON.StandardMaterial('playerBodyMat', scene);
  bodyMat.diffuseColor = new BABYLON.Color3(0.15, 0.35, 0.75);
  bodyMat.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
  playerBody.material = bodyMat;

  // ראש
  const playerHead = BABYLON.MeshBuilder.CreateSphere(
    'playerHead',
    { diameter: 0.65 },
    scene
  );
  playerHead.position.y = 2.8;
  playerHead.parent = playerRoot;

  const headMat = new BABYLON.StandardMaterial('playerHeadMat', scene);
  headMat.diffuseColor = new BABYLON.Color3(0.95, 0.8, 0.7);
  playerHead.material = headMat;

  // עיניים
  for (const side of [-1, 1]) {
    const eye = BABYLON.MeshBuilder.CreateSphere(
      `eye${side}`,
      { diameter: 0.12 },
      scene
    );
    eye.position = new BABYLON.Vector3(side * 0.15, 2.85, 0.25);
    eye.parent = playerRoot;

    const eyeMat = new BABYLON.StandardMaterial(`eyeMat${side}`, scene);
    eyeMat.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.15);
    eye.material = eyeMat;
  }

  // זרוע שמאל
  const leftArm = BABYLON.MeshBuilder.CreateCylinder(
    'leftArm',
    { height: 1.5, diameterTop: 0.22, diameterBottom: 0.18 },
    scene
  );
  leftArm.position = new BABYLON.Vector3(-0.55, 1.9, 0);
  leftArm.parent = playerRoot;
  leftArm.material = bodyMat;
  leftArm.metadata = { isLeftArm: true, swingPhase: 0 };

  // זרוע ימין
  const rightArm = BABYLON.MeshBuilder.CreateCylinder(
    'rightArm',
    { height: 1.5, diameterTop: 0.22, diameterBottom: 0.18 },
    scene
  );
  rightArm.position = new BABYLON.Vector3(0.55, 1.9, 0);
  rightArm.parent = playerRoot;
  rightArm.material = bodyMat;
  rightArm.metadata = { isRightArm: true, swingPhase: Math.PI };

  // רגל שמאל
  const leftLeg = BABYLON.MeshBuilder.CreateCylinder(
    'leftLeg',
    { height: 1.6, diameterTop: 0.28, diameterBottom: 0.32 },
    scene
  );
  leftLeg.position = new BABYLON.Vector3(-0.25, 0.8, 0);
  leftLeg.parent = playerRoot;
  leftLeg.material = bodyMat;
  leftLeg.metadata = { isLeftLeg: true, swingPhase: 0 };

  // רגל ימין
  const rightLeg = BABYLON.MeshBuilder.CreateCylinder(
    'rightLeg',
    { height: 1.6, diameterTop: 0.28, diameterBottom: 0.32 },
    scene
  );
  rightLeg.position = new BABYLON.Vector3(0.25, 0.8, 0);
  rightLeg.parent = playerRoot;
  rightLeg.material = bodyMat;
  rightLeg.metadata = { isRightLeg: true, swingPhase: Math.PI };

  // אור מעל הדמות
  const playerLight = new BABYLON.PointLight(
    'playerLight',
    playerRoot.position.add(new BABYLON.Vector3(0, 5, 0)),
    scene
  );
  playerLight.parent = playerRoot;
  playerLight.intensity = 5;
  playerLight.range = 10;

  return {
    root: playerRoot,
    body: playerBody,
    head: playerHead,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg
  };
}
