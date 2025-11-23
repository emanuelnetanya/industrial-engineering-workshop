'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import Scene3DBackground from '@/components/3d/Scene3DBackground';

export default function AboutPage() {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(headerRef.current, {
      scale: 0,
      rotation: 360,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    })
    .from(statsRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.5")
    .from(sectionsRef.current, {
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    }, "-=0.3");
  }, []);

  const stats = [
    { icon: '🎓', number: '4', label: 'שנות לימוד' },
    { icon: '💰', number: '95%', label: 'שיעור תעסוקה' },
    { icon: '🚀', number: '∞', label: 'אפשרויות קריירה' },
  ];

  const sections = [
    {
      title: 'מה זה הנדסת תעשייה?',
      icon: '⚙️',
      content: 'הנדסת תעשייה וניהול היא התחום המשלב הנדסה, מדעים מדויקים וכלים ניהוליים לשיפור ארגונים. מהנדסי תעשייה מתמחים בייעול תהליכים, הפחתת עלויות ושיפור איכות.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'קורסים עיקריים',
      icon: '📚',
      items: ['סטטיסטיקה ומודלים הסתברותיים', 'חקר ביצועים ותורת התורים', 'מערכות ייצור ולוגיסטיקה', 'ניהול פרויקטים', 'אופטימיזציה', 'ניתוח נתונים'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'תחומי תעסוקה',
      icon: '💼',
      items: ['חברות היי-טק', 'תעשיית הייצור', 'ייעוץ ארגוני', 'סטארט-אפים', 'חברות לוגיסטיקה', 'בנקים וחברות ביטוח'],
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
      <Scene3DBackground theme="green" intensity={0.6} />

      <div className="relative z-20 min-h-screen flex flex-col p-4 sm:p-6 pt-12 overflow-y-auto max-w-4xl mx-auto">
        {/* כפתור חזרה */}
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <span className="text-xl">←</span>
        </button>

        {/* Header */}
        <div ref={headerRef} className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-xl">
            <span className="text-4xl">📚</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-2">
            אודות התואר
          </h1>
          <p className="text-slate-600 text-sm">
            הנדסת תעשייה וניהול - העתיד שלך
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={el => { statsRef.current[index] = el; }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 text-center shadow-lg"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-black text-slate-800">{stat.number}</div>
              <div className="text-xs text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-4 pb-20">
          {sections.map((section, index) => (
            <div
              key={index}
              ref={el => { sectionsRef.current[index] = el; }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-slate-200/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center shadow-md`}>
                  <span className="text-2xl">{section.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  {section.title}
                </h3>
              </div>

              {section.content && (
                <p className="text-sm text-slate-600 leading-relaxed">
                  {section.content}
                </p>
              )}

              {section.items && (
                <ul className="space-y-2 mt-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-emerald-500 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="sticky bottom-8 left-1/2 transform -translate-x-1/2 z-30 mt-8">
          <button
            onClick={() => router.push('/factory-tour')}
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-full font-semibold shadow-xl hover:scale-105 transition-transform"
          >
            🏭 חווה את המפעל
          </button>
        </div>
      </div>
    </div>
  );
}
