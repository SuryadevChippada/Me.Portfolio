import { useRef, useState } from "react";
import { projects } from "../data/projects";
import { logEntries } from "../data/log";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useIsCompact } from "../hooks/useIsCompact";
import { useLockedHeight } from "../hooks/useLockedHeight";
import { usePanelScrollHint } from "../hooks/usePanelScrollHint";
import { EyesMark } from "./EyesMark";
import { Disc } from "./Disc";
import { Tracklist } from "./Tracklist";
import { ProjectDetail } from "./ProjectDetail";
import { LogList } from "./LogList";
import { LogDetail } from "./LogDetail";
import { ScrollHint } from "./ScrollHint";
import { Typewriter } from "./Typewriter";

interface ProjectsSideProps {
  onFlip: () => void;
}

type View = "projects" | "log";

interface SleeveItem {
  id: string;
  title: string;
  tagline: string;
  labelColor: string;
  coverImage: string | null;
}

const projectItems: SleeveItem[] = projects.map((p) => ({
  id: p.id,
  title: p.title,
  tagline: p.tagline,
  labelColor: p.labelColor,
  coverImage: p.coverImage,
}));

const logItems: SleeveItem[] = logEntries.map((e) => ({
  id: e.slug,
  title: e.title,
  tagline: e.tagline,
  labelColor: e.labelColor,
  coverImage: e.coverImage,
}));

export function ProjectsSide({ onFlip }: ProjectsSideProps) {
  const [view, setView] = useState<View>("projects");
  const [rotations, setRotations] = useState<Record<string, number>>(() =>
    Object.fromEntries([...projectItems, ...logItems].map((item) => [item.id, 0]))
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lockedId, setLockedId] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const compact = useIsCompact();
  const { ref: contentColRef, height: lockedHeight } = useLockedHeight<HTMLDivElement>();
  const panelScrollRef = useRef<HTMLDivElement>(null);
  const showScrollHint = usePanelScrollHint(panelScrollRef, [lockedId, view]);

  const items = view === "projects" ? projectItems : logItems;
  const effectiveId = lockedId ?? activeId;
  const displayItem = items.find((item) => item.id === effectiveId) ?? items[0];
  const lockedIndex = lockedId ? items.findIndex((item) => item.id === lockedId) : -1;

  function switchView(next: View) {
    setView(next);
    setActiveId(null);
    setLockedId(null);
  }

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

  const displayProject = view === "projects" ? projects.find((p) => p.id === displayItem?.id) : undefined;
  const displayLogEntry = view === "log" ? logEntries.find((e) => e.slug === displayItem?.id) : undefined;

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
            : `${String(items.length).padStart(2, "0")} tracks`}
        </span>
      </div>

      <div className="frame-body">
        <div className="sleeve-col">
          <div className="sleeve-stage">
            {!compact && (
              <div className="disc-layer">
                {items.map((item) => (
                  <Disc
                    key={item.id}
                    labelColor={item.labelColor}
                    x={effectiveId === item.id ? 72 : 0}
                    rotation={rotations[item.id] ?? 0}
                    zIndex={effectiveId === item.id ? 10 : 1}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
            )}
            <div className="sleeve">
              {displayItem?.coverImage ? (
                <img
                  key={displayItem.id}
                  src={displayItem.coverImage}
                  alt={`${displayItem.title} sleeve art`}
                  className="sleeve-cover fade-in"
                />
              ) : (
                <span key={displayItem?.id ?? "empty"} className="sleeve-title fade-in">
                  {displayItem?.title ?? "—"}
                </span>
              )}
            </div>
          </div>
          <p key={displayItem?.id ?? "empty"} className="sleeve-caption fade-in">
            {displayItem?.tagline ?? ""}
          </p>
        </div>

        <div className="content-col" ref={contentColRef} style={lockedHeight ? { height: lockedHeight } : undefined}>
          <div className="panel-scroll" ref={panelScrollRef}>
            {lockedId ? (
              <div key="detail" className="fade-in">
                {view === "projects" && displayProject && <ProjectDetail project={displayProject} onBack={dismiss} />}
                {view === "log" && displayLogEntry && <LogDetail entry={displayLogEntry} onBack={dismiss} />}
              </div>
            ) : (
              <div key="list" className="fade-in">
                <h1 className="hero-line">
                  <Typewriter text="the workshop." />
                </h1>
                <div className="view-tabs">
                  <button
                    type="button"
                    className={`view-tab${view === "projects" ? " view-tab-active" : ""}`}
                    onClick={() => switchView("projects")}
                  >
                    projects
                  </button>
                  <button
                    type="button"
                    className={`view-tab${view === "log" ? " view-tab-active" : ""}`}
                    onClick={() => switchView("log")}
                  >
                    log
                  </button>
                </div>
                {view === "projects" ? (
                  <Tracklist onActivate={activate} onDeactivate={deactivate} onSelect={select} />
                ) : (
                  <LogList onActivate={activate} onDeactivate={deactivate} onSelect={select} />
                )}
              </div>
            )}
          </div>
          <ScrollHint
            visible={showScrollHint}
            className="scroll-hint-panel"
            onClick={() =>
              panelScrollRef.current?.scrollTo({ top: panelScrollRef.current.scrollHeight, behavior: "smooth" })
            }
          />
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
