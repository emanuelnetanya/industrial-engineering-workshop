'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  FaGraduationCap,
  FaGamepad,
  FaVideo,
  FaComments,
  FaPlay,
  FaUsers,
  FaChartLine,
  FaClock,
  FaStar,
  FaTrophy,
  FaMicrophone,
  FaPodcast
} from 'react-icons/fa';

export default function Home() {
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('videos');
  const [feedback, setFeedback] = useState({ name: '', email: '', rating: 5, message: '' });
  const [activeGame, setActiveGame] = useState<number | null>(null);
  const total = participants.length;

  // צבע דינמי לכרטיסים
  const ribbons = useMemo(
    () => ['border-blue-500','border-emerald-500','border-fuchsia-500','border-amber-500','border-cyan-500'],
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    setParticipants((prev) => [...prev, n]);
    setName('');
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`תודה ${feedback.name}! המשוב שלך נקלט בהצלחה 🎉`);
    setFeedback({ name: '', email: '', rating: 5, message: '' });
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
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4" role="navigation" aria-label="תפריט ראשי">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 shadow-lg shadow-fuchsia-500/20" aria-hidden="true">
              🎓
            </span>
            <h1 className="text-lg sm:text-xl font-semibold">סדנת הנדסת תעשייה וניהול</h1>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <a href="#about" className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/20 transition">אודות</a>
            <a href="#games" className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/20 transition">משחקים</a>
            <a href="#media" className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/20 transition">מדיה</a>
            <a href="#feedback" className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/20 transition">משוב</a>
          </div>
        </nav>
      </header>

      {/* תוכן */}
      <main className="relative z-10 mx-auto max-w-7xl px-5 py-10 space-y-16">

        {/* Hero Section עם תמונות */}
        <section className="mb-10 rounded-2xl border border-white/10 bg-white/5 overflow-hidden shadow-[0_10px_50px_-20px_rgba(59,130,246,0.5)] backdrop-blur">
          <div className="grid md:grid-cols-2 gap-6">
            {/* טקסט */}
            <div className="p-6 sm:p-10 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
                בניית אפליקציה מודרנית <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">ב־Next.js + Firebase</span>
              </h2>
              <p className="max-w-3xl text-white/70 mb-6">
                נרשמים, מצטרפים בזמן אמת, ורואים סטטיסטיקות חיות – עם עיצוב נאון, זכוכית וגרדיאנטים. זהו ה־Landing Page של הסדנה.
              </p>

              {/* KPI-ים */}
              <div className="grid grid-cols-2 gap-3">
                <CardStat label="משתתפים" value={total} icon={<FaUsers />} />
                <CardStat label="מסלולים" value="3" icon={<FaChartLine />} />
                <CardStat label="זמן ממוצע" value="42m" icon={<FaClock />} />
                <CardStat label="ציון חוויה" value="9.6" icon={<FaStar />} />
              </div>
            </div>

            {/* תמונות דינמיות */}
            <div className="relative h-[400px] md:h-auto">
              <div className="absolute inset-0 grid grid-cols-2 gap-2 p-4">
                <ImagePlaceholder
                  text="סדנאות אינטראקטיביות"
                  gradient="from-purple-500/20 to-pink-500/20"
                />
                <ImagePlaceholder
                  text="למידה מעשית"
                  gradient="from-cyan-500/20 to-blue-500/20"
                  delay="100"
                />
                <ImagePlaceholder
                  text="פרויקטים אמיתיים"
                  gradient="from-emerald-500/20 to-teal-500/20"
                  delay="200"
                />
                <ImagePlaceholder
                  text="קהילה תומכת"
                  gradient="from-amber-500/20 to-orange-500/20"
                  delay="300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* אודות התואר */}
        <section id="about" className="scroll-mt-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 flex items-center justify-center gap-3">
              <FaGraduationCap className="text-fuchsia-400" aria-hidden="true" />
              <span>מידע כללי על התואר</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              הנדסת תעשייה וניהול - שילוב ייחודי של הנדסה, ניהול וטכנולוגיה
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <InfoCard
              title="מה לומדים?"
              items={[
                "מערכות ייצור ולוגיסטיקה",
                "ניהול פרויקטים",
                "אופטימיזציה וחקר ביצועים",
                "ניתוח נתונים וסטטיסטיקה",
                "מערכות מידע ניהוליות"
              ]}
              icon={<FaChartLine className="text-cyan-400" />}
            />
            <InfoCard
              title="איפה עובדים?"
              items={[
                "חברות היי-טק",
                "תעשייה ויצור",
                "ייעוץ ניהולי",
                "סטארט-אפים",
                "חברות לוגיסטיקה"
              ]}
              icon={<FaTrophy className="text-amber-400" />}
            />
            <InfoCard
              title="למה לבחור?"
              items={[
                "שוק עבודה רחב",
                "שכר התחלתי גבוה",
                "גיוון תפקידים",
                "חשיבה אנליטית",
                "השפעה אמיתית"
              ]}
              icon={<FaStar className="text-fuchsia-400" />}
            />
          </div>
        </section>

        {/* רובריקת משחקים */}
        <section id="games" className="scroll-mt-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 flex items-center justify-center gap-3">
              <FaGamepad className="text-emerald-400" aria-hidden="true" />
              <span>משחקים אינטראקטיביים</span>
            </h2>
            <p className="text-white/70">בדוק את הידע שלך והתאמן בצורה מהנה</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <GameCard
              title="קוויז מהיר"
              description="10 שאלות על הנדסת תעשייה"
              difficulty="קל"
              time="5 דקות"
              onClick={() => setActiveGame(1)}
              active={activeGame === 1}
            />
            <GameCard
              title="אתגר אופטימיזציה"
              description="פתור בעיית לוגיסטיקה מורכבת"
              difficulty="בינוני"
              time="15 דקות"
              onClick={() => setActiveGame(2)}
              active={activeGame === 2}
            />
            <GameCard
              title="סימולציית ייצור"
              description="נהל קו ייצור וירטואלי"
              difficulty="מתקדם"
              time="20 דקות"
              onClick={() => setActiveGame(3)}
              active={activeGame === 3}
            />
          </div>

          {activeGame && (
            <div className="mt-6 p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 backdrop-blur">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">המשחק יטען בקרוב...</h3>
                <p className="text-white/70 mb-6">כאן יופיע המשחק האינטראקטיבי - ניתן להטמיע משחק אמיתי או iframe</p>
                <button
                  onClick={() => setActiveGame(null)}
                  className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                >
                  סגור
                </button>
              </div>
            </div>
          )}
        </section>

        {/* גלריית סרטונים ופודקאסטים */}
        <section id="media" className="scroll-mt-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 flex items-center justify-center gap-3">
              <FaVideo className="text-cyan-400" aria-hidden="true" />
              <span>גלריית מדיה</span>
            </h2>
            <p className="text-white/70">סרטונים, הרצאות ופודקאסטים מעוררי השראה</p>
          </div>

          {/* טאבים */}
          <div className="flex justify-center gap-4 mb-8" role="tablist" aria-label="סוגי מדיה">
            <TabButton
              active={activeTab === 'videos'}
              onClick={() => setActiveTab('videos')}
              icon={<FaVideo />}
              label="סרטונים"
            />
            <TabButton
              active={activeTab === 'podcasts'}
              onClick={() => setActiveTab('podcasts')}
              icon={<FaPodcast />}
              label="פודקאסטים"
            />
          </div>

          {/* תוכן */}
          <div className="grid md:grid-cols-3 gap-6">
            {activeTab === 'videos' ? (
              <>
                <MediaCard
                  title="מבוא להנדסת תעשייה"
                  duration="12:34"
                  type="video"
                  thumbnail="gradient-1"
                />
                <MediaCard
                  title="אופטימיזציה במערכות ייצור"
                  duration="18:45"
                  type="video"
                  thumbnail="gradient-2"
                />
                <MediaCard
                  title="סיור במפעל חכם"
                  duration="25:12"
                  type="video"
                  thumbnail="gradient-3"
                />
              </>
            ) : (
              <>
                <MediaCard
                  title="שיחה עם מהנדס תעשייה מוביל"
                  duration="45:20"
                  type="podcast"
                  thumbnail="gradient-4"
                />
                <MediaCard
                  title="העתיד של תעשייה 4.0"
                  duration="38:15"
                  type="podcast"
                  thumbnail="gradient-5"
                />
                <MediaCard
                  title="מחשיבה לפעולה"
                  duration="52:30"
                  type="podcast"
                  thumbnail="gradient-6"
                />
              </>
            )}
          </div>
        </section>

        {/* טופס משוב */}
        <section id="feedback" className="scroll-mt-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 flex items-center justify-center gap-3">
                <FaComments className="text-amber-400" aria-hidden="true" />
                <span>שתף אותנו במשוב</span>
              </h2>
              <p className="text-white/70">דעתך חשובה לנו! עזור לנו לשפר את הסדנה</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-10 backdrop-blur">
              <form onSubmit={handleFeedbackSubmit} className="space-y-6" dir="rtl">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="feedback-name" className="block text-sm font-medium mb-2">שם מלא</label>
                    <input
                      id="feedback-name"
                      type="text"
                      required
                      value={feedback.name}
                      onChange={(e) => setFeedback({...feedback, name: e.target.value})}
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-amber-400/70"
                      placeholder="איך קוראים לך?"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="feedback-email" className="block text-sm font-medium mb-2">אימייל</label>
                    <input
                      id="feedback-email"
                      type="email"
                      required
                      value={feedback.email}
                      onChange={(e) => setFeedback({...feedback, email: e.target.value})}
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-amber-400/70"
                      placeholder="your@email.com"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="feedback-rating" className="block text-sm font-medium mb-2">
                    דירוג החוויה ({feedback.rating}/5)
                  </label>
                  <input
                    id="feedback-rating"
                    type="range"
                    min="1"
                    max="5"
                    value={feedback.rating}
                    onChange={(e) => setFeedback({...feedback, rating: Number(e.target.value)})}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    aria-valuemin={1}
                    aria-valuemax={5}
                    aria-valuenow={feedback.rating}
                  />
                  <div className="flex justify-between text-xs text-white/60 mt-1">
                    <span>גרוע</span>
                    <span>מצוין</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="feedback-message" className="block text-sm font-medium mb-2">המשוב שלך</label>
                  <textarea
                    id="feedback-message"
                    required
                    rows={5}
                    value={feedback.message}
                    onChange={(e) => setFeedback({...feedback, message: e.target.value})}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-amber-400/70 resize-none"
                    placeholder="שתף אותנו בחוויה שלך, הצעות לשיפור או כל דבר אחר..."
                    aria-required="true"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:scale-[1.02]"
                  aria-label="שלח משוב"
                >
                  <span className="absolute inset-0 -z-10 animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(255,255,255,.2),transparent_60%)]" />
                  שלח משוב
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* טופס הרשמה + רשימה */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* הרשמה */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur">
            <h3 className="mb-4 text-2xl font-bold">הרשמה לסדנה</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" dir="rtl">
              <label htmlFor="register-name" className="sr-only">שם מלא להרשמה</label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="איך קוראים לך?"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-fuchsia-400/70"
                aria-label="שם מלא להרשמה"
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

// קומפוננטות עזר
interface CardStatProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

function CardStat({ label, value, icon }: CardStatProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-5 text-center backdrop-blur">
      {icon && <div className="flex justify-center mb-2 text-2xl opacity-70" aria-hidden="true">{icon}</div>}
      <div className="text-3xl font-extrabold tracking-tight">{value}</div>
      <div className="mt-1 text-sm text-white/60">{label}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="grid place-items-center rounded-xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
      <div className="mb-3 text-4xl" aria-hidden="true">✨</div>
      <p className="text-white/70">אין עדיין משתתפים… תהיה הראשון/ה להירשם!</p>
    </div>
  );
}

interface ImagePlaceholderProps {
  text: string;
  gradient: string;
  delay?: string;
}

function ImagePlaceholder({ text, gradient, delay = '0' }: ImagePlaceholderProps) {
  return (
    <div
      className={`relative rounded-xl bg-gradient-to-br ${gradient} border border-white/10 overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center p-4">
        <p className="text-center font-semibold text-sm">{text}</p>
      </div>
      {/* Placeholder for actual image - replace with <img> tag */}
      <div className="w-full h-full min-h-[180px] bg-gradient-to-br from-white/5 to-transparent" />
    </div>
  );
}

interface InfoCardProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
}

function InfoCard({ title, items, icon }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:bg-white/10 transition">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl" aria-hidden="true">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <ul className="space-y-2" dir="rtl">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-white/80">
            <span className="text-cyan-400 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface GameCardProps {
  title: string;
  description: string;
  difficulty: string;
  time: string;
  onClick: () => void;
  active: boolean;
}

function GameCard({ title, description, difficulty, time, onClick, active }: GameCardProps) {
  return (
    <div
      className={`rounded-2xl border ${active ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 bg-white/5'} p-6 backdrop-blur hover:bg-white/10 transition cursor-pointer`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="text-4xl mb-4" aria-hidden="true">🎮</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70 text-sm mb-4">{description}</p>
      <div className="flex gap-2 text-xs">
        <span className="px-3 py-1 rounded-full bg-white/10">{difficulty}</span>
        <span className="px-3 py-1 rounded-full bg-white/10">{time}</span>
      </div>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={active}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
        active
          ? 'bg-gradient-to-r from-cyan-600 to-blue-500 text-white shadow-lg'
          : 'bg-white/10 text-white/70 hover:bg-white/20'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

interface MediaCardProps {
  title: string;
  duration: string;
  type: 'video' | 'podcast';
  thumbnail: string;
}

function MediaCard({ title, duration, type, thumbnail }: MediaCardProps) {
  const gradients: Record<string, string> = {
    'gradient-1': 'from-purple-500/40 to-pink-500/40',
    'gradient-2': 'from-cyan-500/40 to-blue-500/40',
    'gradient-3': 'from-emerald-500/40 to-teal-500/40',
    'gradient-4': 'from-amber-500/40 to-orange-500/40',
    'gradient-5': 'from-indigo-500/40 to-purple-500/40',
    'gradient-6': 'from-rose-500/40 to-red-500/40',
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur group cursor-pointer hover:scale-105 transition-transform">
      <div className={`relative h-48 bg-gradient-to-br ${gradients[thumbnail]} flex items-center justify-center`}>
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />
        <button
          className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition"
          aria-label={`נגן ${title}`}
        >
          {type === 'video' ? <FaPlay className="text-2xl ml-1" /> : <FaMicrophone className="text-2xl" />}
        </button>
      </div>
      <div className="p-4" dir="rtl">
        <h4 className="font-bold mb-2">{title}</h4>
        <div className="flex items-center gap-2 text-sm text-white/60">
          <FaClock className="text-xs" />
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
}
