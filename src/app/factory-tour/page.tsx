'use client';

import { useEffect, useRef, useState } from 'react';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';
import { initGame } from '@/lib/factory-tour/game/initGame';
import { gameState } from '@/lib/factory-tour/game/gameState';
import { movePlayerToStation, moveToNextStation } from '@/lib/factory-tour/game/playerMovement';
import { animateMachines } from '@/lib/factory-tour/animations/machineAnimations';
import type { Station } from '@/lib/factory-tour/types';

/**
 * דף סיור במפעל תעשייתי
 */
export default function FactoryTourPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [currentStation, setCurrentStation] = useState<Station | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // יצירת מנוע Babylon.js
    const engine = new BABYLON.Engine(canvasRef.current, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      antialias: true
    });

    // אתחול המשחק
    const { scene, player } = initGame(engine, canvasRef.current, (station) => {
      setCurrentStation(station);
    });

    let lastTime = Date.now();

    // לולאת רינדור
    engine.runRenderLoop(() => {
      const now = Date.now();
      const deltaTime = (now - lastTime) / 1000;
      lastTime = now;

      if (gameState.isActive) {
        movePlayerToStation(player, deltaTime, (station) => {
          setCurrentStation(station);
        });
      }

      animateMachines(scene, now);

      scene.render();
    });

    // התאמה לשינויי גודל חלון
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    // מקש ENTER למעבר לתחנה הבאה
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && gameState.isActive) {
        setCurrentStation(null);
        moveToNextStation();

        // בדיקה אם הסיור הסתיים
        if (!gameState.isActive) {
          setShowInstructions(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // ניקוי
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      engine.dispose();
    };
  }, []);

  const handleStartClick = () => {
    setShowStartScreen(false);
    setShowInstructions(true);
    gameState.isActive = true;
    gameState.isMoving = true;
    gameState.currentStation = 1;
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      {/* מסך התחלה */}
      {showStartScreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] transition-opacity duration-600">
          <div className="text-center p-16 bg-white/98 rounded-3xl shadow-2xl backdrop-blur">
            <h1 className="text-5xl font-semibold text-gray-800 mb-5 tracking-tight">
              🏭 סיור במפעל תעשייתי
            </h1>
            <div className="text-xl text-gray-600 mb-12 font-light leading-relaxed">
              התנסות וירטואלית במפעל ייצור מתקדם
              <br />
              עצור בכל תחנה והמשך בלחיצת ENTER
            </div>
            <button
              onClick={handleStartClick}
              className="px-16 py-5 text-2xl font-medium bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white border-none rounded-full cursor-pointer shadow-xl hover:translate-y-[-4px] hover:shadow-2xl transition-all duration-300"
            >
              התחל סיור
            </button>
          </div>
        </div>
      )}

      {/* מידע על תחנה */}
      {currentStation && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-40 bg-white/95 px-10 py-5 rounded-2xl shadow-xl backdrop-blur text-center animate-slideDown">
          <div className="text-3xl font-semibold mb-2 text-[#667eea]">
            {currentStation.name}
          </div>
          <div className="text-base font-normal text-gray-600">
            {currentStation.description}
          </div>
        </div>
      )}

      {/* הוראות */}
      {showInstructions && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white/95 px-12 py-6 rounded-full shadow-xl backdrop-blur text-xl font-medium text-gray-800 animate-pulse">
          ⌨️ לחץ ENTER למעבר לתחנה הבאה
        </div>
      )}

      {/* Canvas למשחק */}
      <canvas
        ref={canvasRef}
        className="w-full h-full outline-none"
      />

      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateX(-50%) translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease;
        }
      `}</style>
    </div>
  );
}
