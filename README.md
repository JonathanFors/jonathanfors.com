# jonathanfors.com

Marketing site for **Jonathan Fors** — UESCA-certified ultra-endurance running
coach — and **Project Portugal 2026**, a ~900 km coastline run raising awareness
and funds for men's mental health.

The whole site funnels toward one action: **book a free intro call**
(`https://meet.jonathanfors.com/discovery`). That CTA is pinned in the nav, in a
phone-only bottom bar, and repeated at every decision point.

Built with [Next.js 16](https://nextjs.org) (App Router) · React 19 ·
Tailwind CSS v4 · TypeScript. Deploys to Vercel. No page-builder or animation
dependencies — motion is hand-rolled CSS + a little IntersectionObserver.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (must pass before deploy)
npm run lint
```

## Design language

"Modern editorial brutalism, endurance grade" — a warm off-white **paper**
canvas, near-black **ink**, one decisive **Atlantic** accent, and full-bleed
dark photographic sections. Big Archivo display type over Inter body.

- **Palette + type + button styles + motion** live in
  [`app/globals.css`](app/globals.css) as CSS variables and utility classes
  (`.font-display`, `.text-display`, `.btn`, `.seal-ring`, `[data-reveal]`).
  Change the accent by editing `--atlantic*`; the paper/ink by `--paper*` /
  `--ink*`. Dark sections use `--night*` and add the `on-night` class.
- Fonts are self-hosted automatically by `next/font` in
  [`app/layout.tsx`](app/layout.tsx) with `display: swap`.

## Where the content lives

| What | Where |
| --- | --- |
| Links (booking, IG, LinkedIn, email, sponsor PDF), nav items | [`lib/site.ts`](lib/site.ts) → `siteLinks`, `nav` |
| Hard facts (route km, previous km, start date, cause, cert) | [`lib/site.ts`](lib/site.ts) → `facts` (keep in sync with `../CONTEXT.md`) |
| Home-page copy + section order | [`app/page.tsx`](app/page.tsx) |
| "Reasons to work with me" cards | [`app/page.tsx`](app/page.tsx) → `reasons` array |
| Project Portugal story panels | [`components/RouteScroll.tsx`](components/RouteScroll.tsx) |
| Hero promise + subcopy | [`components/Hero.tsx`](components/Hero.tsx) |
| Athlete intake (Notion embed, noindex) | [`app/athlete-intake/page.tsx`](app/athlete-intake/page.tsx) |

## Swapping images

All photos live in [`public/images/`](public/images) and are referenced by name
via `next/image`. To swap one, drop a new file with the **same name** (landscape
JPGs, ~2000px wide, work best) or change the `src` in the component. Current
photos and where they appear:

| File | Used in |
| --- | --- |
| `hero-coast-road.jpg` | Hero (also the OG/Twitter share image) |
| `coach-portrait.jpg` | Approach section portrait |
| `horses-road.jpg` | Full-bleed texture band |
| `cliff-figure.jpg` · `thermal-blanket.jpg` · `coast-road.jpg` · `embrace.jpg` | Project Portugal panels |
| `summit-stand.jpg` | Final CTA background |

Other optimized photos (`portrait-cap`, `portrait-night`, `cliff-stand`,
`night-headtorch`, `support-van`, `turbines`, `horses-hill`) are in
`public/images/` and ready to swap in.

## Testimonials

There's no live testimonials block yet — the slot currently shows **"Reasons to
work with me"** ([`app/page.tsx`](app/page.tsx), `reasons` array). When real
athlete quotes exist, that same three-up grid can hold them (quote, name,
detail). See [`PLACEHOLDERS.md`](PLACEHOLDERS.md).

## Conversion instrumentation

Every CTA carries `data-cta` and `data-cta-location` attributes.
[`components/CtaTracker.tsx`](components/CtaTracker.tsx) listens for clicks
(event delegation) and pushes a `cta_click` event to `window.dataLayer` and
fires a `cta:click` CustomEvent. Wire an analytics vendor to either without
touching the markup. No tracking vendor is bundled.

## SEO

Metadata, Open Graph, and Twitter cards are in [`app/layout.tsx`](app/layout.tsx).
JSON-LD (`Person` + coaching `Service`) is injected in
[`app/page.tsx`](app/page.tsx). `/athlete-intake` is `noindex`.

## Deploy

1. Push to GitHub.
2. Import at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected.
3. Add the domain `jonathanfors.com` in the Vercel project's **Domains** settings.

See [`PLACEHOLDERS.md`](PLACEHOLDERS.md) for everything still marked
`TODO:CONTENT` before launch.
