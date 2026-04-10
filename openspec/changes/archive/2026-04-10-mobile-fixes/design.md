## Context

The app uses a single `Navbar` component (`"use client"`) with a basic hamburger toggle and no animation. League cards render in a single column on mobile. Scrollbars use the default browser width. The `TabNav` component has page-level horizontal padding inherited from the layout, causing tabs to be clipped rather than scrolling smoothly edge-to-edge.

## Goals / Non-Goals

**Goals:**
- Burger menu animates smoothly (hamburger → ×, drawer slides in)
- Mobile league grid shows 2 columns
- Site-wide scrollbar is 2px, subtle colour
- League tab bar has no page padding, no visible scrollbar, scrolls naturally

**Non-Goals:**
- Desktop navigation changes
- Swipe-gesture support
- Any change to auth flow or data fetching

## Decisions

### Burger animation — CSS-only transform
Use Tailwind `transition` + `rotate`/`opacity` classes on the three `<span>` bars to morph into ×. No external library needed; the existing `"use client"` Navbar already owns open state. Drawer slides in with `translate-x` transition.

**Alternatives considered:** Framer Motion — unnecessary dependency for this scope.

### Drawer — full-height slide-in panel
A fixed full-viewport overlay (`fixed inset-0`) with a slide-in panel from the left (or top). Clicking a link or the backdrop closes the drawer. Trapping focus is not required for MVP.

### League grid — `grid-cols-2` at base breakpoint
Change the `LeaguesGrid` base column to 2 (`grid-cols-2`) and keep `sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`. Cards need a `min-w-0` guard so text truncates correctly at narrow widths.

### Tab bar — `overflow-x-auto` with hidden scrollbar utility
Add a `.scrollbar-none` utility in `globals.css` (`scrollbar-width: none` + `::-webkit-scrollbar { display: none }`). Apply to `TabNav`'s scroll container. Remove the container's `px-4 sm:px-6 lg:px-8` padding; the inner tab links keep their own `px-4` padding for tap targets.

### Scrollbar width — global override
Override `::-webkit-scrollbar { width: 2px; height: 2px }` globally in `globals.css`. This is already partially done (width: 6px); reduce and also add `height` for horizontal bars.

## Risks / Trade-offs

- **Drawer focus trap absent** → Power users navigating by keyboard may tab into background content. Acceptable for MVP; can add later.
- **`grid-cols-2` on very narrow phones (320px)** → Cards could be tight. Cards already use `line-clamp-2` and `truncate`, so layout stays intact.
- **`scrollbar-width: none` Firefox** → Uses the CSS property (supported since Firefox 64). No fallback needed.
