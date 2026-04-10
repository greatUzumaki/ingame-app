## ADDED Requirements

### Requirement: News list within a league
The system SHALL display a list of news articles at `/leagues/[slug]/news`. Each item SHALL show: cover image, title, publication date, and a brief excerpt.

#### Scenario: News list renders
- **WHEN** user navigates to `/leagues/[slug]/news`
- **THEN** system shows all news articles for that league

#### Scenario: Clicking a news card opens article
- **WHEN** user clicks a news card
- **THEN** system navigates to `/leagues/[slug]/news/[article-id]`

#### Scenario: No news state
- **WHEN** a league has no news in fixtures
- **THEN** system displays "Новостей пока нет"

---

### Requirement: News article detail page
The system SHALL provide a news article detail page at `/leagues/[slug]/news/[id]` showing: cover image, title, publication date, author, and full article body (HTML/markdown rendered).

#### Scenario: Article detail renders
- **WHEN** user navigates to a valid article URL
- **THEN** system displays full article content with cover image and metadata

#### Scenario: Unknown article ID shows 404
- **WHEN** user navigates to an article ID that does not exist
- **THEN** system renders a not-found page
