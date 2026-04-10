## 1. Global Styles

- [x] 1.1 Update `src/app/globals.css` — reduce scrollbar `width` and `height` to 2px
- [x] 1.2 Add `.scrollbar-none` utility to `globals.css` — `scrollbar-width: none` + `::-webkit-scrollbar { display: none }`

## 2. League Cards Grid

- [x] 2.1 Update `src/components/LeaguesGrid.tsx` — change base grid from `grid-cols-1` to `grid-cols-2`, keep `sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- [x] 2.2 Update `src/components/LeagueCard.tsx` — ensure card content handles narrow (mobile 2-col) width: text truncation, min-w-0 guards

## 3. Tab Navigation

- [x] 3.1 Update `src/components/TabNav.tsx` — remove horizontal padding from the outer wrapper so tabs are edge-to-edge
- [x] 3.2 Apply `.scrollbar-none` to the `TabNav` scroll container

## 4. Animated Burger Menu

- [x] 4.1 Update `src/components/Navbar.tsx` — replace static hamburger with animated 3-bar → × morphing button using CSS transitions on `<span>` bars
- [x] 4.2 Add a full-height slide-in drawer overlay: `fixed inset-0` backdrop + panel that translates in from left/top; controlled by existing `isOpen` state
- [x] 4.3 Close drawer on nav link click (add `onClick` to each drawer link that calls `setIsOpen(false)`)
- [x] 4.4 Close drawer on backdrop click

## 5. QA

- [x] 5.1 Run `npm run build` — verify no TypeScript errors
- [x] 5.2 Verify burger animation on mobile viewport in browser
- [x] 5.3 Verify league card 2-column grid on mobile
- [x] 5.4 Verify tab bar scrolls edge-to-edge with no scrollbar on mobile
