import { MoodIcon } from "./MoodIcon.jsx";
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

// Clicking a card that isn't playing starts it (onSelect). The card that IS
// playing shows its own transport controls in-place (mood-tile-player) —
// track/artist + prev/play-pause/next — instead of restarting playback. The
// wrapper is a <div> (not <button>) because a playing card nests real
// <button>s for those controls, and a <button> can't contain a <button>.
export function MoodBoard({
  items,
  loadingId,
  activeId,
  onSelect,
  track,
  isPaused,
  onTogglePlay,
  onNext,
  onPrev,
  isTrackSaved,
  onToggleFavorite,
}) {
  return (
    <div className="moodboard">
      {items.map((item, i) => {
        const slot = LAYOUT[i % LAYOUT.length];
        const Illustration = ILLUSTRATIONS[item.id];
        const isPlaying = activeId === item.id;

        function handleKeyDown(e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(item);
          }
        }

        return (
          <div
            key={item.id}
            className={`mood-tile ${isPlaying ? "is-active is-playing" : ""}`}
            style={{
              "--card-color": item.color,
              top: slot.top,
              left: slot.left,
              "--rotate": `${slot.rotate}deg`,
            }}
            role={isPlaying ? undefined : "button"}
            tabIndex={isPlaying ? undefined : 0}
            onClick={isPlaying ? undefined : () => onSelect(item)}
            onKeyDown={isPlaying ? undefined : handleKeyDown}
          >
            <div className="mood-tile-scene" style={{ background: item.color }}>
              {loadingId === item.id ? (
                <span className="now-playing-eq" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              ) : isPlaying && track?.image ? (
                <div className={`mood-tile-vinyl ${isPaused ? "is-paused" : ""}`}>
                  <img className="mood-tile-vinyl-art" src={track.image} alt="" />
                </div>
              ) : isPlaying ? (
                <span className="now-playing-eq" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              ) : Illustration ? (
                <Illustration className="mood-tile-illustration" />
              ) : (
                item.icon && <MoodIcon name={item.icon} className="mood-tile-icon" />
              )}
            </div>
            <span className="mood-tile-title">{item.title}</span>

            {isPlaying && (
              <div className="mood-tile-player">
                <p className="mood-tile-track">{track?.name || "…"}</p>
                <p className="mood-tile-artist">{track?.artist || ""}</p>
                <div className="mood-tile-controls">
                  <button className="mtc-btn" onClick={onPrev} aria-label="Previous track">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M18 6v12l-8.5-6L18 6zM8 6v12H6V6h2z" fill="currentColor" />
                    </svg>
                  </button>
                  <button
                    className="mtc-btn play"
                    onClick={onTogglePlay}
                    aria-label={isPaused ? "Play" : "Pause"}
                  >
                    {isPaused ? (
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M8 5v14l11-7z" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor" />
                      </svg>
                    )}
                  </button>
                  <button className="mtc-btn" onClick={onNext} aria-label="Next track">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M6 6v12l8.5-6L6 6zM16 6v12h2V6h-2z" fill="currentColor" />
                    </svg>
                  </button>
                  <button
                    className="mtc-btn heart"
                    onClick={onToggleFavorite}
                    aria-label={isTrackSaved ? "Remove from Liked Songs" : "Save to Liked Songs"}
                  >
                    {isTrackSaved ? (
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path
                          d="M12 20s-7-4.5-9.5-9C.9 8 1.7 4.5 5 3.4c2.3-.8 4.7 0 7 2.6 2.3-2.6 4.7-3.4 7-2.6 3.3 1.1 4.1 4.6 2.5 7.6-2.5 4.5-9.5 9-9.5 9z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path
                          d="M12 20s-7-4.5-9.5-9C.9 8 1.7 4.5 5 3.4c2.3-.8 4.7 0 7 2.6 2.3-2.6 4.7-3.4 7-2.6 3.3 1.1 4.1 4.6 2.5 7.6-2.5 4.5-9.5 9-9.5 9z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
