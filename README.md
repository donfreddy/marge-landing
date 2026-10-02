# Marge

Landing page for **Marge**, a local-first personal finance decision engine. Marge isn't a budgeting app: it answers one question before you spend, "what will actually be left before my next paycheck?"

The page centers on an interactive simulator: drag a slider for a purchase amount and get an instant safe / warning / danger verdict based on the real margin left after upcoming commitments (rent, transport, bills...).

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** (CSS-based config, no `tailwind.config.js`)
- **Framer Motion** for entrance animations and the animated margin counter
- **@radix-ui/react-slider** for the purchase-amount slider (accessible primitive, not a full shadcn setup)
- **Lucide** for icons
- **Vitest** for unit tests

Package manager: **pnpm** only (single lockfile, see `pnpm-lock.yaml`).

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev      # start the dev server (Turbopack)
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # eslint
pnpm test     # run the unit test suite (vitest run)
```

## Project structure

```
app/                      # App Router: layout, page, global styles
components/landing/       # Page sections (Hero, Problem, Simulator, Benefits, FinalCta, Footer, Header)
lib/simulator.ts          # Pure calculation logic for the margin simulator (unit tested)
lib/simulator.test.ts     # Vitest coverage: thresholds, boundaries, FCFA formatting
```

The simulator's math lives in `lib/simulator.ts`, decoupled from the UI, so the safe/warning/danger thresholds can be changed and tested without touching any component.
