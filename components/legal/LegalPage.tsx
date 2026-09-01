import Link from "next/link";
import type { ReactNode } from "react";
import SlashMark from "@/components/SlashMark";
import { InstagramIcon, MailIcon } from "@/components/icons";
import { legal, siteLinks } from "@/lib/site";

/**
 * Shared shell for the two legal pages (`/privacy`, `/terms`).
 *
 * Both are long, numbered, and read rather than scanned, so this deliberately
 * turns the club language down: an ink header band for the title, then a paper
 * sheet with one column of prose at a readable measure and the contents list
 * pinned beside it on wide screens. The slashes, the hollow numeral and the
 * small-caps labels are the only motifs that carry over — enough that the page
 * belongs to the site, not enough to fight the text.
 *
 * The content lives in the two page files as `Block[]`, built with the helpers
 * below, and is mirrored in `COPY.md` §14–15. Paragraph content is `ReactNode`
 * rather than `string` so a clause can carry a link without a markdown parser.
 */

/**
 * A block of a legal page. Each one renders with a `data-block` attribute
 * naming its kind — the pages are mirrored in `COPY.md` §14–15, and tagging the
 * output means that mirror can be regenerated from the rendered page instead of
 * being retyped and drifting a clause at a time.
 */
export type Block =
  | { kind: "p"; content: ReactNode }
  | { kind: "h"; content: string }
  | { kind: "ul"; items: ReactNode[] }
  | { kind: "dl"; items: readonly { term: string; body: ReactNode }[] }
  | { kind: "note"; content: ReactNode };

export type LegalSection = {
  /** Anchor + contents-list target. Permanent once a link to it is shared. */
  id: string;
  heading: string;
  blocks: Block[];
};

export const p = (content: ReactNode): Block => ({ kind: "p", content });
export const h = (content: string): Block => ({ kind: "h", content });
export const ul = (items: ReactNode[]): Block => ({ kind: "ul", items });
export const dl = (
  items: readonly { term: string; body: ReactNode }[],
): Block => ({ kind: "dl", items });
export const note = (content: ReactNode): Block => ({ kind: "note", content });

/** Inline link, styled once so every clause in both pages matches. */
export function A({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "text-ink underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-red";
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "p":
            return (
              <p key={i} data-block="p" className="mt-4 leading-relaxed text-ink-soft">
                {block.content}
              </p>
            );
          case "h":
            return (
              <p
                key={i}
                data-block="h"
                className="font-club-upright mt-8 text-base text-ink first:mt-0"
              >
                {block.content}
              </p>
            );
          case "ul":
            return (
              <ul key={i} data-block="ul" className="mt-4 flex flex-col gap-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 leading-relaxed text-ink-soft">
                    <SlashMark
                      aria-hidden="true"
                      className="mt-2 h-3 w-[0.85rem] shrink-0 text-red"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "dl":
            return (
              <dl
                key={i}
                data-block="dl"
                className="mt-5 flex flex-col border-t border-rule"
              >
                {block.items.map(({ term, body }) => (
                  <div
                    key={term}
                    className="border-b border-rule py-4 sm:grid sm:grid-cols-[13rem_1fr] sm:gap-6"
                  >
                    <dt className="club-label text-[0.66rem] text-ink sm:pt-1">
                      {term}
                    </dt>
                    <dd className="mt-2 leading-relaxed text-ink-soft sm:mt-0">
                      {body}
                    </dd>
                  </div>
                ))}
              </dl>
            );
          case "note":
            return (
              <div
                key={i}
                data-block="note"
                className="mt-6 border-l-2 border-red bg-red-tint/60 px-5 py-4"
              >
                <p className="leading-relaxed text-ink-soft">{block.content}</p>
              </div>
            );
        }
      })}
    </>
  );
}

export default function LegalPage({
  eyebrow,
  title,
  titleAccent,
  intro,
  sections,
  other,
}: {
  /** Small-caps line above the title. */
  eyebrow: string;
  title: string;
  /** Trailing words of the title, set in red. */
  titleAccent: string;
  /** One or two paragraphs under the title, on the ink band. */
  intro: ReactNode;
  sections: LegalSection[];
  /** The sibling legal page, linked from the foot. */
  other: { label: string; href: string };
}) {
  return (
    <div className="club pt-16 sm:pt-[4.5rem]">
      {/* ---- Header band ------------------------------------------------ */}
      <section className="club-on-ink relative overflow-hidden bg-ink text-snow">
        <div
          aria-hidden="true"
          className="club-slashes pointer-events-none absolute -right-16 -top-16 h-[46vw] max-h-[30rem] w-[52vw] max-w-[36rem] text-red/[0.13] [--bar:12px] [--gap:40px] sm:-right-28 sm:[--bar:20px] sm:[--gap:66px]"
        />

        <div className="relative mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16">
          <div className="flex items-center gap-3">
            <SlashMark className="h-4 w-[1.1rem] shrink-0 text-red" />
            <p data-band="eyebrow" className="club-label text-snow-dim">{eyebrow}</p>
          </div>

          <h1 className="font-club text-club-lg mt-6 max-w-[20ch] text-snow">
            {title} <span className="text-red-bright">{titleAccent}</span>
          </h1>

          <div data-band="intro" className="mt-6 max-w-2xl text-lg leading-relaxed text-snow-dim">
            {intro}
          </div>

          <p className="club-label mt-8 text-[0.66rem] text-snow-dim">
            Last updated {legal.updated}
          </p>
        </div>
      </section>

      {/* ---- The document ----------------------------------------------- */}
      <section className="border-t-2 border-red bg-paper text-ink">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-8 sm:py-20">
          <div className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-12">
            {/* Contents. A plain list on a phone, pinned beside the text from
                1024px up — the pages are long enough that scrolling back to
                the top to find section 9 is the main way to read them. */}
            <nav
              aria-label="Contents"
              className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start"
            >
              <p className="club-label text-ink-faint">Contents</p>
              <ol className="mt-5 flex flex-col border-t-2 border-ink">
                {sections.map((section, i) => (
                  <li key={section.id} className="border-b border-rule">
                    <a
                      href={`#${section.id}`}
                      className="flex items-baseline gap-3 py-2.5 text-ink-soft transition-colors hover:text-red"
                    >
                      <span className="club-numeral shrink-0 text-sm text-red">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{section.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="lg:col-span-8">
              {sections.map((section, i) => (
                <section
                  key={section.id}
                  id={section.id}
                  // scroll-mt clears the fixed nav: an anchor jump would
                  // otherwise land the heading underneath it.
                  className="scroll-mt-24 border-t-2 border-ink pt-7 first:border-t-0 first:pt-0 [&+section]:mt-14"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      aria-hidden="true"
                      className="club-numeral shrink-0 text-3xl text-red"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-club text-club-sm text-ink">
                      {section.heading}
                    </h2>
                  </div>

                  <div className="mt-5 max-w-[70ch]">
                    <Blocks blocks={section.blocks} />
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Footer — one line, like the other standalone pages ---------- */}
      <footer className="club-on-ink border-t-2 border-snow/15 bg-ink text-snow">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-5 py-8 text-sm text-snow-dim sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            Also worth reading:{" "}
            <Link
              href={other.href}
              className="text-snow underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-red-bright"
            >
              {other.label}
            </Link>
            . Back to{" "}
            <Link
              href="/"
              className="text-snow underline decoration-red decoration-2 underline-offset-4 transition-colors hover:text-red-bright"
            >
              jonathanfors.com
            </Link>
            .
          </p>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${siteLinks.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-red-bright"
            >
              <MailIcon className="h-4 w-4" />
              Email
            </a>
            <a
              href={siteLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-red-bright"
            >
              <InstagramIcon className="h-4 w-4" />
              Instagram
            </a>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[1400px] px-5 pb-8 text-xs text-snow-dim/70 sm:px-8">
          <p>
            {legal.company} · {legal.address} · ©{" "}
            {new Date().getFullYear()} Jonathan Fors. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
