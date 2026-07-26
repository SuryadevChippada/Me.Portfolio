import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const MAX_OFFSET = 4;

// Pupil centers as percentages of the portrait's own box, measured from the
// source art (public/avatar.png) — the original pupils were erased and
// these overlays take their place so they can track the cursor.
const LEFT_EYE = { x: 36.92, y: 50.99 };
const RIGHT_EYE = { x: 62.19, y: 50.99 };

// Same tracking approach as the old abstract mark: rAF-throttled mousemove,
// applied as a plain CSS transform (Framer Motion's motion.g/circle silently
// no-ops on these shapes in the installed version, so this sidesteps it).
export function EyesMark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    function handleMove(e: MouseEvent) {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        const el = wrapRef.current;
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

  const pupilStyle = {
    transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
    transition: reducedMotion ? "none" : "transform 0.15s ease-out",
  };

  return (
    <div ref={wrapRef} className="avatar-mark" aria-hidden="true">
      <img src="/avatar.png" alt="" className="avatar-mark-img" />
      <span className="avatar-pupil" style={{ ...pupilStyle, left: `${LEFT_EYE.x}%`, top: `${LEFT_EYE.y}%` }} />
      <span className="avatar-pupil" style={{ ...pupilStyle, left: `${RIGHT_EYE.x}%`, top: `${RIGHT_EYE.y}%` }} />
    </div>
  );
}
