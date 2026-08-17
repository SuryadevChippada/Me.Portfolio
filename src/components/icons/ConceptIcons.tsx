// Hand-drawn monoline icons for skills with no real brand mark to borrow,
// matching the stroke style of the tree's folder/chevron icons.

const common = {
  viewBox: "0 0 16 16",
  fill: "none",
  "aria-hidden": true,
} as const;

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function YoloIcon() {
  return (
    <svg {...common}>
      <rect x="2" y="3" width="12" height="10" rx="1" {...stroke} />
      <circle cx="8" cy="8" r="1.3" {...stroke} />
    </svg>
  );
}

export function ObjectDetectionIcon() {
  return (
    <svg {...common}>
      <path d="M2 5V3h2M14 5V3h-2M2 11v2h2M14 11v2h-2" {...stroke} />
      <circle cx="8" cy="8" r="2" {...stroke} />
    </svg>
  );
}

export function ComputerVisionIcon() {
  return (
    <svg {...common}>
      <path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z" {...stroke} />
      <circle cx="8" cy="8" r="1.8" {...stroke} />
    </svg>
  );
}

export function FineTuningIcon() {
  return (
    <svg {...common}>
      <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="6" cy="4.5" r="1.3" {...stroke} />
      <circle cx="11" cy="8" r="1.3" {...stroke} />
      <circle cx="5" cy="11.5" r="1.3" {...stroke} />
    </svg>
  );
}

export function EdgeInferenceIcon() {
  return (
    <svg {...common}>
      <rect x="4.5" y="4.5" width="7" height="7" rx="0.6" {...stroke} />
      <path
        d="M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3M3 3l1.8 1.8M13 3l-1.8 1.8M3 13l1.8-1.8M13 13l-1.8-1.8"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FullStackIcon() {
  return (
    <svg {...common}>
      <path d="M8 2 14 5 8 8 2 5z" {...stroke} />
      <path d="M2 8l6 3 6-3" {...stroke} />
      <path d="M2 11l6 3 6-3" {...stroke} />
    </svg>
  );
}

export function DesktopAppIcon() {
  return (
    <svg {...common}>
      <rect x="1.5" y="2.5" width="13" height="8.5" rx="0.8" {...stroke} />
      <path d="M6 13.5h4M8 11v2.5" {...stroke} />
    </svg>
  );
}

export function AiHatIcon() {
  return (
    <svg {...common}>
      <rect x="2.5" y="2.5" width="11" height="11" rx="1" {...stroke} />
      <circle cx="5.3" cy="5.3" r="0.6" fill="currentColor" />
      <circle cx="8" cy="5.3" r="0.6" fill="currentColor" />
      <circle cx="10.7" cy="5.3" r="0.6" fill="currentColor" />
      <circle cx="5.3" cy="8" r="0.6" fill="currentColor" />
      <circle cx="8" cy="8" r="0.6" fill="currentColor" />
      <circle cx="10.7" cy="8" r="0.6" fill="currentColor" />
      <path d="M8 10v2.2M6.9 11.1h2.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export function VsCodeGlyphIcon() {
  return (
    <svg {...common}>
      <path d="M11 1.5 3 7.2 1.5 6l7-5.3zM11 14.5 3 8.8 1.5 10l7 5.3z" {...stroke} />
      <path d="M11 1.5 14.5 3.3v9.4L11 14.5V1.5z" {...stroke} />
      <path d="M3 7.2 11 12.5V3.5z" {...stroke} />
    </svg>
  );
}
