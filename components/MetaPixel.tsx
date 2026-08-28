"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Meta (Facebook) Pixel.
 *
 * The base snippet below is Meta's own, unmodified — it loads fbevents.js,
 * calls `fbq('init', …)` and fires the first PageView. `afterInteractive` keeps
 * it off the critical path; it still runs on every page because this component
 * is mounted in the root layout.
 *
 * The extra bit Meta's snippet doesn't cover: the site navigates client-side
 * (`/` → `/waitlist` → `/newsletter` never reloads the document), so the
 * snippet's one PageView would be the only one ever sent. The effect fires a
 * PageView on each subsequent pathname change. It compares against the last
 * path it reported — seeded with the path we mounted on, which the snippet has
 * already counted — rather than a "first run" flag, so a re-run of the effect
 * on the same path (StrictMode in dev, a remount) can't double-count.
 *
 * Unlike Vercel Analytics, this does set cookies and send data to Meta.
 */
const PIXEL_ID = "1576465530841059";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function MetaPixel() {
  const pathname = usePathname();
  const lastTracked = useRef(pathname);

  useEffect(() => {
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
