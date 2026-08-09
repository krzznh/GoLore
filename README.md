# GoLore

Upload a photo of a place, a street, a dish, a sign — GoLore identifies it
and hands back a full travel guide: history, culture, customs, etiquette,
local language, local food, things to do, things to avoid, safety notes and
nearby places.

## Stack

- React 18 + Vite
- Tailwind CSS (custom design tokens in `tailwind.config.js`)
- Framer Motion for animation
- No backend code here — this is the frontend only. It talks to the
  existing GoLore Cloudflare Worker.

## Backend

The frontend calls a single, already-deployed API:

```
https://golore-api.kc18042007.workers.dev/
```

This URL lives in exactly one place: `src/lib/api.js` (`GOLORE_API_URL`).
No API keys (Gemini, Pexels, or otherwise) are ever present in this
repository — those stay inside the Cloudflare Worker.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  App.jsx                  View orchestration (landing / analyzing / result / error)
  lib/api.js                Centralized API client (fetch, validation, error types)
  hooks/useReducedMotion.js
  components/
    Navbar.jsx, Hero.jsx, HowItWorks.jsx, UploadPanel.jsx
    AnalysisLoader.jsx, ErrorState.jsx, Footer.jsx
    Reveal.jsx              Scroll-reveal wrapper (respects prefers-reduced-motion)
    SafeImage.jsx            Image component with graceful fallback
    result/
      ResultView.jsx         Composes the full guide from the API response
      ResultHero.jsx, ResultNav.jsx, HistorySection.jsx, CultureSection.jsx
      LanguageSection.jsx, FoodSection.jsx, ThingsToDoSection.jsx
      AwarenessSection.jsx (avoid + safety), NearbySection.jsx
  assets/
    logo-light.png, logo-dark.png   Cropped, transparent GoLore wordmark
```

## Notes for future work

The architecture leaves room for (not yet implemented, by design):
Google Maps / Street View / reviews on the Nearby section, saved places,
accounts, itineraries, multilingual UI, and voice playback for phrases.

---
Built by **Team Chaos** — Team Lead **Krishna**, with **Ritik** & **Shlok**.
