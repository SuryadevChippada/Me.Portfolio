import { useEffect, useState, type RefObject } from "react";

// Shows a "there's more below" hint while the panel has unscrolled content,
// hides it once the user reaches the bottom. Observes the scroll container's
// children (not the container itself, which has a fixed height and never
// resizes) so it catches AnimatePresence swapping in taller content.
export function useScrollHint(ref: RefObject<HTMLElement | null>, deps: unknown[]) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function check() {
      if (!el) return;
      const hasOverflow = el.scrollHeight - el.clientHeight > 4;
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 4;
      setVisible(hasOverflow && !atBottom);
    }

    check();
    el.addEventListener("scroll", check, { passive: true });
    const ro = new ResizeObserver(check);
    // AnimatePresence (mode="wait") exits the old child before mounting the
    // new one, so the container's content — and thus its scrollHeight —
    // keeps changing after this effect's first run. Observe children.
    Array.from(el.children).forEach((child) => ro.observe(child));
    const mo = new MutationObserver(() => {
      ro.disconnect();
      Array.from(el.children).forEach((child) => ro.observe(child));
      check();
    });
    mo.observe(el, { childList: true });
    return () => {
      el.removeEventListener("scroll", check);
      ro.disconnect();
      mo.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return visible;
}
