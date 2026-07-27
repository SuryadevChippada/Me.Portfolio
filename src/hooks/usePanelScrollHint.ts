import { useEffect, useState, type RefObject } from "react";

// Shows a hint only while the panel's content actually overflows its
// locked height, hides once scrolled to the bottom. Observes the
// container's children (not the container itself, which has a fixed
// height and never resizes) so it catches content swaps.
export function usePanelScrollHint(ref: RefObject<HTMLElement | null>, deps: unknown[]) {
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
    Array.from(el.children).forEach((child) => ro.observe(child));
    return () => {
      el.removeEventListener("scroll", check);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return visible;
}
