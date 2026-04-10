## Context

The app has no personalisation layer. League cards are rendered server-side; the only client state is auth (in `AuthContext`). Favourites need to survive page refreshes without a backend, so `localStorage` is the right store. The pattern mirrors how `AuthContext` works: a `"use client"` context provider wraps the app, initialises from `localStorage`, and exposes read/write helpers.

## Goals / Non-Goals

**Goals:**
- Toggle any league as a favourite from its card
- Persist favourites across page refreshes via `localStorage`
- Show a "Избранное" strip at the top of `/` and `/leagues` when favourites exist
- Heart icon filled/outlined to indicate state at a glance

**Non-Goals:**
- Server-side persistence or sync between devices
- Favourites tied to a logged-in user account
- Ordering or sorting favourites manually

## Decisions

### Storage — localStorage key `ingame_favourites`
Store a JSON array of `slug` strings (the `site_id` value used in URLs). Slugs are stable identifiers — no need to store full league objects, which could go stale.

**Alternatives considered:** IndexedDB — unnecessary complexity for a string array.

### State — `FavouritesContext` with lazy initialiser
Same pattern as `AuthContext`: `useState(() => { ... localStorage ... })` to avoid the `useEffect` setState anti-pattern. Exposes `favourites: string[]`, `toggle(slug)`, `isFavourite(slug)`.

### FavouriteButton — absolute-positioned overlay on LeagueCard
A small heart button in the top-left corner of the card cover image. Uses `stopPropagation` so clicking it doesn't navigate to the league. Accepts `slug` and reads from context.

**Alternatives considered:** Button inside the card body — disrupts the clean layout; overlay is less intrusive and common in sports apps.

### Favourites strip — filtered slice of the full API response
The server fetches all leagues; the client `LeaguesGrid` or page receives the full list and the `FavouritesContext` filters it client-side. No extra API call needed.

The strip renders as a compact horizontal scroll row (same `LeagueCard` at smaller size, or just names as chips — simple card row is cleaner).

## Risks / Trade-offs

- **`localStorage` unavailable (SSR)** → Lazy initialiser only runs client-side; no SSR issue since `FavouritesContext` is `"use client"`.
- **Stale slugs** → If a league is removed from the API, its slug stays in `localStorage`. The strip simply won't find a matching league to render — silent no-op, acceptable.
- **`stopPropagation` on heart button** → Prevents the card link from activating, but also stops any parent click handlers. No parent handlers exist currently, so no issue.
