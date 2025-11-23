import * as BABYLON from '@babylonjs/core';

/**
 * מנהל אנימציות המכונות
 */
export function animateMachines(scene: BABYLON.Scene, time: number): void {
  scene.meshes.forEach((mesh) => {
    if (!mesh.metadata) return;

    // סיבוב חלק
    if (mesh.metadata.rotating) {
      const speed = mesh.metadata.rotateSpeed || 1;
      mesh.rotation.y += 0.015 * speed;
    }

    // נדנוד
    if (mesh.metadata.swinging) {
      const speed = mesh.metadata.swingSpeed || 1;
      const amount = mesh.metadata.swingAmount || 0.3;
      mesh.rotation.z = Math.sin(time * 0.0012 * speed) * amount;
    }

    // הבהוב LED
    if (mesh.metadata.pulsing && mesh.material) {
      const phase = mesh.metadata.pulsePhase || 0;
      const pulse = Math.sin(time * 0.004 + phase) * 0.5 + 0.5;
      (mesh.material as BABYLON.StandardMaterial).emissiveColor =
        new BABYLON.Color3(0, pulse * 1.2, pulse * 0.5);
    }

    // זוהר ריתוך
    if (mesh.metadata.glowing && mesh.material) {
      const glow = Math.sin(time * 0.005) * 0.4 + 0.6;
      (mesh.material as BABYLON.StandardMaterial).emissiveColor =
        new BABYLON.Color3(glow * 0.4, glow * 0.5, glow * 1.2);
    }

    // קפיצה (זרועות אריזה)
    if (mesh.metadata.bouncing) {
      const phase = mesh.metadata.bouncePhase || 0;
      const amount = mesh.metadata.bounceAmount || 0.5;
      const originalY = 5;
      mesh.position.y = originalY + Math.abs(Math.sin(time * 0.003 + phase)) * amount;
    }

    // תנועה על conveyor
    if (mesh.metadata.moving) {
      const speed = mesh.metadata.moveSpeed || 0.2;
      const offset = mesh.metadata.moveOffset || 0;
      const range = 10;
      mesh.position.x = -5 + ((time * 0.0012 * speed + offset) % range);
    }

    // טקסטורה נעה
    if (mesh.metadata.movingTexture && mesh.material) {
      const material = mesh.material as BABYLON.StandardMaterial;
      const texture = material.diffuseTexture as BABYLON.Texture;
      if (texture) {
        texture.vOffset += 0.0015 * mesh.metadata.textureSpeed;
      }
    }
  });
}
