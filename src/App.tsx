import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { usePreloadImages } from "./hooks/usePreloadImages";
import { Grain } from "./components/Grain";
import { AboutSide } from "./components/AboutSide";
import { ProjectsSide } from "./components/ProjectsSide";
import { projects } from "./data/projects";
import { experience } from "./data/experience";

type Side = "front" | "back";

const COVER_IMAGE_URLS = [...projects.map((p) => p.coverImage), ...experience.map((e) => e.coverImage)];

export default function App() {
  const [side, setSide] = useState<Side>("front");
  const [isFlipping, setIsFlipping] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  usePreloadImages(COVER_IMAGE_URLS);

  // The face not currently facing forward is still hit-testable and in the
  // accessibility tree despite backface-visibility:hidden, so it needs to be
  // pulled out of both explicitly — inert also removes it from tab order.
  useEffect(() => {
    if (frontRef.current) frontRef.current.inert = side !== "front";
    if (backRef.current) backRef.current.inert = side !== "back";
  }, [side]);

  return (
    <div className="app-shell">
      <Grain />
      <div aria-live="polite" className="sr-only">
        {side === "front" ? "showing about me" : "showing projects"}
      </div>

      <div className="frame-wrap">
        <motion.div
          className="frame-inner"
          animate={{ rotateY: side === "back" ? 180 : 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.85, ease: [0.4, 0.1, 0.2, 1] }}
          onAnimationStart={() => setIsFlipping(true)}
          onAnimationComplete={() => setIsFlipping(false)}
          style={{ willChange: isFlipping ? "transform" : "auto" }}
        >
          <div className="face" ref={frontRef} aria-hidden={side !== "front"}>
            <AboutSide onFlip={() => setSide("back")} />
          </div>
          <div className="face face-back" ref={backRef} aria-hidden={side !== "back"}>
            <ProjectsSide onFlip={() => setSide("front")} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
