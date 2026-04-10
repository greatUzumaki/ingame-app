## ADDED Requirements

### Requirement: Player profile page
The system SHALL display a player profile page at `/leagues/[slug]/players/[id]` backed by `GET /players/{id}`. The page SHALL show all non-null fields: full name, photo via `apiImg()`, position, date of birth (formatted DD.MM.YYYY), nationality, number, height, weight, and career/teams history. Fields that are null or absent SHALL be omitted rather than shown as empty.

#### Scenario: Player profile renders
- **WHEN** user navigates to `/leagues/[slug]/players/[id]`
- **THEN** system displays the player's name, photo (or avatar placeholder if absent), and all non-null attributes

#### Scenario: Sparse player data
- **WHEN** the API returns a player with only name and position set
- **THEN** system displays only those fields; no empty rows or placeholders for missing fields

#### Scenario: Player not found
- **WHEN** the API returns 404 for the requested player id
- **THEN** system renders a not-found page

#### Scenario: Back navigation to league
- **WHEN** user is on the player profile page
- **THEN** a back link navigates to the league at `/leagues/[slug]`
