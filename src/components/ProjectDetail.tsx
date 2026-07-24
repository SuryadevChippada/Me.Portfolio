import type { Project } from "../data/projects";
import { MagneticButton } from "./MagneticButton";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  return (
    <>
      <h2 className="detail-title">{project.title}</h2>
      <p className="detail-desc">{project.description}</p>
      <p className="detail-stack">{project.stack.join(" · ")}</p>
      <div className="detail-actions">
        <MagneticButton href={project.repoUrl}>view repo</MagneticButton>
        <button type="button" className="btn" onClick={onBack}>
          ← tracklist
        </button>
      </div>
    </>
  );
}
