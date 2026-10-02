"use client";

import { motion } from "framer-motion";
import { CalendarClock, ShieldCheck, Zap } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Local-first & confidentiel",
    description: "Aucune donnée n'est envoyée sur un serveur. Tout reste sur ton téléphone.",
  },
  {
    icon: Zap,
    title: "Décision en 3 secondes",
    description: "Sais si tu peux acheter avant même d'arriver à la caisse.",
  },
  {
    icon: CalendarClock,
    title: "Basé sur ta prochaine paie",
    description: "Marge projette ta situation jusqu'à ton prochain revenu, pas juste aujourd'hui.",
  },
];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, delay, ease: [0.22, 0.61, 0.36, 1] as const },
});

export default function Benefits() {
  return (
    <section id="avantages" className="mx-auto max-w-5xl px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-xl text-center">
        <motion.p {...reveal()} className="text-sm font-semibold uppercase tracking-widest text-emerald-500">
          Pourquoi Marge
        </motion.p>
        <motion.h2
          {...reveal(0.05)}
          className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Conçu pour décider, pas pour suivre.
        </motion.h2>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {benefits.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            {...reveal(0.1 + i * 0.08)}
            className="rounded-2xl border border-white/10 bg-white/2 p-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
              <Icon className="h-5 w-5 text-emerald-500" strokeWidth={2} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
