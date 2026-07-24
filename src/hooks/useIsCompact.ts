import { useEffect, useState } from "react";

const QUERY = "(max-width: 640px)";

// Below this width there's no hover, so the disc slide is dropped in favor
// of tapping a track straight into the detail view.
export function useIsCompact(): boolean {
  const [compact, setCompact] = useState(() => window.matchMedia(QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    const onChange = () => setCompact(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return compact;
}
