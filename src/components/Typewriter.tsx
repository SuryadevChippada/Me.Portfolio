import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

interface TypewriterProps {
  text: string;
  speed?: number;
}

// Types `text` once on mount, then sits idle. `\n` renders as a line break.
export function Typewriter({ text, speed = 32 }: TypewriterProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(reducedMotion ? text.length : 0);

  useEffect(() => {
    if (reducedMotion) return;
    if (count >= text.length) return;
    const id = window.setTimeout(() => setCount((c) => c + 1), speed);
    return () => window.clearTimeout(id);
  }, [count, text, speed, reducedMotion]);

  const renderLines = (value: string) =>
    value.split("\n").map((line, i, arr) => (
      <span key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </span>
    ));

  if (reducedMotion) {
    return <span>{renderLines(text)}</span>;
  }

  return (
    <span>
      <span aria-hidden="true">{renderLines(text.slice(0, count))}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
