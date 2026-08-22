export function PlayerBar({ track, isPaused, onTogglePlay, onNext, onVolumeChange }) {
  if (!track) return null;

  return (
    <div className="player-bar">
      <img className="track-art" src={track.image} alt="" />
      <div className="track-info">
        <p className="track-name">{track.name}</p>
        <p className="track-artist">{track.artist}</p>
      </div>
      <div className="player-controls">
        <button className="control-btn" onClick={onTogglePlay} aria-label="Play/Pause">
          {isPaused ? (
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" fill="currentColor" />
            </svg>
          )}
        </button>
        <button className="control-btn" onClick={onNext} aria-label="Next track">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M6 6v12l8.5-6L6 6zM16 6v12h2V6h-2z" fill="currentColor" />
          </svg>
        </button>
      </div>
      <input
        className="volume-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue="0.5"
        aria-label="Volume"
        onChange={(e) => onVolumeChange(e.target.value)}
      />
    </div>
  );
}
