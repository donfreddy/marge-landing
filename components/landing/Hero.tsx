"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import PhoneMockup from "./PhoneMockup";
import StoreBadges from "./StoreBadges";

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
    <section id="top" className="relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="text-center lg:text-left">
          <motion.h1
            {...up(0)}
            className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
          >
            Tu sais combien tu as.
            <br />
            <span className="text-emerald-500">Mais sais-tu combien tu peux VRAIMENT dépenser ?</span>
          </motion.h1>

          <motion.p
            {...up(0.1)}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/60 lg:mx-0"
          >
            Marge calcule ce qu&apos;il te restera vraiment avant ton prochain revenu, et te permet
            de tester un achat avant de le faire.
          </motion.p>

          <motion.div {...up(0.2)} className="mt-9 flex justify-center lg:justify-start">
            <Button
              asChild
              size="lg"
              className="h-auto rounded-full px-7 py-3.5 text-base shadow-lg shadow-emerald-500/25 transition-transform hover:scale-[1.03]"
            >
              <a href="#simulateur">Voir combien je peux dépenser</a>
            </Button>
          </motion.div>

          <motion.p
            {...up(0.28)}
            className="mx-auto mt-6 max-w-sm text-sm font-semibold text-white/80 lg:mx-0"
          >
            Pas de synchronisation bancaire. Pas de compte à lier. Tes données restent sur ton
            téléphone.
          </motion.p>

          <motion.div
            {...up(0.34)}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start"
          >
            {badges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 text-xs font-medium text-white/45"
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </span>
            ))}
          </motion.div>

          <motion.div {...up(0.4)} className="mt-8 flex justify-center lg:justify-start">
            <StoreBadges align="center" />
          </motion.div>
        </div>

        <PhoneMockup />
      </div>
    </section>
  );
}
