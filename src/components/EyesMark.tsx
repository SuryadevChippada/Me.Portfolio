import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const MAX_OFFSET = 1.4;

// Eyes track the cursor anywhere on the page. Position is read from
// mousemove but only ever applied as a transform, rAF-gated so it costs at
// most one measurement + one state update per frame. Plain CSS transition
// rather than Framer Motion here — motion.g on this SVG shape silently
// no-ops (no style ever gets applied), so a manual transform is the
// reliable path for this one element.
export function EyesMark() {
  const svgRef = useRef<SVGSVGElement>(null);
  const frameRef = useRef<number | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    function handleMove(e: MouseEvent) {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        const el = svgRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        setOffset({ x: (dx / dist) * MAX_OFFSET, y: (dy / dist) * MAX_OFFSET });
      });
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [reducedMotion]);

  const eyeStyle = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: reducedMotion ? "none" : "transform 0.15s ease-out",
  };

  return (
    <svg
      ref={svgRef}
      className="mark-svg"
      width="38"
      height="20"
      viewBox="0 0 34 18"
      fill="none"
      aria-hidden="true"
    >
      {/* open-bottom arc */}
      <path
        d="M1.5 17V15C1.5 7.54 7.54 1.5 15 1.5H19C26.46 1.5 32.5 7.54 32.5 15V17"
        stroke="var(--text-primary)"
        strokeWidth="1.5"
      />
      <g style={eyeStyle}>
        <circle cx="12.5" cy="13.5" r="1.75" fill="var(--text-primary)" />
      </g>
      <g style={eyeStyle}>
        <circle cx="21.5" cy="13.5" r="1.75" fill="var(--text-primary)" />
      </g>
    </svg>
  );
}
