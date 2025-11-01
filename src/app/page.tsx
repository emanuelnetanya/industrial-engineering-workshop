'use client';

import { useEffect, useMemo, useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState([]);
  const total = participants.length;

  // צבע דינמי לכרטיסים
  const ribbons = useMemo(
    () => ['border-blue-500','border-emerald-500','border-fuchsia-500','border-amber-500','border-cyan-500'],
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    setParticipants((prev) => [...prev, n]);
    setName('');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#0b1223] to-black text-white">
      {/* רקע חי – בועות נעות */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-16 h-80 w-80 rounded-full bg-fuchsia-600/30 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl animate-pulse [animation-delay:300ms]"></div>
        <div className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl animate-[bounce_6s_ease-in-out_infinite]"></div>
      </div>

      {/* נב-בר */}
      <header className="sticky top-0 z-20 backdrop-blur bg-black/20 border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 shadow-lg shadow-fuchsia-500/20">🎓</span>
            <h1 className="text-lg sm:text-xl font-semibold">סדנת הנדסת תעשייה וניהול</h1>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">Next.js • Tailwind</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">Realtime • UX</span>
          </div>
        </div>
      </header>

      {/* תוכן */}
      <main className="relative z-10 mx-auto max-w-6xl px-5 py-10">
        {/* כותרת וגוש פתיח זכוכיתי */}
        <section className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-10 shadow-[0_10px_50px_-20px_rgba(59,130,246,0.5)] backdrop-blur">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              בניית אפליקציה מודרנית <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">ב־Next.js + Firebase</span>
            </h2>
            <p className="max-w-3xl text-white/70">
              נרשמים, מצטרפים בזמן אמת, ורואים סטטיסטיקות חיות – עם עיצוב נאון, זכוכית וגרדיאנטים. זהו ה־Landing Page של הסדנה.
            </p>

            {/* KPI-ים */}
            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
              <CardStat label="משתתפים" value={total} />
              <CardStat label="מסלולים" value="3" />
              <CardStat label="זמן ממוצע" value="42m" />
              <CardStat label="ציון חוויה" value="9.6" />
            </div>
          </div>
        </section>

        {/* טופס הרשמה + רשימה */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* הרשמה */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur">
            <h3 className="mb-4 text-2xl font-bold">הרשמה לסדנה</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" dir="rtl">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="איך קוראים לך?"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-fuchsia-400/70"
              />
              <button
                type="submit"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02]"
              >
                <span className="absolute inset-0 -z-10 animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(255,255,255,.2),transparent_60%)]" />
                הירשם עכשיו
              </button>
              <p className="text-sm text-white/60">* ההרשמה בדף זה מקומית (ללא שרת). מיד נחבר לדאטאבייס של Firebase.</p>
            </form>
          </div>

          {/* רשימת משתתפים */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="mb-4 text-2xl font-bold">משתתפים (Live)</h3>
            {participants.length === 0 ? (
              <EmptyState />
            ) : (
              <ul className="space-y-3" dir="rtl">
                {participants.map((n, i) => (
                  <li
                    key={`${n}-${i}`}
                    className={`flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 border-r-4 ${ribbons[i % ribbons.length]} hover:bg-white/15 transition`}
                  >
                    <span className="font-medium">{i + 1}. {n}</span>
                    <span className="text-xs text-white/60">הצטרף עכשיו</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* פוטר */}
        <footer className="mt-10 flex flex-col items-center gap-2 text-center text-white/50">
          <div className="h-px w-40 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <p>Built with ❤️ using Next.js & Tailwind • Ready for Firebase</p>
        </footer>
      </main>
    </div>
  );
}

function CardStat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-5 text-center backdrop-blur">
      <div className="text-3xl font-extrabold tracking-tight">{value}</div>
      <div className="mt-1 text-sm text-white/60">{label}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="grid place-items-center rounded-xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
      <div className="mb-3 text-4xl">✨</div>
      <p className="text-white/70">אין עדיין משתתפים… תהיה הראשון/ה להירשם!</p>
    </div>
  );
}
