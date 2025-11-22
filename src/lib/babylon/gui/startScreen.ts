import * as GUI from '@babylonjs/gui';
import * as BABYLON from '@babylonjs/core';

/**
 * יוצר מסך התחלה עם כפתור START
 */
export function createStartScreen(
  advancedTexture: GUI.AdvancedDynamicTexture,
  onStart: () => void
): GUI.Rectangle {
  const rect = new GUI.Rectangle();
  rect.width = 1;
  rect.height = 1;
  rect.background = 'rgba(0,0,0,0.8)';
  advancedTexture.addControl(rect);

  // כותרת
  const title = new GUI.TextBlock();
  title.text = 'FACTORY PRIME';
  title.color = '#00d2ff';
  title.fontSize = 72;
  title.top = '-100px';
  title.shadowColor = 'black';
  title.shadowBlur = 10;
  rect.addControl(title);

  // כפתור התחלה
  const btn = GUI.Button.CreateSimpleButton('startBtn', 'START OPERATION');
  btn.width = '300px';
  btn.height = '60px';
  btn.color = 'white';
  btn.cornerRadius = 5;
  btn.background = '#0078d7';
  btn.top = '50px';

  btn.onPointerUpObservable.add(() => {
    rect.isVisible = false;
    onStart();
  });

  rect.addControl(btn);

  return rect;
}

/**
 * יוצר אנימציית זום-אין למצלמה
 */
export function animateCameraZoom(
  camera: BABYLON.ArcRotateCamera,
  scene: BABYLON.Scene
): void {
  const anim = new BABYLON.Animation(
    'camZoom',
    'radius',
    60,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );
  anim.setKeys([
    { frame: 0, value: 40 },
    { frame: 60, value: 15 }
  ]);
  camera.animations.push(anim);
  scene.beginAnimation(camera, 0, 60, false);
}
