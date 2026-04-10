## ADDED Requirements

### Requirement: Animated mobile burger menu
On viewports below `sm` (640px) the Navbar SHALL hide desktop navigation links and show a burger icon button. Tapping the burger SHALL open a full-height slide-in drawer containing all nav links. The burger icon SHALL animate into a × (close) icon while the drawer is open. Tapping the × or any nav link SHALL close the drawer with a reverse animation.

#### Scenario: Burger icon visible on mobile
- **WHEN** user views any page on a viewport narrower than 640px
- **THEN** desktop nav links are hidden and a burger icon button is visible in the navbar

#### Scenario: Drawer opens on burger tap
- **WHEN** user taps the burger icon
- **THEN** a full-height navigation drawer slides into view and the burger icon animates to ×

#### Scenario: Drawer closes on × tap
- **WHEN** the drawer is open and user taps the × icon
- **THEN** the drawer slides out and the icon animates back to the burger

#### Scenario: Drawer closes on nav link tap
- **WHEN** the drawer is open and user taps a navigation link
- **THEN** the drawer closes and the app navigates to the target route

#### Scenario: Drawer closes on backdrop tap
- **WHEN** the drawer is open and user taps the semi-transparent backdrop
- **THEN** the drawer closes
