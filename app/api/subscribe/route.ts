import { NextResponse } from "next/server";

/**
 * Subscribe endpoint — posts to beehiiv from the server so the signup can
 * finish in place instead of navigating to beehiiv's confirmation page.
 *
 * It runs server-side for two reasons: the API key must never reach the
 * browser, and beehiiv sits behind Cloudflare, which blocks cross-origin
 * requests from a page anyway.
 *
 * Needs a beehiiv API key in the environment (beehiiv → Settings → API).
 * Without one this returns 503 and the form falls back to the magic link, so
 * signups keep working either way.
 */

/**
 * `BEEHIIV_API_KEY` is the intended name; `beehiiv` is accepted because that's
 * what the Vercel project was set up with. Either works — drop the fallback if
 * the variable is ever renamed.
 */
const apiKey = () => process.env.BEEHIIV_API_KEY ?? process.env.beehiiv;

const PUBLICATION_ID =
  process.env.BEEHIIV_PUBLICATION_ID ??
  "pub_7acd9c66-dec5-40ec-990a-bfd12f0e29e0";

/** Deliberately loose — real validation is beehiiv's job. */
const LOOKS_LIKE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const key = apiKey();
  if (!key) {
    return NextResponse.json(
      { error: "not_configured" },
      { status: 503 },
    );
  }

  let email: unknown;
  let utmMedium: unknown;
  try {
    ({ email, utmMedium } = await request.json());
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  if (typeof email !== "string" || !LOOKS_LIKE_EMAIL.test(email.trim())) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const response = await fetch(
    `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        // Matches the tagging the magic links used.
        utm_source: "jonathanfors.com",
        utm_medium: typeof utmMedium === "string" ? utmMedium : undefined,
        // A returning address shouldn't read as an error to the person typing it.
        reactivate_existing: true,
        // Both default to false on this endpoint, which would make a signup
        // here behave differently from one made through beehiiv itself.
        send_welcome_email: true,
      }),
    },
  );

  if (!response.ok) {
    // Surface the status for the logs; the visitor just sees "try again".
    console.error(
      `beehiiv subscribe failed: ${response.status} ${await response
        .text()
        .catch(() => "")}`,
    );
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
