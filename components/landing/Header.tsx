"use client";

import { Scale } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-zinc-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 text-white">
          <Scale className="h-5 w-5 text-emerald-500" strokeWidth={2.25} />
          <span className="text-base font-semibold tracking-tight">Marge</span>
        </a>

        <a
          href="#simulateur"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Tester le simulateur
        </a>
      </div>
    </header>
  );
}
