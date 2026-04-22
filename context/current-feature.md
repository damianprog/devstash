# Stats & Sidebar

## Status

<!-- One of: Not Started | In Progress | Completed -->

Completed

## Overview

Show the stats in the main area from the data in the database instead of the @src/lib/mock-data.ts file.

Show the system item types in the sidebar and the actual collection data from the database.

## Requirements

- Display stats pertaining to database data, keeping the current design/layout
- Display item types in sidebar with their icons, linking to /items/[typename]
- Add "View all collections" link under the collections list that goes to /collections
- Keep the star icons for favorite collections but for recents, each collection should show a colored circle based on the most-used item type in that collection
- Create @src/lib/db/items.ts and add the database functions. Use the collections file for reference if needed

## References

- Spec: `@context/features/stats-sidebar-spec.md`.
- Reference: `@src/lib/db/collections.ts`.

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
- 2026-04-22 — Started Dashboard Items (spec loaded into current-feature).
- 2026-04-22 — Completed Dashboard Items.
- 2026-04-22 — Started Stats & Sidebar (spec loaded into current-feature).
- 2026-04-22 — Completed Stats & Sidebar.
