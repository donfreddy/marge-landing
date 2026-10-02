"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { formatFCFA } from "@/lib/simulator";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] as const },
};

export default function Problem() {
  return (
    <section className="relative bg-white/1.5 px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p {...reveal} className="text-sm font-semibold uppercase tracking-widest text-emerald-500">
          Le risque invisible
        </motion.p>

        <motion.h2
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.05 }}
          className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Ton solde bancaire te ment.
        </motion.h2>

        <motion.p
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60"
        >
          Loyer, transport, factures, imprévus... Ton solde te montre le présent. Marge te montre
          la conséquence de ton prochain achat.
        </motion.p>

        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.2 }}
          className="mt-14 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]"
        >
          <div className="rounded-2xl border border-white/10 bg-white/3 p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Ce que ton solde affiche
            </p>
            <p className="mt-3 text-4xl font-black text-white">{formatFCFA(180_000)}</p>
            <p className="mt-2 text-sm text-white/50">Ce que tu vois en ouvrant ton appli bancaire.</p>
          </div>

          <ArrowRight
            className="mx-auto h-6 w-6 shrink-0 rotate-90 text-white/20 sm:rotate-0"
            aria-hidden="true"
          />

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-500/70">
              Ce que Marge calcule
            </p>
            <p className="mt-3 text-4xl font-black text-emerald-500">{formatFCFA(95_000)}</p>
            <p className="mt-2 text-sm text-white/50">Ce qu&apos;il te reste une fois tes engagements couverts.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
