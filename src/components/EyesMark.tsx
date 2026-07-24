export function EyesMark() {
  return (
    <svg
      className="mark-svg"
      width="38"
      height="20"
      viewBox="0 0 34 18"
      fill="none"
      aria-hidden="true"
    >
      {/* open-bottom arc */}
      <path
        d="M1.5 17V15C1.5 7.54 7.54 1.5 15 1.5H19C26.46 1.5 32.5 7.54 32.5 15V17"
        stroke="var(--text-primary)"
        strokeWidth="1.5"
      />
      <circle cx="12.5" cy="13.5" r="1.75" fill="var(--text-primary)" />
      <circle cx="21.5" cy="13.5" r="1.75" fill="var(--text-primary)" />
    </svg>
  );
}
