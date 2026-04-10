## MODIFIED Requirements

### Requirement: News list fetches from API
The news page SHALL call `fetchNews(clientId)` using the numeric client id (resolved from `site_id`). Each article SHALL show the title, `created_at` date, `client_name` as author, and cover image via `apiImg()`.

#### Scenario: News articles rendered from API
- **WHEN** user navigates to `/leagues/[slug]/news`
- **THEN** system displays articles fetched from `GET /league_news/:clientId/getAllNews`

#### Scenario: Empty news state
- **WHEN** the API returns an empty array
- **THEN** system displays "Новостей пока нет"

---

### Requirement: News article detail renders API `text` field as body
The article detail page SHALL render the `text` field from the API response as the article body. The `text` field may contain `{///href///}...{//href//}..{///href///}` markup for internal links, which SHALL be stripped or rendered as plain text for MVP.

#### Scenario: Article body rendered
- **WHEN** user navigates to an article detail page
- **THEN** system displays the article title, date, and body text
