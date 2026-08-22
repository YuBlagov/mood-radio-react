import { ILLUSTRATIONS } from "./illustrations.jsx";

// A fixed scatter layout: each card gets a hand-picked offset/rotation so
// the board reads as "tossed onto a table", not a perfect grid. Index maps
// 1:1 onto CAROUSEL_ITEMS order — add a mood, add a slot here.
const LAYOUT = [
  { top: 0, left: "2%", rotate: -6 },
  { top: 70, left: "20%", rotate: 4 },
  { top: 10, left: "40%", rotate: -3 },
  { top: 90, left: "58%", rotate: 7 },
  { top: 20, left: "78%", rotate: -5 },
  { top: 230, left: "8%", rotate: 5 },
  { top: 260, left: "28%", rotate: -7 },
  { top: 210, left: "48%", rotate: 3 },
  { top: 270, left: "68%", rotate: -4 },
  { top: 220, left: "86%", rotate: 6 },
  { top: 440, left: "35%", rotate: 2 },
];

export function MoodBoard({ items, loadingId, activeId, onSelect }) {
  return (
    <div className="moodboard">
      {items.map((item, i) => {
        const slot = LAYOUT[i % LAYOUT.length];
        const Illustration = ILLUSTRATIONS[item.id];
        return (
          <button
            key={item.id}
            className={`mood-tile ${activeId === item.id ? "is-active" : ""}`}
            style={{
              "--card-color": item.color,
              top: slot.top,
              left: slot.left,
              "--rotate": `${slot.rotate}deg`,
            }}
            onClick={() => onSelect(item)}
          >
            <div className="mood-tile-scene" style={{ background: item.color }}>
              {loadingId === item.id ? (
                <span className="mood-card-spinner" />
              ) : activeId === item.id ? (
                <span className="now-playing-eq" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              ) : Illustration ? (
                <Illustration className="mood-tile-illustration" />
              ) : null}
            </div>
            <span className="mood-tile-title">{item.title}</span>
          </button>
        );
      })}
    </div>
  );
}