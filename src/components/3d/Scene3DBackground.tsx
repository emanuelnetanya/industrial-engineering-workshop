'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Scene3DBackgroundProps {
  theme?: 'blue' | 'purple' | 'green' | 'orange';
  intensity?: number;
}

/**
 * רקע תלת-ממדי משותף לכל הדפים
 */
export default function Scene3DBackground({ theme = 'blue', intensity = 1 }: Scene3DBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);

    const aspectRatio = 9 / 19.5;
    const width = Math.min(window.innerWidth, 500);
    const height = width / aspectRatio;

    const camera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (mountRef.current) {
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.domElement);
    }

    // תאורה
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6 * intensity);
    scene.add(ambientLight);

    const colors = {
      blue: { primary: 0x60a5fa, secondary: 0x38bdf8, accent: 0x0ea5e9 },
      purple: { primary: 0xa855f7, secondary: 0xc084fc, accent: 0x9333ea },
      green: { primary: 0x34d399, secondary: 0x6ee7b7, accent: 0x10b981 },
      orange: { primary: 0xfb923c, secondary: 0xfdba74, accent: 0xf97316 }
    };

    const themeColors = colors[theme];

    const light1 = new THREE.DirectionalLight(themeColors.primary, 1.2 * intensity);
    light1.position.set(5, 10, 5);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(themeColors.secondary, 0.8 * intensity);
    light2.position.set(-5, 5, -5);
    scene.add(light2);

    const pointLight = new THREE.PointLight(themeColors.accent, 1.5 * intensity, 50);
    pointLight.position.set(8, 8, 8);
    scene.add(pointLight);

    // חלקיקים
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 80;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: themeColors.secondary,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Grid
    const gridHelper = new THREE.GridHelper(50, 50, themeColors.primary, 0xe2e8f0);
    gridHelper.position.y = -10;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.15;
    scene.add(gridHelper);

    camera.position.z = 12;
    camera.position.y = 2;

    let time = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      particlesMesh.rotation.y += 0.0003;
      particlesMesh.rotation.x += 0.0001;

      pointLight.position.x = Math.sin(time * 0.5) * 8;
      pointLight.position.z = Math.cos(time * 0.5) * 8;

      camera.lookAt(0, 0, -8);

      renderer.render(scene, camera);
    };

    animate();

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
  }, [theme, intensity]);

  return <div ref={mountRef} className="absolute inset-0" />;
}
