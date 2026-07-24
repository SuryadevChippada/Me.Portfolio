export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  stack: string[];
  labelColor: string;
  repoUrl: string;
  coverImage: string | null;
}

// Add a fourth track by appending another object here — everything else
// (tracklist numbering, disc slide, detail view) reads from this array.
export const projects: Project[] = [
  {
    id: "flare",
    title: "flare",
    category: "vision",
    tagline: "edge wildfire detection",
    description:
      "real-time wildfire detection running on constrained edge hardware. detection model, inference pipeline, and deployment onto devices that sit in the field rather than in a datacenter.",
    stack: ["pytorch", "opencv", "raspberry pi", "fastapi"],
    labelColor: "#c9622f",
    repoUrl: "https://github.com/SuryadevChippada/flare",
    coverImage: null,
  },
  {
    id: "yolo26",
    title: "yolo26",
    category: "research",
    tagline: "detection research",
    description:
      "working through the yolo26 paper and rebuilding it as a research-grade repository — reproducible training, clean evaluation, and documented decisions rather than a pile of scripts.",
    stack: ["pytorch", "python"],
    labelColor: "#3f7fb8",
    repoUrl: "https://github.com/SuryadevChippada/yolo26",
    coverImage: null,
  },
  {
    id: "filetagr",
    title: "filetagr",
    category: "tooling",
    tagline: "desktop tooling",
    description:
      "non-destructive file tagging for desktop. tags live alongside files instead of rewriting them, so nothing breaks if the app disappears.",
    stack: ["typescript", "sqlite"],
    labelColor: "#4d9c7c",
    repoUrl: "https://github.com/SuryadevChippada/filetagr",
    coverImage: null,
  },
];
