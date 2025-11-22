import * as BABYLON from '@babylonjs/core';

/**
 * מחולל טקסטורות פרוצדורלי
 * יוצר טקסטורות באמצעות Canvas API
 */
export class TextureGenerator {
  /**
   * יוצר טקסטורת מתכת עם אפקט רעש
   */
  static createMetal(scene: BABYLON.Scene): BABYLON.DynamicTexture {
    const dt = new BABYLON.DynamicTexture('metalTex', 512, scene);
    const ctx = dt.getContext();

    // גרדיאנט מתכתי
    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, '#2a2a2a');
    grad.addColorStop(0.5, '#555555');
    grad.addColorStop(1, '#2a2a2a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // הוספת רעש לריאליזם
    for (let i = 0; i < 5000; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.1})`;
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
    }

    dt.update();
    return dt;
  }

  /**
   * יוצר טקסטורת רצפה עם פסי אזהרה
   */
  static createFloor(scene: BABYLON.Scene): BABYLON.DynamicTexture {
    const dt = new BABYLON.DynamicTexture('floorTex', 512, scene);
    const ctx = dt.getContext();

    // רקע כהה
    ctx.fillStyle = '#151515';
    ctx.fillRect(0, 0, 512, 512);

    // מסגרת
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 512, 512);

    // פסי אזהרה אלכסוניים
    ctx.fillStyle = '#dda010';
    for (let i = 0; i < 512; i += 64) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 32, 0);
      ctx.lineTo(0, i + 32);
      ctx.lineTo(0, i);
      ctx.fill();
    }

    dt.update();
    return dt;
  }

  /**
   * יוצר טקסטורת אזהרה (פסים שחורים וצהובים)
   */
  static createHazard(scene: BABYLON.Scene): BABYLON.DynamicTexture {
    const dt = new BABYLON.DynamicTexture('hazard', 256, scene);
    const ctx = dt.getContext();

    // רקע צהוב
    ctx.fillStyle = '#dec800';
    ctx.fillRect(0, 0, 256, 256);

    // פסים שחורים אלכסוניים
    ctx.fillStyle = '#000000';
    for (let i = 0; i < 400; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 20, 0);
      ctx.lineTo(0, i + 20);
      ctx.lineTo(0, i);
      ctx.fill();
    }

    dt.update();
    return dt;
  }
}
