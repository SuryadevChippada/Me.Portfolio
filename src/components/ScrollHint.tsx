interface ScrollHintProps {
  visible: boolean;
}

export function ScrollHint({ visible }: ScrollHintProps) {
  return (
    <div className={`scroll-hint${visible ? " scroll-hint-visible" : ""}`} aria-hidden="true">
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
        <path
          d="M1 1l6 6 6-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
