# Seed Data

## Status

<!-- One of: Not Started | In Progress | Completed -->

In Progress

## Goals

- Rewrite `prisma/seed.ts` to populate dev database with realistic sample data
- Seed demo user: `demo@devstash.io` / `Demo User` / password `12345678` (bcryptjs, 12 rounds), `isPro: false`, `emailVerified: now`
- Keep seeding 7 system ItemTypes (snippet, prompt, command, note, file, image, link) with `isSystem: true`
- Seed 5 collections with their items:
  - **React Patterns** — 3 TypeScript snippets (hooks, component patterns, utilities)
  - **AI Workflows** — 3 prompts (code review, doc generation, refactoring)
  - **DevOps** — 1 snippet (Docker/CI), 1 command (deploy script), 2 links (real URLs)
  - **Terminal Commands** — 4 commands (git, docker, process mgmt, package manager)
  - **Design Resources** — 4 links (CSS/Tailwind, component libs, design systems, icons — real URLs)

## Notes

- Seed script must stay idempotent — can be re-run without duplicating data.
- Spec: `@context/features/seed-spec.md`.

## History

<!-- Keep this updated. Earliest to latest -->

- 2026-04-20 — Initial Next.js and Tailwind CSS v4 setup (Create Next App scaffold, Tailwind v4 integration, project pushed to GitHub at `damianprog/devstash`).
- 2026-04-20 — Started Dashboard UI Phase 1 (spec loaded into current-feature).
- 2026-04-21 — Completed Dashboard UI Phase 1.
- 2026-04-21 — Started Dashboard UI Phase 2 (spec loaded into current-feature).
- 2026-04-21 — Completed Dashboard UI Phase 2.
- 2026-04-21 — Started Dashboard UI Phase 3 (spec loaded into current-feature).
- 2026-04-21 — Completed Dashboard UI Phase 3.
- 2026-04-21 — Started Prisma + Neon PostgreSQL Setup (spec loaded into current-feature).
- 2026-04-21 — Completed Prisma + Neon PostgreSQL Setup.
- 2026-04-21 — Started Seed Data (spec loaded into current-feature).
