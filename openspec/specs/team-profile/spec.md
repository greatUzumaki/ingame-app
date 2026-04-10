## ADDED Requirements

### Requirement: Team profile page
The system SHALL display a team profile page at `/leagues/[slug]/teams/[id]` backed by `GET /teams/{id}`. The page SHALL show all non-null fields: team name, logo via `apiImg()`, founding year, city, stadium name, coach name, and roster (player names with links to their profile pages). Fields that are null or absent SHALL be omitted.

#### Scenario: Team profile renders
- **WHEN** user navigates to `/leagues/[slug]/teams/[id]`
- **THEN** system displays the team name, logo (or placeholder if absent), and all non-null attributes

#### Scenario: Roster links to players
- **WHEN** a team profile lists roster members
- **THEN** each player name renders as a link to `/leagues/[slug]/players/[playerId]`

#### Scenario: Sparse team data
- **WHEN** the API returns a team with only name and logo
- **THEN** system displays only those fields without empty rows

#### Scenario: Team not found
- **WHEN** the API returns 404 for the requested team id
- **THEN** system renders a not-found page

#### Scenario: Back navigation to league
- **WHEN** user is on the team profile page
- **THEN** a back link navigates to the league at `/leagues/[slug]`
