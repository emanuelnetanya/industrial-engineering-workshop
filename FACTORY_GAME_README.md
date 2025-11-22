# 🏭 Factory Prime - משחק מפעל תלת-ממדי

משחק אינטראקטיבי המבוסס על Babylon.js ו-Next.js, המדמה סביבת מפעל עם מכונות, מכשולים ושאלות טריוויה.

## 📁 מבנה הפרויקט

```
src/
├── app/
│   └── factory-game/
│       └── page.tsx              # דף המשחק הראשי (React Component)
│
└── lib/
    └── babylon/
        ├── types/
        │   └── index.ts          # הגדרות TypeScript
        │
        ├── textures/
        │   └── textureGenerator.ts   # מחולל טקסטורות פרוצדורלי
        │
        ├── materials/
        │   └── createMaterials.ts    # יצירת חומרים (PBR)
        │
        ├── environment/
        │   ├── createEnvironment.ts  # רצפה, עמודים, קורות
        │   └── createLighting.ts     # תאורה וצללים
        │
        ├── player/
        │   └── createPlayer.ts       # רובוט (שחקן), אנימציות
        │
        ├── machines/
        │   └── createMachines.ts     # מכבש, פס הולכה, קופסאות
        │
        ├── particles/
        │   └── createParticles.ts    # מערכות חלקיקים (אדים)
        │
        ├── gui/
        │   ├── startScreen.ts        # מסך התחלה
        │   └── questionModal.ts      # חלון שאלות
        │
        └── game/
            ├── gameState.ts          # מצב משחק גלובלי
            ├── gameLoop.ts           # לולאת משחק עיקרית
            └── initGame.ts           # אתחול המשחק
```

## 🎮 תכונות

### גרפיקה
- ✨ מנוע PBR (Physically Based Rendering)
- 🌫️ ערפל אקספוננציאלי
- 💡 מערכת צללים מתקדמת
- 🎆 אפקטים פוסט-פרוססינג (Bloom, FXAA)
- 🎨 טקסטורות פרוצדורליות

### משחקיות
- 🤖 רובוט נע עם אנימציות
- 🛣️ מסלול מוגדר מראש
- ❓ שאלות טריוויה במהלך המשחק
- 🏭 מכונות מונפשות (מכבש, פס הולכה)
- 💨 מערכות חלקיקים

### ממשק משתמש
- 📱 מסך טעינה מעוצב
- 🎯 מסך התחלה אינטראקטיבי
- 💬 חלונות שאלות עם משוב ויזואלי

## 🚀 התחלה מהירה

### התקנה

החבילות כבר מותקנות! אם צריך להתקין שוב:

```bash
npm install
```

### הרצת המשחק

```bash
npm run dev
```

פתח דפדפן וגש ל:
```
http://localhost:3000/factory-game
```

## 🎯 איך לשחק

1. **לחץ על START OPERATION** - המשחק יתחיל
2. **הרובוט יתחיל לנוע** - לאורך המסלול המוגדר
3. **ענה על שאלות** - בכל עצירה תוצג שאלת טריוויה
4. **המשך בנתיב** - עד להשלמת המעגל

### שליטה
- **עכבר**: סיבוב מצלמה (גרור)
- **גלגלת**: זום פנימה/החוצה

## 🛠️ התאמה אישית

### שינוי נתיב התנועה

ערוך את `src/lib/babylon/game/gameState.ts`:

```typescript
path: [
  new BABYLON.Vector3(0, 0, -40),
  new BABYLON.Vector3(0, 0, -10),
  // הוסף נקודות נוספות כאן...
]
```

### הוספת שאלות חדשות

ערוך את `src/lib/babylon/gui/questionModal.ts`:

```typescript
const answers = [
  'תשובה 1',
  'תשובה נכונה', // אינדקס 1
  'תשובה 3'
];
```

### שינוי מהירות תנועה

ערוך את `src/lib/babylon/game/gameState.ts`:

```typescript
speed: 0.15, // הגדל למהירות גבוהה יותר
```

## 📦 תלויות

### ייצור
- `@babylonjs/core` - מנוע תלת-ממד
- `@babylonjs/gui` - ממשק משתמש
- `@babylonjs/loaders` - טעינת מודלים
- `next` - מסגרת React
- `react` + `react-dom` - ספריית UI

## 🎨 עיצוב וסטייל

### צבעים עיקריים
- **כחול ניאון**: `#00d2ff` - UI ואורות
- **כתום**: `#ff8800` - אובייקטים נעים
- **צהוב**: `#dec800` - אזהרות

### חומרים
1. **Metal** - מתכת עם גימור מבריק
2. **Floor** - רצפת מפעל עם פסי אזהרה
3. **Glow** - חומרים זוהרים (כחול/כתום)
4. **Hazard** - פסים שחורים וצהובים

## 🐛 פתרון בעיות

### המשחק לא נטען
1. ודא ש-Babylon.js מותקן: `npm install`
2. בדוק קונסולת הדפדפן לשגיאות
3. נסה לנקות cache: `npm run dev -- --clean`

### ביצועים נמוכים
1. הפחת איכות צללים ב-`createLighting.ts`
2. כבה Bloom ב-`initGame.ts`
3. הקטן את מספר החלקיקים ב-`createParticles.ts`

### הטקסטורות לא נטענות
הטקסטורות נוצרות פרוצדורלית ולא דורשות קבצים חיצוניים.

## 📚 משאבים נוספים

- [תיעוד Babylon.js](https://doc.babylonjs.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [Babylon.js Playground](https://playground.babylonjs.com/)

## 🔮 פיתוחים עתידיים

- [ ] הוספת מודלים תלת-ממדיים (GLTF/GLB)
- [ ] מערכת ניקוד
- [ ] שמירת התקדמות
- [ ] מצב רב-משתתפים
- [ ] עוד רמות ומכונות
- [ ] אפקטי קול
- [ ] VR support

## 📄 רישיון

פרויקט חינוכי - שימוש חופשי

---

**נוצר ב-Babylon.js 7.31 + Next.js 16 + TypeScript**

🎮 תהנו מהמשחק!
