"use client";

import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  DEFAULT_BALANCE,
  DEFAULT_COMMITMENTS,
  DEFAULT_DAYS_UNTIL_PAYDAY,
  computeDailyBudget,
  computeRealMargin,
  computeRemainingAfterPurchase,
  computeSafetyBuffer,
  computeVerdict,
  formatFCFA,
  type Commitment,
  type Verdict,
} from "@/lib/simulator";

const SLIDER_MAX = 150_000;
const SLIDER_STEP = 1_000;
const QUICK_AMOUNTS = [10_000, 25_000, 50_000, 100_000];
const DEFAULT_PURCHASE_AMOUNT = 50_000;

const VERDICT_CONFIG: Record<
  Verdict,
  {
    label: string;
    message: string;
    color: string;
    ring: string;
    track: string;
    thumb: string;
    icon: typeof CheckCircle2;
  }
> = {
  safe: {
    label: "Marge confortable",
    message: "Tu peux y aller, il te reste assez pour finir le mois sereinement.",
    color: "text-emerald-500",
    ring: "border-emerald-500/30 bg-emerald-500/5",
    track: "bg-emerald-500",
    thumb: "border-emerald-500 bg-zinc-950",
    icon: CheckCircle2,
  },
  warning: {
    label: "Marge serrée",
    message: "Ta marge devient trop faible pour finir le mois sereinement.",
    color: "text-amber-500",
    ring: "border-amber-500/30 bg-amber-500/5",
    track: "bg-amber-500",
    thumb: "border-amber-500 bg-zinc-950",
    icon: AlertTriangle,
  },
  danger: {
    label: "Marge en danger",
    message: "Cet achat met ton mois en danger. Évite-le si tu peux.",
    color: "text-red-500",
    ring: "border-red-500/30 bg-red-500/5",
    track: "bg-red-500",
    thumb: "border-red-500 bg-zinc-950",
    icon: XCircle,
  },
};

function InlineAmountInput({
  value,
  onChange,
  ariaLabel,
}: {
  value: number;
  onChange: (next: number) => void;
  ariaLabel: string;
}) {
  return (
    <Input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      aria-label={ariaLabel}
      onChange={(e) => {
        const next = Number.parseInt(e.target.value.replace(/\D/g, ""), 10);
        onChange(Number.isNaN(next) ? 0 : Math.max(next, 0));
      }}
      onFocus={(e) => e.target.select()}
      className="h-10 w-28 bg-white/5 px-2 py-1 text-right text-base font-medium text-white md:text-sm"
    />
  );
}

function AnimatedAmount({ value, className }: { value: number; className?: string }) {
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, { stiffness: 140, damping: 22, mass: 0.6 });
  const display = useTransform(spring, (v) => formatFCFA(v));

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return <motion.span className={className}>{display}</motion.span>;
}

export default function Simulator() {
  const [balance, setBalance] = useState(DEFAULT_BALANCE);
  const [commitments, setCommitments] = useState<Commitment[]>(DEFAULT_COMMITMENTS);
  const [purchaseAmount, setPurchaseAmount] = useState(DEFAULT_PURCHASE_AMOUNT);
  const [daysUntilPayday, setDaysUntilPayday] = useState(DEFAULT_DAYS_UNTIL_PAYDAY);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const realMargin = computeRealMargin(balance, commitments);
  const remaining = computeRemainingAfterPurchase(realMargin, purchaseAmount);
  const safetyBuffer = computeSafetyBuffer(realMargin);
  const spendableAfterBuffer = remaining - safetyBuffer;
  const dailyBudget = computeDailyBudget(spendableAfterBuffer, daysUntilPayday);
  const verdict = computeVerdict(remaining, realMargin);
  const { label, message, color, ring, track, thumb, icon: Icon } = VERDICT_CONFIG[verdict];

  const reset = () => {
    setBalance(DEFAULT_BALANCE);
    setCommitments(DEFAULT_COMMITMENTS.map((c) => ({ ...c })));
    setPurchaseAmount(DEFAULT_PURCHASE_AMOUNT);
    setDaysUntilPayday(DEFAULT_DAYS_UNTIL_PAYDAY);
    setIsCustomizing(false);
  };

  const updateCommitmentAmount = (index: number, amount: number) => {
    setCommitments((prev) => prev.map((c, i) => (i === index ? { ...c, amount } : c)));
  };

  return (
    <section id="simulateur" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="rounded-3xl border border-white/10 bg-white/3 p-6 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-10">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40">
            Ta marge réelle, aujourd&apos;hui
          </h3>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={reset}
            className="h-auto shrink-0 px-0 text-xs font-medium text-white/40 hover:bg-transparent hover:text-white hover:underline hover:underline-offset-2"
          >
            Réinitialiser
          </Button>
        </div>

        {isCustomizing ? (
          <>
            <p className="mt-1 text-xs text-white/35">
              Modifie ton solde et tes charges pour voir ta vraie marge.
            </p>

            <dl className="mt-6 divide-y divide-white/5 text-sm">
              <div className="flex items-center justify-between py-2.5">
                <dt className="text-white/50">Solde actuel</dt>
                <dd>
                  <InlineAmountInput value={balance} onChange={setBalance} ariaLabel="Solde actuel" />
                </dd>
              </div>
              {commitments.map((c, i) => (
                <div key={c.label} className="flex items-center justify-between py-2.5">
                  <dt className="text-white/50">{c.label}</dt>
                  <dd className="flex items-center gap-1.5">
                    <span aria-hidden="true" className="text-white/40">
                      -
                    </span>
                    <InlineAmountInput
                      value={c.amount}
                      onChange={(next) => updateCommitmentAmount(i, next)}
                      ariaLabel={c.label}
                    />
                  </dd>
                </div>
              ))}
              <div className="flex items-center justify-between py-3">
                <dt className="font-semibold text-white">Marge réelle</dt>
                <dd className="text-xl font-bold text-emerald-500">{formatFCFA(realMargin)}</dd>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <dt className="text-white/50">Réserve de sécurité (10%)</dt>
                <dd className="font-medium text-white/70">-{formatFCFA(safetyBuffer)}</dd>
              </div>
            </dl>

            <p className="mt-1 text-xs text-white/35">
              Marge garde toujours cette réserve de côté : le verdict ne la compte jamais comme
              dépensable.
            </p>

            <button
              type="button"
              onClick={() => setIsCustomizing(false)}
              className="mt-3 text-xs font-medium text-white/40 transition-colors hover:text-white hover:underline hover:underline-offset-2"
            >
              Replier
            </button>
          </>
        ) : (
          <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/3 px-5 py-4">
            <div>
              <p className="text-xs text-white/40">Marge réelle (solde − charges du mois)</p>
              <p className="mt-1 text-2xl font-bold text-emerald-500">{formatFCFA(realMargin)}</p>
              <p className="mt-1.5 text-xs text-white/35">
                Dont {formatFCFA(safetyBuffer)} de réserve, jamais comptée comme dépensable.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCustomizing(true)}
              className="shrink-0 text-xs font-medium text-white/50 transition-colors hover:text-white hover:underline hover:underline-offset-2"
            >
              Personnaliser mes charges
            </button>
          </div>
        )}

        <div className="mt-10 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label htmlFor="purchase" className="text-sm font-medium text-white/70">
              Tu veux acheter quelque chose à...
            </label>
            <div className="relative w-full sm:w-44">
              <Input
                id="purchase"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={purchaseAmount}
                onChange={(e) => {
                  const next = Number.parseInt(e.target.value.replace(/\D/g, ""), 10);
                  setPurchaseAmount(Number.isNaN(next) ? 0 : Math.min(Math.max(next, 0), SLIDER_MAX));
                }}
                onFocus={(e) => e.target.select()}
                className="h-14 w-full bg-white/10 px-4 pr-16 text-right text-2xl font-black text-white focus-visible:ring-emerald-500/50"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-white/40">
                FCFA
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {QUICK_AMOUNTS.map((amount) => (
              <Button
                key={amount}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPurchaseAmount(amount)}
                className={`h-auto rounded-full px-3 py-1.5 text-xs font-medium ${
                  purchaseAmount === amount
                    ? "border-white/30 bg-white/15 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {formatFCFA(amount)}
              </Button>
            ))}
          </div>

          <Slider
            className="mt-6"
            value={[purchaseAmount]}
            onValueChange={([next]) => setPurchaseAmount(next)}
            max={SLIDER_MAX}
            step={SLIDER_STEP}
            rangeClassName={`transition-colors duration-300 ${track}`}
            thumbClassName={`size-5 border-2 shadow-lg transition-[transform,border-color] duration-300 focus-visible:scale-125 ${thumb}`}
            aria-label="Montant de l'achat"
          />

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/5 pt-6">
            <label htmlFor="days" className="text-sm font-medium text-white/70">
              Jours avant ta prochaine paie
            </label>
            <Input
              id="days"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={daysUntilPayday}
              onChange={(e) => {
                const next = Number.parseInt(e.target.value.replace(/\D/g, ""), 10);
                setDaysUntilPayday(Number.isNaN(next) ? 0 : Math.max(next, 0));
              }}
              onFocus={(e) => e.target.select()}
              className="h-10 w-20 bg-white/5 px-2 py-1 text-right text-base font-medium text-white md:text-sm"
            />
          </div>
          <p className="mt-1.5 text-xs text-white/35">
            Estimation simple (marge ÷ jours), pas la projection jour par jour de l&apos;app.
          </p>
        </div>

        <motion.div
          layout
          className={`mt-8 rounded-2xl border p-6 text-center transition-colors duration-300 ${ring}`}
        >
          <AnimatedAmount value={remaining} className="text-4xl font-black text-white sm:text-5xl" />
          <p className={`mt-2 flex items-center justify-center gap-1.5 text-sm font-semibold ${color}`}>
            <Icon className="h-4 w-4" />
            {label}
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-white/50">{message}</p>
          {daysUntilPayday > 0 && (
            <p className="mt-3 border-t border-white/10 pt-3 text-xs text-white/40">
              Soit environ{" "}
              <span className="font-semibold text-white/70">{formatFCFA(dailyBudget)}/jour</span>{" "}
              jusqu&apos;à ta prochaine paie, dans {daysUntilPayday} jours.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
