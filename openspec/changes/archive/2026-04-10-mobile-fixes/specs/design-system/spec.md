## MODIFIED Requirements

### Requirement: Shared Navbar component
The system SHALL provide a `Navbar` component used in `app/layout.tsx` that displays: platform logo/name on the left, primary navigation links in the center (desktop only), and auth buttons on the right. The navbar SHALL be sticky at the top. On mobile (below `sm`), desktop nav links SHALL be hidden and replaced by an animated burger menu drawer (see mobile-nav spec).

#### Scenario: Navbar visible on all pages
- **WHEN** user navigates to any page
- **THEN** the navbar is visible at the top of the viewport

#### Scenario: Logo navigates to homepage
- **WHEN** user clicks the logo in the navbar
- **THEN** system navigates to `/`

#### Scenario: Mobile shows burger instead of nav links
- **WHEN** viewport width is below 640px
- **THEN** desktop nav links are hidden and burger icon is shown

---

### Requirement: Global scrollbar styling
The system SHALL style the browser scrollbar to be subtle and thin. The vertical scrollbar width SHALL be 2px and the horizontal scrollbar height SHALL be 2px. A `.scrollbar-none` utility class SHALL be available to fully hide scrollbars on any element while preserving scroll functionality.

#### Scenario: Thin scrollbar on scroll containers
- **WHEN** a scrollable container renders
- **THEN** the scrollbar is 2px wide/tall with the border color as the thumb

#### Scenario: Hidden scrollbar utility
- **WHEN** an element has the `.scrollbar-none` class applied
- **THEN** no scrollbar is visible even if the content overflows

---

### Requirement: LeagueCard component
The system SHALL provide a reusable `LeagueCard` component that renders a league's cover image, name, city badge, and a link to the league detail page. On mobile the league grid SHALL display 2 columns so more cards are visible without scrolling.

#### Scenario: LeagueCard renders required fields
- **WHEN** LeagueCard is rendered with a league fixture
- **THEN** it displays name, city badge, and cover image

#### Scenario: Two-column grid on mobile
- **WHEN** the leagues grid renders on a viewport narrower than 640px
- **THEN** cards are arranged in 2 columns
