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
The article detail page SHALL render the `text` field from the API response as the article body. The `text` field may contain `{///href///}label{//href//}Player-ingame-{id}{///href///}` markup for internal player links. These SHALL be parsed and rendered as `<a>` tags linking to `/leagues/[slug]/players/{id}`. Unrecognised markup tokens SHALL be stripped rather than shown raw.

#### Scenario: Article body rendered
- **WHEN** user navigates to an article detail page
- **THEN** system displays the article title, date, and body text

#### Scenario: Player link markup resolved
- **WHEN** article `text` contains `{///href///}label{//href//}Player-ingame-{id}{///href///}`
- **THEN** system renders a clickable link with `label` pointing to `/leagues/[slug]/players/{id}`

#### Scenario: Unknown markup stripped
- **WHEN** article `text` contains unrecognised `{///...///}` tokens
- **THEN** those tokens are removed and surrounding text is shown cleanly
