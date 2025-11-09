import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "סדנת הנדסת תעשייה וניהול | Industrial Engineering Workshop",
  description: "סדנה אינטראקטיבית ללימוד הנדסת תעשייה וניהול עם Next.js ו-Firebase. משחקים, סרטונים, פודקאסטים ותוכן מקצועי.",
  keywords: ["הנדסת תעשייה", "ניהול", "Next.js", "Firebase", "סדנה"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
