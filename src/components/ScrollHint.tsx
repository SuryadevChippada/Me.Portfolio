interface ScrollHintProps {
  visible: boolean;
  className?: string;
  onClick?: () => void;
}

export function ScrollHint({ visible, className = "", onClick }: ScrollHintProps) {
  return (
    <button
      type="button"
      className={`scroll-hint ${className}${visible ? " scroll-hint-visible" : ""}`}
      onClick={onClick}
      aria-label="scroll down"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
        <path
          d="M1 1l6 6 6-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
