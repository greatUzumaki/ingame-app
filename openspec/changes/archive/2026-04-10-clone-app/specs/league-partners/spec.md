## ADDED Requirements

### Requirement: Partners section within a league
The system SHALL display a partners page at `/leagues/[slug]/partners` showing a grid of partner cards. Each card SHALL show: partner logo, partner name, and optionally a website link.

#### Scenario: Partners grid renders
- **WHEN** user navigates to `/leagues/[slug]/partners`
- **THEN** system displays partner cards with logo and name

#### Scenario: Partner card links to external site
- **WHEN** a partner has a website URL in fixtures
- **THEN** the card displays a clickable link that opens in a new tab

#### Scenario: No partners state
- **WHEN** a league has no partners in fixtures
- **THEN** system displays "Партнеры не указаны"
