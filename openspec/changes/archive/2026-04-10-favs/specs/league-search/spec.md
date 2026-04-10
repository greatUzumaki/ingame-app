## ADDED Requirements

### Requirement: Search bar filters leagues by name or city
The homepage and `/leagues` page SHALL include a search input that filters the visible league cards in real time as the user types. The filter SHALL match against league name and city (case-insensitive).

#### Scenario: Filter by league name
- **WHEN** user types part of a league name into the search input
- **THEN** system shows only league cards whose name contains the typed text (case-insensitive)

#### Scenario: Filter by city
- **WHEN** user types a city name into the search input
- **THEN** system shows only league cards whose city matches the typed text

#### Scenario: No results
- **WHEN** user types text that matches no league
- **THEN** system displays an empty state message "Лиги не найдены"

#### Scenario: Clear search restores all leagues
- **WHEN** user clears the search input
- **THEN** system restores the full league grid

---

### Requirement: City filter dropdown
The leagues page SHALL provide a city filter dropdown listing all unique cities from the fixtures. Selecting a city SHALL filter the league grid to that city only.

#### Scenario: City selected from dropdown
- **WHEN** user selects a city from the dropdown
- **THEN** system shows only leagues from that city

#### Scenario: All cities selected
- **WHEN** user selects "Все города" (All cities)
- **THEN** system shows all leagues regardless of city

---

### Requirement: Favourites strip on leagues page
The `/leagues` page SHALL display a "Избранное" section above the filter controls and grid when the user has at least one favourite league.

#### Scenario: Favourites strip visible on leagues page
- **WHEN** user has at least one favourite league and navigates to `/leagues`
- **THEN** a "Избранное" section appears above the search/filter row with favourited league cards

#### Scenario: Favourites strip hidden when no favourites
- **WHEN** user has no favourite leagues
- **THEN** no "Избранное" section is shown on the leagues page
