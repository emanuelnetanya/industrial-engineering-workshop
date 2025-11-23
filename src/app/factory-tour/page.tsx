'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [currentStation, setCurrentStation] = useState<Station | null>(null);

  const handleNextStation = () => {
    if (gameState.isActive) {
      setCurrentStation(null);
      moveToNextStation();

      // בדיקה אם הסיור הסתיים
      if (!gameState.isActive) {
        setShowInstructions(false);
      }
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // יצירת מנוע Babylon.js - optimized for mobile
    const engine = new BABYLON.Engine(canvasRef.current, true, {
      preserveDrawingBuffer: false,
      stencil: false,
      antialias: window.devicePixelRatio <= 2,
      powerPreference: 'high-performance',
      doNotHandleContextLost: true
    });

    // הגבלת FPS למובייל
    engine.setHardwareScalingLevel(1 / Math.min(window.devicePixelRatio, 2));

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

    // מקש ENTER או לחיצה למעבר לתחנה הבאה
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && gameState.isActive) {
        handleNextStation();
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
      {/* כפתור חזרה */}
      {!showStartScreen && (
        <button
          onClick={() => router.push('/')}
          className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-white transition-all shadow-lg hover:scale-110"
        >
          <span className="text-2xl">←</span>
        </button>
      )}

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
              עצור בכל תחנה ולחץ על הכפתור להמשיך
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

      {/* כפתור למעבר לתחנה הבאה - נגיש תמיד */}
      {showInstructions && !currentStation && (
        <button
          onClick={handleNextStation}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-full text-lg font-semibold shadow-2xl hover:scale-105 transition-all animate-bounce"
        >
          ▶️ המשך לתחנה הבאה
        </button>
      )}

      {/* הוראות - מובטח שלא יוסתרו */}
      {showInstructions && currentStation && (
        <button
          onClick={handleNextStation}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-lg font-semibold shadow-2xl hover:scale-105 transition-all"
        >
          ✓ הבנתי - הבא
        </button>
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
