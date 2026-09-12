# Kalyan — Video Editor & Motion Designer Portfolio

A high-quality, animation-rich portfolio website for Kalyan, Video Editor & Motion Designer.

## ✨ Features

- Cinematic preloader with progress counter
- Letter-by-letter hero title reveal + rotating tagline
- Custom cursor, magnetic buttons, floating gradient blobs, film-grain noise
- Scroll-reveal animations, animated skill bars, counting stats
- Tilted infinite marquee, glowing scroll-progress timeline
- Video modal player (official Google Drive player) with blur backdrop
- Category filters: All / Commercial / Financial / Faceless / Speed Ramp / Music / Podcast
- Fully responsive with mobile menu
- Respects `prefers-reduced-motion`

## 📁 Structure

```
kalyan-portfolio/
├── index.html          # Single-page site
├── css/style.css       # Theme + all animations
├── js/data.js          # ← EDIT THIS: personal details, timeline, video links
├── js/main.js          # Animation engine (no edits needed)
└── assets/
    └── thumbs/         # Video thumbnails
```

## 🎬 Videos

Videos stream from a public Google Drive folder (kept out of this repo to stay lightweight).
Edit the `videos` map in `js/data.js` to swap, add, or re-host any video.

## 🚀 Deploy

Pure static site — deploy anywhere:

- **GitHub Pages**: Settings → Pages → deploy from `main` branch (root)
- **Netlify / Vercel / Cloudflare Pages**: drag & drop or connect the repo

## 📝 Customizing

All personal details (name, email, socials, experience timeline, hero words)
live in **`js/data.js`** — edit that one file, no HTML changes needed.