import * as BABYLON from '@babylonjs/core';

/**
 * יוצר את כל המכונות במפעל
 */
export function createAllMachines(scene: BABYLON.Scene): void {
  createCNCMachine(scene, new BABYLON.Vector3(-25, 0, -15));
  createConveyorBelt(scene, new BABYLON.Vector3(-25, 0, 5));
  createWeldingRobot(scene, new BABYLON.Vector3(-25, 5, 25));
  createPackagingMachine(scene, new BABYLON.Vector3(25, 5, 25));
  createQualityControlStation(scene, new BABYLON.Vector3(25, 0, 5));
  createWarehouseShelves(scene, new BABYLON.Vector3(25, 0, -15));
}

/**
 * תחנה 1: מכונת CNC
 */
function createCNCMachine(scene: BABYLON.Scene, position: BABYLON.Vector3): void {
  const machine = new BABYLON.TransformNode('cnc', scene);
  machine.position = position;

  // בסיס
  const base = BABYLON.MeshBuilder.CreateBox(
    'cncBase',
    { width: 7, height: 1.2, depth: 5 },
    scene
  );
  base.position.y = 0.6;
  base.parent = machine;

  const baseMat = new BABYLON.StandardMaterial('cncBaseMat', scene);
  baseMat.diffuseColor = new BABYLON.Color3(0.25, 0.25, 0.3);
  baseMat.specularColor = new BABYLON.Color3(0.6, 0.6, 0.6);
  base.material = baseMat;

  // גוף
  const body = BABYLON.MeshBuilder.CreateBox(
    'cncBody',
    { width: 6, height: 5, depth: 4 },
    scene
  );
  body.position.y = 3.6;
  body.parent = machine;

  const bodyMat = new BABYLON.StandardMaterial('cncBodyMat', scene);
  bodyMat.diffuseColor = new BABYLON.Color3(0.88, 0.9, 0.92);
  body.material = bodyMat;

  // ראש כרסום
  const head = BABYLON.MeshBuilder.CreateCylinder(
    'cncHead',
    { height: 2.5, diameter: 1 },
    scene
  );
  head.position = new BABYLON.Vector3(0, 6.8, 0);
  head.parent = machine;
  head.metadata = { rotating: true };

  const headMat = new BABYLON.StandardMaterial('cncHeadMat', scene);
  headMat.diffuseColor = new BABYLON.Color3(0.45, 0.45, 0.48);
  headMat.specularColor = new BABYLON.Color3(0.6, 0.6, 0.6);
  head.material = headMat;

  // פאנל בקרה
  const panel = BABYLON.MeshBuilder.CreateBox(
    'cncPanel',
    { width: 2, height: 2.5, depth: 0.3 },
    scene
  );
  panel.position = new BABYLON.Vector3(3.5, 2.5, 0);
  panel.parent = machine;

  const panelMat = new BABYLON.StandardMaterial('cncPanelMat', scene);
  panelMat.diffuseColor = new BABYLON.Color3(0.12, 0.12, 0.18);
  panelMat.emissiveColor = new BABYLON.Color3(0.05, 0.1, 0.15);
  panel.material = panelMat;

  // LED
  for (let i = 0; i < 4; i++) {
    const led = BABYLON.MeshBuilder.CreateSphere(
      `led${i}`,
      { diameter: 0.25 },
      scene
    );
    led.position = new BABYLON.Vector3(3.65, 3.2 - i * 0.5, 0);
    led.parent = machine;

    const ledMat = new BABYLON.StandardMaterial(`ledMat${i}`, scene);
    ledMat.emissiveColor = new BABYLON.Color3(0, 1, 0.4);
    led.material = ledMat;
    led.metadata = { pulsing: true, pulsePhase: i * 0.8 };
  }

  // תאורה
  const light = new BABYLON.PointLight(
    'cncLight',
    position.add(new BABYLON.Vector3(0, 8, 0)),
    scene
  );
  light.intensity = 15;
  light.range = 25;
}

/**
 * תחנה 2: פס הולכה
 */
function createConveyorBelt(scene: BABYLON.Scene, position: BABYLON.Vector3): void {
  const conveyor = new BABYLON.TransformNode('conveyor', scene);
  conveyor.position = position;

  // בסיס
  const base = BABYLON.MeshBuilder.CreateBox(
    'conveyorBase',
    { width: 12, height: 1, depth: 4 },
    scene
  );
  base.position.y = 0.5;
  base.parent = conveyor;

  const baseMat = new BABYLON.StandardMaterial('conveyorBaseMat', scene);
  baseMat.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.35);
  base.material = baseMat;

  // חגורה
  const belt = BABYLON.MeshBuilder.CreateBox(
    'conveyorBelt',
    { width: 11.5, height: 0.4, depth: 3.5 },
    scene
  );
  belt.position.y = 1.2;
  belt.parent = conveyor;

  const beltMat = new BABYLON.StandardMaterial('conveyorBeltMat', scene);
  beltMat.diffuseColor = new BABYLON.Color3(0.15, 0.15, 0.2);

  const beltTexture = new BABYLON.Texture(
    'https://www.babylonjs-playground.com/textures/floor.png',
    scene
  );
  beltTexture.vScale = 3;
  beltTexture.uScale = 12;
  beltMat.diffuseTexture = beltTexture;
  belt.material = beltMat;
  belt.metadata = { movingTexture: true, textureSpeed: 0.8 };

  // תומכים
  for (let i = 0; i < 6; i++) {
    const support = BABYLON.MeshBuilder.CreateCylinder(
      `support${i}`,
      { height: 2, diameter: 0.4 },
      scene
    );
    support.position = new BABYLON.Vector3(-5 + i * 2, 1, 2);
    support.parent = conveyor;

    const supportMat = new BABYLON.StandardMaterial('supportMat', scene);
    supportMat.diffuseColor = new BABYLON.Color3(0.35, 0.35, 0.4);
    supportMat.specularColor = new BABYLON.Color3(0.6, 0.6, 0.6);
    support.material = supportMat;
  }

  // קופסאות נעות
  for (let i = 0; i < 4; i++) {
    const box = BABYLON.MeshBuilder.CreateBox(
      `box${i}`,
      { width: 1.5, height: 1.5, depth: 1.5 },
      scene
    );
    box.position = new BABYLON.Vector3(-5 + i * 3.5, 2.2, 0);
    box.parent = conveyor;

    const boxMat = new BABYLON.StandardMaterial(`boxMat${i}`, scene);
    boxMat.diffuseColor = new BABYLON.Color3(0.75, 0.55, 0.35);
    box.material = boxMat;
    box.metadata = { moving: true, moveSpeed: 0.4, moveOffset: i * 3 };
  }

  // תאורה
  const light = new BABYLON.PointLight(
    'conveyorLight',
    position.add(new BABYLON.Vector3(0, 5, 0)),
    scene
  );
  light.intensity = 12;
  light.range = 20;
}

/**
 * תחנה 3: רובוט ריתוך
 */
function createWeldingRobot(scene: BABYLON.Scene, position: BABYLON.Vector3): void {
  const robot = new BABYLON.TransformNode('robot', scene);
  robot.position = position;

  // בסיס
  const base = BABYLON.MeshBuilder.CreateCylinder(
    'robotBase',
    { height: 1.5, diameter: 4 },
    scene
  );
  base.position.y = 0.75;
  base.parent = robot;

  const baseMat = new BABYLON.StandardMaterial('robotBaseMat', scene);
  baseMat.diffuseColor = new BABYLON.Color3(0.25, 0.25, 0.3);
  baseMat.specularColor = new BABYLON.Color3(0.6, 0.6, 0.6);
  base.material = baseMat;

  // גוף
  const body = BABYLON.MeshBuilder.CreateCylinder(
    'robotBody',
    { height: 3, diameter: 2 },
    scene
  );
  body.position.y = 3;
  body.parent = robot;

  const bodyMat = new BABYLON.StandardMaterial('robotBodyMat', scene);
  bodyMat.diffuseColor = new BABYLON.Color3(0.95, 0.55, 0.15);
  body.material = bodyMat;
  body.metadata = { rotating: true, rotateSpeed: 0.4 };

  // זרוע ראשונה
  const arm1 = BABYLON.MeshBuilder.CreateCylinder(
    'robotArm1',
    { height: 4, diameter: 0.8 },
    scene
  );
  arm1.position = new BABYLON.Vector3(0, 5.5, 0);
  arm1.rotation.z = Math.PI / 4;
  arm1.parent = robot;

  const armMat = new BABYLON.StandardMaterial('robotArmMat', scene);
  armMat.diffuseColor = new BABYLON.Color3(0.88, 0.88, 0.9);
  armMat.specularColor = new BABYLON.Color3(0.6, 0.6, 0.6);
  arm1.material = armMat;
  arm1.metadata = { swinging: true, swingSpeed: 1.2, swingAmount: 0.5 };

  // זרוע שנייה
  const arm2 = BABYLON.MeshBuilder.CreateCylinder(
    'robotArm2',
    { height: 3, diameter: 0.6 },
    scene
  );
  arm2.position = new BABYLON.Vector3(2.5, 6.8, 0);
  arm2.rotation.z = -Math.PI / 6;
  arm2.parent = robot;
  arm2.material = armMat;

  // ראש ריתוך
  const weldHead = BABYLON.MeshBuilder.CreateCylinder(
    'weldHead',
    { height: 1.5, diameter: 0.6 },
    scene
  );
  weldHead.position = new BABYLON.Vector3(4, 7.5, 0);
  weldHead.parent = robot;

  const weldMat = new BABYLON.StandardMaterial('weldMat', scene);
  weldMat.diffuseColor = new BABYLON.Color3(0.15, 0.15, 0.2);
  weldMat.emissiveColor = new BABYLON.Color3(0.4, 0.5, 1.2);
  weldHead.material = weldMat;
  weldHead.metadata = { glowing: true };

  // אור ריתוך
  const weldLight = new BABYLON.PointLight(
    'weldLight',
    position.add(new BABYLON.Vector3(4, 7.5, 0)),
    scene
  );
  weldLight.diffuse = new BABYLON.Color3(0.6, 0.8, 1);
  weldLight.intensity = 20;
  weldLight.range = 18;
}

/**
 * תחנה 4: מכונת אריזה
 */
function createPackagingMachine(scene: BABYLON.Scene, position: BABYLON.Vector3): void {
  const packager = new BABYLON.TransformNode('packager', scene);
  packager.position = position;

  // מסגרת
  const frame = BABYLON.MeshBuilder.CreateBox(
    'packagerFrame',
    { width: 6, height: 7, depth: 5 },
    scene
  );
  frame.position.y = 3.5;
  frame.parent = packager;

  const frameMat = new BABYLON.StandardMaterial('packagerFrameMat', scene);
  frameMat.diffuseColor = new BABYLON.Color3(0.9, 0.9, 0.92);
  frameMat.alpha = 0.25;
  frameMat.wireframe = true;
  frame.material = frameMat;

  // חלק פנימי
  const inner = BABYLON.MeshBuilder.CreateBox(
    'packagerInner',
    { width: 5.5, height: 6.5, depth: 4.5 },
    scene
  );
  inner.position.y = 3.5;
  inner.parent = packager;

  const innerMat = new BABYLON.StandardMaterial('packagerInnerMat', scene);
  innerMat.diffuseColor = new BABYLON.Color3(0.78, 0.8, 0.84);
  inner.material = innerMat;

  // זרועות אריזה
  for (let i = 0; i < 2; i++) {
    const arm = BABYLON.MeshBuilder.CreateBox(
      `packArm${i}`,
      { width: 0.6, height: 4, depth: 0.6 },
      scene
    );
    arm.position = new BABYLON.Vector3((-1 + i * 2) * 2, 5, 0);
    arm.parent = packager;

    const armMat = new BABYLON.StandardMaterial(`packArmMat${i}`, scene);
    armMat.diffuseColor = new BABYLON.Color3(0.35, 0.55, 0.75);
    armMat.specularColor = new BABYLON.Color3(0.6, 0.6, 0.6);
    arm.material = armMat;
    arm.metadata = { bouncing: true, bouncePhase: i * Math.PI, bounceAmount: 1.5 };
  }

  // פלטפורמה
  const platform = BABYLON.MeshBuilder.CreateBox(
    'packPlatform',
    { width: 5, height: 0.4, depth: 4 },
    scene
  );
  platform.position.y = 1.2;
  platform.parent = packager;

  const platformMat = new BABYLON.StandardMaterial('packPlatformMat', scene);
  platformMat.diffuseColor = new BABYLON.Color3(0.25, 0.25, 0.3);
  platform.material = platformMat;

  // תאורה
  const light = new BABYLON.PointLight(
    'packLight',
    position.add(new BABYLON.Vector3(0, 8, 0)),
    scene
  );
  light.intensity = 15;
  light.range = 22;
}

/**
 * תחנה 5: בקרת איכות
 */
function createQualityControlStation(
  scene: BABYLON.Scene,
  position: BABYLON.Vector3
): void {
  const qc = new BABYLON.TransformNode('qc', scene);
  qc.position = position;

  // שולחן
  const desk = BABYLON.MeshBuilder.CreateBox(
    'qcDesk',
    { width: 5, height: 1.8, depth: 3 },
    scene
  );
  desk.position.y = 0.9;
  desk.parent = qc;

  const deskMat = new BABYLON.StandardMaterial('qcDeskMat', scene);
  deskMat.diffuseColor = new BABYLON.Color3(0.92, 0.92, 0.94);
  desk.material = deskMat;

  // מסכי מחשב
  for (let i = 0; i < 2; i++) {
    const monitor = BABYLON.MeshBuilder.CreateBox(
      `qcMonitor${i}`,
      { width: 2.2, height: 1.8, depth: 0.25 },
      scene
    );
    monitor.position = new BABYLON.Vector3((-1 + i * 2) * 1.2, 2.8, 0);
    monitor.parent = qc;

    const monitorMat = new BABYLON.StandardMaterial(`qcMonitorMat${i}`, scene);
    monitorMat.diffuseColor = new BABYLON.Color3(0.08, 0.08, 0.12);
    monitorMat.emissiveColor = new BABYLON.Color3(0.12, 0.35, 0.55);
    monitor.material = monitorMat;
  }

  // מיקרוסקופ
  const microscope = BABYLON.MeshBuilder.CreateCylinder(
    'microscope',
    { height: 2.5, diameter: 0.7 },
    scene
  );
  microscope.position = new BABYLON.Vector3(-1.5, 3, 1);
  microscope.parent = qc;

  const microscopeMat = new BABYLON.StandardMaterial('microscopeMat', scene);
  microscopeMat.diffuseColor = new BABYLON.Color3(0.45, 0.45, 0.48);
  microscopeMat.specularColor = new BABYLON.Color3(0.6, 0.6, 0.6);
  microscope.material = microscopeMat;

  // כיסא
  const chair = BABYLON.MeshBuilder.CreateCylinder(
    'qcChair',
    { height: 1.2, diameter: 1.5 },
    scene
  );
  chair.position = new BABYLON.Vector3(0, 0.6, 2.2);
  chair.parent = qc;

  const chairMat = new BABYLON.StandardMaterial('qcChairMat', scene);
  chairMat.diffuseColor = new BABYLON.Color3(0.18, 0.38, 0.68);
  chair.material = chairMat;

  // תאורה
  const light = new BABYLON.PointLight(
    'qcLight',
    position.add(new BABYLON.Vector3(0, 4, 0)),
    scene
  );
  light.intensity = 10;
  light.range = 15;
}

/**
 * תחנה 6: מחסן
 */
function createWarehouseShelves(scene: BABYLON.Scene, position: BABYLON.Vector3): void {
  const warehouse = new BABYLON.TransformNode('warehouse', scene);
  warehouse.position = position;

  // ארבעה מדפים
  for (let shelf = 0; shelf < 4; shelf++) {
    // עמודים
    for (let i = 0; i < 5; i++) {
      const pole = BABYLON.MeshBuilder.CreateCylinder(
        `pole${shelf}_${i}`,
        { height: 10, diameter: 0.4 },
        scene
      );
      pole.position = new BABYLON.Vector3(
        (-2 + i * 1) + (shelf - 1.5) * 3,
        5,
        0
      );
      pole.parent = warehouse;

      const poleMat = new BABYLON.StandardMaterial('poleMat', scene);
      poleMat.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.35);
      poleMat.specularColor = new BABYLON.Color3(0.6, 0.6, 0.6);
      pole.material = poleMat;
    }

    // מדפים
    for (let level = 0; level < 5; level++) {
      const shelfBoard = BABYLON.MeshBuilder.CreateBox(
        `shelf${shelf}_${level}`,
        { width: 4, height: 0.25, depth: 2 },
        scene
      );
      shelfBoard.position = new BABYLON.Vector3(
        (shelf - 1.5) * 3,
        1 + level * 2,
        0
      );
      shelfBoard.parent = warehouse;

      const shelfMat = new BABYLON.StandardMaterial('shelfMat', scene);
      shelfMat.diffuseColor = new BABYLON.Color3(0.65, 0.45, 0.25);
      shelfBoard.material = shelfMat;

      // קופסאות על המדפים
      if (level > 0) {
        for (let b = 0; b < 3; b++) {
          const box = BABYLON.MeshBuilder.CreateBox(
            `warehouseBox${shelf}_${level}_${b}`,
            { width: 1.2, height: 1, depth: 1 },
            scene
          );
          box.position = new BABYLON.Vector3(
            (shelf - 1.5) * 3 + (-1 + b),
            1.6 + level * 2,
            0
          );
          box.parent = warehouse;

          const boxMat = new BABYLON.StandardMaterial('warehouseBoxMat', scene);
          boxMat.diffuseColor = new BABYLON.Color3(0.75, 0.55, 0.35);
          box.material = boxMat;
        }
      }
    }
  }

  // תאורה
  const light = new BABYLON.PointLight(
    'warehouseLight',
    position.add(new BABYLON.Vector3(0, 8, 0)),
    scene
  );
  light.intensity = 18;
  light.range = 25;
}
