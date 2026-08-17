import { useState, type ComponentType } from "react";
import {
  PythonIcon,
  JavascriptIcon,
  TypescriptIcon,
  RustIcon,
  LuaIcon,
  JavaIcon,
  OpenCvIcon,
  PytorchIcon,
  RaspberryPiIcon,
  HtmlIcon,
  CssIcon,
  ElectronIcon,
  GithubGlyphIcon,
  StreamlitIcon,
  McpIcon,
  ReactGlyphIcon,
  GitGlyphIcon,
} from "./icons/BrandIcons";
import {
  YoloIcon,
  ObjectDetectionIcon,
  ComputerVisionIcon,
  FineTuningIcon,
  EdgeInferenceIcon,
  FullStackIcon,
  DesktopAppIcon,
  AiHatIcon,
  VsCodeGlyphIcon,
} from "./icons/ConceptIcons";

export interface SkillItem {
  id: string;
  label: string;
  icon: ComponentType;
  color: string;
  coverImage: string;
}

const COVER = "/covers/skills.png";

const SKILL_GROUPS: { label: string; items: SkillItem[] }[] = [
  {
    label: "programming",
    items: [
      { id: "python", label: "python", icon: PythonIcon, color: "#3572a5", coverImage: COVER },
      { id: "javascript", label: "javascript", icon: JavascriptIcon, color: "#f1e05a", coverImage: COVER },
      { id: "typescript", label: "typescript", icon: TypescriptIcon, color: "#3178c6", coverImage: COVER },
      { id: "rust", label: "rust", icon: RustIcon, color: "#ce422b", coverImage: COVER },
      { id: "lua", label: "lua", icon: LuaIcon, color: "#000080", coverImage: COVER },
      { id: "java", label: "java", icon: JavaIcon, color: "#b07219", coverImage: COVER },
    ],
  },
  {
    label: "ai / cv",
    items: [
      { id: "yolo", label: "yolov8/v11", icon: YoloIcon, color: "#0e8a6c", coverImage: COVER },
      { id: "object-detection", label: "object detection", icon: ObjectDetectionIcon, color: "#2b8a8a", coverImage: COVER },
      { id: "computer-vision", label: "computer vision", icon: ComputerVisionIcon, color: "#2b6cb0", coverImage: COVER },
      {
        id: "fine-tuning",
        label: "model training & fine-tuning",
        icon: FineTuningIcon,
        color: "#6b46c1",
        coverImage: COVER,
      },
      { id: "edge-inference", label: "edge inference", icon: EdgeInferenceIcon, color: "#b45309", coverImage: COVER },
      { id: "opencv", label: "opencv", icon: OpenCvIcon, color: "#5c3ee8", coverImage: COVER },
      { id: "pytorch", label: "pytorch", icon: PytorchIcon, color: "#ee4c2c", coverImage: COVER },
    ],
  },
  {
    label: "hardware",
    items: [
      { id: "raspberry-pi", label: "raspberry pi 5", icon: RaspberryPiIcon, color: "#a22846", coverImage: COVER },
      { id: "ai-hat", label: "ai hat+", icon: AiHatIcon, color: "#75a928", coverImage: COVER },
    ],
  },
  {
    label: "web / software",
    items: [
      { id: "html", label: "html", icon: HtmlIcon, color: "#e34c26", coverImage: COVER },
      { id: "css", label: "css", icon: CssIcon, color: "#1572b6", coverImage: COVER },
      { id: "react", label: "react.js", icon: ReactGlyphIcon, color: "#61dafb", coverImage: COVER },
      { id: "electron", label: "electron.js", icon: ElectronIcon, color: "#47848f", coverImage: COVER },
      { id: "full-stack", label: "full-stack development", icon: FullStackIcon, color: "#0f766e", coverImage: COVER },
      {
        id: "desktop-app",
        label: "desktop application development",
        icon: DesktopAppIcon,
        color: "#7c2d12",
        coverImage: COVER,
      },
    ],
  },
  {
    label: "tools",
    items: [
      { id: "vscode", label: "vs code", icon: VsCodeGlyphIcon, color: "#007acc", coverImage: COVER },
      { id: "mcp", label: "mcp", icon: McpIcon, color: "#d3cec4", coverImage: COVER },
      { id: "github", label: "github", icon: GithubGlyphIcon, color: "#f2f1ee", coverImage: COVER },
      { id: "git", label: "git", icon: GitGlyphIcon, color: "#f05032", coverImage: COVER },
      { id: "streamlit", label: "streamlit", icon: StreamlitIcon, color: "#ff4b4b", coverImage: COVER },
    ],
  },
];

export const skillsFlatList: SkillItem[] = SKILL_GROUPS.flatMap((g) => g.items);

function ChevronIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="tree-chevron" aria-hidden="true">
      <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M1.5 3.5a1 1 0 0 1 1-1h3.6l1.4 1.6h5.5a1 1 0 0 1 1 1v7.4a1 1 0 0 1-1 1h-10.5a1 1 0 0 1-1-1v-9z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface SkillsListProps {
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
}

export function SkillsList({ onActivate, onDeactivate }: SkillsListProps) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(SKILL_GROUPS.map((g) => [g.label, false]))
  );

  return (
    <ul className="tree-root">
      {SKILL_GROUPS.map((group) => {
        const isOpen = !!open[group.label];
        return (
          <li key={group.label} className="tree-node">
            <button
              type="button"
              className={`tree-row tree-row-folder${isOpen ? " tree-row-open" : ""}`}
              onClick={() => setOpen((prev) => ({ ...prev, [group.label]: !prev[group.label] }))}
              aria-expanded={isOpen}
            >
              <ChevronIcon />
              <FolderIcon />
              <span className="tree-label">{group.label}</span>
            </button>
            {isOpen && (
              <ul className="tree-children">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id} className="tree-node">
                      <span
                        className="tree-row tree-row-file"
                        onMouseEnter={() => onActivate(item.id)}
                        onMouseLeave={() => onDeactivate(item.id)}
                      >
                        <span className="tree-icon" style={{ color: item.color }}>
                          <Icon />
                        </span>
                        <span className="tree-label">{item.label}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
