# Road Safety Guide Dashboard

> **Stay aware. Stay alive. Drive responsibly.**
> A single-page React dashboard that puts road-safety rules, a pre-trip checklist, a sign/signal reference, and a live alerts feed — plus one-tap emergency calling — in one place.

![Stack](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Build](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![Styles](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)
![Icons](https://img.shields.io/badge/lucide--react-0.460-F56565)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Table of Contents

1. [About](#about)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Available Scripts](#available-scripts)
7. [Application Tour](#application-tour)
8. [Data & Customization](#data--customization)
9. [Accessibility](#accessibility)
10. [Browser Support](#browser-support)
11. [Roadmap](#roadmap)
12. [Contributing](#contributing)
13. [License](#license)
14. [Acknowledgements](#acknowledgements)

---

## About

The **Road Safety Guide Dashboard** is a self-contained, no-backend React application that helps drivers stay informed and prepared. It bundles education (rules, signs), preparedness (pre-trip checklist), situational awareness (live alerts), and emergency response (one-tap dialling) into a single, responsive dashboard.

This repository is the source for the dashboard mock-up — every metric, alert, and rule currently lives in `App.jsx` as mock data, so the project runs **without any API keys, network calls, or backend services**.

The reference location for the mock data is **Pune, Maharashtra, India** (`18.5204° N, 73.8567° E`). All emergency numbers (100, 108, 101, 1033) are the Indian emergency-services numbers; the dashboard works equally well for any region by editing the `LOCATION` constant and `EMERGENCY_BUTTONS` array.

### Why this project?

- **Education first** — Quick reference for everyday drivers, students, and new license-holders.
- **Pre-trip habit builder** — Interactive checklist that promotes a 60-second safety routine before every drive.
- **Always-on emergency bar** — Sticky footer with `tel:` links so help is one tap away, even with sweaty fingers.
- **Mock-friendly** — A clean template for designers / devs who want to plug in a real alerts API later.

---

## Features

### 🛡️ Header Bar
- Brand mark with a gradient shield icon.
- Live local clock (`en-IN`, 12-hour format with seconds) and current date — updates every second.
- Live location chip showing the configured city and coordinates.

### 📊 Key Statistics (`StatGrid`)
Four colour-coded cards summarising the current safety picture:

| Card | What it shows |
|---|---|
| Reported Accidents (7d) | Weekly count with week-over-week delta |
| Top Violation | Most-cited traffic offence and its share |
| Safest Travel Time | Lowest-risk window and average severity |
| Seatbelt Compliance | Citywide compliance percentage |

### 📚 Safety Rules Accordion (`SafetyRules`)
Five expandable categories, each colour-coded with an icon and a rule count chip:
- **Before Driving** — inspection and planning
- **While Driving** — seatbelt, speed, following distance
- **Night & Bad Weather** — visibility and aquaplaning
- **Pedestrians & Cyclists** — shared-space etiquette
- **In an Emergency** — scene management and reporting

Only one category is open at a time. Click a category header to expand or collapse it.

### ✅ Pre-Trip Checklist (`PreTripChecklist`)
- Ten-item interactive checklist covering tires, brakes, lights, mirrors, fluids, fuel, documents, first-aid, seatbelts, and phone.
- Live progress bar with **ARIA `progressbar`** semantics and a contextual status label:
  - `<40%` → **Not yet road-ready** (rose)
  - `40–69%` → **Keep going** (amber)
  - `70–99%` → **Almost ready** (emerald)
  - `100%` → **All clear — drive safe!** (emerald)
- **Reset** button to clear progress.
- State seeded with three items pre-checked so the progress bar shows movement on first load.

### 🚦 Sign & Signal Reference (`SignReference`)
Tabbed grid covering the three principal sign families:
- **Warning** (amber) — sharp bends, ascents/descents, pedestrian/school zones, road works, slippery road
- **Regulatory** (rose) — no entry/parking/overtaking, speed limit, stop, give way, one-way, roundabout
- **Information** (sky) — parking, hospital, fuel, restaurant, bus stop, rest area, pedestrian path, bike route

Each sign is rendered as a circular icon tile with a label. The tab control uses ARIA `tablist`/`tab`/`tabpanel` semantics.

### 🚨 Live Alerts Feed (`AlertsFeed`)
A scrollable feed of incidents and advisories with severity-tinted borders:

| Severity | Use case | Visual |
|---|---|---|
| `critical` | Accidents, road closures | rose left-border |
| `warning` | Congestion, waterlogging | amber left-border |
| `info` | Roadworks, fog advisories | sky left-border |

The header includes a pulsing red dot and shows the active alert count for the configured city.

### ☎️ Sticky Emergency Footer (`EmergencyFooter`)
- Always-visible at the bottom of the viewport (`sticky bottom-0 z-30`).
- One-tap `tel:` links for **Police (100)**, **Ambulance (108)**, **Fire (101)**, and **Highway Help (1033)**.
- On mobile, tapping a button opens the native dialler with the number pre-filled.
- Buttons use ARIA labels and a focus ring for keyboard users.

---

## Tech Stack

| Layer | Choice | Version | Why |
|---|---|---|---|
| UI library | [React](https://react.dev) | 18.3 | Concurrent rendering, hooks |
| Bundler / dev server | [Vite](https://vitejs.dev) | 5.4 | Fast HMR, zero-config |
| Styling | [Tailwind CSS](https://tailwindcss.com) | 3.4 | Utility-first, fast to iterate |
| Icons | [lucide-react](https://lucide.dev) | 0.460 | Tree-shakeable, consistent stroke |
| PostCSS pipeline | postcss + autoprefixer | latest | Tailwind processing + vendor prefixes |
| React plugin | @vitejs/plugin-react | 4.3 | Fast Refresh |

No state management library (Redux, Zustand, etc.) is used — the app state is small enough for `useState` / `useMemo`.

---

## Project Structure

```
dashboard/
├── App.jsx                 # Entire UI + mock data (single-file design)
├── index.html              # Vite entry HTML, sets <title> and loads /src/main.jsx
├── package.json            # Scripts, deps, devDeps
├── package-lock.json       # Locked dependency tree
├── postcss.config.js       # PostCSS pipeline (tailwindcss + autoprefixer)
├── tailwind.config.js      # Content globs: index.html, src/**, App.jsx
├── vite.config.js          # @vitejs/plugin-react
├── .gitignore              # Ignores node_modules/, dist/, env files, editor junk
└── src/
    ├── main.jsx            # React 18 root render into #root
    └── index.css           # @tailwind base/components/utilities
```

### File-by-file notes

- **`App.jsx`** — Houses every component, every mock-data array, and the colour-token map. Designed as a single file for easy copy-pasting into other projects (the file header documents this). To split it later, a natural factoring is `components/Header.jsx`, `components/StatCard.jsx`, `components/SafetyRules.jsx`, `components/PreTripChecklist.jsx`, `components/SignReference.jsx`, `components/AlertsFeed.jsx`, `components/EmergencyFooter.jsx`, plus a `data/` folder.
- **`src/main.jsx`** — Minimal React 18 root using `createRoot` and `<React.StrictMode>`.
- **`src/index.css`** — Three-line file: just the three `@tailwind` directives.
- **`tailwind.config.js`** — Includes `App.jsx` in `content` so utility classes used inside it get included in the build.
- **`vite.config.js`** — Plain React plugin setup; no aliases, no proxy, no SSR.
- **`index.html`** — Sets `<title>Road Safety Guide</title>` and points at `/src/main.jsx`.

---

## Getting Started

### Prerequisites
- **Node.js ≥ 18** (Vite 5 requires Node 18 or 20).
- **npm** (ships with Node). Yarn or pnpm work too.

### Install & run locally

```bash
# 1. Clone the repository
git clone https://github.com/vrushabhzade/roadsafetydashboard-.git
cd roadsafetydashboard-

# 2. Install dependencies
npm install

# 3. Start the dev server (default: http://localhost:5173)
npm run dev
```

You should see Vite print something like:

```
  VITE v5.4.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open the URL in your browser. Edits to `App.jsx` or `src/index.css` will hot-reload.

### Production build

```bash
npm run build      # outputs static assets to dist/
npm run preview    # serves dist/ locally for a smoke test
```

The build is fully static, so the contents of `dist/` can be dropped onto any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, etc.).

---

## Available Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite` | Start the local dev server with HMR |
| `build` | `vite build` | Build production assets to `dist/` |
| `preview` | `vite preview` | Serve the production build locally |

All scripts are defined in `package.json` under `"scripts"`.

---

## Application Tour

A walkthrough of what you'll see on first load (top → bottom):

1. **Sticky header** — Brand mark on the left; live clock and location chip on the right.
2. **Stat cards row** — Four colour-coded cards summarising accidents, top violation, safest time, seatbelt compliance.
3. **Two-column layout** (collapses to one column on mobile):
   - **Left (2/3 width)**
     1. **Safety Rules** accordion — five categories, **While Driving** open by default.
     2. **Pre-Trip Checklist** — 10 items with progress bar (3 pre-checked).
     3. **Sign & Signal Reference** — three tabs, **Warning** selected by default.
   - **Right (1/3 width)**
     4. **Live Alerts** — pulsing red dot, scrollable list of mock Pune-area incidents.
4. **Sticky emergency footer** — Always at the bottom. Four coloured `tel:` buttons for emergency services.

### State locations
- `Header` — local state for `now` (Date), refreshed every 1 s via `setInterval`.
- `SafetyRules` — local state `open` (string id of the currently open category).
- `PreTripChecklist` — local state `done` (Set of checked item ids), seeded with `tires`, `lights`, `seatbelt`.
- `SignReference` — local state `tab` (active tab id).

All other components are pure renderers of mock data.

---

## Data & Customization

Everything is in `App.jsx`, top of the file. To customise:

### Change the location
```js
const LOCATION = {
  city: "Mumbai",
  region: "Maharashtra, IN",
  coords: "19.0760° N, 72.8777° E",
};
```

### Change emergency numbers
```js
const EMERGENCY_BUTTONS = [
  { label: "Police",   number: "911", icon: ShieldAlert, color: "bg-rose-600 hover:bg-rose-700" },
  { label: "Ambulance", number: "911", icon: Cross,      color: "bg-emerald-600 hover:bg-emerald-700" },
  // ...
];
```

### Swap the stat cards
```js
const STATS = [
  {
    key: "accidents",
    label: "Reported Accidents (7d)",
    value: 1284,
    delta: -8.4,                            // number → shows ▲/▼ chip; string → plain chip
    color: "rose",                          // must exist in COLOR_MAP
    icon: AlertOctagon,                     // any lucide-react icon
    sub: "Down vs last week",
  },
  // ...
];
```

### Add or edit safety rules
Edit the `SAFETY_RULES` array — each category has `id`, `title`, `icon`, `color`, and a `rules: string[]`.

### Update the alerts feed
Replace items in the `ALERTS` array. Each item has `id`, `level` (`"critical" | "warning" | "info"`), `title`, `detail`, `time`, and `icon`.

### Plug in a real alerts API (next step)
The simplest path is to wrap the alerts array in a `useEffect` that fetches from your endpoint and replaces the constant. Because every consumer reads `ALERTS` once at render time, you can either:
1. Lift the array into a `useState` inside `App`, or
2. Keep it as `let` and mutate after fetch (not React-idiomatic but minimal).

Recommended: lift to `App` and pass `alerts` down to `AlertsFeed` as a prop.

---

## Accessibility

The dashboard is built with accessibility in mind:

- **Semantic landmarks** — `<header>`, `<main>`, `<section>` with `aria-label`, `<footer>`.
- **ARIA on interactive widgets** — accordions expose `aria-expanded` / `aria-controls`; tabs use `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`; the progress bar uses `role="progressbar"` with `aria-valuemin` / `aria-valuemax` / `aria-valuenow` / `aria-label`.
- **Decorative icons** — Every `lucide-react` icon is `aria-hidden="true"` so screen readers don't read out `ShieldAlert` etc.
- **Focus styles** — Emergency buttons include `focus:outline-none focus:ring-2 focus:ring-white/60`.
- **Colour contrast** — Text on coloured backgrounds uses 700-weight Tailwind colours (e.g. `text-rose-700` on `bg-rose-50`), which clear WCAG AA on their respective backgrounds.
- **Keyboard support** — Every interactive control is a `<button>` or `<a>` and is reachable via Tab; accordion and tab widgets respond to Enter/Space natively.

### Known limitations
- **No live-region announcements** for new alerts (would need `aria-live="polite"` on the alerts list when migrating to a real feed).
- **No reduced-motion handling** — the pulsing red dot and the rotating chevron respect Tailwind defaults; if you add custom animations, gate them with `@media (prefers-reduced-motion: no-preference)`.

---

## Browser Support

Targets **evergreen browsers**: Chrome / Edge / Firefox / Safari, latest two major versions. The Tailwind reset and modern CSS features (e.g. `backdrop-blur`, arbitrary `opacity`) assume a recent engine.

Mobile Safari iOS 15+ and Chrome Android 10+ are supported and tested via responsive Tailwind breakpoints (`sm`, `md`, `lg`).

---

## Roadmap

Ideas for future iterations (in rough order of effort):

- [ ] **Geolocation-aware location chip** — replace `LOCATION` constant with `navigator.geolocation`.
- [ ] **Live alerts backend** — REST or WebSocket source; `useEffect` + `useState` swap; `aria-live` region for new alerts.
- [ ] **Persistence for the checklist** — `localStorage` so progress survives reloads.
- [ ] **Multi-language support** — i18n via `react-intl` or a lightweight custom solution (start with English + Hindi).
- [ ] **Split `App.jsx` into per-component files** — see [Project Structure](#project-structure) for the suggested factoring.
- [ ] **Theme toggle** — light / dark / high-contrast variants.
- [ ] **PWA support** — `manifest.json` + service worker so the dashboard installs to the home screen.
- [ ] **Offline mode** — service-worker caching so emergency numbers work without signal.

---

## Contributing

Contributions are welcome. A quick guide:

1. **Fork** the repo and create a feature branch:
   ```bash
   git checkout -b feat/your-feature
   ```
2. **Make your changes**. Keep `App.jsx` readable — prefer small, focused commits.
3. **Run the dev server** to smoke-test (`npm run dev`) and the production build to ensure it still compiles (`npm run build`).
4. **Open a Pull Request** with a clear description of the change and any screenshots for visual updates.

Please do **not** commit `node_modules/`, `dist/`, or any `.env*` file (already covered by `.gitignore`).

### Coding conventions
- React function components, hooks-first.
- Tailwind utility classes inline; keep semantic class names only when grouping utilities helps readability.
- Two-space indentation, single-quote JS strings (the file mixes both for template-literal reasons — preserve the existing style of the section you touch).

---

## License

Released under the **MIT License**. You are free to use, modify, distribute, and sublicense this project, provided the copyright notice is preserved.

```
MIT License

Copyright (c) 2025 Vrushabh Zade

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Acknowledgements

- **[React](https://react.dev)** — for the rendering model.
- **[Vite](https://vitejs.dev)** — for the delightful developer experience.
- **[Tailwind CSS](https://tailwindcss.com)** — for the utility-first styling system.
- **[Lucide](https://lucide.dev)** — for the clean, consistent icon set.
- The open-source driving-safety community whose public guidance informed the rules content in `SAFETY_RULES`.

> **Drive safe. Buckle up. Phone down. Eyes up.**