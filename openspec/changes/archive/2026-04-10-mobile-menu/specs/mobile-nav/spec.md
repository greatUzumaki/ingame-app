## MODIFIED Requirements

### Requirement: Animated mobile burger menu
On viewports below `md` (768px) the burger icon button in the Navbar SHALL be hidden. Mobile navigation is handled entirely by the bottom navigation bar. The burger menu remains visible only on viewports between `sm` and `md` if needed, or is removed entirely from mobile viewports.

#### Scenario: Burger hidden on mobile when bottom nav present
- **WHEN** user views any page on a viewport narrower than 768px
- **THEN** the burger icon is not displayed in the Navbar (bottom nav handles mobile navigation)
