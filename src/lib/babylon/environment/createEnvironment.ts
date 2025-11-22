import * as BABYLON from '@babylonjs/core';
import type { GameMaterials } from '../types';

/**
 * יוצר את הסביבה של המפעל - רצפה, עמודים, קורות תקרה
 */
export function createEnvironment(scene: BABYLON.Scene, materials: GameMaterials): void {
  // רצפה
  const ground = BABYLON.MeshBuilder.CreateGround(
    'ground',
    { width: 200, height: 200 },
    scene
  );
  ground.material = materials.floor;
  ground.receiveShadows = true;

  // עמודים עם פסי LED
  for (let x = -80; x <= 80; x += 40) {
    for (let z = -80; z <= 80; z += 40) {
      // עמוד מתכת
      const column = BABYLON.MeshBuilder.CreateBox(
        'column',
        { height: 20, width: 2, depth: 2 },
        scene
      );
      column.position = new BABYLON.Vector3(x, 10, z);
      column.material = materials.metal;

      // פס LED כחול
      const lightStrip = BABYLON.MeshBuilder.CreatePlane(
        'lightStrip',
        { height: 15, width: 0.2 },
        scene
      );
      lightStrip.parent = column;
      lightStrip.position.z = -1.01;
      lightStrip.material = materials.glowBlue;
    }
  }

  // קורות תקרה
  for (let z = -80; z <= 80; z += 20) {
    const beam = BABYLON.MeshBuilder.CreateBox(
      'beam',
      { width: 180, height: 1, depth: 1 },
      scene
    );
    beam.position = new BABYLON.Vector3(0, 20, z);
    beam.material = materials.metal;
  }
}
