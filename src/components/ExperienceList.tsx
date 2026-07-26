import { experience } from "../data/experience";

interface ExperienceListProps {
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onSelect: (id: string) => void;
}

export function ExperienceList({ onActivate, onDeactivate, onSelect }: ExperienceListProps) {
  return (
    <div className="tracklist">
      {experience.map((entry) => (
        <button
          key={entry.id}
          type="button"
          className="track-row exp-row"
          onMouseEnter={() => onActivate(entry.id)}
          onMouseLeave={() => onDeactivate(entry.id)}
          onFocus={() => onActivate(entry.id)}
          onBlur={() => onDeactivate(entry.id)}
          onClick={() => onSelect(entry.id)}
        >
          <span className="exp-row-main">
            <span className="track-title">{entry.role}</span>
            <span className="exp-row-meta">
              <span className="exp-org">{entry.organization}</span>
              <span className="track-category">{entry.dateRange}</span>
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
