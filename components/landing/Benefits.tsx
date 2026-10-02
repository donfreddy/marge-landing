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
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <div className="grid gap-6 sm:grid-cols-3">
        {benefits.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            {...reveal(i * 0.08)}
            className="rounded-2xl border border-white/10 bg-white/2 p-6"
          >
            <Icon className="h-6 w-6 text-emerald-500" strokeWidth={2} />
            <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
