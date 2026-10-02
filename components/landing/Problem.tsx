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
    <section id="probleme" className="relative bg-white/1.5 px-4 py-28 sm:px-6">
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
          className="mt-14 flex items-stretch gap-3 rounded-2xl border border-white/10 bg-white/3 p-4 sm:gap-6 sm:p-8"
        >
          <div className="flex-1 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 sm:text-xs">
              Ton solde affiche
            </p>
            <p className="mt-2 text-xl font-black text-white sm:text-4xl">{formatFCFA(180_000)}</p>
          </div>

          <ArrowRight
            className="h-5 w-5 shrink-0 self-center text-white/20 sm:h-6 sm:w-6"
            aria-hidden="true"
          />

          <div className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center sm:border-none sm:bg-transparent sm:p-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-500/70 sm:text-xs">
              Marge calcule
            </p>
            <p className="mt-2 text-xl font-black text-emerald-500 sm:text-4xl">{formatFCFA(95_000)}</p>
          </div>
        </motion.div>

        <motion.p
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.25 }}
          className="mx-auto mt-4 max-w-md text-xs text-white/40"
        >
          Ce que tu vois dans ton appli bancaire, vs. ce qu&apos;il te reste réellement une fois tes
          engagements couverts.
        </motion.p>
      </div>
    </section>
  );
}
