"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { formatFCFA } from "@/lib/simulator";

const BALANCE = 180_000;
const COMMITMENTS_TOTAL = 85_000;
const REMAINING = 25_000;

export default function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: -3 }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative mx-auto w-[250px] sm:w-[280px]"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" }}
        className="relative rounded-[2.75rem] border-[6px] border-zinc-800 bg-zinc-950 p-3 shadow-2xl shadow-black/60"
      >
        <div className="absolute left-1/2 top-3 h-5 w-24 -translate-x-1/2 rounded-full bg-zinc-800" />

        <div className="mt-7 rounded-[1.75rem] bg-white/[0.04] p-4 pb-6">
          <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-white/40">
            Ta marge réelle
          </p>

          <div className="mt-4 space-y-1.5 text-xs">
            <div className="flex justify-between text-white/50">
              <span>Solde actuel</span>
              <span className="text-white">{formatFCFA(BALANCE)}</span>
            </div>
            <div className="flex justify-between text-white/50">
              <span>Engagements</span>
              <span className="text-white/70">-{formatFCFA(COMMITMENTS_TOTAL)}</span>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-center">
            <p className="text-2xl font-black text-white">{formatFCFA(REMAINING)}</p>
            <p className="mt-1 flex items-center justify-center gap-1 text-[11px] font-semibold text-amber-500">
              <AlertTriangle className="h-3 w-3" />
              Marge serrée
            </p>
          </div>
        </div>
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-[2.75rem] bg-emerald-500/20 blur-3xl"
      />
    </motion.div>
  );
}
