import { describe, expect, it } from "vitest";
import {
  type Commitment,
  computeRealMargin,
  computeRemainingAfterPurchase,
  computeVerdict,
  formatFCFA,
  sumCommitments,
} from "./simulator";

describe("sumCommitments", () => {
  it("sums all commitment amounts", () => {
    const commitments: Commitment[] = [
      { label: "Loyer", amount: 50_000 },
      { label: "Transport", amount: 20_000 },
    ];
    expect(sumCommitments(commitments)).toBe(70_000);
  });

  it("returns 0 for an empty list", () => {
    expect(sumCommitments([])).toBe(0);
  });
});

describe("computeRealMargin", () => {
  it("subtracts commitments from the balance", () => {
    const commitments: Commitment[] = [
      { label: "Loyer", amount: 50_000 },
      { label: "Transport", amount: 20_000 },
      { label: "Factures", amount: 15_000 },
    ];
    expect(computeRealMargin(180_000, commitments)).toBe(95_000);
  });

  it("can go negative when commitments exceed the balance", () => {
    const commitments: Commitment[] = [{ label: "Loyer", amount: 200_000 }];
    expect(computeRealMargin(180_000, commitments)).toBe(-20_000);
  });
});

describe("computeRemainingAfterPurchase", () => {
  it("subtracts the purchase from the real margin", () => {
    expect(computeRemainingAfterPurchase(95_000, 70_000)).toBe(25_000);
  });

  it("allows the remaining amount to go negative", () => {
    expect(computeRemainingAfterPurchase(95_000, 150_000)).toBe(-55_000);
  });
});

describe("computeVerdict", () => {
  it("is safe when at least half the margin remains", () => {
    expect(computeVerdict(47_500, 95_000)).toBe("safe");
  });

  it("is safe exactly at the 50% boundary", () => {
    expect(computeVerdict(47_500, 95_000)).toBe("safe");
    expect(computeVerdict(95_000 * 0.5, 95_000)).toBe("safe");
  });

  it("is warning just below the 50% boundary", () => {
    expect(computeVerdict(95_000 * 0.5 - 1, 95_000)).toBe("warning");
  });

  it("matches the brief's example: 70 000 spent out of a 95 000 margin", () => {
    expect(computeVerdict(25_000, 95_000)).toBe("warning");
  });

  it("is warning exactly at the 15% boundary", () => {
    expect(computeVerdict(95_000 * 0.15, 95_000)).toBe("warning");
  });

  it("is danger just below the 15% boundary", () => {
    expect(computeVerdict(95_000 * 0.15 - 1, 95_000)).toBe("danger");
  });

  it("is danger when the remaining amount is negative", () => {
    expect(computeVerdict(-1, 95_000)).toBe("danger");
  });

  it("is danger when the real margin itself is zero or negative, regardless of remaining", () => {
    expect(computeVerdict(0, 0)).toBe("danger");
    expect(computeVerdict(10_000, -20_000)).toBe("danger");
  });
});

describe("formatFCFA", () => {
  // Intl.NumberFormat("fr-FR") groups thousands with a narrow no-break space (U+202F), not a regular space.
  const NNBSP = " ";

  it("formats a positive amount with French grouping", () => {
    expect(formatFCFA(180_000)).toBe(`180${NNBSP}000 FCFA`);
  });

  it("formats zero", () => {
    expect(formatFCFA(0)).toBe("0 FCFA");
  });

  it("formats a negative amount with a leading minus", () => {
    expect(formatFCFA(-55_000)).toBe(`-55${NNBSP}000 FCFA`);
  });

  it("rounds to the nearest integer", () => {
    expect(formatFCFA(1_234.6)).toBe(`1${NNBSP}235 FCFA`);
  });
});
