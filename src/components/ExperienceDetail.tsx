import type { ExperienceEntry } from "../data/experience";

interface ExperienceDetailProps {
  entry: ExperienceEntry;
  onBack: () => void;
}

export function ExperienceDetail({ entry, onBack }: ExperienceDetailProps) {
  return (
    <>
      <h3 className="detail-title exp-detail-title">{entry.role}</h3>
      <p className="detail-org">
        {entry.organization} · {entry.location} · {entry.dateRange}
      </p>
      <ul className="detail-bullets">
        {entry.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <div className="detail-actions">
        <button type="button" className="btn" onClick={onBack}>
          ← back
        </button>
      </div>
    </>
  );
}
