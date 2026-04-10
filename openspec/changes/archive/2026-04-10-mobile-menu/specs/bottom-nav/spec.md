## ADDED Requirements

### Requirement: Fixed bottom navigation bar on mobile
On viewports narrower than `md` (768px) the app SHALL display a fixed bottom navigation bar with 5 tabs: Главная, Лиги, Новости, Магазин, Профиль.

#### Scenario: Bottom nav visible on mobile
- **WHEN** user views any page on a viewport narrower than 768px
- **THEN** a fixed bottom bar is visible with 5 navigation tabs

#### Scenario: Bottom nav hidden on desktop
- **WHEN** user views any page on a viewport 768px or wider
- **THEN** the bottom navigation bar is not displayed

---

### Requirement: Active tab indicated visually
The active tab SHALL be visually distinct — icon and label in accent colour, with an animated dot indicator above the icon.

#### Scenario: Active tab highlighted
- **WHEN** the current route matches a tab's path
- **THEN** that tab's icon and label render in accent colour and a dot appears above the icon

#### Scenario: Inactive tabs dimmed
- **WHEN** a tab's route does not match the current route
- **THEN** that tab's icon and label render in muted colour with no dot

---

### Requirement: Press animation on tab buttons
Each tab button SHALL scale down on press and spring back, providing tactile visual feedback.

#### Scenario: Tab press feedback
- **WHEN** user taps a tab button
- **THEN** the button briefly scales to ~90% then returns to full size

---

### Requirement: Content not obscured by bottom nav
Pages SHALL have sufficient bottom padding so content is not hidden behind the bottom navigation bar on mobile.

#### Scenario: Content scrolls above bottom nav
- **WHEN** user scrolls to the bottom of a page on mobile
- **THEN** the last content item is fully visible above the bottom navigation bar

---

### Requirement: Safe area inset respected on notched devices
The bottom navigation bar SHALL add padding for the iOS safe area inset so the bar is not obscured by the home indicator.

#### Scenario: Bar visible on iPhone with home indicator
- **WHEN** user views the app on an iPhone with a home indicator (no home button)
- **THEN** the bottom nav bar sits above the home indicator, not behind it
