## 1. FavouritesContext

- [x] 1.1 Create `src/context/FavouritesContext.tsx` with `FavouritesContext`, `FavouritesProvider`, `useFavourites` hook
- [x] 1.2 Implement lazy `useState` initializer reading `ingame_favourites` from `localStorage`
- [x] 1.3 Implement `toggle(slug)` — adds if absent, removes if present; syncs to `localStorage`
- [x] 1.4 Implement `isFavourite(slug)` — returns `boolean`

## 2. FavouriteButton Component

- [x] 2.1 Create `src/components/FavouriteButton.tsx` accepting `slug: string` prop
- [x] 2.2 Render a heart icon (filled when favourite, outlined when not) using `useFavourites`
- [x] 2.3 Call `e.preventDefault(); e.stopPropagation()` on click to prevent card navigation

## 3. LeagueCard Update

- [x] 3.1 Read current `src/components/LeagueCard.tsx`
- [x] 3.2 Add `showFavBtn?: boolean` prop (default `false`)
- [x] 3.3 Overlay `<FavouriteButton slug={slug} />` on the cover image when `showFavBtn` is true (absolute-positioned, top-left corner)

## 4. Provider Setup

- [x] 4.1 Read `src/app/layout.tsx`
- [x] 4.2 Wrap app with `<FavouritesProvider>` in the root layout

## 5. Homepage Favourites Strip

- [x] 5.1 Read `src/app/page.tsx`
- [x] 5.2 Add `<FavouritesStrip leagues={leagues} />` above the `<LeaguesGrid>` — OR inline the strip logic using `useFavourites` in a client component
- [x] 5.3 Strip renders only when `favourites.length > 0`; shows "Избранное" heading + cards for matched leagues
- [x] 5.4 Pass `showFavBtn` to all `LeagueCard`s on this page

## 6. Leagues Page Favourites Strip

- [x] 6.1 Read `src/app/leagues/page.tsx`
- [x] 6.2 Add same "Избранное" strip above the filter controls and grid
- [x] 6.3 Pass `showFavBtn` to all `LeagueCard`s on this page

## 7. QA

- [ ] 7.1 Heart toggles fill/outline on click without navigating
- [ ] 7.2 Favourites persist after page refresh
- [ ] 7.3 "Избранное" strip appears on home and leagues pages when at least one league is favourited
- [ ] 7.4 "Избранное" strip is hidden when no leagues are favourited
- [x] 7.5 Run `npm run build` — no type errors or warnings
