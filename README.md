# Kalyan — Portfolio (FTI Agency style)

A deploy-as-is static portfolio for Kalyan, Video Editor & Motion Designer, rebuilt in the light editorial style of the FTI Agency website (ftiagency.com, by Andrei Kozlov): white / off-white canvas, golden-yellow accent, Montserrat display type, rounded cards and GSAP + Lenis motion. No build process or framework — suitable for GitHub Pages.

## Design system
- **Palette:** white `#ffffff` · off-white `#fafafa` · near-black `#101010` · golden yellow `#fcc600`
- **Type:** Montserrat (display, tight tracking) + Figtree (body)
- **Components:** rounded cards (6px radius), pill buttons, bordered cards, big stat tiles, dark contact card + dark footer

## Features
- Preloader with counting percent, then a slide-up reveal
- Hero with rotating tagline (from `data.js`), yellow underline accent and animated scroll indicator
- Lenis smooth scrolling wired into ScrollTrigger
- Animated stat counters (projects, countries, years, satisfaction)
- Services grid with hover-lift cards + a dark "Got an Idea?" CTA tile
- 9 parallax project cards (image drifts on scroll), yellow play badge on hover, "Watch the Project" links
- Timeline rendered from `js/data.js` with tag pills
- Accessible video modal: Google Drive iframe playback, Esc / backdrop / close button
- Data-driven: edit `js/data.js` only for email, socials, hero words, timeline and Drive URLs
- Graceful degradation: content is visible without JS or if the CDN fails; `prefers-reduced-motion` disables all animation
- Open Graph / Twitter card / Person JSON-LD metadata

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