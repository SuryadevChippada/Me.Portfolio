import { projects } from "../data/projects";

interface TracklistProps {
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onSelect: (id: string) => void;
}

export function Tracklist({ onActivate, onDeactivate, onSelect }: TracklistProps) {
  return (
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
  );
}
