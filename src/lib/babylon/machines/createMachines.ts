import * as BABYLON from '@babylonjs/core';
import type { GameMaterials } from '../types';
import { createSteamParticles } from '../particles/createParticles';

/**
 * יוצר מכונות ומכשולים במפעל
 */
export function createMachines(
  scene: BABYLON.Scene,
  materials: GameMaterials,
  shadowGenerator: BABYLON.ShadowGenerator
): void {
  // ===== מכבש גדול =====
  const press = BABYLON.MeshBuilder.CreateBox(
    'press',
    { width: 6, height: 10, depth: 4 },
    scene
  );
  press.position = new BABYLON.Vector3(-20, 5, 0);
  press.material = materials.metal;
  shadowGenerator.addShadowCaster(press);

  // רצועת אזהרה מתחת למכבש
  const hazardStrip = BABYLON.MeshBuilder.CreateGround(
    'hazardStrip',
    { width: 8, height: 6 },
    scene
  );
  hazardStrip.position = new BABYLON.Vector3(-20, 0.01, 0);
  hazardStrip.material = materials.hazard;

  // בוכנה נעה
  const piston = BABYLON.MeshBuilder.CreateCylinder(
    'piston',
    { diameter: 2, height: 4 },
    scene
  );
  piston.position = new BABYLON.Vector3(-20, 6, 2);
  piston.material = materials.metal;

  // אנימציית בוכנה (מכה למטה)
  scene.registerBeforeRender(() => {
    piston.position.y = 6 + Math.sin(Date.now() * 0.005) * 2;
  });

  // מערכת אדים ליד המכבש
  createSteamParticles(new BABYLON.Vector3(-20, 1, 2), scene);

  // ===== פס הולכה עם קופסאות =====
  const conveyorBelt = BABYLON.MeshBuilder.CreateBox(
    'conveyorBelt',
    { width: 4, height: 1, depth: 40 },
    scene
  );
  conveyorBelt.position = new BABYLON.Vector3(20, 1, 10);
  conveyorBelt.material = materials.metal;

  // קופסאות נעות על הפס
  for (let i = 0; i < 5; i++) {
    const box = BABYLON.MeshBuilder.CreateBox(
      `box${i}`,
      { size: 1.5 },
      scene
    );
    box.position = new BABYLON.Vector3(20, 2.5, -5 + i * 8);
    box.material = materials.glowOrange;
    shadowGenerator.addShadowCaster(box);

    // אנימציה - תנועה לאורך הפס
    scene.registerBeforeRender(() => {
      box.position.z += 0.05;
      if (box.position.z > 30) {
        box.position.z = -10;
      }
    });
  }
}
