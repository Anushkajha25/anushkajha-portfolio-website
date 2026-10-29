# Anushka Jha — Portfolio

**Live:** [anushka-jha.vercel.app](https://anushka-jha.vercel.app) · **GitHub:** [@Anushkajha25](https://github.com/Anushkajha25)

The personal site of Anushka Jha, an AI/ML engineer. It has case studies of her gait-classification
research, an LLM resume-extraction pipeline, a published water-quality classification chapter and
an Android health-monitoring app.

Next.js (App Router) · React · TypeScript · Tailwind CSS v4. No animation libraries.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build + type check
```

Deploys to Vercel as-is (import the folder, no config needed).

## Where to edit content

Everything you'd want to change lives in `data/`:

| File | What it controls |
|---|---|
| `data/site.ts` | Name, email, LinkedIn, GitHub, resume path, portrait |
| `data/projects.ts` | Homepage project cards + full case-study content |
| `data/experience.ts` | Experience and Education timelines |
| `data/skills.ts` | "Things I work with" rows |
| `data/personal.ts` | "When I’m not building things" cards and their detail panels, plus photos |
| `data/gaitFrames.ts` | Real CASIA-B silhouette frames for the gait artwork (drop PNGs in `public/images/casia/`) |

Files: `public/images/anushka-jha.jpg` (portrait), `public/resume/Anushka_Jha_Resume.pdf`.

## Placeholders

Anything not verifiable from the resume is a `[CONTENT NEEDED]` block.

- `npm run dev`: shown as dashed pink boxes, so you can't miss them.
- `npm run build` / production: hidden automatically, and any section left empty is dropped
  and the numbering closes up. Override with `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true|false`.

Find them all:

```bash
grep -rn "CONTENT NEEDED" data/
```

## Design system

All styling is in `app/globals.css`: tokens in `@theme` (colors, fonts), then a small set of
semantic classes (`.display`, `.h2`, `.label`, `.project`, `.timeline`, `.cs-section`, …).
Tailwind is installed, so utility classes work anywhere you want them; the core design is kept
as named classes so the type scale and spacing stay consistent in one place.

- Background `#fbfaf7`, ink `#151514`, single accent blue `#2b59e0`
- Manrope (display) + Inter (body) via `next/font/google`
- Project artwork is inline SVG in `components/visuals/` — no images to maintain, and it
  contains no results beyond what's verified (XGBoost 93.07%)

## Motion

- One staggered load-in on the hero and case-study header (CSS only)
- Scroll reveals via a single IntersectionObserver (`components/Reveal.tsx`); content stays
  visible without JS and with `prefers-reduced-motion`
- Hover: project cards glow and their art lifts slightly; arrows nudge

## Deploying (GitHub → Vercel)

- Framework preset: **Next.js** (auto-detected). Build `next build`, install `npm install`,
  output handled by Vercel's Next.js integration — no custom settings needed.
- Every push to `main` triggers a production deployment; other branches get preview URLs.
- No environment variables are required. Optional: `NEXT_PUBLIC_SITE_URL` once you add a custom
  domain (otherwise the Vercel production URL is used for link previews).
