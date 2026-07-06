# jonathanfors.com

Landing page for Jonathan Fors — ultra endurance running coach — and **Project Portugal 2026**, a ~900km coastline run raising awareness and funds for men's mental health.

Built with [Next.js 16](https://nextjs.org) (App Router) + Tailwind CSS v4. Deploys to Vercel.

## Add the hero photo

The full-bleed parallax section expects a photo at:

```
public/images/hero-running.jpg
```

Drop your running photo there (a landscape shot works best). Until you do, a placeholder graphic is shown. To use a different filename, update the `image` prop in [`app/page.tsx`](app/page.tsx).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Edit content

- **Links** (booking, Instagram, LinkedIn, email) — [`lib/site.ts`](lib/site.ts)
- **Copy** (coach intro, project description, sponsors) — [`app/page.tsx`](app/page.tsx)
- **Colors / theme** — [`app/globals.css`](app/globals.css)

## Deploy

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is detected automatically, no config needed.
3. Add the custom domain `jonathanfors.com` in the Vercel project's **Domains** settings.
