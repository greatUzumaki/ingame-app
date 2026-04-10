## Context

The backend API at `https://37.46.130.153:3001` exposes player, team, stadium, and global news endpoints that are unused. The app currently shows match cards with team names but no referee or stadium info, even though those IDs already arrive in the `matches[]` payload from `/clients/{id}`. The contacts page shows no social links despite `socials[]` existing in the same payload.

The app uses Next.js App Router server components with `nodeFetch` (custom https agent, `rejectUnauthorized: false`) for all API calls. ISR is via `export const revalidate = 60` on page files.

## Goals / Non-Goals

**Goals:**
- Surface player profile, team profile, global news, stadium/referee in match cards, and league socials
- Keep implementation consistent with existing patterns (server components, `nodeFetch`, `apiImg`)

**Non-Goals:**
- User-created content, comments, likes
- Real-time match updates / WebSockets
- Player/team search or filtering

## Decisions

**Player & team pages under league slug** (`/leagues/[slug]/players/[id]`, `/leagues/[slug]/teams/[id]`)
- Rationale: players and teams belong to a league context; the slug is already in the URL tree and gives us the back-navigation target. Avoids a separate top-level `/players` route that would have no breadcrumb context.

**Stadium info fetched lazily per match card only when stadium_id is present**
- Fetching all stadiums upfront would be N+1 with no benefit. Stadium data is only shown in the detail page (`/leagues/[slug]` main tab), so one fetch per rendered match is acceptable; ISR caches the result.

**Socials rendered from `/clients/{id}` payload directly — no new fetch**
- The `socials[]` array is already in `ApiLeagueDetail`. The contacts page already calls `resolveLeagueId` which calls `fetchLeagues`. We just need to pass `socials` down. No new API call needed.

**Global news page at `/news`**
- The bottom nav already has a "Новости" tab pointing to `/news`. A placeholder page exists. Replace it with a real feed from `GET /league_news`.

**News markup parsing for player links**
- News text contains `{///href///}label{//href//}Player-ingame-{id}{///href///}`. Parse these into `<a>` tags pointing to the player profile. Extend `stripNewsMarkup` to optionally resolve instead of strip.

## Risks / Trade-offs

- [Stadium fetch adds latency to match card render] → Mitigation: wrap in `try/catch`, show only name if fetch fails; stadium data is secondary.
- [Global news is 7000+ items with no pagination API] → Mitigation: limit to first 50 items client-side; add "показать ещё" if needed later.
- [Player/team pages may return sparse data for some entries] → Mitigation: show only fields that are non-null.

## Migration Plan

1. Add new types + fetch functions to `api.ts`
2. Add new pages and modify existing pages
3. Deploy — no schema migrations, no breaking changes
