## MODIFIED Requirements

### Requirement: League grid displayed on homepage
The homepage SHALL fetch the league list from the API (`fetchLeagues()`) as a Server Component. Each card SHALL show the league's name, city (`city_name`), and cover image (API image URL via `apiImg()`). The grid SHALL only include leagues with a non-null `site_id`.

#### Scenario: League cards rendered from API data
- **WHEN** user navigates to `/`
- **THEN** system displays league cards sourced from `GET /clients/` with real names and cities

#### Scenario: League card links use site_id as slug
- **WHEN** user clicks a league card
- **THEN** system navigates to `/leagues/[site_id]`

#### Scenario: API images load correctly
- **WHEN** a league card renders
- **THEN** the cover image loads from `https://37.46.130.153:3001/images/championships/...`

---

## ADDED Requirements

### Requirement: Favourites strip on homepage
The homepage SHALL display a "Избранное" section above the main league grid when the user has at least one favourite league. The strip SHALL show cards for all favourited leagues.

#### Scenario: Favourites strip visible when favourites exist
- **WHEN** user has at least one favourite league and navigates to `/`
- **THEN** a "Избранное" section appears above the main grid with the favourited league cards

#### Scenario: Favourites strip hidden when no favourites
- **WHEN** user has no favourite leagues
- **THEN** no "Избранное" section is displayed on the homepage
