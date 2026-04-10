## Context

The backend API lives at `https://37.46.130.153:3001` and uses a self-signed TLS certificate (IP SAN only — no hostname). Next.js server-side `fetch` runs in Node.js and will reject the certificate by default. All pages that currently use static `src/data/*.ts` arrays need to switch to async API calls.

API data shapes confirmed by probing:
- `GET /clients/` → `[{id, name, image, city_name, site_id}]`
- `GET /clients/:id` → `{id, name, image, site_id, info, leagues, matches, league_table, active_leagues, partners, socials, seasons}`
- `GET /league_news/:clientId/getAllNews` → `[{id, image, title, text, created_at, client_name, league_name}]`
- `GET /championships/:id/partners` → `[{id, name, description, image, href}]`
- All image paths are relative (e.g., `/images/championships/akids.png`) — must prepend base URL

The app routes leagues by `slug` which maps to `site_id` in the API. The id needed for news/partners calls is the numeric `id` of the client (championship), not the sub-league id.

## Goals / Non-Goals

**Goals:**
- Replace all static fixture data with real API data
- Handle self-signed TLS certificate transparently
- Map API field names to existing component prop shapes with minimal component changes
- Add API image host to Next.js image config

**Non-Goals:**
- API authentication (endpoints are public)
- Client-side SWR/React Query (server components fetch on request)
- Tournaments tab wiring (API shape for tournaments needs further investigation — keep static for now)
- Contacts tab (no API endpoint found — keep static for now)
- Error boundaries or retry logic beyond Next.js defaults

## Decisions

### 1. SSL bypass via `instrumentation.ts`

**Decision**: Create `src/instrumentation.ts` that sets `process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'` at server startup.

**Why**: This is the official Next.js hook for server startup code. It runs once before any requests. Scoped to this app's server process — not a system-wide change.

**Alternative considered**: Per-request `undici` dispatcher with `rejectUnauthorized: false` — more surgical but requires importing `undici` explicitly and wrapping every fetch call. The `instrumentation.ts` approach is simpler and just as safe for an internal API.

---

### 2. API client as a module (`src/lib/api.ts`)

**Decision**: Export typed async functions (`fetchLeagues()`, `fetchLeague(id)`, `fetchNews(clientId)`, `fetchPartners(id)`) with a shared `API_BASE` constant and `apiImg(path)` helper for image URL construction.

**Why**: Centralizes the base URL and keeps page components clean. Type definitions derived from actual API responses.

---

### 3. Slug ↔ id resolution strategy

**Decision**: On the league detail layout, call `fetchLeagues()` (full list) and find the entry where `site_id === slug`. Use that entry's `id` for the detail call.

**Why**: There is no `GET /clients/by-site-id/:site_id` endpoint. Fetching the full list (~150 items, small JSON) then filtering client-side is simple and fast. Next.js fetch caching means the list is only fetched once per revalidation window.

**Alternative**: Switch routing from `site_id` to numeric `id` (e.g., `/leagues/207`) — avoids the resolution step but breaks URLs and requires updating all `LeagueCard` links.

---

### 4. Caching strategy

**Decision**: Use `fetch(..., { next: { revalidate: 60 } })` — 60-second ISR revalidation on all API calls.

**Why**: League data doesn't change second-to-second. 60s gives a good balance between freshness and server load without requiring manual cache invalidation.

---

### 5. Minimal component changes

**Decision**: Keep component props identical; only change what data is passed from page/layout to components. Image URLs become absolute (`https://...`) rather than relative — components don't need to change since `next/image` `src` accepts both.

## Risks / Trade-offs

- **Self-signed cert in production** → Setting `NODE_TLS_REJECT_UNAUTHORIZED=0` disables cert validation globally; acceptable for internal API, but note it as a known risk.
- **Slug resolution fetches full list** → If the list grows to thousands of leagues, consider adding a `/clients/by-site-id/:id` endpoint. Current size (~150 items) is fine.
- **Tournaments and Contacts** → Still backed by static/empty data. Not broken — just not live yet.
- **`site_id` can be null** → Some leagues have `site_id: null`. Filter these out of the listing to avoid broken routes.

## Migration Plan

1. Add `instrumentation.ts` (SSL)
2. Add `src/lib/api.ts` (client + types)
3. Update `next.config.ts` (image host)
4. Update pages one by one (leagues list → league detail → news → partners)
5. Run build to verify types
