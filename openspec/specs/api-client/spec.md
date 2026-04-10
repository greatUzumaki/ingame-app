## ADDED Requirements

### Requirement: API base URL is configurable via environment variable
The system SHALL read the API base URL from `NEXT_PUBLIC_API_URL` (or a server-side constant) and use it for all API calls. A default SHALL be provided pointing to `https://37.46.130.153:3001`.

#### Scenario: API base URL used in all fetch calls
- **WHEN** any API function is called
- **THEN** requests are sent to `https://37.46.130.153:3001` (or overridden value)

---

### Requirement: Image URLs are constructed by prepending the API base URL
The system SHALL provide a helper `apiImg(path)` that prepends the API base URL to relative image paths returned by the API (e.g., `/images/championships/akids.png` → `https://37.46.130.153:3001/images/championships/akids.png`).

#### Scenario: Relative image path becomes absolute URL
- **WHEN** `apiImg("/images/championships/akids.png")` is called
- **THEN** it returns `https://37.46.130.153:3001/images/championships/akids.png`

#### Scenario: Already-absolute URL is returned unchanged
- **WHEN** `apiImg("https://example.com/logo.png")` is called
- **THEN** it returns the input unchanged

---

### Requirement: fetchLeagues returns typed league list
The system SHALL provide `fetchLeagues(): Promise<ApiLeague[]>` that calls `GET /clients/` and returns the full array. Leagues with `site_id: null` SHALL be filtered out.

#### Scenario: Returns array of leagues
- **WHEN** `fetchLeagues()` is called
- **THEN** it returns an array of objects with `id`, `name`, `image`, `city_name`, `site_id`

#### Scenario: Null site_id leagues are excluded
- **WHEN** the API returns a league with `site_id: null`
- **THEN** that league is not included in the returned array

---

### Requirement: fetchLeague returns typed league detail
The system SHALL provide `fetchLeague(id: number): Promise<ApiLeagueDetail | null>` that calls `GET /clients/:id`. Returns `null` on error.

#### Scenario: Returns full league detail on success
- **WHEN** `fetchLeague(207)` is called
- **THEN** it returns an object containing `id`, `name`, `image`, `site_id`, `leagues`, `matches`, `league_table`, `active_leagues`, `partners`

#### Scenario: Returns null for unknown id
- **WHEN** `fetchLeague(99999)` is called and the API returns a non-200 response
- **THEN** the function returns `null`

---

### Requirement: fetchNews returns typed news array
The system SHALL provide `fetchNews(clientId: number): Promise<ApiNewsArticle[]>` that calls `GET /league_news/:clientId/getAllNews`.

#### Scenario: Returns news articles for a client
- **WHEN** `fetchNews(32)` is called
- **THEN** it returns an array of objects with `id`, `image`, `title`, `text`, `created_at`, `client_name`, `league_name`

---

### Requirement: fetchPartners returns typed partners array
The system SHALL provide `fetchPartners(clientId: number): Promise<ApiPartner[]>` that calls `GET /championships/:clientId/partners`.

#### Scenario: Returns partners for a client
- **WHEN** `fetchPartners(32)` is called
- **THEN** it returns an array of objects with `id`, `name`, `description`, `image`, `href`
