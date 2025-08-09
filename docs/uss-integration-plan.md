# USS Integration Plan (Ultimate Social Suite → AInSeconds Dashboard)

## Goals
- Provide full access to USS features inside our Next.js dashboard, gated by user tier.
- On login, identify the user and load all their data across USS collections.
- Eventually ensure every new user is also provisioned in USS (create/migrate user profiles safely).

## Assumptions & Constraints
- Auth uses NextAuth (MongoDB adapter). Current DB is prioritized to `MONGODB_USS_URI`/`MONGODB_USS_DB` per env.
- USS database is MongoDB (per supplied envs). Schema details may vary; we will auto-discover collections.
- User runs dev server manually. We won’t start/stop servers.

## Architecture Additions
- lib/uss/mongo.ts: Dedicated USS client/db accessor.
- lib/uss/users.ts: User discovery functions (by email, normalize IDs).
- lib/uss/collection-helpers.ts (later): Utilities for schema sampling, typed inference.
- API routes under app/api/uss/* for aggregation and feature endpoints.
- UI pages under app/dashboard/uss/*, using server components.
- Optional caching via Redis (if PROD_REDIS_* present) or in-memory LRU fallback.

## Identity & Linking Strategy
- Primary key for linking: user email from NextAuth session.
- Step 1: Find USS user by email in likely collections ("users" | "Users").
- Step 2: If absent, DO NOT auto-create until schema is confirmed; add a guarded provisioning step later.
- Step 3: Store a transient mapping in session (`session.user.id` vs USS `_id`). Persist linkage in DB in a later phase.

## Data Loading Strategy
- List all collections in `MONGODB_USS_DB`.
- For each collection, attempt filters in order:
  1) `{ userId: ussUserId }`
  2) `{ userID: ussUserId }`
  3) `{ user_id: ussUserId }`
  4) `{ ownerId: ussUserId }`
  5) `{ email: session.user.email }`
- Limit per-collection documents (e.g., 10 for preview), and return counts + samples.
- Return a summary object to power the USS dashboard overview.

## Tier Gating
- lib/tier.ts mapping: free | pro | enterprise → feature flags.
- UI shows locked features with upgrade CTA. Middleware can block deep routes for unauthorized tiers.

## Security & Perf
- All USS API routes require NextAuth session.
- Redact sensitive fields in responses.
- Add optional Redis caching when PROD_REDIS_* provided, with conservative TTLs.

## Phased Roadmap
1) Foundation (this PR)
   - USS client, user discovery, user-summary API, dashboard overview page, nav entry.
2) Feature Mirrors
   - Posts/Scheduler, Analytics, Settings, Personas, Notifications.
   - Build per-feature repository + API + UI module; adopt shadcn where helpful.
3) Provisioning
   - Safe user provisioning in USS on first login (confirm schema, required fields).
4) Caching
   - Add Redis/ioredis with environment guards and TTLs.
5) Tiering
   - Enforce features per tier in middleware and UI.

## Open Questions / Validation Steps
- Confirm actual USS collection names and schemas (auto-discovery in UI will help).
- Confirm if NextAuth collections can co-exist with USS’s own `users` schema or move NextAuth to a separate DB.
- Confirm desired tier definitions and feature mapping.

## Success Criteria
- After login, `/dashboard/uss` shows the resolved USS user and aggregated data previews from their collections.
- Nav exposes USS Hub; main dashboard shows a quick-access card.
- No server starts/stops from tooling; dev flow remains manual.
