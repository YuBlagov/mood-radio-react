// Hand-drawn line-art illustration, one per mood, matching the reference
// style: bold black outlines, flat color fill, playful character/scene.
// Swap in more as they're drawn — MoodBoard falls back to MoodIcon when
// no illustration exists for a given id.
export function EnergyIllustration({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      width="88"
      height="88"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="52" fill="#F5B971" />
      <g stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M46 90 58 62 48 58 66 34 60 56 72 60 58 90" fill="#fff" />
        <circle cx="60" cy="60" r="52" />
      </g>
    </svg>
  );
}

export const ILLUSTRATIONS = {
  energy: EnergyIllustration,
};
