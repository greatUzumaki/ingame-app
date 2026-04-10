## ADDED Requirements

### Requirement: Brand color tokens applied globally
The system SHALL define CSS custom properties for all brand colors in `globals.css` and apply them throughout the UI. Required tokens: `--color-brand-dark` (#25153E), `--color-brand-blue` (#1F3E76), `--color-brand-accent` (#FD3647), `--color-surface` (card/panel background), `--color-text-primary`, `--color-text-muted`.

#### Scenario: Dark background applied
- **WHEN** any page renders
- **THEN** the page background uses the dark brand color (`--color-brand-dark` or deeper)

#### Scenario: Accent color on interactive elements
- **WHEN** a button or active link renders
- **THEN** it uses the accent color (`--color-brand-accent`)

---

### Requirement: Jost font applied globally
The system SHALL load the Jost typeface via `next/font/google` and apply it as the default font family for all text content.

#### Scenario: Jost font loaded
- **WHEN** any page renders
- **THEN** body text uses the Jost font family (verified via computed styles)

---

### Requirement: Shared Navbar component
The system SHALL provide a `Navbar` component used in `app/layout.tsx` that displays: platform logo/name on the left, primary navigation links (Лиги, О платформе) in the center, and auth buttons (Вход / Регистрация or user name + logout) on the right. The navbar SHALL be sticky at the top.

#### Scenario: Navbar visible on all pages
- **WHEN** user navigates to any page
- **THEN** the navbar is visible at the top of the viewport

#### Scenario: Logo navigates to homepage
- **WHEN** user clicks the logo in the navbar
- **THEN** system navigates to `/`

---

### Requirement: Shared Footer component
The system SHALL provide a `Footer` component with: platform name, copyright year, and social media links (VK icon). It SHALL be displayed at the bottom of every page.

#### Scenario: Footer renders on all pages
- **WHEN** any page renders
- **THEN** footer is visible at the bottom with copyright and social links

---

### Requirement: LeagueCard component
The system SHALL provide a reusable `LeagueCard` component that renders a league's cover image, name, city badge, sport type, and a link to the league detail page.

#### Scenario: LeagueCard renders required fields
- **WHEN** LeagueCard is rendered with a league fixture
- **THEN** it displays name, city badge, and cover image

---

### Requirement: Button component variants
The system SHALL provide a `Button` component with variants: `primary` (accent red fill), `secondary` (outlined), and `ghost` (text only). All variants SHALL have hover and active states.

#### Scenario: Primary button renders with accent color
- **WHEN** Button variant="primary" renders
- **THEN** background uses `--color-brand-accent`

#### Scenario: Hover state changes appearance
- **WHEN** user hovers over any Button variant
- **THEN** button applies a visible hover style change
