import { logEntries } from "../data/log";

interface LogListProps {
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onSelect: (id: string) => void;
}

export function LogList({ onActivate, onDeactivate, onSelect }: LogListProps) {
  if (logEntries.length === 0) {
    return <p className="hero-sub">no posts yet — drop a .md file in src/content/log/.</p>;
  }

  return (
    <div className="tracklist">
      {logEntries.map((entry, i) => (
        <button
          key={entry.slug}
          type="button"
          className="track-row"
          onMouseEnter={() => onActivate(entry.slug)}
          onMouseLeave={() => onDeactivate(entry.slug)}
          onFocus={() => onActivate(entry.slug)}
          onBlur={() => onDeactivate(entry.slug)}
          onClick={() => onSelect(entry.slug)}
        >
          <span className="track-num">{String(i + 1).padStart(2, "0")}</span>
          <span className="track-title">{entry.title}</span>
          <span className="track-category">{entry.date}</span>
        </button>
      ))}
    </div>
  );
}
