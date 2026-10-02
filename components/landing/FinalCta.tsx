"use client";

import { motion } from "framer-motion";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] as const },
};

export default function FinalCta() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
      <motion.h2 {...reveal} className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Et si tu savais toujours ce qu&apos;il te restera ?
      </motion.h2>

      <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="mt-8">
        <a
          href="#simulateur"
          className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-transform hover:scale-[1.03] hover:bg-indigo-400"
        >
          Calculer ma marge maintenant
        </a>
      </motion.div>
    </section>
  );
}
