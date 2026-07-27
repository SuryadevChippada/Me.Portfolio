export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  stack: string[];
  labelColor: string;
  repoUrl: string | null;
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
    repoUrl: null,
    coverImage: "/covers/flare.png",
  },
  {
    id: "paradigms",
    title: "paradigms",
    category: "research",
    tagline: "yolo26 vs rex-omni",
    description:
      "a study and partial reproduction of two opposing object detection paradigms — yolo26's real-time anchor-free regression and rex-omni's language-native next-token detection — reproducing the core mechanisms of each and designing a hybrid that borrows the strengths of one to cover the weaknesses of the other.",
    stack: ["pytorch", "hydra", "python"],
    labelColor: "#3f7fb8",
    repoUrl: "https://github.com/SuryadevChippada/detection-paradigms",
    coverImage: "/covers/paradigms.jpeg",
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
    repoUrl: "https://github.com/SuryadevChippada/FileTagr",
    coverImage: "/covers/filetagr.jpeg",
  },
  {
    id: "ppe",
    title: "object detection - ppe",
    category: "vision",
    tagline: "construction ppe detection",
    description:
      "real-time construction-site ppe compliance detection, fine-tuning yolov11 on a labeled safety dataset. detects people, hardhats, and safety vests — flagging violations from images, video, a live webcam, or a batch folder, with a streamlit demo app for all four.",
    stack: ["yolov11", "opencv", "streamlit"],
    labelColor: "#c9a227",
    repoUrl: "https://github.com/SuryadevChippada/Object-Detection",
    coverImage: "/covers/object-detection.jpeg",
  },
];
