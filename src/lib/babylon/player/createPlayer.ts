import * as BABYLON from '@babylonjs/core';
import type { GameMaterials, PlayerMetadata } from '../types';

/**
 * יוצר רובוט מורכב (השחקן)
 */
export function createPlayer(
  scene: BABYLON.Scene,
  materials: GameMaterials,
  initialPosition: BABYLON.Vector3,
  shadowGenerator: BABYLON.ShadowGenerator
): BABYLON.TransformNode {
  const root = new BABYLON.TransformNode('playerRoot', scene);
  root.position = initialPosition.clone();

  // גלגל (בסיס אוניסייקל)
  const wheel = BABYLON.MeshBuilder.CreateCylinder(
    'wheel',
    { diameter: 1.5, height: 0.5 },
    scene
  );
  wheel.rotation.z = Math.PI / 2;
  wheel.position.y = 0.75;
  wheel.parent = root;
  wheel.material = materials.metal;

  // גוף
  const body = BABYLON.MeshBuilder.CreateBox(
    'body',
    { width: 1.2, height: 1.5, depth: 1 },
    scene
  );
  body.position.y = 2.2;
  body.parent = root;
  body.material = materials.metal;

  // ליבה זוהרת (חזה)
  const core = BABYLON.MeshBuilder.CreateSphere(
    'core',
    { diameter: 0.6 },
    scene
  );
  core.position.z = -0.4;
  core.parent = body;
  core.material = materials.glowBlue;

  // ראש
  const head = BABYLON.MeshBuilder.CreateBox(
    'head',
    { width: 0.8, height: 0.8, depth: 0.8 },
    scene
  );
  head.position.y = 3.6;
  head.parent = root;
  head.material = materials.metal;

  // עין (פס LED)
  const eye = BABYLON.MeshBuilder.CreatePlane(
    'eye',
    { width: 0.6, height: 0.2 },
    scene
  );
  eye.parent = head;
  eye.position.z = -0.41;
  eye.position.y = 0.1;
  eye.material = materials.glowBlue;

  // זרוע שמאל
  const armL = BABYLON.MeshBuilder.CreateBox(
    'armL',
    { width: 0.3, height: 1.5, depth: 0.3 },
    scene
  );
  armL.position = new BABYLON.Vector3(-0.9, 2.2, 0);
  armL.parent = root;
  armL.material = materials.metal;

  // זרוע ימין
  const armR = BABYLON.MeshBuilder.CreateBox(
    'armR',
    { width: 0.3, height: 1.5, depth: 0.3 },
    scene
  );
  armR.position = new BABYLON.Vector3(0.9, 2.2, 0);
  armR.parent = root;
  armR.material = materials.metal;

  // שמירת חלקים לאנימציה
  root.metadata = { wheel, armL, armR } as PlayerMetadata;

  // הוספה למערכת צללים
  shadowGenerator.addShadowCaster(wheel);
  shadowGenerator.addShadowCaster(body);
  shadowGenerator.addShadowCaster(head);

  return root;
}

/**
 * מתחיל אנימציות תנועה של השחקן
 */
export function startPlayerAnimation(player: BABYLON.TransformNode): void {
  const scene = player.getScene();
  const metadata = player.metadata as PlayerMetadata;

  scene.onBeforeRenderObservable.add(() => {
    // סיבוב גלגל
    metadata.wheel.rotation.x -= 0.2;
    // תנועת זרועות
    metadata.armL.rotation.x = Math.sin(Date.now() * 0.01) * 0.5;
    metadata.armR.rotation.x = Math.cos(Date.now() * 0.01) * 0.5;
  });
}

/**
 * עוצר אנימציות השחקן
 */
export function stopPlayerAnimation(player: BABYLON.TransformNode): void {
  // ניתן להוסיף לוגיקה לאיפוס תנועות
}
