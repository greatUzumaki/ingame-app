## MODIFIED Requirements

### Requirement: Partners grid fetches from API
The partners page SHALL call `fetchPartners(clientId)` using the numeric client id. Each partner card SHALL show the name, description, logo image via `apiImg()`, and an external link via `href`.

#### Scenario: Partners rendered from API
- **WHEN** user navigates to `/leagues/[slug]/partners`
- **THEN** system displays partners fetched from `GET /championships/:id/partners`

#### Scenario: No partners state
- **WHEN** the API returns an empty array
- **THEN** system displays "Партнеры не указаны"

#### Scenario: Partner link opens external site
- **WHEN** a partner has an `href` value
- **THEN** clicking the card opens the URL in a new tab
