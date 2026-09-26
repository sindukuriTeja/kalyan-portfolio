/* ============================================================
   KALYAN ARBURI — PORTFOLIO DATA
   Edit this file to update personal details, the main video,
   categories and portfolio videos without touching the HTML.
   ============================================================ */

window.PORTFOLIO_DATA = {
  /* ---- Personal details ---- */
  name: "Kalyan Arburi",
  role: "Video Editor & Motion Designer",
  tagline: "UNIQUE",
  bio: "Unique video editor & motion designer — turning raw footage into stories people watch to the end.",
  avatarInitial: "K",
  /* Profile photo — put your photo at assets/profile.jpg (square works best).
     Leave as "" to show the letter avatar instead. */
  avatarImage: "assets/profile.jpg",

  /* ---- Contact ---- */
  email: "kalyanclicks00@gmail.com",
  instagram: "https://www.instagram.com/kalyanabburi0",
  instagramHandle: "@kalyanabburi0",

  /* ---- Main featured video (big player in the showcase) ----
     Must be one of the video keys below. */
  mainVideo: "assets/videos/09-podcast-task-10.mp4",
  mainVideoSub: "One video. Main — the edit that shows the full range.",

  /* ---- Portfolio videos (Google Drive preview player) ----
     Each video plays in the official Google Drive preview iframe.
     If you re-host files (e.g. YouTube), change type to "youtube"
     + url, or "native" + a direct .mp4 URL. */
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

  /* ---- Portfolio cards (title + category, in display order) ----
     Categories are auto-collected from these cards. */
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

  /* ---- Footer tagline ("Any Line" in the wireframe) ---- */
  footerLine: "Let's make something unique together."
};