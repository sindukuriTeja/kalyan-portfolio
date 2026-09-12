/* ============================================================
   KALYAN — PORTFOLIO DATA
   Edit this file to update personal details, timeline and
   social links without touching the HTML.
   ============================================================ */

window.PORTFOLIO_DATA = {
  /* ---- Personal details (update from your resume) ---- */
  name: "Kalyan",
  role: "Video Editor & Motion Designer",
  email: "hello@example.com",          // TODO: replace with real email
  location: "India",
  socials: {
    instagram: "#",                     // TODO: real profile URL
    youtube: "#",                       // TODO: real channel URL
    linkedin: "#"                       // TODO: real profile URL
  },

  /* ---- Video sources ----
     Each video plays in the official Google Drive preview player (iframe),
     which works for every file size and handles Google's large-file
     virus-scan page automatically.
     Key = the data-video value on each .work-card in index.html.
     If you re-host files (e.g. YouTube), change type to "youtube" + url,
     or "native" + a direct .mp4 URL. */
  videos: {
    "assets/videos/01-english-freelance.mp4":     { type: "iframe", url: "https://drive.google.com/file/d/1DmVLYBf9DmQTOeRlzNNW_ALuMuewrqFv/preview" },
    "assets/videos/02-koushik-maridi.mp4":        { type: "iframe", url: "https://drive.google.com/file/d/1rF_uC8mvd3kp77h_HB7zlOy-eLEnD53R/preview" },
    "assets/videos/03-2050-monthly-expenses.mp4": { type: "iframe", url: "https://drive.google.com/file/d/1rhqp2X9i3705_CmxgYmwopaPRlp40ECf/preview" },
    "assets/videos/04-faceless-main-video.mp4":   { type: "iframe", url: "https://drive.google.com/file/d/1S7Fp9A7iUrV2p6MYqg2j0ya0-HvrhPqs/preview" },
    "assets/videos/05-jealous.mp4":               { type: "iframe", url: "https://drive.google.com/file/d/16xkGmBQUKujg85k3wUK8LWus3ZDfcMOV/preview" },
    "assets/videos/06-social-media-addiction.mp4":{ type: "iframe", url: "https://drive.google.com/file/d/1sRv0qU7LsWEGR2Qh7o_yUiQQsqDCtni7/preview" },
    "assets/videos/07-speed-ramp-final.mp4":      { type: "iframe", url: "https://drive.google.com/file/d/1Z5Vb0bmHWFILICzxLflbR7f8e-PBbU8U/preview" },
    "assets/videos/08-private-song-promo.mp4":    { type: "iframe", url: "https://drive.google.com/file/d/1yCPwj85jVQsKINwhOQDwq2883jH1b7eU/preview" },
    "assets/videos/09-podcast-task-10.mp4":       { type: "iframe", url: "https://drive.google.com/file/d/1HB2fjhS6I_iGgG_N--E3oH4-nwUMUMlc/preview" }
  },

  /* ---- Rotating hero words ---- */
  heroWords: [
    "hook viewers",
    "keep audiences",
    "tell stories",
    "drive results"
  ],

  /* ---- Experience / journey timeline ---- */
  timeline: [
    {
      date: "2024 — Present",
      title: "Freelance Video Editor",
      org: "Self-Employed · Remote",
      desc: "Cutting short-form and long-form content for clients across finance, music, podcasts and commercial brands — from raw footage to final grade, sound and delivery.",
      tags: ["Shorts", "Podcasts", "Color", "Sound"]
    },
    {
      date: "2023 — 2024",
      title: "Short-Form & Faceless Content Specialist",
      org: "Creator Economy Projects",
      desc: "Built retention-first faceless content and viral-style shorts — hooks, kinetic captions, pacing and sound design tuned for watch-through rate.",
      tags: ["Faceless", "Reels", "Hooks"]
    },
    {
      date: "2022 — 2023",
      title: "Motion & Speed Ramp Editor",
      org: "Commercial & Music Clients",
      desc: "Dynamic speed ramps, kinetic typography and music-synced promos — high-energy edits for songs, brands and campaigns.",
      tags: ["Speed Ramp", "Motion", "Music"]
    },
    {
      date: "2021",
      title: "Started Editing",
      org: "Learning the Craft",
      desc: "First cuts, first clients, first lessons — fell in love with the rhythm of a good edit and never stopped.",
      tags: ["Beginner", "Passion"]
    }
  ]
};