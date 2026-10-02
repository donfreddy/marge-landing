"use client";

import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-zinc-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 text-white">
          <Scale className="h-5 w-5 text-emerald-500" strokeWidth={2.25} />
          <span className="text-base font-semibold tracking-tight">Marge</span>
        </a>

        <Button asChild variant="outline" className="h-auto rounded-full bg-white/5 px-4 py-2 hover:bg-white/10">
          <a href="#simulateur">Tester le simulateur</a>
        </Button>
      </div>
    </header>
  );
}
