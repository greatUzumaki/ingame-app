## 1. API layer — types and fetch functions

- [x] 1.1 Add `ApiSocial` type and type `socials` in `ApiLeagueDetail` as `ApiSocial[]` (currently `unknown[]`) — inspect real payload to confirm shape
- [x] 1.2 Add `judje_id: number | null` and `stadium_id: number | null` to `ApiMatch` (fields arrive in payload but are untyped)
- [x] 1.3 Add `ApiPlayer`, `ApiTeam`, `ApiStadium` interfaces to `api.ts`
- [x] 1.4 Add `fetchGlobalNews()` → `GET /league_news`, returns `ApiNewsArticle[]`, capped at 50 items
- [x] 1.5 Add `fetchPlayer(id: number)` → `GET /players/{id}`, returns `ApiPlayer | null`
- [x] 1.6 Add `fetchTeam(id: number)` → `GET /teams/{id}`, returns `ApiTeam | null`
- [x] 1.7 Add `fetchStadium(id: number)` → `GET /stadiums/{id}`, returns `ApiStadium | null`, wrapped in try/catch
- [x] 1.8 Add `renderNewsMarkup(text: string, slug: string): string` — parses `{///href///}label{//href//}Player-ingame-{id}{///href///}` into HTML anchor tags pointing to `/leagues/{slug}/players/{id}`; strips unknown tokens

## 2. Global news page

- [x] 2.1 Replace placeholder `/news/page.tsx` with real feed: call `fetchGlobalNews()`, render up to 50 articles with title, league name, date, and cover image
- [x] 2.2 Link each article card to `/leagues/[slug]/news/[id]` using `client_owner` to find the matching league slug via `fetchLeagues()`; fall back to a no-op if slug not resolvable

## 3. Player profile page

- [x] 3.1 Create `src/app/leagues/[slug]/players/[id]/page.tsx` — call `fetchPlayer(id)`, notFound() on null; render non-null fields: name, photo, position, birth date, nationality, number, height, weight
- [x] 3.2 Add back link to `/leagues/[slug]` and `generateMetadata` returning player name as title

## 4. Team profile page

- [x] 4.1 Create `src/app/leagues/[slug]/teams/[id]/page.tsx` — call `fetchTeam(id)`, notFound() on null; render non-null fields: name, logo, founding year, city, coach, roster with player links to `/leagues/[slug]/players/[playerId]`
- [x] 4.2 Add back link to `/leagues/[slug]` and `generateMetadata` returning team name as title

## 5. Match enrichment — stadium and referee

- [x] 5.1 Update `MatchRow` in `src/app/leagues/[slug]/page.tsx` to show `m.stadium_name` below the score row when non-null (no fetch needed — field already in payload)
- [x] 5.2 Add `judje_id` to `ApiMatch`; in `MatchRow` fetch `fetchPlayer(m.judje_id)` server-side when non-null and display referee name (wrapped in try/catch, omit on failure)

## 6. League contacts — social links

- [x] 6.1 Update `resolveLeagueId` call in contacts page to also fetch full league detail via `fetchLeague(id)` and pass `socials` to the view
- [x] 6.2 Render `socials[]` in `src/app/leagues/[slug]/contacts/page.tsx` as clickable icon/text links (VK, YouTube, Telegram, Instagram, etc.); hide section when array is empty

## 7. League news — player link markup

- [x] 7.1 Replace `stripNewsMarkup(article.text)` with `renderNewsMarkup(article.text, slug)` in the article detail page (`src/app/leagues/[slug]/news/[id]/page.tsx`)
- [x] 7.2 Render the returned HTML safely using `dangerouslySetInnerHTML` (markup is internal API data, not user input); apply link styles matching the design system
