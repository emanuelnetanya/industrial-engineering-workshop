'use client';

import { useEffect, useRef, useState } from 'react';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import { initGame } from '@/lib/babylon/game/initGame';

/**
 * דף משחק המפעל - FACTORY PRIME
 * משחק תלת-ממד אינטראקטיבי המבוסס על Babylon.js
 */
export default function FactoryGamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    // יצירת מנוע Babylon.js
    const engine = new BABYLON.Engine(canvasRef.current, true, {
      stencil: true,
      antialias: true
    });

    // אתחול המשחק
    const scene = initGame(engine, canvasRef.current);

    // הסתרת מסך טעינה אחרי 2 שניות
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    // לולאת רינדור
    engine.runRenderLoop(() => {
      scene.render();
    });

    // התאמה לשינויי גודל חלון
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    // ניקוי בעת הסרת הקומפוננטה
    return () => {
      window.removeEventListener('resize', handleResize);
      engine.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* מסך טעינה */}
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]">
          <div className="text-[#00d2ff] text-2xl tracking-[5px] mb-5">
            INITIALIZING SYSTEMS
          </div>
          <div className="w-[300px] h-1 bg-[#333] overflow-hidden">
            <div className="h-full bg-[#00d2ff] animate-[load_2s_forwards]"></div>
          </div>
        </div>
      )}

      {/* Canvas למשחק */}
      <canvas
        ref={canvasRef}
        className="w-full h-full outline-none touch-none"
        style={{ userSelect: 'none' }}
      />

      <style jsx>{`
        @keyframes load {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
