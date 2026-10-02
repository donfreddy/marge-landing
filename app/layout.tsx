import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marge : sais-tu combien tu peux vraiment dépenser ?",
  description:
    "Marge calcule ce qu'il te restera vraiment avant ton prochain revenu, et te permet de tester un achat avant de le faire. 100% local-first, hors-ligne, sans synchronisation bancaire.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
