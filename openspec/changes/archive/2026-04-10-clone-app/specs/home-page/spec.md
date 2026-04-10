## ADDED Requirements

### Requirement: Hero section displayed on homepage
The homepage SHALL display a full-width hero section with a background image/gradient, platform name, tagline, and a prominent call-to-action button ("Найти лигу" / Find a League).

#### Scenario: Hero renders on homepage
- **WHEN** user navigates to `/`
- **THEN** system displays the hero section with headline, tagline, and CTA button

#### Scenario: CTA scrolls to league grid
- **WHEN** user clicks the "Найти лигу" CTA in the hero
- **THEN** page smoothly scrolls to the league listings section

---

### Requirement: League grid displayed on homepage
The homepage SHALL display a grid of league cards below the hero section. Each card SHALL show: league name, city, sport type, logo/cover image, and a "Подробнее" (More details) link.

#### Scenario: League cards rendered
- **WHEN** user navigates to `/`
- **THEN** system displays at least one league card with name, city badge, and cover image

#### Scenario: League card navigates to league detail
- **WHEN** user clicks a league card
- **THEN** system navigates to `/leagues/[slug]`

---

### Requirement: "Connect your league" section on homepage
The homepage SHALL include a section inviting league organizers to connect their league, with a button linking to `/connect`.

#### Scenario: CTA section visible
- **WHEN** user scrolls to the bottom of the league grid
- **THEN** system displays the "Подключить свою лигу" section with a button

#### Scenario: CTA navigates to connect page
- **WHEN** user clicks the connect button
- **THEN** system navigates to `/connect`
