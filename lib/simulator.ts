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
 * Seuils exprimés en ratio du remaining par rapport à la marge réelle de départ,
 * pour rester cohérent quel que soit le revenu de l'utilisateur.
 */
export function computeVerdict(remaining: number, realMargin: number): Verdict {
  if (realMargin <= 0) return "danger";

  const ratio = remaining / realMargin;

  if (remaining < 0 || ratio < 0.15) return "danger";
  if (ratio < 0.5) return "warning";
  return "safe";
}

export function formatFCFA(amount: number): string {
  const sign = amount < 0 ? "-" : "";
  const formatted = new Intl.NumberFormat("fr-FR").format(Math.abs(Math.round(amount)));
  return `${sign}${formatted} FCFA`;
}
