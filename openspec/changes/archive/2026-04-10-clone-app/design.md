## Context

The project is a bare Next.js 16 App Router scaffold with Tailwind CSS 4 and TypeScript. Nothing exists beyond the starter page. The target is a sports league management platform modeled after ingame-sports.ru — dark sports aesthetic, city/league discovery, per-league content (tournaments, news, partners, contacts), and user authentication.

Next.js 16 uses the App Router exclusively. File conventions: `app/[segment]/page.tsx`, `app/[segment]/layout.tsx`. Server Components are the default; client interactivity requires `"use client"` directive.

## Goals / Non-Goals

**Goals:**
- Full UI and routing for all platform pages (home, leagues, league detail tabs, auth)
- Visually polished dark sports design system (Jost font, dark purple/blue/red palette)
- City/league search with client-side filtering
- Mock/static data layer (JSON fixtures) so the app runs without a backend
- Auth flow with localStorage session (login state persists across refreshes)

**Non-Goals:**
- Real database or API backend (MVP uses static fixtures)
- OAuth / social login
- Admin dashboard or league owner CMS
- Real-time features (live scores, chat)
- Mobile native app

## Decisions

### 1. Static JSON Fixtures for Data

**Decision**: All league, tournament, news, and partner data comes from TypeScript fixture files in `src/data/`.

**Why**: No database setup required. Allows immediate UI development. Data shape is defined by fixtures, which serves as the contract for a future API.

**Alternative considered**: Database (Prisma + SQLite) — rejected for MVP due to added setup complexity.

---

### 2. App Router Dynamic Segments for League Pages

**Decision**: League pages use `/leagues/[slug]` with nested tab routes via a shared layout:
```
app/leagues/[slug]/layout.tsx       ← TabNav + league header
app/leagues/[slug]/page.tsx         ← "Home" tab
app/leagues/[slug]/tournaments/     ← Tournaments tab
app/leagues/[slug]/news/            ← News tab
app/leagues/[slug]/partners/        ← Partners tab
app/leagues/[slug]/contacts/        ← Contacts tab
```

**Why**: Shared layout handles the league header and tab bar once; each tab is its own page for clean URL structure and independent loading.

---

### 3. Tailwind CSS 4 with CSS Custom Properties for Theme

**Decision**: Design tokens (colors, radii, shadows) defined as CSS custom properties in `globals.css`. Tailwind utilities used for layout; token-based colors for brand consistency.

```css
:root {
  --color-brand-dark: #25153E;
  --color-brand-blue: #1F3E76;
  --color-brand-accent: #FD3647;
}
```

**Why**: Tailwind 4 supports arbitrary CSS variables natively. Centralizing tokens makes theming consistent without a separate design token library.

---

### 4. Client-Side Auth with localStorage

**Decision**: Login/register forms store a `user` JSON object in `localStorage`. A React context (`AuthContext`) reads this on mount and exposes `user`, `login()`, `logout()`.

**Why**: No backend means no server sessions. localStorage is sufficient for a mock auth layer. The AuthContext pattern makes it easy to swap for real sessions later.

**Risk**: Not secure for production. Acceptable for MVP.

---

### 5. Jost Font via next/font/google

**Decision**: Use `next/font/google` to load the Jost typeface, injected as a CSS variable `--font-jost` applied to `<html>`.

**Why**: `next/font` handles font optimization (preload, no layout shift) automatically.

---

### 6. Search as Client-Side Filter

**Decision**: League search filters the in-memory fixture array using `useMemo` on the client. No API call.

**Why**: Dataset is small (static fixtures). No debounce or network overhead needed.

## Risks / Trade-offs

- **Static data is not realistic** → Mitigation: Fixtures mirror the shape of a real API response; a future `useSWR` or `fetch` call can replace them transparently.
- **localStorage auth is insecure** → Mitigation: Clearly scoped to MVP; session context is behind an interface that can be replaced with cookie/JWT auth.
- **No real images** → Mitigation: Use placeholder images (placehold.co) until real assets are provided.
- **Tailwind 4 is new** → Mitigation: Read `node_modules/next/dist/docs/` and Tailwind 4 changelog before using features not in Tailwind 3.

## Migration Plan

1. Implement design system (globals.css tokens, layout.tsx font setup)
2. Build shared components (Navbar, Footer, LeagueCard, SearchBar, etc.)
3. Build home page
4. Build auth pages (login, register)
5. Build leagues listing page
6. Build league detail layout + tab pages
7. Add fixture data

No migration needed — greenfield build.

## Open Questions

- Should the "Подключить свою лигу" (Connect Your League) CTA open a form modal or a separate page? → Assume separate `/connect` page for MVP.
- Pagination for news/tournaments? → Assume no pagination for MVP (show all, ≤20 items).
