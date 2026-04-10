## Why

The API backend exposes several endpoints (`/players/{id}`, `/teams/{id}`, `/stadiums/{id}`, `/league_news`) that are not yet surfaced in the UI, plus existing match data already contains `stadium_id`, `judje_id`, and `socials` fields that go unused. Displaying this data gives users richer context — who played where, who refereed, team profiles, player cards, and social links for each league.

## What Changes

- Add global news page (`/news`) backed by `GET /league_news` — all-leagues feed
- Add player profile pages (`/leagues/[slug]/players/[id]`) backed by `GET /players/{id}`
- Add team profile pages (`/leagues/[slug]/teams/[id]`) backed by `GET /teams/{id}`
- Show stadium name + link in match cards (data already present via `stadium_id`)
- Show referee name in match cards (data already present via `judje_id`)
- Show league social links (VK, YouTube, etc.) on the league contacts page (data already in `/clients/{id}` `socials` field)
- Fetch stadium detail for match cards (`GET /stadiums/{id}`)

## Capabilities

### New Capabilities
- `global-news`: Global news feed page at `/news` aggregating articles from all leagues
- `player-profile`: Player detail page showing personal info, position, stats, career, teams
- `team-profile`: Team detail page showing stats, roster, recent form, upcoming match
- `match-enrichment`: Stadium and referee info displayed inside match cards

### Modified Capabilities
- `league-contacts`: Add social media links (VK, YouTube, Telegram, etc.) pulled from `socials` field
- `league-news`: News articles reference players via `Player-ingame-{id}` markup — render as links to player profile

## Impact

- `src/lib/api.ts`: new fetch functions — `fetchGlobalNews`, `fetchPlayer`, `fetchTeam`, `fetchStadium`
- New pages: `src/app/news/page.tsx`, `src/app/leagues/[slug]/teams/[id]/page.tsx`, `src/app/leagues/[slug]/players/[id]/page.tsx`
- Modified pages: `src/app/leagues/[slug]/contacts/page.tsx` (add socials), match card components (add stadium/referee)
- `src/lib/api.ts`: add `ApiPlayer`, `ApiTeam`, `ApiStadium` types
