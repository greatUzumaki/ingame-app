## Why

Users browse many leagues but have no way to quickly return to the ones they care about. Adding favourites (saved to `localStorage`) lets users bookmark leagues and see them highlighted across the app without requiring a login.

## What Changes

- Heart/bookmark toggle button on every `LeagueCard` — adds or removes the league from favourites
- Favourites are persisted in `localStorage` (no backend needed)
- A "Favourites" section appears at the top of the homepage and leagues list when the user has at least one saved league
- Favourite leagues are visually distinguished (filled heart icon, subtle highlight on card)
- Favourites state is accessible via a React context so any component can read/write it

## Capabilities

### New Capabilities
- `favourites`: Persist and display a user's favourite leagues using localStorage; toggle from any league card; show a favourites strip on the home and leagues pages

### Modified Capabilities
- `home-page`: Homepage now shows a "Избранное" section above the main league grid when favourites exist
- `league-search`: Leagues list page shows the same "Избранное" section above the filter/grid

## Impact

- New: `src/context/FavouritesContext.tsx` — context + provider + localStorage persistence
- New: `src/components/FavouriteButton.tsx` — heart toggle button used inside `LeagueCard`
- Modified: `src/components/LeagueCard.tsx` — add `FavouriteButton` overlay, accept `showFavBtn` prop
- Modified: `src/app/page.tsx` — render "Избранное" strip above league grid
- Modified: `src/app/leagues/page.tsx` — same strip above filter/grid
- Modified: `src/app/layout.tsx` — wrap with `FavouritesProvider`
