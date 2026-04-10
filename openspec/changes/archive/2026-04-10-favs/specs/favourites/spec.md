## ADDED Requirements

### Requirement: Favourite leagues persisted in localStorage
The system SHALL maintain a list of favourite league slugs in `localStorage` under the key `ingame_favourites`. A `FavouritesContext` SHALL expose this list and provide `toggle(slug)` and `isFavourite(slug)` helpers to all client components.

#### Scenario: Favourites survive page refresh
- **WHEN** user marks a league as favourite and refreshes the page
- **THEN** the league is still shown as a favourite

#### Scenario: Toggle adds unfavourited league
- **WHEN** user taps the heart button on a league that is not a favourite
- **THEN** the league is added to favourites and the heart icon becomes filled

#### Scenario: Toggle removes favourited league
- **WHEN** user taps the heart button on a league that is already a favourite
- **THEN** the league is removed from favourites and the heart icon becomes outlined

---

### Requirement: Favourite button on LeagueCard
Every `LeagueCard` SHALL display a heart icon button overlaid on the cover image. The button SHALL toggle the league's favourite state without navigating to the league page.

#### Scenario: Heart icon reflects favourite state
- **WHEN** a league card renders for a favourited league
- **THEN** the heart icon is filled (solid)

#### Scenario: Heart icon reflects non-favourite state
- **WHEN** a league card renders for a non-favourited league
- **THEN** the heart icon is outlined (empty)

#### Scenario: Tapping heart does not navigate
- **WHEN** user taps the heart button on a league card
- **THEN** the favourite state toggles and the page does NOT navigate to the league detail
