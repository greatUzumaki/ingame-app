## MODIFIED Requirements

### Requirement: League detail page resolves slug to API id
The league detail layout SHALL resolve the URL slug (`site_id`) to a numeric `id` by fetching the full league list and matching `site_id === slug`. It SHALL then call `fetchLeague(id)` for full detail. If no matching league is found, it SHALL render a not-found page.

#### Scenario: Slug resolves to league detail
- **WHEN** user navigates to `/leagues/afl_nn`
- **THEN** system finds the league where `site_id === "afl_nn"`, fetches its detail, and renders the page

#### Scenario: Unknown slug shows not-found
- **WHEN** user navigates to `/leagues/nonexistent`
- **THEN** system renders not-found page

---

### Requirement: League home tab shows real standings from API
The "Главная" tab SHALL display the `league_table` array from the API detail response as standings data.

#### Scenario: Standings displayed from API
- **WHEN** user views the home tab of a league with `league_table` data
- **THEN** system shows team names, matches, wins, draws, losses, goals, and points from the API

---

### Requirement: League home tab shows real matches from API
The "Главная" tab SHALL display recent and upcoming matches from the `matches` array in the API detail response.

#### Scenario: Match data displayed from API
- **WHEN** user views a league home tab with match data
- **THEN** system shows home team, away team, score (if played), and date
