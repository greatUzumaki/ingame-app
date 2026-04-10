## 1. Design System & Foundation

- [x] 1.1 Add Jost font via `next/font/google` in `app/layout.tsx` and set `--font-jost` CSS variable on `<html>`
- [x] 1.2 Define brand color tokens in `globals.css`: `--color-brand-dark` (#25153E), `--color-brand-blue` (#1F3E76), `--color-brand-accent` (#FD3647), plus surface, text-primary, text-muted tokens
- [x] 1.3 Update `app/layout.tsx` to apply dark background, Jost font, and CSS variable classes
- [x] 1.4 Create `src/components/ui/Button.tsx` with `primary`, `secondary`, and `ghost` variants and hover/active states
- [x] 1.5 Create `src/components/Navbar.tsx` — sticky, logo left, nav links center, auth buttons right
- [x] 1.6 Create `src/components/Footer.tsx` — platform name, copyright, VK social link
- [x] 1.7 Update root layout to include `<Navbar>` and `<Footer>` wrapping all pages

## 2. Mock Data Fixtures

- [x] 2.1 Create `src/data/leagues.ts` — array of 6+ league fixtures with: id, slug, name, city, sport, description, coverImage, logoImage, color
- [x] 2.2 Create `src/data/tournaments.ts` — array of tournaments per league with: id, leagueSlug, name, season, status, standings (teams with W/D/L/GF/GA/pts), matches (date, home, away, score, status)
- [x] 2.3 Create `src/data/news.ts` — array of news articles per league with: id, leagueSlug, title, excerpt, body, coverImage, date, author
- [x] 2.4 Create `src/data/partners.ts` — array of partners per league with: id, leagueSlug, name, logo, website
- [x] 2.5 Create `src/data/contacts.ts` — contacts per league with: leagueSlug, phone, email, address, social (vk, telegram, instagram)
- [x] 2.6 Create `src/data/users.ts` — mock user store array for auth (email, password hash stub, name)

## 3. Homepage

- [x] 3.1 Replace `app/page.tsx` with full homepage layout
- [x] 3.2 Build hero section — full-width gradient banner, headline "InGame Sports", tagline, "Найти лигу" CTA that scrolls to league grid
- [x] 3.3 Create `src/components/LeagueCard.tsx` — cover image, name, city badge, sport type label, link to `/leagues/[slug]`
- [x] 3.4 Build league grid section using `LeagueCard` with data from `leagues.ts` fixture
- [x] 3.5 Create `src/components/SearchBar.tsx` — controlled input with search icon, used on homepage and leagues page
- [x] 3.6 Wire search bar to filter league grid in real time (name + city matching, empty state "Лиги не найдены")
- [x] 3.7 Build "Connect your league" CTA section below the grid with button linking to `/connect`
- [x] 3.8 Create `app/connect/page.tsx` — simple page with form (name, city, contact email) and submit placeholder

## 4. Auth Pages

- [x] 4.1 Create `src/context/AuthContext.tsx` — React context with `user`, `login()`, `logout()`, `register()` backed by localStorage
- [x] 4.2 Add `AuthProvider` to `app/layout.tsx` wrapping children
- [x] 4.3 Create `app/auth/login/page.tsx` — email + password form, error display, link to register, redirect to `/` on success
- [x] 4.4 Create `app/auth/register/page.tsx` — name, email, password, confirm password form, validation errors, redirect on success
- [x] 4.5 Update `Navbar.tsx` to read from `AuthContext` and conditionally render auth buttons vs. user name + logout

## 5. Leagues Listing Page

- [x] 5.1 Create `app/leagues/page.tsx` — heading, city dropdown filter, search bar, league grid
- [x] 5.2 Build city dropdown populated from unique cities in `leagues.ts` fixture (including "Все города" option)
- [x] 5.3 Combine city dropdown + search bar filters (both apply simultaneously)

## 6. League Detail Layout & Home Tab

- [x] 6.1 Create `app/leagues/[slug]/layout.tsx` — fetch league by slug, render cover banner + logo + name + city, then `TabNav` + `{children}`
- [x] 6.2 Create `src/components/TabNav.tsx` — renders 5 tabs (Главная, Турниры, Новости, Партнеры, Контакты) with active state from current pathname
- [x] 6.3 Create `app/leagues/[slug]/page.tsx` — "Главная" tab: about/description section, upcoming match highlight, 3 latest news previews
- [x] 6.4 Add not-found handling in league layout: if slug not found in fixtures, render a "Лига не найдена" message using Next.js `notFound()`

## 7. League Tournaments Tab

- [x] 7.1 Create `app/leagues/[slug]/tournaments/page.tsx` — list all tournaments for the league from `tournaments.ts`
- [x] 7.2 Create `src/components/TournamentCard.tsx` — name, season, status badge
- [x] 7.3 Create `app/leagues/[slug]/tournaments/[tournamentId]/page.tsx` — tournament detail with standings table and match schedule
- [x] 7.4 Create `src/components/StandingsTable.tsx` — table with columns: #, Team, И, В, Н, П, ГЗ, ГП, РМ, О; highlight leader row
- [x] 7.5 Create `src/components/MatchList.tsx` — match rows with date, home team, score/"vs", away team, status badge

## 8. League News Tab

- [x] 8.1 Create `app/leagues/[slug]/news/page.tsx` — grid of news cards from `news.ts`
- [x] 8.2 Create `src/components/NewsCard.tsx` — cover image, title, date, excerpt
- [x] 8.3 Create `app/leagues/[slug]/news/[id]/page.tsx` — full article: cover image, title, date, author, body text rendered as HTML

## 9. League Partners Tab

- [x] 9.1 Create `app/leagues/[slug]/partners/page.tsx` — partner grid from `partners.ts`
- [x] 9.2 Create `src/components/PartnerCard.tsx` — logo, name, optional external link (opens in new tab)

## 10. League Contacts Tab

- [x] 10.1 Create `app/leagues/[slug]/contacts/page.tsx` — contact info from `contacts.ts`: phone (tel: link), email (mailto: link), address, social icons
- [x] 10.2 Create `src/components/SocialLinks.tsx` — icon links for VK, Telegram, Instagram

## 11. Polish & QA

- [x] 11.1 Verify responsive layout at mobile (375px), tablet (768px), and desktop (1280px) breakpoints for all pages
- [x] 11.2 Add loading skeleton or spinner for client-side filtered lists
- [x] 11.3 Ensure all internal links work and no broken routes exist
- [x] 11.4 Add `<title>` metadata to key pages (homepage, league detail, auth pages)
- [x] 11.5 Run `npm run build` and fix any TypeScript or lint errors
