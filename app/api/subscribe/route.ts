import { NextResponse } from "next/server";
import { beehiivFields, experienceLevels } from "@/lib/site";

/**
 * Subscribe endpoint — posts to beehiiv from the server so the signup can
 * finish in place instead of navigating to beehiiv's confirmation page.
 *
 * It runs server-side for two reasons: the API key must never reach the
 * browser, and beehiiv sits behind Cloudflare, which blocks cross-origin
 * requests from a page anyway.
 *
 * The group waitlist forms also send a first name, which is written to a
 * beehiiv custom field (see `FIRST_NAME_FIELD`). The newsletter forms send an
 * address and nothing else.
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

/**
 * The beehiiv custom fields the group waitlist writes to.
 *
 * Each has to match a custom field that already exists on the publication
 * (beehiiv → Audience → Custom fields), name for name — beehiiv matches these
 * by their display name and doesn't create one on the fly. "Experience level"
 * is a list field, so its value has to be one of the options defined there too;
 * `experienceLevels` in `lib/site.ts` is that list, and the form can only
 * submit one of them.
 *
 * Overridable by env only so a rename in beehiiv doesn't need a deploy.
 */
const FIRST_NAME_FIELD =
  process.env.BEEHIIV_FIRST_NAME_FIELD ?? beehiivFields.firstName;
const EXPERIENCE_FIELD =
  process.env.BEEHIIV_EXPERIENCE_FIELD ?? beehiivFields.experience;

/** Long enough for any real first name, short enough to stop a paste-bomb. */
const MAX_NAME_LENGTH = 80;

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
  let firstName: unknown;
  let experience: unknown;
  try {
    ({ email, utmMedium, firstName, experience } = await request.json());
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  if (typeof email !== "string" || !LOOKS_LIKE_EMAIL.test(email.trim())) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  /**
   * Only the waitlist forms send these two, so absent ones are normal rather
   * than an error — the newsletter forms have no such fields. A blank string is
   * treated the same as absent so a whitespace-only value never lands in
   * beehiiv as somebody's name.
   */
  const name =
    typeof firstName === "string"
      ? firstName.trim().slice(0, MAX_NAME_LENGTH)
      : "";

  /**
   * Checked against the list rather than passed through: beehiiv's field only
   * accepts its own options, and anything else is a hand-made request rather
   * than one of our forms.
   */
  const level = experienceLevels.find((option) => option === experience);

  const customFields = [
    ...(name ? [{ name: FIRST_NAME_FIELD, value: name }] : []),
    ...(level ? [{ name: EXPERIENCE_FIELD, value: level }] : []),
  ];

  const payload = {
    email: email.trim(),
    // Matches the tagging the magic links used.
    utm_source: "jonathanfors.com",
    utm_medium: typeof utmMedium === "string" ? utmMedium : undefined,
    // A returning address shouldn't read as an error to the person typing it.
    reactivate_existing: true,
    // Both default to false on this endpoint, which would make a signup
    // here behave differently from one made through beehiiv itself.
    send_welcome_email: true,
    custom_fields: customFields.length ? customFields : undefined,
  };

  const send = (body: object) =>
    fetch(
      `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

  let response = await send(payload);

  /**
   * If beehiiv refuses the custom fields — one was renamed, deleted, or never
   * created, or a list option no longer matches — subscribe them anyway
   * without them. Losing the answers is a nuisance; losing the signup is the
   * thing that can't be undone. Logged loudly, because it means the fields
   * need fixing in beehiiv.
   */
  if (!response.ok && payload.custom_fields) {
    console.error(
      `beehiiv rejected the custom fields ` +
        `("${FIRST_NAME_FIELD}", "${EXPERIENCE_FIELD}") with ${response.status} — ` +
        `retrying without them. Check beehiiv → Audience → Custom fields. ` +
        (await response.text().catch(() => "")),
    );
    response = await send({ ...payload, custom_fields: undefined });
  }

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
