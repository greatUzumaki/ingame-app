## Why

Mobile users experience a poor navigation UX (no animated burger menu), cramped league card grid, and visually noisy horizontal scrollbars — especially on the league tabs bar which should feel edge-to-edge and scroll naturally. These are polish issues that directly affect usability on the primary device type.

## What Changes

- Animated burger menu in the Navbar: hamburger icon morphs to × on open, slides in a full-screen or drawer overlay with nav links
- League cards grid on mobile: 2-column grid instead of single-column so more cards are visible at once
- Horizontal scrollbars site-wide: styled to be thinner (2–3px) and more subtle
- League tab bar: horizontal scrollbar hidden completely; tabs have no left/right page padding so they bleed edge-to-edge and scroll naturally off-screen

## Capabilities

### New Capabilities
- `mobile-nav`: Animated mobile burger menu with open/close transition and overlay drawer

### Modified Capabilities
- `design-system`: Scrollbar styling updated — thinner globally, hidden for tab nav
- `league-detail`: Tab navigation behavior changes — edge-to-edge, no padding, hidden scrollbar

## Impact

- `src/components/Navbar.tsx` — burger menu animation and drawer
- `src/components/TabNav.tsx` — remove horizontal padding, hide scrollbar
- `src/app/globals.css` — thinner scrollbar styles, utility class for hidden scrollbar
- `src/components/LeaguesGrid.tsx` — 2-column grid on mobile (sm breakpoint stays the same)
