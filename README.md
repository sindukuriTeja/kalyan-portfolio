# Kalyan — Portfolio (T-3 Studio style)

A deploy-as-is static portfolio for Kalyan, Video Editor & Motion Designer, rebuilt in the editorial style of the T-3 Studio portfolio (t-3.studio): pure black canvas, acid-green accent, oversized uppercase grotesque headlines, mono labels, pill buttons and GSAP + Lenis motion. No build process or framework — suitable for GitHub Pages.

## Design system
- **Palette:** black `#000` · white `#fff` · acid green `#59ff00` · grays `#999` / `#666`
- **Type:** Archivo (Neue Montreal stand-in) for display, IBM Plex Mono for labels
- **Voice:** lowercase editorial, parenthetical asides `( like this )`, "watch" project cards

## Features
- Preloader with counting percent, masked char-by-char hero reveal (GSAP)
- Lenis smooth scrolling wired into ScrollTrigger
- Green marquee band, scroll-revealed work grid (9 filterable-by-category cards)
- Grayscale→color hover on thumbnails with green "watch" badge
- Hover-invert service rows and timeline entries
- Custom green cursor (fine pointers only), magnetic-free minimal interactions
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