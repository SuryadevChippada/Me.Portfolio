export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  location: string;
  dateRange: string;
  bullets: string[];
  labelColor: string;
  sleeveTitle: string;
  sleeveTagline: string;
  coverImage: string | null;
}

export const experience: ExperienceEntry[] = [
  {
    id: "flare-role",
    role: "computer vision & ai engineer — founding member",
    organization: "flare darmstadt e.v.",
    location: "darmstadt · hybrid",
    dateRange: "nov 2024 — present",
    bullets: [
      "built real-time yolov8 pipeline for smoke/fire detection in uav footage (under 100ms inference latency)",
      "trained and fine-tuned object detection models on curated aerial datasets across varied lighting and smoke conditions",
      "deployed edge inference prototype on raspberry pi 5 (ai hat+) for autonomous wildfire monitoring without cloud dependency",
      "contributed to system validation and iterative optimisation across 3+ test deployment phases in a cross-disciplinary team",
    ],
    labelColor: "#8a6fb0",
    sleeveTitle: "flare",
    sleeveTagline: "cv & ai engineer",
    coverImage: null,
  },
  {
    id: "xtrachallenge",
    role: "uav competition — xtrachallenge 2025",
    organization: "universitat politècnica de valència, spain",
    location: "on-site",
    dateRange: "jul 2025",
    bullets: [
      "participated in a national uav design and flight competition organised by xtra2 upv",
      "collaborated on system preparation and testing phases within an interdisciplinary student team",
      "gained hands-on exposure to uav integration workflows, field testing procedures, and real-time system constraints",
    ],
    labelColor: "#b0793f",
    sleeveTitle: "xtrachallenge",
    sleeveTagline: "uav competition",
    coverImage: "/covers/xtrachallenge.png",
  },
];
