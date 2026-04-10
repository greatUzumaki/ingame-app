## ADDED Requirements

### Requirement: Tournament list within a league
The system SHALL display a list of tournaments at `/leagues/[slug]/tournaments`. Each tournament SHALL show: name, season, status (active/finished), and a link to its detail view.

#### Scenario: Tournament list renders
- **WHEN** user navigates to `/leagues/[slug]/tournaments`
- **THEN** system shows all tournaments for that league with name, season, and status badge

#### Scenario: No tournaments state
- **WHEN** a league has no tournaments in fixtures
- **THEN** system displays "Турниры не найдены"

---

### Requirement: Tournament standings table
Each tournament SHALL include a group standings table showing: position, team name, matches played (И), wins (В), draws (Н), losses (П), goals for/against (ГЗ/ГП), goal difference (РМ), and points (О).

#### Scenario: Standings table renders
- **WHEN** user views a tournament with standings data
- **THEN** system displays a table with all required columns for each team

#### Scenario: Leader highlighted
- **WHEN** standings table renders
- **THEN** the top team row is visually highlighted (e.g., gold accent)

---

### Requirement: Match schedule within tournament
Each tournament SHALL include a match schedule list showing: match date, home team, score or "vs", away team, and status (scheduled/played).

#### Scenario: Match schedule renders
- **WHEN** user views a tournament with scheduled matches
- **THEN** system displays all matches with date, teams, and result or upcoming indicator

#### Scenario: Played match shows result
- **WHEN** a match has a result in fixtures
- **THEN** system displays the final score

#### Scenario: Upcoming match shows date
- **WHEN** a match is scheduled but not played
- **THEN** system displays the date/time and "предстоит" (upcoming) indicator
