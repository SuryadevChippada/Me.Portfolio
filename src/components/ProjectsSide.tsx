import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "../data/projects";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useIsCompact } from "../hooks/useIsCompact";
import { EyesMark } from "./EyesMark";
import { Disc } from "./Disc";
import { Tracklist } from "./Tracklist";
import { ProjectDetail } from "./ProjectDetail";

interface ProjectsSideProps {
  onFlip: () => void;
}

export function ProjectsSide({ onFlip }: ProjectsSideProps) {
  const [rotations, setRotations] = useState<Record<string, number>>(() =>
    Object.fromEntries(projects.map((p) => [p.id, 0]))
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lockedId, setLockedId] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const compact = useIsCompact();

  const effectiveId = lockedId ?? activeId;
  const displayProject = projects.find((p) => p.id === effectiveId) ?? projects[0];
  const lockedIndex = lockedId ? projects.findIndex((p) => p.id === lockedId) : -1;

  function activate(id: string) {
    setRotations((prev) => (activeId === id ? prev : { ...prev, [id]: prev[id] + 170 }));
    setActiveId(id);
  }

  function deactivate(id: string) {
    if (lockedId) return;
    setActiveId((current) => (current === id ? null : current));
  }

  function select(id: string) {
    setRotations((prev) => (activeId === id ? prev : { ...prev, [id]: prev[id] + 170 }));
    setActiveId(id);
    setLockedId(id);
  }

  function dismiss() {
    setLockedId(null);
    setActiveId(null);
  }

  return (
    <>
      <div className="frame-header">
        <div className="mark-row">
          <EyesMark />
          <span className="mark-name">surya</span>
        </div>
        <span className="corner-label">
          {lockedIndex >= 0
            ? `track ${String(lockedIndex + 1).padStart(2, "0")}`
            : `${String(projects.length).padStart(2, "0")} tracks`}
        </span>
      </div>

      <div className="frame-body">
        <div className="sleeve-col">
          <div className="sleeve-stage">
            {!compact && (
              <div className="disc-layer">
                {projects.map((p) => (
                  <Disc
                    key={p.id}
                    labelColor={p.labelColor}
                    x={effectiveId === p.id ? 72 : 0}
                    rotation={rotations[p.id]}
                    zIndex={effectiveId === p.id ? 10 : 1}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
            )}
            <div className="sleeve">
              <AnimatePresence mode="wait">
                {displayProject.coverImage ? (
                  <motion.img
                    key={displayProject.id}
                    src={displayProject.coverImage}
                    alt={`${displayProject.title} sleeve art`}
                    className="sleeve-cover"
                    initial={reducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reducedMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.18 }}
                  />
                ) : (
                  <motion.span
                    key={displayProject.id}
                    className="sleeve-title"
                    initial={reducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reducedMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.18 }}
                  >
                    {displayProject.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={displayProject.id}
              className="sleeve-caption"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.18 }}
            >
              {displayProject.tagline}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="content-col">
          <div className="panel-scroll">
            <AnimatePresence mode="wait">
              {lockedId ? (
                <motion.div
                  key="detail"
                  initial={reducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.2 }}
                >
                  <ProjectDetail project={displayProject} onBack={dismiss} />
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={reducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.2 }}
                >
                  <Tracklist onActivate={activate} onDeactivate={deactivate} onSelect={select} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="frame-footer">
        <button type="button" className="btn" onClick={onFlip} aria-label="flip back to about me">
          back
        </button>
      </div>
    </>
  );
}
