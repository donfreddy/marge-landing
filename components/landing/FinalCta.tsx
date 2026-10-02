"use client";

import { motion } from "framer-motion";
import StoreBadges from "./StoreBadges";

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

      <motion.p
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.08 }}
        className="mx-auto mt-4 max-w-md text-white/55"
      >
        Télécharge Marge et sache, en 3 secondes, ce que tu peux vraiment dépenser.
      </motion.p>

      <motion.div
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.16 }}
        className="mt-9 flex justify-center"
      >
        <StoreBadges />
      </motion.div>
    </section>
  );
}
