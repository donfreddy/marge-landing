import { describe, expect, it } from "vitest";
import {
  type Commitment,
  computeRealMargin,
  computeRemainingAfterPurchase,
  computeSafetyBuffer,
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

describe("computeSafetyBuffer", () => {
  it("is 10% of a positive real margin", () => {
    expect(computeSafetyBuffer(10_000)).toBe(1_000);
    expect(computeSafetyBuffer(95_000)).toBe(9_500);
  });

  it("is zero for a zero or negative real margin", () => {
    expect(computeSafetyBuffer(0)).toBe(0);
    expect(computeSafetyBuffer(-20_000)).toBe(0);
  });
});

describe("computeVerdict", () => {
  // realMargin = 95 000 => buffer = 9 500 => marginBefore (buffer-adjusted) = 85 500.
  const REAL_MARGIN = 95_000;
  const MARGIN_BEFORE = 85_500;

  it("is safe when the purchase stays at or under 50% of the buffer-adjusted margin", () => {
    expect(computeVerdict(REAL_MARGIN - 10_000, REAL_MARGIN)).toBe("safe");
    expect(computeVerdict(REAL_MARGIN - MARGIN_BEFORE * 0.5, REAL_MARGIN)).toBe("safe");
  });

  it("is warning just above the 50% safe-share boundary", () => {
    expect(computeVerdict(REAL_MARGIN - (MARGIN_BEFORE * 0.5 + 1), REAL_MARGIN)).toBe("warning");
  });

  it("matches the simulator's default scenario: 50 000 spent out of a 95 000 margin", () => {
    expect(computeVerdict(45_000, 95_000)).toBe("warning");
  });

  it("is danger once the purchase eats into the safety buffer itself", () => {
    // remaining (5 000) - buffer (9 500) < 0, even though marginBefore was still positive.
    expect(computeVerdict(5_000, REAL_MARGIN)).toBe("danger");
  });

  it("is danger when the remaining amount is deeply negative", () => {
    expect(computeVerdict(-55_000, REAL_MARGIN)).toBe("danger");
  });

  it("is danger when the real margin itself is already negative, regardless of remaining", () => {
    expect(computeVerdict(10_000, -20_000)).toBe("danger");
  });

  it("is safe when both the real margin and the remaining amount are exactly zero", () => {
    // No purchase tested (0 out of 0): matches the real engine's policy, which
    // only turns red once marginBefore or marginAfter actually goes negative.
    expect(computeVerdict(0, 0)).toBe("safe");
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
