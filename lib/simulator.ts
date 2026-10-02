export type Commitment = {
  label: string;
  amount: number;
};

export type Verdict = "safe" | "warning" | "danger";

export const DEFAULT_BALANCE = 180_000;

export const DEFAULT_COMMITMENTS: Commitment[] = [
  { label: "Loyer", amount: 50_000 },
  { label: "Transport", amount: 20_000 },
  { label: "Factures", amount: 15_000 },
];

export function sumCommitments(commitments: Commitment[]): number {
  return commitments.reduce((total, c) => total + c.amount, 0);
}

export function computeRealMargin(balance: number, commitments: Commitment[]): number {
  return balance - sumCommitments(commitments);
}

export function computeRemainingAfterPurchase(realMargin: number, purchaseAmount: number): number {
  return realMargin - purchaseAmount;
}

/**
 * Taux de réserve de sécurité, en points de base (1000 = 10%).
 * Reprend UserProfile.defaultBufferRateBps du moteur réel (marge-mobile),
 * pour que le verdict de la démo ne puisse pas contredire celui de l'app
 * sur les mêmes chiffres.
 */
export const SAFETY_BUFFER_RATE_BPS = 1000;

/**
 * Part maximale de la marge (après réserve) qu'un achat peut représenter
 * sans déclencher un avertissement. Reprend safeShareBps du policy profile
 * "normal" (ThresholdSafetyPolicy.normal) du moteur réel.
 */
const SAFE_SHARE_BPS = 5000;

/**
 * La réserve que Marge garde toujours de côté, jamais dépensable.
 * Dans l'app, elle est gelée au moment de l'onboarding à partir du creux
 * projeté ; ici, faute de projection temporelle, on l'applique à la marge
 * statique (solde − charges).
 */
export function computeSafetyBuffer(realMargin: number): number {
  return realMargin > 0 ? Math.round(realMargin * (SAFETY_BUFFER_RATE_BPS / 10_000)) : 0;
}

/**
 * Reproduit ThresholdSafetyPolicy.normal du moteur réel : rouge si la marge
 * (avant ou après l'achat, réserve déduite) devient négative, orange si
 * l'achat dépasse la part sûre de la marge, vert sinon.
 *
 * Simplification assumée : le moteur réel teste aussi l'apparition d'un
 * "cliff" sur la fenêtre de projection (30-60 jours) ; cette démo n'a pas
 * de dimension temporelle et ne peut donc pas reproduire ce test.
 */
export function computeVerdict(remaining: number, realMargin: number): Verdict {
  const buffer = computeSafetyBuffer(realMargin);
  const marginBefore = realMargin - buffer;
  const marginAfter = remaining - buffer;

  if (marginBefore < 0) return "danger";
  if (marginAfter < 0) return "danger";

  const purchase = realMargin - remaining;
  if (marginBefore > 0 && purchase / marginBefore > SAFE_SHARE_BPS / 10_000) return "warning";

  return "safe";
}

export const DEFAULT_DAYS_UNTIL_PAYDAY = 12;

/**
 * Budget indicatif par jour jusqu'à la prochaine paie, sur ce qu'il reste
 * une fois la réserve de sécurité mise de côté.
 *
 * Simplification assumée, à ne pas confondre avec le moteur réel : l'app
 * (DeterministicProjectionEngine) fait un vrai passage jour par jour sur la
 * fenêtre [aujourd'hui, prochaine paie), en tenant compte des charges
 * récurrentes et de leur niveau de confiance, pour trouver le creux le plus
 * bas de la période. Cette démo n'a pas cette dimension : elle divise
 * simplement un solde statique par un nombre de jours, en supposant une
 * dépense parfaitement lissée.
 */
export function computeDailyBudget(spendableAfterBuffer: number, daysUntilPayday: number): number {
  return daysUntilPayday > 0 ? spendableAfterBuffer / daysUntilPayday : spendableAfterBuffer;
}

export function formatFCFA(amount: number): string {
  const sign = amount < 0 ? "-" : "";
  const formatted = new Intl.NumberFormat("fr-FR").format(Math.abs(Math.round(amount)));
  return `${sign}${formatted} FCFA`;
}
