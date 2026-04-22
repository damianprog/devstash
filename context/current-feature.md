# Dashboard Collections

## Status

<!-- One of: Not Started | In Progress | Completed -->

Completed

## Overview

Replace the dummy collection data displayed in the main area of the dashboard (right side), with actual data from the database. It should look how it does now with the 6 cards of recent collections, but instead of using data from `@src/lib/mock-data.ts`, it should be from our Neon database using Prisma.

Do not add the items underneath yet. We will do that later.

## Requirements

- Create `src/lib/db/collections.ts` with data fetching functions
- Fetch collections directly in server component
- Collection card border color derived from most-used content type in that collection
- Show small icons of all types in that collection
- Keep the current design. You can also reference the screenshot
- Update collection stats display

## References

- Spec: `@context/features/dashboard-collections-spec.md`.
- Check the `@context/screenshots/dashboard-ui-main.png` screenshot if needed, but layout and design is already there.

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
- 2026-04-22 — Completed Seed Data.
- 2026-04-22 — Started Dashboard Collections (spec loaded into current-feature).
- 2026-04-22 — Completed Dashboard Collections.
