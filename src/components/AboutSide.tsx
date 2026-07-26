import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experience } from "../data/experience";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useIsCompact } from "../hooks/useIsCompact";
import { EyesMark } from "./EyesMark";
import { Disc } from "./Disc";
import { ExperienceList } from "./ExperienceList";
import { ExperienceDetail } from "./ExperienceDetail";
import { GithubIcon, LinkedinIcon, EmailIcon } from "./SocialIcons";

interface AboutSideProps {
  onFlip: () => void;
}

const BIO_PARAGRAPHS = [
  "I'm a computer science student at tu darmstadt who enjoys building practical systems and exploring different areas of computer science.",
  "As one of the founding members of flare darmstadt e.v., i gained hands-on experience in computer vision and ai by developing end-to-end yolo-based pipelines for aerial wildfire detection. this included working with python, opencv, pytorch, raspberry pi, and edge deployment, achieving sub-100ms inference latency on limited hardware.",
  "I enjoy working on projects where software has to move beyond a notebook or prototype and perform reliably in real-world conditions. for me, the most interesting part is understanding the constraints, solving the engineering problems, and turning an idea into something that actually works.",
];

const CREDIT_LINES = ["python · pytorch", "fastapi · sqlite", "react · angular", "typescript", "raspberry pi"];
const LANGUAGE_LINES = ["english · german", "telugu · hindi"];

const EDUCATION = {
  degree: "b.sc. computer science",
  school: "tu darmstadt",
  dateRange: "oct 2023 — present · 6th semester",
  coursework: [
    "artificial intelligence",
    "automata & formal languages",
    "digital design",
    "functional & object-oriented programming",
    "software engineering",
    "visual computing",
  ],
};

const LINKS = [
  { label: "github", href: "https://github.com/SuryadevChippada", Icon: GithubIcon },
  { label: "linkedin", href: "https://www.linkedin.com/in/suryadev-chippada", Icon: LinkedinIcon },
  { label: "email", href: "mailto:chippadasurya8@gmail.com", Icon: EmailIcon },
];

function LineBlock({ lines }: { lines: string[] }) {
  return (
    <p className="meta-value">
      {lines.map((line, i) => (
        <Fragment key={line}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </p>
  );
}

export function AboutSide({ onFlip }: AboutSideProps) {
  const [rotations, setRotations] = useState<Record<string, number>>(() =>
    Object.fromEntries(experience.map((e) => [e.id, 0]))
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lockedId, setLockedId] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const compact = useIsCompact();

  const effectiveId = lockedId ?? activeId;
  const displayEntry = experience.find((e) => e.id === effectiveId) ?? experience[0];

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
        <span className="corner-label">liner notes</span>
      </div>

      <div className="bio-row">
        <div className="bio-col">
          {BIO_PARAGRAPHS.map((p) => (
            <p className="bio-p" key={p}>
              {p}
            </p>
          ))}

          <div className="section-label">experience</div>
          <div className="exp-block">
            <div className="sleeve-col exp-sleeve-col">
              <div className="sleeve-stage">
                {!compact && (
                  <div className="disc-layer">
                    {experience.map((e) => (
                      <Disc
                        key={e.id}
                        labelColor={e.labelColor}
                        x={effectiveId === e.id ? 72 : 0}
                        rotation={rotations[e.id]}
                        zIndex={effectiveId === e.id ? 10 : 1}
                        reducedMotion={reducedMotion}
                      />
                    ))}
                  </div>
                )}
                <div className="sleeve">
                  <AnimatePresence mode="wait">
                    {displayEntry.coverImage ? (
                      <motion.img
                        key={displayEntry.id}
                        src={displayEntry.coverImage}
                        alt={`${displayEntry.sleeveTitle} sleeve art`}
                        className="sleeve-cover"
                        initial={reducedMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reducedMotion ? undefined : { opacity: 0 }}
                        transition={{ duration: reducedMotion ? 0 : 0.18 }}
                      />
                    ) : (
                      <motion.span
                        key={displayEntry.id}
                        className="sleeve-title"
                        initial={reducedMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reducedMotion ? undefined : { opacity: 0 }}
                        transition={{ duration: reducedMotion ? 0 : 0.18 }}
                      >
                        {displayEntry.sleeveTitle}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={displayEntry.id}
                  className="sleeve-caption"
                  initial={reducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.18 }}
                >
                  {displayEntry.sleeveTagline}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="content-col exp-content-col">
              <div className="panel-scroll">
                <AnimatePresence mode="wait">
                  {lockedId ? (
                    <motion.div
                      key="exp-detail"
                      initial={reducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reducedMotion ? undefined : { opacity: 0 }}
                      transition={{ duration: reducedMotion ? 0 : 0.2 }}
                    >
                      <ExperienceDetail entry={displayEntry} onBack={dismiss} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="exp-list"
                      initial={reducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reducedMotion ? undefined : { opacity: 0 }}
                      transition={{ duration: reducedMotion ? 0 : 0.2 }}
                    >
                      <ExperienceList onActivate={activate} onDeactivate={deactivate} onSelect={select} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="meta-col">
          <div className="meta-label">credits</div>
          <LineBlock lines={CREDIT_LINES} />

          <div className="meta-label">education</div>
          <div className="edu-detail">
            <p className="meta-value">
              {EDUCATION.degree}
              <br />
              {EDUCATION.school}
            </p>
            <p className="edu-dates">{EDUCATION.dateRange}</p>
            <ul className="edu-coursework">
              {EDUCATION.coursework.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </div>

          <div className="meta-label">languages</div>
          <LineBlock lines={LANGUAGE_LINES} />

          <div className="meta-label">find me</div>
          <div className="meta-links">
            {LINKS.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <motion.span
                  className="social-icon"
                  whileHover={reducedMotion ? undefined : { scale: 1.15, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                >
                  <Icon />
                </motion.span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="frame-footer split">
        <span className="location-text">darmstadt, germany</span>
        <button type="button" className="btn" onClick={onFlip} aria-label="flip to projects">
          projects
        </button>
      </div>
    </>
  );
}
