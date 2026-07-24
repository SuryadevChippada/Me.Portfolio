import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
}

// Subtle cursor-follow, used only on the "view repo" button.
export function MagneticButton({ href, children }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const frameRef = useRef<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reducedMotion = usePrefersReducedMotion();

  function handleMouseEnter() {
    rectRef.current = ref.current?.getBoundingClientRect() ?? null;
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (reducedMotion || !rectRef.current || frameRef.current !== null) return;
    const rect = rectRef.current;
    const clientX = e.clientX;
    const clientY = e.clientY;
    frameRef.current = requestAnimationFrame(() => {
      const relX = clientX - (rect.left + rect.width / 2);
      const relY = clientY - (rect.top + rect.height / 2);
      setPos({ x: relX * 0.25, y: relY * 0.25 });
      frameRef.current = null;
    });
  }

  function handleMouseLeave() {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setPos({ x: 0, y: 0 });
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn"
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.a>
  );
}
