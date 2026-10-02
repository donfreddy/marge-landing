"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck, WifiOff } from "lucide-react";

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] as const },
});

const badges = [
  { icon: WifiOff, label: "100% Hors-ligne" },
  { icon: Lock, label: "Données privées sur ton téléphone" },
  { icon: ShieldCheck, label: "Zéro synchronisation bancaire" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pt-16 text-center"
    >
      <motion.h1
        {...up(0)}
        className="max-w-3xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
      >
        Tu sais combien tu as.
        <br />
        <span className="text-emerald-500">Mais sais-tu combien tu peux VRAIMENT dépenser ?</span>
      </motion.h1>

      <motion.p
        {...up(0.1)}
        className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60"
      >
        Marge calcule ce qu&apos;il te restera vraiment avant ton prochain revenu, et te permet de
        tester un achat avant de le faire.
      </motion.p>

      <motion.div {...up(0.2)} className="mt-9">
        <a
          href="#simulateur"
          className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-7 py-3.5 text-base font-semibold text-black shadow-lg shadow-emerald-500/25 transition-transform hover:scale-[1.03] hover:bg-emerald-400"
        >
          Voir combien je peux dépenser
        </a>
      </motion.div>

      <motion.div
        {...up(0.3)}
        className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
      >
        {badges.map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-1.5 text-xs font-medium text-white/40">
            <Icon className="h-3.5 w-3.5" />
            {label}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
