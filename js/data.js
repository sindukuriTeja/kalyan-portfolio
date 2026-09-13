/* ============================================================
   AASIL KHAN — PORTFOLIO DATA (Fiverr profile style)
   Edit this file to update personal details, gigs, reviews
   and portfolio videos without touching the HTML.
   ============================================================ */

window.PORTFOLIO_DATA = {
  /* ---- Personal details (from Fiverr profile) ---- */
  name: "Aasil Khan",
  handle: "@aasil_khan_",
  role: "Video Editor",
  tagline: "High Quality and Fast Turnaround",
  location: "India",
  languages: "English, Hindi",
  rating: 4.9,
  reviews: 985,
  topRated: true,
  responseTime: "1 hour",
  fiverrUrl: "https://www.fiverr.com/aasil_khan_",
  email: "hello@example.com",          // TODO: replace with real email if you want a direct mail link

  /* ---- Headline stats (from Fiverr profile) ---- */
  stats: [
    { value: 4.9, suffix: "★", label: "Average Rating", decimals: 1 },
    { value: 985, suffix: "+", label: "Reviews" },
    { value: 65, suffix: "+", label: "Countries Served" },
    { value: 75, suffix: "K+", label: "YouTube Subs Grown" }
  ],

  /* ---- About / track record ---- */
  about: [
    "Among the Top 1% of Video Editors on Fiverr",
    "Delivered millions of views for clients across 65+ countries",
    "Grew a YouTube channel to 75K+ subscribers in just 1 year"
  ],
  aboutBody: "I am a top-rated video editor who is OBSESSED with crafting highly engaging videos. I specialize in Adobe Premiere Pro and Adobe After Effects — from raw footage to the final cut, grade, motion and sound.",
  clients: ["Razer", "Cisco", "Microsoft", "CMA CGM"],

  /* ---- Gigs (from Fiverr profile) ---- */
  gigs: [
    { title: "I will do professional video editing", rating: 4.9, reviews: 794, price: 80 },
    { title: "I will edit a professional real estate video", rating: 4.8, reviews: 54, price: 80 },
    { title: "I will professionally edit your travel videos", rating: 4.9, reviews: 52, price: 80 },
    { title: "I will do wedding video editing", rating: 4.9, reviews: 25, price: 80 }
  ],
  gigsTotal: 9,

  /* ---- Skills ---- */
  skills: [
    "Video Editor",
    "Content Editor",
    "Adobe Premiere Pro Expert",
    "Adobe After Effects Expert",
    "Adobe Photoshop Expert",
    "Color Grading",
    "Motion Graphics",
    "Sound Design"
  ],

  /* ---- Portfolio (9 real work videos, Google Drive preview) ----
     Each video plays in the official Google Drive preview player (iframe),
     which works for every file size. If you re-host files (e.g. YouTube),
     change type to "youtube" + url, or "native" + a direct .mp4 URL. */
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

  /* ---- Portfolio cards (title + category, in display order) ---- */
  work: [
    { title: "English Freelance",      cat: "Short-Form",   video: "assets/videos/01-english-freelance.mp4" },
    { title: "Koushik Maridi",         cat: "Short-Form",   video: "assets/videos/02-koushik-maridi.mp4" },
    { title: "2050 Monthly Expenses",  cat: "Faceless",     video: "assets/videos/03-2050-monthly-expenses.mp4" },
    { title: "Faceless — Main Video",  cat: "Faceless",     video: "assets/videos/04-faceless-main-video.mp4" },
    { title: "Jealous",                cat: "Music Edit",   video: "assets/videos/05-jealous.mp4" },
    { title: "Social Media Addiction", cat: "Short-Form",   video: "assets/videos/06-social-media-addiction.mp4" },
    { title: "Speed Ramp Edit",        cat: "Motion",       video: "assets/videos/07-speed-ramp-final.mp4" },
    { title: "Private Song — Promo",   cat: "Music",        video: "assets/videos/08-private-song-promo.mp4" },
    { title: "Podcast — Task 10",      cat: "Podcast",      video: "assets/videos/09-podcast-task-10.mp4" }
  ],

  /* ---- Real reviews (from Fiverr profile) ---- */
  reviewsList: [
    {
      name: "nhurenkamp",
      country: "Netherlands",
      flag: "🇳🇱",
      text: "To be honest I was quite sceptical to have someone else edit my holiday video's. But honestly, Aasil delivered exceptional work in a quick timeframe. It came out better than I expected and the communication was extremely professional and on point.",
      service: "Travel Video Editing",
      price: "€100–€200",
      duration: "9 days"
    },
    {
      name: "emilyjmathews",
      country: "United States",
      flag: "🇺🇸",
      text: "If I could give Aasil 10 stars I would in a heartbeat! He is fabulous on every level — he communicates beautifully, is super professional in everything he does, and his creativity will blow your mind. Most of all he is incredibly patient!",
      service: "Video Editing",
      price: "€100–€200",
      duration: "8 days"
    },
    {
      name: "gpwebber",
      country: "United States",
      flag: "🇺🇸",
      text: "Aasil Khan is an absolute gem in video editing! He transformed my chaotic video content into a polished, cheerful video that perfectly met my targeting criteria. The quality was TOP-NOTCH.",
      service: "Video Editing",
      price: "€50–€100",
      duration: "5 days"
    },
    {
      name: "stersuhr",
      country: "United States",
      flag: "🇺🇸",
      repeat: true,
      text: "This was probably the best experience I've had on Fiverr. He took a really basic video and turned it into something people will watch. I needed a few edits and he took care of them ASAP. If you need video editing, this is your guy!",
      service: "Video Editing",
      price: "€200–€400",
      duration: "10 days"
    },
    {
      name: "carmodco",
      country: "United Kingdom",
      flag: "🇬🇧",
      text: "My first time ever commissioning something like this and I couldn't be more happy. The professionalism, the quality of the edit, the whole approach — I would definitely use again and recommend his work 1000%.",
      service: "Video Editing",
      price: "€200–€400",
      duration: "4 weeks"
    }
  ],

  /* ---- Rating breakdown (from Fiverr profile) ---- */
  ratingBreakdown: [
    { stars: 5, count: 928 },
    { stars: 4, count: 44 },
    { stars: 3, count: 5 },
    { stars: 2, count: 6 },
    { stars: 1, count: 1 }
  ],
  ratingSub: [
    { label: "Seller communication level", value: 4.9 },
    { label: "Recommend to a friend", value: 5 },
    { label: "Service as described", value: 5 }
  ]
};