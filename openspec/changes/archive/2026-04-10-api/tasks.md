## 1. Foundation

- [x] 1.1 Create `src/instrumentation.ts` — set `process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'` to bypass self-signed certificate on the API server
- [x] 1.2 Create `src/lib/api.ts` — `API_BASE` constant, `apiImg()` helper, typed interfaces (`ApiLeague`, `ApiLeagueDetail`, `ApiNewsArticle`, `ApiPartner`), and fetch functions (`fetchLeagues`, `fetchLeague`, `fetchNews`, `fetchPartners`) with 60s revalidation
- [x] 1.3 Update `next.config.ts` — add `37.46.130.153` to `images.remotePatterns` (port 3001, https protocol)

## 2. Leagues Listing Page

- [x] 2.1 Convert `src/app/leagues/page.tsx` to an async Server Component — call `fetchLeagues()`, filter null `site_id`, pass results to `LeagueCard`
- [x] 2.2 Convert `src/app/page.tsx` homepage to an async Server Component — same `fetchLeagues()` call for the league grid
- [x] 2.3 Update `LeagueCard` props to accept `slug: string` (from `site_id`), `coverImage: string`, `logoImage: string`, `city: string` — map from API `ApiLeague` shape

## 3. League Detail

- [x] 3.1 Update `src/app/leagues/[slug]/layout.tsx` — call `fetchLeagues()` to find league by `site_id === slug`, then `fetchLeague(id)` for full detail; pass `clientId` (numeric id) down via a data prop or fetch again in child pages
- [x] 3.2 Update `src/app/leagues/[slug]/page.tsx` ("Главная" tab) — use `league_table` from API for the stats grid; use `matches` array for recent/upcoming match display

## 4. News

- [x] 4.1 Update `src/app/leagues/[slug]/news/page.tsx` — resolve `clientId` from slug, call `fetchNews(clientId)`, map `ApiNewsArticle` to `NewsCard` props (`title`, `apiImg(image)`, `created_at` as date, `client_name` as author, `text` as excerpt)
- [x] 4.2 Update `src/app/leagues/[slug]/news/[id]/page.tsx` — fetch news list, find article by `id`, render `text` field as body (strip `{///href///}...{///href///}` markup with a regex helper)

## 5. Partners

- [x] 5.1 Update `src/app/leagues/[slug]/partners/page.tsx` — resolve `clientId` from slug, call `fetchPartners(clientId)`, map `ApiPartner` to `PartnerCard` props (`name`, `description`, `apiImg(image)`, `href` as website)

## 6. QA

- [x] 6.1 Run `npm run build` and fix any TypeScript errors
- [ ] 6.2 Verify league listing loads real data in the browser (`npm run dev`)
- [ ] 6.3 Verify a league detail page loads with real standings and matches
- [ ] 6.4 Verify news and partners tabs load real data
