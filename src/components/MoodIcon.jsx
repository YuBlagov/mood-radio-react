// Minimal line-icon placeholders standing in for real illustrated art per
// mood. Swap the whole component body for an <img src={mood.illustration}>
// once hand-drawn art exists — call sites don't need to change.
const PATHS = {
  bolt: "M13 2 4 14h6l-1 8 9-12h-6z",
  wind: "M3 8h11a3 3 0 1 0-3-3M3 16h15a3 3 0 1 1-3 3M3 12h9",
  sun: "M12 4v2M12 18v2M4 12H2M22 12h-2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  flame: "M12 2c1 4-4 5-4 9a4 4 0 0 0 8 0c0-2-1-3-1-3s2 1 2 5a6 6 0 1 1-12 0C5 8 9 8 12 2Z",
  sparkles: "M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3ZM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z",
  leaf: "M20 4c-9 0-16 7-16 16 9 0 16-7 16-16ZM5 19 20 4",
  moon: "M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z",
  heart: "M12 20s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 5.5 5.5 5.5 0 0 1 21.5 11c-2.5 4.4-9.5 9-9.5 9Z",
  map: "M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2Zm0 0v16m6-16v16",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
};

export function MoodIcon({ name, className }) {
  const d = PATHS[name] || PATHS.sparkles;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="40"
      height="40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
