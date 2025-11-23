'use client';

import React, { ReactNode } from 'react';

interface Phone3DFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * מסגרת פלאפון תלת-ממדית לשימוש חוזר
 */
export default function Phone3DFrame({ children, className = '' }: Phone3DFrameProps) {
  return (
    <div className={`flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-4 ${className}`}>
      <div className="relative w-full max-w-md" style={{ aspectRatio: '9/19.5' }}>
        {/* מסגרת הפלאפון */}
        <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-slate-900">
          {/* Notch עליון */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-slate-900 rounded-b-3xl z-50 flex items-center justify-center gap-2">
            <div className="w-16 h-1.5 bg-slate-800 rounded-full" />
            <div className="w-3 h-3 bg-slate-800 rounded-full" />
          </div>

          {/* תוכן הדף */}
          <div className="relative h-full overflow-hidden">
            {children}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1.5 rounded-full bg-slate-900/40 z-50" />
        </div>

        {/* כפתורים צדדיים */}
        <div className="absolute right-0 top-32 w-1 h-16 bg-slate-900 rounded-l-lg" />
        <div className="absolute left-0 top-24 w-1 h-8 bg-slate-900 rounded-r-lg" />
        <div className="absolute left-0 top-36 w-1 h-12 bg-slate-900 rounded-r-lg" />
        <div className="absolute left-0 top-52 w-1 h-12 bg-slate-900 rounded-r-lg" />
      </div>
    </div>
  );
}
