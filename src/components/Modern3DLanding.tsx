'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

const Modern3DLanding = () => {
  const router = useRouter();
  const mountRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const statusDotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // GSAP Animations
  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline();

    tl.from(logoRef.current, {
      scale: 0,
      rotation: 360,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)"
    })
    .from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .from(statusDotsRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.3")
    .from(menuRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5")
    .from(menuItemsRef.current, {
      scale: 0,
      rotation: 180,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "back.out(1.7)"
    }, "-=0.4");

    gsap.to(logoRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    statusDotsRef.current.forEach((dot, i) => {
      if (dot) {
        gsap.to(dot, {
          scale: 1.5,
          opacity: 0.3,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3
        });
      }
    });

  }, [isLoaded]);

  // Three.js Scene
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const aspectRatio = 9 / 19.5;
    const width = Math.min(window.innerWidth, 500);
    const height = width / aspectRatio;

    const camera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    if (mountRef.current) {
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.domElement);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x60a5fa, 1.5);
    directionalLight1.position.set(5, 10, 5);
    directionalLight1.castShadow = true;
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x38bdf8, 1);
    directionalLight2.position.set(-5, 5, -5);
    scene.add(directionalLight2);

    const pointLight1 = new THREE.PointLight(0x0ea5e9, 2, 50);
    pointLight1.position.set(8, 8, 8);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 1.5, 50);
    pointLight2.position.set(-8, -5, 5);
    scene.add(pointLight2);

    const geometries: { mesh: THREE.Mesh; speedX: number; speedY: number }[] = [];

    const createMetallicMaterial = (color: number, emissive: number) => {
      return new THREE.MeshStandardMaterial({
        color: color,
        emissive: emissive,
        emissiveIntensity: 0.3,
        metalness: 0.9,
        roughness: 0.1,
      });
    };

    const createWireframeMaterial = (color: number) => {
      return new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.4,
      });
    };

    const icosaGeo = new THREE.IcosahedronGeometry(2.5, 0);
    const icosa = new THREE.Mesh(icosaGeo, createMetallicMaterial(0x0ea5e9, 0x0284c7));
    icosa.position.set(0, 3, -8);
    icosa.castShadow = true;
    scene.add(icosa);

    const icosaWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(icosaGeo),
      createWireframeMaterial(0x38bdf8)
    );
    icosa.add(icosaWire);
    geometries.push({ mesh: icosa, speedX: 0.004, speedY: 0.006 });

    const torusKnotGeo = new THREE.TorusKnotGeometry(1.5, 0.4, 100, 16);
    const torusKnot = new THREE.Mesh(torusKnotGeo, createMetallicMaterial(0x3b82f6, 0x1e40af));
    torusKnot.position.set(-4, -1, -10);
    torusKnot.castShadow = true;
    scene.add(torusKnot);

    const torusWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(torusKnotGeo),
      createWireframeMaterial(0x60a5fa)
    );
    torusKnot.add(torusWire);
    geometries.push({ mesh: torusKnot, speedX: 0.003, speedY: 0.007 });

    const octaGeo = new THREE.OctahedronGeometry(2, 0);
    const octa = new THREE.Mesh(octaGeo, createMetallicMaterial(0x06b6d4, 0x0891b2));
    octa.position.set(4, 2, -12);
    octa.castShadow = true;
    scene.add(octa);

    const octaWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(octaGeo),
      createWireframeMaterial(0x22d3ee)
    );
    octa.add(octaWire);
    geometries.push({ mesh: octa, speedX: 0.005, speedY: 0.004 });

    const dodecaGeo = new THREE.DodecahedronGeometry(1.8, 0);
    const dodeca = new THREE.Mesh(dodecaGeo, createMetallicMaterial(0x0284c7, 0x075985));
    dodeca.position.set(3, -3, -9);
    dodeca.castShadow = true;
    scene.add(dodeca);

    const dodecaWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(dodecaGeo),
      createWireframeMaterial(0x0ea5e9)
    );
    dodeca.add(dodecaWire);
    geometries.push({ mesh: dodeca, speedX: 0.006, speedY: 0.005 });

    const tetraGeo = new THREE.TetrahedronGeometry(2.2, 0);
    const tetra = new THREE.Mesh(tetraGeo, createMetallicMaterial(0x38bdf8, 0x0369a1));
    tetra.position.set(-3, 1, -11);
    tetra.castShadow = true;
    scene.add(tetra);

    const tetraWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(tetraGeo),
      createWireframeMaterial(0x7dd3fc)
    );
    tetra.add(tetraWire);
    geometries.push({ mesh: tetra, speedX: 0.007, speedY: 0.003 });

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 80;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const gridHelper = new THREE.GridHelper(50, 50, 0x94a3b8, 0xe2e8f0);
    gridHelper.position.y = -10;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.2;
    scene.add(gridHelper);

    camera.position.z = 12;
    camera.position.y = 2;

    let time = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      geometries.forEach(({ mesh, speedX, speedY }) => {
        mesh.rotation.x += speedX;
        mesh.rotation.y += speedY;
        mesh.position.y += Math.sin(time + mesh.position.x) * 0.015;
      });

      particlesMesh.rotation.y += 0.0005;

      camera.position.x += (mousePos.x * 1.5 - camera.position.x) * 0.03;
      camera.position.y += (mousePos.y * 1.5 + 2 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, -8);

      pointLight1.position.x = Math.sin(time * 0.5) * 8;
      pointLight1.position.z = Math.cos(time * 0.5) * 8;

      pointLight2.position.x = Math.cos(time * 0.7) * 8;
      pointLight2.position.z = Math.sin(time * 0.7) * 8;

      renderer.render(scene, camera);
    };

    animate();
    setTimeout(() => setIsLoaded(true), 100);

    const handleResize = () => {
      const newWidth = Math.min(window.innerWidth, 500);
      const newHeight = newWidth / aspectRatio;
      camera.aspect = aspectRatio;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mousePos.x, mousePos.y]);

  // Mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMenuHover = (index: number, isEntering: boolean) => {
    const item = menuItemsRef.current[index];
    if (!item) return;

    if (isEntering) {
      gsap.to(item, {
        scale: 1.15,
        rotation: 5,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    } else {
      gsap.to(item, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMenuClick = (id: string, index: number) => {
    setSelectedMenu(id);

    const item = menuItemsRef.current[index];
    if (!item) return;

    gsap.timeline()
      .to(item, { scale: 0.9, duration: 0.1, ease: "power2.in" })
      .to(item, { scale: 1.1, duration: 0.3, ease: "elastic.out(1, 0.3)" })
      .to(item, { scale: 1, duration: 0.2, ease: "power2.out" });

    menuItemsRef.current.forEach((otherItem, i) => {
      if (i !== index && otherItem) {
        gsap.to(otherItem, {
          scale: 0.95,
          opacity: 0.7,
          duration: 0.2,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });
      }
    });

    // Navigate based on menu item
    setTimeout(() => {
      if (id === 'tour') {
        router.push('/factory-tour');
      }
    }, 800);
  };

  const menuItems = [
    { id: 'tour', icon: '🏭', label: 'סיור במפעל', color: 'bg-blue-500' },
    { id: 'info', icon: 'ℹ️', label: 'מידע', color: 'bg-cyan-500' },
    { id: 'about', icon: '📚', label: 'אודות', color: 'bg-sky-500' },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-4">
      <div className="relative w-full max-w-md" style={{ aspectRatio: '9/19.5' }}>
        <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-slate-900">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-slate-900 rounded-b-3xl z-50 flex items-center justify-center gap-2">
            <div className="w-16 h-1.5 bg-slate-800 rounded-full" />
            <div className="w-3 h-3 bg-slate-800 rounded-full" />
          </div>

          <div ref={mountRef} className="absolute inset-0 flex items-center justify-center" />

          <div className="relative z-20 flex flex-col h-full p-6 pt-12">
            <div className="flex-1 flex flex-col items-center justify-center">
              <div ref={logoRef} className="mb-6">
                <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl shadow-xl flex items-center justify-center">
                  <div className="absolute inset-2 bg-white/20 backdrop-blur-sm rounded-2xl" />
                  <span className="relative text-5xl">🏭</span>
                </div>
              </div>

              <h1
                ref={titleRef}
                className="text-4xl font-black text-slate-800 mb-2 text-center"
              >
                ברוכים הבאים
              </h1>
              <p
                ref={subtitleRef}
                className="text-lg text-slate-500 font-medium text-center"
              >
                סדנת הנדסת תעשייה
              </p>

              <div className="flex gap-2 mt-8">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    ref={el => { statusDotsRef.current[i] = el; }}
                    className="w-2 h-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"
                  />
                ))}
              </div>
            </div>

            <div className="pb-6">
              <div
                ref={menuRef}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-slate-200/50"
              >
                <div className="grid grid-cols-3 gap-4" dir="rtl">
                  {menuItems.map((item, index) => (
                    <button
                      key={item.id}
                      ref={el => { menuItemsRef.current[index] = el; }}
                      onClick={() => handleMenuClick(item.id, index)}
                      onMouseEnter={() => handleMenuHover(index, true)}
                      onMouseLeave={() => handleMenuHover(index, false)}
                      className={`group flex flex-col items-center gap-2 p-4 rounded-2xl transition-colors duration-300 ${
                        selectedMenu === item.id ? 'bg-slate-100' : ''
                      }`}
                    >
                      <div className={`relative w-14 h-14 ${item.color} rounded-xl flex items-center justify-center shadow-md`}>
                        <span className="text-3xl">{item.icon}</span>
                        {selectedMenu === item.id && (
                          <div className="absolute -inset-1 bg-blue-400/30 rounded-xl animate-ping" />
                        )}
                      </div>

                      <span className="text-sm font-semibold text-slate-700">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <div className="w-32 h-1.5 rounded-full bg-slate-900/40" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-32 w-1 h-16 bg-slate-900 rounded-l-lg" />
        <div className="absolute left-0 top-24 w-1 h-8 bg-slate-900 rounded-r-lg" />
        <div className="absolute left-0 top-36 w-1 h-12 bg-slate-900 rounded-r-lg" />
        <div className="absolute left-0 top-52 w-1 h-12 bg-slate-900 rounded-r-lg" />
      </div>
    </div>
  );
};

export default Modern3DLanding;
