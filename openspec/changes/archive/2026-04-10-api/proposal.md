## Why

The app currently runs entirely on static mock fixtures (`src/data/*.ts`). A real backend API exists at `https://37.46.130.153:3001` and should replace all mock data so the platform displays live leagues, news, and partner information.

## What Changes

- Create a shared API client (`src/lib/api.ts`) with typed fetch helpers and base URL config
- Add SSL bypass via `instrumentation.ts` (the server uses a self-signed certificate)
- Configure image hostname in `next.config.ts` so `next/image` loads images from the API server
- Replace static league fixtures with live data from `GET /clients/`
- Replace static league-detail data with live data from `GET /clients/:id`
- Replace static news fixtures with live data from `GET /league_news/:clientId/getAllNews`
- Replace static partner fixtures with live data from `GET /championships/:id/partners`

## Capabilities

### New Capabilities
- `api-client`: Shared typed fetch client — base URL, SSL handling, typed response shapes for all four endpoints

### Modified Capabilities
- `home-page`: League grid now fetches from `GET /clients/` instead of static array; image URLs prepend API base URL
- `league-detail`: Layout fetches from `GET /clients/:id` using `site_id` to resolve slug → id; standings and matches come from API `league_table` and `matches` fields
- `league-news`: Fetches from `GET /league_news/:clientId/getAllNews`; field names differ from mock (`text` vs `body`, `created_at` vs `date`, `client_name` vs `author`)
- `league-partners`: Fetches from `GET /championships/:id/partners`; field `href` maps to website, `image` needs base URL

## Impact

- **`src/lib/api.ts`** — new file
- **`instrumentation.ts`** — new file (SSL bypass, server-side only)
- **`next.config.ts`** — add `37.46.130.153` to `images.remotePatterns`
- **`src/app/leagues/page.tsx`** — switch to async Server Component fetching `/clients/`
- **`src/app/leagues/[slug]/layout.tsx`** — fetch `/clients/` to resolve site_id, then `/clients/:id`
- **`src/app/leagues/[slug]/news/page.tsx`** — fetch `/league_news/:id/getAllNews`
- **`src/app/leagues/[slug]/partners/page.tsx`** — fetch `/championships/:id/partners`
- **`src/data/*.ts`** — kept as TypeScript type definitions only (data arrays removed)
- **`src/components/LeagueCard.tsx`, `NewsCard.tsx`, `PartnerCard.tsx`** — image props now absolute URLs
- **Dependencies**: no new npm packages required
