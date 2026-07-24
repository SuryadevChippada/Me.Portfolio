import { motion } from "framer-motion";

interface DiscProps {
  labelColor: string;
  x: number;
  rotation: number;
  zIndex: number;
  reducedMotion: boolean;
}

// Z-order is load-bearing here: this disc sits BEHIND the opaque .sleeve
// element (the sleeve has a higher static z-index than any disc ever
// reaches). At x:0 the sleeve fully hides it; sliding to x:72 only exposes
// the sliver past the sleeve's right edge. If the sleeve's z-index is ever
// dropped below the disc's, the "record sliding out" illusion collapses
// into a circle just floating on top of its cover.
export function Disc({ labelColor, x, rotation, zIndex, reducedMotion }: DiscProps) {
  return (
    <motion.div
      className="disc"
      aria-hidden="true"
      style={{ zIndex }}
      animate={{ x, rotate: rotation }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <span className="disc-groove" style={{ width: "80%" }} />
      <span className="disc-groove" style={{ width: "64%" }} />
      <span className="disc-label" style={{ background: labelColor }} />
      <span className="disc-spindle" />
    </motion.div>
  );
}
