import { projects } from "../data/projects";
import { Typewriter } from "./Typewriter";

interface TracklistProps {
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onSelect: (id: string) => void;
}

export function Tracklist({ onActivate, onDeactivate, onSelect }: TracklistProps) {
  return (
    <>
      <h1 className="hero-line">
        <Typewriter text={"i make machines\nthat see."} />
      </h1>
      <p className="hero-sub">computer vision, edge inference, and the tooling around it.</p>
      <div className="tracklist">
        {projects.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className="track-row"
            onMouseEnter={() => onActivate(p.id)}
            onMouseLeave={() => onDeactivate(p.id)}
            onFocus={() => onActivate(p.id)}
            onBlur={() => onDeactivate(p.id)}
            onClick={() => onSelect(p.id)}
          >
            <span className="track-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="track-title">{p.title}</span>
            <span className="track-category">{p.category}</span>
          </button>
        ))}
      </div>
    </>
  );
}
