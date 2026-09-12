# Kalyan — 2026 Portfolio

A deploy-as-is static portfolio for Kalyan, Video Editor & Motion Designer. No build process or framework is required; it is suitable for GitHub Pages.

## Features
- Neon dark 2026 visual system: kinetic Syne display type, duotone glows, subtle grid and film grain.
- Full-height kinetic hero, rotating data-driven tagline, progress indicator, adaptive navigation and clip-path mobile menu.
- Asymmetric six-skill bento grid, animated skill bars and counters.
- Nine filterable work cards with lazy thumbnails and Google Drive iframe playback in an accessible modal.
- Data-driven contact details, social links, hero words, Google Drive URLs and experience timeline in `js/data.js`.
- GSAP + ScrollTrigger enhancement for hero text, parallax, pinned showreel and timeline progress; usable without JS or the CDN.
- Reduced-motion support, keyboard Escape modal close, responsive layouts, Open Graph/Twitter metadata and Person JSON-LD.

## Structure
```
index.html
css/style.css
js/data.js       # Edit this file for portfolio content
js/main.js
assets/thumbs/   # 01-english-freelance.jpg through 09-podcast-task-10.jpg
```

## Deploy
Push these files to a GitHub repository root and enable **Settings → Pages → Deploy from a branch**. Update email, social URLs, timeline, hero words and Drive preview URLs only in `js/data.js`.
