## ADDED Requirements

### Requirement: Global news feed page
The system SHALL display a global news feed at `/news` showing articles from all leagues, fetched from `GET /league_news`. The page SHALL display up to 50 articles sorted by `created_at` descending. Each article SHALL show: title, `client_name` as the source league, `created_at` date formatted as DD.MM.YYYY, and cover image via `apiImg()`.

#### Scenario: News feed renders
- **WHEN** user navigates to `/news`
- **THEN** system displays a list of up to 50 news articles with title, league name, date, and cover image

#### Scenario: Article links to detail
- **WHEN** user taps a news article
- **THEN** system navigates to `/leagues/[slug]/news/[id]` if a matching league slug exists, otherwise to a standalone article view

#### Scenario: Empty feed state
- **WHEN** the API returns an empty array
- **THEN** system displays "Новостей пока нет"

#### Scenario: API error fallback
- **WHEN** the API call to `GET /league_news` fails
- **THEN** system displays an empty state rather than crashing
