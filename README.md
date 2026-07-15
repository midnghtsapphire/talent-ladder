# Talent Ladder


<!-- AUTO-PACKAGE-BADGES:START -->

<!-- AUTO-PACKAGE-BADGES:END -->
Talent Ladder is a career mobility web app that helps workers move into semiconductor and advanced manufacturing roles by combining:
- guided skills assessments,
- localized opportunity discovery,
- grant application workflows,
- and a personal dashboard for saved jobs and application tracking.

## Website in Test (Vercel)
- Target URL: `https://talent-ladder.vercel.app`
- Deployment automation: Vercel Git integration (push/merge to the connected branch triggers build + deploy).

## What this repository does
This repository contains the full frontend application and Supabase-backed data model for:
- account onboarding/auth,
- user assessments,
- job and grant application tracking,
- saved opportunities,
- and worker dashboard reporting.

## How it can be used now
1. Clone and install dependencies.
2. Configure Supabase environment variables.
3. Run locally for UX testing or deploy to Vercel for end-to-end validation.

```sh
npm install
npm run dev
```

## Scripts
- `npm run dev` - local development server
- `npm run lint` - lint checks
- `npm run test` - unit tests
- `npm run build` - production build
- `npm run test:baseline` - baseline standards test script
- `npm run build:baseline` - baseline standards build script

## S2M project analysis
- **Value:** reduces friction between displaced/transitioning workers and high-demand semiconductor jobs.
- **Goal priority:** accelerate worker placement and grant conversion in one shipping iteration.
- **3-year commercial framing:** target a cumulative $10M outcome via workforce partner contracts, placement fees, and sponsored training cohorts.

## Tech stack
- React + TypeScript + Vite
- Tailwind + shadcn/ui
- Supabase (auth + data)
- Vitest + Testing Library

## Related standards docs
- [CHANGELOG.md](./CHANGELOG.md)
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- [GO_TO_MARKET.md](./GO_TO_MARKET.md)
- [BRAND_GUIDELINES.md](./BRAND_GUIDELINES.md)
- [SECURITY.md](./SECURITY.md)
- [ASSETS_INVENTORY.md](./ASSETS_INVENTORY.md)
- [ARTIFACTS.md](./ARTIFACTS.md)
