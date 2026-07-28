# Placeholder content — fill before / after launch

Every spot on the site that uses placeholder content or an assumption Jonathan
should confirm. Nothing here fabricates coaching specifics, prices, or facts —
those are intentionally left open per the brief.

## 1. Coaching specifics — `app/page.tsx` (section 3, marked `TODO:CONTENT`)

The "How coaching works" section describes the **process** (intro call → intake
→ tailored plan → ongoing adjustment) but deliberately does **not** state
concrete deliverables, communication cadence, tools, or pricing. The callout
card ("Programs are tailored, not off-the-shelf") funnels those questions to the
intro call instead.

**Action:** either leave as-is (funnels to the call) or fill in real specifics.
Do not invent tiers/prices — get them from Jonathan.

## 2. Testimonials → currently "Reasons to work with me" — `app/page.tsx` (`reasons` array)

No real athlete testimonials yet, so the social-proof slot shows three grounded
"reasons to work with me" cards instead. The copy there is real, not filler.

**Action:** when athlete quotes exist, swap the `reasons` cards back to a
testimonials layout (quote / name / detail — the three-up grid already fits it).

## 3. Sponsor logos — `components/SponsorGrid.tsx`

Three dashed "Your brand here" slots. Clicking one copies the sponsor email.

**Action:** replace each slot with a real partner logo as sponsors come on board.

## 4. Photo identity — please confirm

The photos in `public/images/` came from the unlabeled library in `../Photos/`.
I selected and cropped them by visual content and wrote alt text that infers who
is pictured (e.g. "Jonathan …"). Two things to check:

- **Confirm the hero, portrait, and "Jonathan" photos are the right people** and
  that you're happy to use them publicly. Alt text is in each component.
- **Support / "Niki drives the van" panel** (`components/RouteScroll.tsx`,
  panel 5) intentionally uses an empty coastal road (`coast-road.jpg`) rather
  than the van-interior photo, because I couldn't confirm the driver in that
  shot was Niki. **Swap in a real photo of Niki** here if you have one.

## 5. Open Graph / share image — `app/layout.tsx`

Social shares currently reuse the hero photo (`hero-coast-road.jpg`), not a
purpose-built card. Optional: add a dedicated 1200×630 OG image with the
wordmark/promise baked in.

## 6. Favicon

Unchanged — the existing JF monogram tile at `app/icon.svg`.

---

Everything else (booking link, athlete-intake form, Instagram, LinkedIn, email,
route/distance facts) is real and pulled from `lib/site.ts` — keep those in sync
with `../CONTEXT.md`.
