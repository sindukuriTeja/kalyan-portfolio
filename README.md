# Kalyan — Portfolio (FTI Agency style, exact animation system)

A deploy-as-is static portfolio for Kalyan, Video Editor & Motion Designer, rebuilt with the **exact design system and animation code** extracted from the live FTI Agency website (ftiagency.com, by Andrei Kozlov). No build process or framework — suitable for GitHub Pages.

## Design system (values taken from FTI's production CSS)
- **Palette:** `#050505` black · `#101010` cards · `#a3a3a3` gray · `#fcc600` golden yellow accent
- **Type:** Montserrat (display, uppercase, tight tracking) + Figtree (body), `letter-spacing: -.02em`
- **Fluid type scale:** FTI's `calc(0.625rem + 0.4166666vw)` root sizing
- **Components:** 4px-radius yellow buttons with the arrow-square flood hover, circular yellow-bordered benefit badges, hard `0 2.5rem 0 0` black shadow on sticky project cards

## Animations (replicated 1:1 from FTI's inline GSAP scripts)
1. **Hero char explosion** — `SplitType` splits "TURNING FOOTAGE INTO STORIES" into chars that fly in from random `rotateY/x/y/scale(0)` positions, **scrubbed over 100vh** inside a sticky `100svh` hero (section is `250vh`, like FTI's)
2. **Word-scrub section titles** — `[animate]` titles fade 0.4→1 word-by-word as you scroll through center (FTI's `[animate]` pattern)
3. **Contact char explosion** — same char fly-in, plays **once** when the section reaches `top 80%` (FTI's `toggleActions` pattern)
4. **Sticky stacking project cards** — all 9 projects are `position: sticky` at `top: 168px` (128px / 80px on smaller screens); each card scales to `0.95` when the next card overlaps it (FTI's exact `updateCards` scroll handler)
5. **Header** — `IntersectionObserver` with `rootMargin: -100px` adds `.header-colored` (solid black) once the hero scrolls out
6. **Menu** — full-screen black overlay, burger → X (FTI's `.menu-wrap.show` pattern)
7. **Service rows** — yellow `line-decor` floods the row, text inverts to black, arrow rotates 45° (FTI's exact hover CSS)
8. **Counters** — GSAP-driven stat counters (projects, countries, years, satisfaction)
9. **Buttons** — arrow background `scale(10)` flood + 45° arrow rotation on hover (FTI's exact button CSS)

## Structure
```
index.html
css/style.css
js/data.js       # Edit this file for portfolio content
js/main.js
assets/thumbs/   # 01-english-freelance.jpg … 09-podcast-task-10.jpg
```

## Deploy
Push to a GitHub repository root and enable **Settings → Pages → Deploy from a branch**. Update email, social URLs, timeline and Drive preview URLs only in `js/data.js`.

## Graceful degradation
If the GSAP/SplitType CDNs fail or the user prefers reduced motion, all content is shown statically (no hidden sections).