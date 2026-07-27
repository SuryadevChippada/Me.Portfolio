import type { LogEntry } from "../data/log";
import { renderMarkdown } from "../lib/renderMarkdown";

interface LogDetailProps {
  entry: LogEntry;
  onBack: () => void;
}

export function LogDetail({ entry, onBack }: LogDetailProps) {
  return (
    <>
      <h2 className="detail-title">{entry.title}</h2>
      <p className="detail-stack">{entry.date}</p>
      <div className="log-body">{renderMarkdown(entry.content)}</div>
      <div className="detail-actions">
        <button type="button" className="btn" onClick={onBack}>
          ← tracklist
        </button>
      </div>
    </>
  );
}
