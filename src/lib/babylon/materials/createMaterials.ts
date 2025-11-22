import * as BABYLON from '@babylonjs/core';
import { TextureGenerator } from '../textures/textureGenerator';
import type { GameMaterials } from '../types';

/**
 * יוצר את כל החומרים הנדרשים למשחק
 */
export function createMaterials(scene: BABYLON.Scene): GameMaterials {
  const materials: Partial<GameMaterials> = {};

  // חומר רצפה עם טקסטורה
  materials.floor = new BABYLON.PBRMaterial('floor', scene);
  const floorTexture = TextureGenerator.createFloor(scene);
  floorTexture.uScale = 20;
  floorTexture.vScale = 20;
  materials.floor.albedoTexture = floorTexture;
  materials.floor.roughness = 0.4;
  materials.floor.metallic = 0.6;

  // חומר מתכת
  materials.metal = new BABYLON.PBRMaterial('metal', scene);
  materials.metal.albedoTexture = TextureGenerator.createMetal(scene);
  materials.metal.roughness = 0.5;
  materials.metal.metallic = 0.9;

  // חומר זוהר כחול (לאורות וממשק)
  materials.glowBlue = new BABYLON.PBRMaterial('glowB', scene);
  materials.glowBlue.emissiveColor = new BABYLON.Color3(0, 0.8, 1);
  materials.glowBlue.disableLighting = true;

  // חומר זוהר כתום
  materials.glowOrange = new BABYLON.PBRMaterial('glowO', scene);
  materials.glowOrange.emissiveColor = new BABYLON.Color3(1, 0.5, 0);
  materials.glowOrange.disableLighting = true;

  // חומר אזהרה
  materials.hazard = new BABYLON.PBRMaterial('hazard', scene);
  materials.hazard.albedoTexture = TextureGenerator.createHazard(scene);
  materials.hazard.metallic = 0.1;

  return materials as GameMaterials;
}
