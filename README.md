# Aakash Rajbhar — Portfolio

A single-page developer portfolio built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Motion** (`motion/react`). Ships with a light/dark theme toggle and full English/Hindi translation.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. First build needs internet access once, to fetch
the Google Fonts (Space Grotesk, Inter, JetBrains Mono, Noto Sans Devanagari
for Hindi) — normal for `next/font/google`, and it self-hosts them
afterward, so no runtime font requests ship to visitors.

Drop a square photo at `public/profile.png` for the avatar in the hero.

```bash
npm run build && npm start   # production build
```

Deploys as-is to Vercel: `vercel` or connect the repo in the dashboard.

## Design notes

The brief asked for minimalist, modern, creative, professional, with a techy
feel and chanhdai.com as a loose reference point — not a copy. What's kept
from that reference is the idea of a **structured, resume-shaped single
page** (real dates, durations, grouped stack). Everything else — palette,
type, hero, and signature interaction — is different:

- **Palette** — fully monochrome. Hierarchy comes from grayscale value only
  (`fg`/`muted`/`faint`), not hue. Primary buttons invert (bright bg, dark
  text in dark mode; dark bg, light text in light mode) rather than relying
  on an accent color.
- **Type** — Space Grotesk for display headings, Inter for body copy,
  JetBrains Mono for labels/nav/prompts, and Noto Sans Devanagari as the
  fallback for Hindi text (none of the Latin fonts cover those glyphs).
- **Hero** — a profile-card layout (banner, avatar, bio, stats) rather than
  a generic centered headline, with a git-diff-styled signature block as
  the one deliberate creative swing.
- **Signature element** — a `⌘K` / `Ctrl K` command palette for jumping
  between sections, copying the email, and opening GitHub/LinkedIn.
- **Ambient motion** — a faint schematic grid in the background with a
  cursor-tracked spotlight, kept subtle so it reads as atmosphere, not
  noise. `prefers-reduced-motion` is respected throughout.

## Light/dark mode

All color tokens (`ink`, `surface`, `hair`, `fg`, `muted`, `faint`) resolve
to CSS custom properties defined in `app/globals.css` — one set under
`:root` for dark (the default), one set under `html.light` for light.
Toggling never touches component code; it just swaps which variable values
are active.

- `contexts/ThemeContext.tsx` — holds the current theme, persists it to
  `localStorage`, and toggles the `light` class on `<html>`.
- A small blocking `<script>` in `app/layout.tsx`'s `<head>` applies the
  saved (or system) theme *before* React hydrates, so there's no flash of
  the wrong theme on load.
- `components/ThemeToggle.tsx` — the sun/moon button in the nav.

To adjust either palette, edit the two variable blocks in
`app/globals.css` — nothing else needs to change.

## English / Hindi translation

- `lib/content.ts` — every piece of visible prose (nav labels, hero copy,
  experience bullets, project descriptions, stack labels, education,
  footer, command palette, GitHub calendar text) exists twice, once under
  `content.en` and once under `content.hi`, with identical shape.
- `contexts/LanguageContext.tsx` — holds the current language, persists it
  to `localStorage`, and sets `<html lang>` accordingly.
- `components/LanguageToggle.tsx` — the EN/हिंदी button in the nav.
- Every content component reads `const { lang } = useLanguage()` and pulls
  `content[lang]` — there's no per-component translation logic.

Technical terms (company names, tech stack names like "Next.js" or
"PostgreSQL", certification issuers, URLs) are kept in English in both
languages, which matches how they're normally written in Hindi technical
writing. Everything else — roles, bullets, descriptions, UI microcopy — is
fully translated.

To edit copy in either language, just edit the matching string inside
`content.en` or `content.hi` in `lib/content.ts` — the two objects don't
need to stay structurally identical beyond the shared `Content` type, but
keeping them parallel makes future edits easier to track.

## Structure

```
app/
  layout.tsx      — fonts, metadata, theme-flash-prevention script, Providers
  page.tsx        — assembles all sections
  globals.css     — color tokens (dark + light), base styles
  api/github-contributions/route.ts — server-side proxy for the GitHub
    contributions fetch (avoids browser CORS)
contexts/
  ThemeContext.tsx     — light/dark state + persistence
  LanguageContext.tsx  — en/hi state + persistence
components/
  Providers.tsx        — wraps the app in both contexts
  ThemeToggle.tsx       — sun/moon button
  LanguageToggle.tsx    — EN/हिंदी button
  GridSpotlight.tsx     — background grid + cursor spotlight
  Nav.tsx               — sticky nav, active-section tracking, toggles
  CommandPalette.tsx    — ⌘K palette
  Hero.tsx              — profile card (banner, avatar, stats, diff block)
  Experience.tsx        — timeline (content-driven)
  Projects.tsx          — project cards (content-driven)
  Stack.tsx             — grouped skill chips (content-driven)
  Education.tsx         — education + certifications
  Footer.tsx             — contact CTA, GitHub calendar, links
  GithubCalendar.tsx     — contribution heatmap
  Reveal.tsx             — shared scroll-reveal + section heading
lib/
  data.ts        — language-invariant facts: name, email, phone, links
  content.ts     — all bilingual (en/hi) prose and section content
```

## Customizing

- **Content** — edit `lib/content.ts` (prose, per language) and
  `lib/data.ts` (contact facts) to update copy without touching components.
- **Colors** — edit the two CSS variable blocks in `app/globals.css`.
- **Project links** — `lib/content.ts` has placeholder `#` links for
  `code`/`demo` on each project; swap in the real GitHub/deployed URLs.
- **Avatar** — replace `public/profile.png`.
