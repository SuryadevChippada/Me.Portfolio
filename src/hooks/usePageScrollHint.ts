import { useEffect, useState } from "react";

// Shows a hint only when the whole page — not an internal fixed-height
// panel — is taller than the viewport and needs scrolling.
export function usePageScrollHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function check() {
      const doc = document.documentElement;
      const hasOverflow = doc.scrollHeight - window.innerHeight > 4;
      const atBottom = doc.scrollHeight - window.scrollY - window.innerHeight < 4;
      setVisible(hasOverflow && !atBottom);
    }

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    const ro = new ResizeObserver(check);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      ro.disconnect();
    };
  }, []);

  return visible;
}
