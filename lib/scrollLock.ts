/**
 * Body scroll lock, reference-counted.
 *
 * Two overlays lock page scrolling: the mobile nav menu and the booking modal.
 * On a phone they always overlap — the nav's Book button is hidden below `sm`,
 * so the only route to the booking CTA is through the menu, which means the
 * modal opens while the menu's lock is still held.
 *
 * When each component wrote `document.body.style.overflow` for itself, whichever
 * effect ran last won. The menu's cleanup could clear the lock while the modal
 * still needed it, or — the case that stranded people — the modal's cleanup
 * could run before the menu's, leaving `overflow: hidden` on the body after both
 * had closed. With `html { height: 100% }` that makes the page genuinely
 * unscrollable, and nothing on the page clears it again.
 *
 * So: one owner and one counter. The first lock records whatever was on the
 * element already; the last release puts that back. Callers get a release
 * function rather than a matching `unlock()` to call, because a release that
 * fires twice (React re-running a cleanup) would otherwise decrement the count
 * for an overlay that is still open.
 */

let locks = 0;
let previousOverflow: string | null = null;

/**
 * Lock body scrolling. Returns the matching release, which is safe to call more
 * than once — only the first call counts.
 */
export function lockBodyScroll(): () => void {
  if (locks === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  locks += 1;

  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks === 0) {
      document.body.style.overflow = previousOverflow ?? "";
      previousOverflow = null;
    }
  };
}
