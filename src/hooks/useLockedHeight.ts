import { useLayoutEffect, useRef, useState } from "react";

// Measures the element's natural height once, at rest (before any content
// swap), and locks it in. Flexbox stretch alone can't cap height here — with
// two flex columns both sized by content, they grow together with nothing
// to anchor against, so swapping in taller content pulls the whole card
// taller. A real fixed height (with overflow handled by the caller) is the
// only reliable cap.
export function useLockedHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (ref.current && height === null) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, height };
}
