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
