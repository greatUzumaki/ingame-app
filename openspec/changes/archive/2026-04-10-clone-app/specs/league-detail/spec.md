## ADDED Requirements

### Requirement: League detail page with header
The system SHALL provide a league detail page at `/leagues/[slug]`. The page SHALL display: league cover image (full-width banner), league logo, league name, city, sport type, and a brief description.

#### Scenario: League header renders
- **WHEN** user navigates to `/leagues/[slug]` for an existing league
- **THEN** system displays the league banner, logo, name, and city

#### Scenario: Unknown league slug shows 404
- **WHEN** user navigates to `/leagues/[slug]` for a slug that does not exist in fixtures
- **THEN** system renders a "Лига не найдена" not-found page

---

### Requirement: League page has tabbed navigation
The league detail layout SHALL display a tab bar with the following tabs: Главная (Home), Турниры (Tournaments), Новости (News), Партнеры (Partners), Контакты (Contacts). The active tab SHALL be highlighted.

#### Scenario: Tab bar visible on all league sub-pages
- **WHEN** user is on any `/leagues/[slug]/*` page
- **THEN** system displays the tab bar with all 5 tabs

#### Scenario: Clicking a tab navigates to corresponding route
- **WHEN** user clicks the "Турниры" tab
- **THEN** system navigates to `/leagues/[slug]/tournaments`

#### Scenario: Active tab highlighted
- **WHEN** user is on `/leagues/[slug]/news`
- **THEN** the "Новости" tab is visually active (underline or background highlight)

---

### Requirement: League home tab shows overview
The "Главная" (Home) tab at `/leagues/[slug]` SHALL display: a welcome/about section, next match or upcoming event highlight, and a preview of the latest news (up to 3 articles).

#### Scenario: Home tab content renders
- **WHEN** user is on `/leagues/[slug]`
- **THEN** system shows about text, upcoming match highlight, and 3 latest news previews
