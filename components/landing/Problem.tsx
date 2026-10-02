"use client";

import { motion } from "framer-motion";
import { formatFCFA } from "@/lib/simulator";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] as const },
};

export default function Problem() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-28 text-center sm:px-6">
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
        {formatFCFA(180_000)} sur ton compte ne veut pas dire que tu peux dépenser{" "}
        {formatFCFA(180_000)}. Loyer, transport, factures, imprévus... Ton solde te montre le
        présent. Marge te montre la conséquence de ton prochain achat.
      </motion.p>
    </section>
  );
}
