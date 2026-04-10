## Why

The app currently has no functionality — just a bare Next.js scaffold. The goal is to build a sports league management platform inspired by ingame-sports.ru: a place where users can discover amateur football leagues, view tournament standings, read news, and connect with league partners. The platform needs to be visually compelling with a dark sports aesthetic and support city/league-based discovery.

## What Changes

- Replace starter page with a full homepage featuring a hero section, league grid, and city/league search
- Add user registration and login (email/password with session management)
- Add league listing with filtering by city and sport type
- Add dynamic league detail pages with tabbed navigation (Home, Tournaments, News, Partners, Contacts)
- Add tournament listings with standings tables and match schedules within each league
- Add news articles section within each league
- Add partners section within each league
- Add contacts page within each league
- Establish design system: dark purple/blue color palette (#25153E, #1F3E76, #FD3647), Jost font, card-based layout

## Capabilities

### New Capabilities
- `home-page`: Hero section, league grid with cards, city/league search bar, CTA to connect a league
- `user-auth`: Email/password registration and login, session persistence, protected routes
- `league-search`: Filter and search leagues by city or league name, real-time filtering
- `league-detail`: Dynamic league page with header, cover image, and tabbed navigation
- `tournaments`: Tournament list and detail within a league — group standings, match schedule, top scorers
- `league-news`: News articles list and article detail within a league
- `league-partners`: Partner logos and links section within a league
- `league-contacts`: Contact information page within a league
- `design-system`: Global color tokens, typography (Jost), shared UI components (Button, Card, Badge, NavBar, Footer)

### Modified Capabilities

_(none — greenfield build)_

## Impact

- **`src/app/page.tsx`**: Replaced with full homepage
- **`src/app/layout.tsx`**: Updated with Jost font, design system CSS variables
- **`src/app/globals.css`**: Extended with design system tokens
- **New routes**: `/auth/login`, `/auth/register`, `/leagues`, `/leagues/[slug]`, `/leagues/[slug]/tournaments`, `/leagues/[slug]/news`, `/leagues/[slug]/partners`, `/leagues/[slug]/contacts`
- **New components**: `Navbar`, `Footer`, `LeagueCard`, `SearchBar`, `TournamentTable`, `NewsCard`, `PartnerGrid`, `TabNav`
- **Data**: Static/mock data initially (JSON fixtures), no external database required for MVP
- **Dependencies to add**: `next/font` (Jost), no additional packages required for MVP
