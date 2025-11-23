'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import Phone3DFrame from '@/components/3d/Phone3DFrame';
import Scene3DBackground from '@/components/3d/Scene3DBackground';

export default function InfoPage() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(cardsRef.current, {
      scale: 0,
      rotation: 180,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.4");
  }, []);

  const infoCards = [
    {
      icon: '🏭',
      title: 'מהי הנדסת תעשייה?',
      content: 'שילוב ייחודי בין הנדסה, ניהול וטכנולוגיה. מהנדסי תעשייה מייעלים תהליכים, מפחיתים עלויות ומשפרים איכות.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🎯',
      title: 'למה לבחור בנו?',
      content: 'תואר מבוקש בשוק העבודה, שכר התחלתי גבוה, גיוון תפקידים, והזדמנויות קריירה רחבות בכל התעשיות.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '💼',
      title: 'איפה עובדים?',
      content: 'היי-טק, תעשייה, ייעוץ ניהולי, סטארט-אפים, לוגיסטיקה, ועוד. המיומנויות שלך רלוונטיות בכל מקום!',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: '📚',
      title: 'מה לומדים?',
      content: 'מערכות ייצור, אופטימיזציה, ניהול פרויקטים, ניתוח נתונים, סטטיסטיקה, מערכות מידע ועוד.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '🚀',
      title: 'הצלחה מובטחת',
      content: '95% משיעור התעסוקה, משכורת ממוצעת גבוהה, והזדמנויות קידום מהירות. העתיד שלך מתחיל כאן!',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <Phone3DFrame>
      <Scene3DBackground theme="purple" intensity={0.8} />

      <div className="relative z-20 h-full flex flex-col p-6 pt-12 overflow-y-auto">
        {/* כפתור חזרה */}
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <span className="text-xl">←</span>
        </button>

        {/* Header */}
        <div ref={headerRef} className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl">
            <span className="text-4xl">ℹ️</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-2">
            מידע על הסדנה
          </h1>
          <p className="text-slate-600">
            כל מה שצריך לדעת על הנדסת תעשייה
          </p>
        </div>

        {/* Info Cards */}
        <div className="space-y-4 pb-20">
          {infoCards.map((card, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-slate-200/50 hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <span className="text-3xl">{card.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {card.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <button
            onClick={() => router.push('/factory-tour')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold shadow-xl hover:scale-105 transition-transform"
          >
            🏭 התחל סיור במפעל
          </button>
        </div>
      </div>
    </Phone3DFrame>
  );
}
