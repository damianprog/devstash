# Current Feature

## Status

<!-- One of: Not Started | In Progress | Completed -->

In Progress

## Overview

Apply low-risk fixes from the 2026-04-26 code-scanner audit. Scope is limited to changes that don't touch auth (auth is not yet implemented), don't change visible UX behavior, and don't require schema migrations. Each item is small, isolated, and independently revertible.

## Requirements

### 1. Centralize the demo user lookup

- Create `src/lib/db/demo-user.ts` exporting:
  - `DEMO_EMAIL` constant
  - `getDemoUserId()` async helper that returns the demo user's id (or throws if missing)
- Update [src/lib/db/items.ts](src/lib/db/items.ts), [src/lib/db/collections.ts](src/lib/db/collections.ts), and [src/lib/db/stats.ts](src/lib/db/stats.ts) to import from the new module instead of redeclaring the constant and lookup locally.
- No behavior change. Pure refactor so the eventual auth swap is a one-file change.

### 2. Cap the nested items fetch in `getDashboardCollections`

- In [src/lib/db/collections.ts:48-58](src/lib/db/collections.ts#L48-L58), add `take: 100` to the nested `items` query.
- The data is only used to compute the type-distribution badge per card; an approximate distribution from the first 100 items is fine for collections that grow large.

### 3. Cap recents in `getSidebarCollections` at the DB level

- In [src/lib/db/collections.ts:115-129](src/lib/db/collections.ts#L115-L129), restructure so non-favorite "recent" collections are limited via `take: recentsLimit` in the query rather than fetched in full and sliced in JS.
- Favorites still fetched without limit (current behavior).
- Final assembled list still respects the existing ordering and the `recentsLimit` default.

### 4. Replace mock data on the items-by-type page

- [src/app/(app)/items/[type]/page.tsx](src/app/(app)/items/[type]/page.tsx) currently resolves the page title and item count from `mockItemTypes`. Switch it to use `getSidebarItemTypes()` (already exists in [src/lib/db/items.ts](src/lib/db/items.ts)) and match by `type.name + "s" === params.type`.
- The displayed count then reflects real DB data.
- Keep the existing "not found" handling if the type doesn't match anything.

### 5. Use `createMany` for system item types in the seed

- In [prisma/seed.ts:333-350](prisma/seed.ts#L333-L350), replace the per-type `findFirst` + `update`/`create` loop with a single `prisma.itemType.createMany({ data: [...], skipDuplicates: true })`.
- The `@@unique([userId, name])` constraint already protects against duplicates.
- Seed-only change; no production impact.

### 6. Redirect the root route to `/dashboard`

- [src/app/page.tsx](src/app/page.tsx) currently returns a bare `<h1>Devstash</h1>`. Replace the body with `redirect("/dashboard")` from `next/navigation`.
- This is a placeholder until a marketing/landing page is built; it makes `/` usable today.

## Out of scope

- Anything auth-related (hardcoded seed password, sidebar user mock data) — auth is not yet implemented.
- Larger refactors: splitting `SidebarContent.tsx`, fixing `pluralLabel` for irregular plurals, fleshing out `CollectionCardMenu`. Track separately.

## References

- Code-scanner audit run on 2026-04-26 (this conversation)
- [src/lib/db/items.ts](src/lib/db/items.ts), [src/lib/db/collections.ts](src/lib/db/collections.ts), [src/lib/db/stats.ts](src/lib/db/stats.ts)
- [prisma/seed.ts](prisma/seed.ts)
- [src/app/page.tsx](src/app/page.tsx), [src/app/(app)/items/[type]/page.tsx](src/app/(app)/items/[type]/page.tsx)

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
- 2026-04-26 — Loaded Add Pro Badge to Sidebar spec into current-feature.
- 2026-04-26 — Completed Add Pro Badge to Sidebar.
- 2026-04-26 — Loaded Audit Quick Wins spec into current-feature.
