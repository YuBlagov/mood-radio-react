import { useEffect, useState } from "react";
import { CAROUSEL_ITEMS } from "./moods.js";
import { useAuth } from "./hooks/useAuth.js";
import { useSpotifyPlayer } from "./hooks/useSpotifyPlayer.js";
import { useTheme } from "./hooks/useTheme.js";
import {
  searchPlaylistsByMood,
  playContext,
  playTracks,
  getLikedTracks,
  setShuffle,
  skipToNext,
  skipToPrevious,
  isTrackSaved,
  saveTrack,
  removeSavedTrack,
} from "./spotifyApi.js";
import { LoginScreen } from "./components/LoginScreen.jsx";
import { MoodBoard } from "./components/MoodBoard.jsx";

export default function App() {
  const { loggedIn, authError, checkingAuth, login, logout } = useAuth();
  const { deviceId, currentTrack, isPaused, playerError, togglePlay } =
    useSpotifyPlayer(loggedIn);
  const { theme, toggleTheme } = useTheme();

  const [activeId, setActiveId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [glowColor, setGlowColor] = useState("#8d8d99");
  const [glowOpacity, setGlowOpacity] = useState(0.1);
  const [status, setStatus] = useState("");
  const [isCurrentTrackSaved, setIsCurrentTrackSaved] = useState(false);

  // The whole app's ambient background tints toward the active card's color.
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", glowColor);
  }, [glowColor]);

  // Clear the loading spinner once the SDK reports the new track — no
  // added delay. (We tried debouncing this to ride out a suspected
  // stale-then-real double state report on the very first pick of a
  // session, but the extra pause wasn't worth it and didn't reliably fix
  // the flicker anyway — likely just the previous track briefly finishing
  // out rather than a race we can paper over client-side.)
  useEffect(() => {
    setLoadingId(null);
  }, [currentTrack?.id]);

  // Reflects whether the now-playing track is already in the user's Liked
  // Songs, so the heart button in the player knows which state to show.
  useEffect(() => {
    if (!currentTrack?.id) {
      setIsCurrentTrackSaved(false);
      return;
    }
    let cancelled = false;
    isTrackSaved(currentTrack.id)
      .then((saved) => {
        if (!cancelled) setIsCurrentTrackSaved(saved);
      })
      .catch(() => {
        if (!cancelled) setIsCurrentTrackSaved(false);
      });
    return () => {
      cancelled = true;
    };
  }, [currentTrack?.id]);

  // Clicking any card plays music right away, shuffled:
  // - "Favorites" shuffles and plays the user's own Liked Songs
  // - a mood card searches for a matching playlist and shuffle-plays it
  async function handleSelect(item) {
    if (!deviceId) {
      setStatus("Player isn't ready yet, give it a second and try again.");
      return;
    }

    setActiveId(item.id);
    setGlowColor(item.color);
    setGlowOpacity(0.32);
    setLoadingId(item.id);
    setStatus("");

    try {
      if (item.isFavorites) {
        const liked = await getLikedTracks(50);
        if (liked.length === 0) {
          setStatus("Your Liked Songs is empty.");
          setLoadingId(null);
          return;
        }
        const shuffledUris = liked.map((t) => t.uri).sort(() => Math.random() - 0.5);
        await playTracks(deviceId, shuffledUris);
      } else {
        // Run the search and the shuffle-on request concurrently (neither
        // depends on the other) — but still await *both* before starting
        // playback. Shuffle must be confirmed on before playContext, not
        // just kicked off alongside it: the first time shuffle actually
        // flips from off to on, a race here let Spotify start the context
        // in its normal order and then jump to a shuffled track a moment
        // later — a visible double flash of cover art. Once shuffle is
        // already on (every click after the first), there's nothing to
        // flip, so the race was invisible there.
        const [results] = await Promise.all([
          searchPlaylistsByMood(item.query, 8),
          setShuffle(deviceId, true).catch(() => {}), // best-effort, playback still works if this fails
        ]);
        if (results.length === 0) {
          setStatus("Nothing found for this mood. Try another one.");
          setLoadingId(null);
          return;
        }
        const contextUri = results[Math.floor(Math.random() * results.length)].id;

        await playContext(deviceId, contextUri);
      }

      // Belt-and-suspenders: the effect above clears loadingId once
      // currentTrack's id actually changes, but if the new track happens to
      // share an id with whatever was already playing (e.g. shuffle landed
      // on the same song again), that id never changes and the spinner
      // would otherwise be stuck forever.
      setTimeout(() => {
        setLoadingId((current) => (current === item.id ? null : current));
      }, 4000);
    } catch (err) {
      setStatus("Could not start playback. Please try again.");
      console.error(err);
      setLoadingId(null);
    }
  }

  // Saves/removes the now-playing track from the user's Liked Songs.
  async function handleToggleFavorite() {
    if (!currentTrack?.id) return;
    try {
      if (isCurrentTrackSaved) {
        await removeSavedTrack(currentTrack.id);
      } else {
        await saveTrack(currentTrack.id);
      }
      setIsCurrentTrackSaved((saved) => !saved);
    } catch (err) {
      setStatus("Could not update Liked Songs.");
      console.error(err);
    }
  }

  async function handleNext() {
    if (!deviceId) return;
    try {
      await skipToNext(deviceId);
    } catch (err) {
      setStatus("Could not skip to the next track.");
      console.error(err);
    }
  }

  async function handlePrev() {
    if (!deviceId) return;
    try {
      await skipToPrevious(deviceId);
    } catch (err) {
      setStatus("Could not skip to the previous track.");
      console.error(err);
    }  
  }

  if (checkingAuth) return null;

  return (
    <>
      <div
        className="ambient-glow"
        style={{ "--glow-color": glowColor, "--glow-opacity": glowOpacity }}
        aria-hidden="true"
      />
      {/* Only visible in dark mode (see [data-theme="dark"] .candle-glow) —
          a warm, gently flickering pool of light low on the screen, like a
          nightlight or a candle left burning on the table after dark. */}
      <div className="candle-glow" aria-hidden="true" />

      {!loggedIn ? (
        <LoginScreen onLogin={login} error={authError} />
      ) : (
        <section className="screen app-screen">
          <header className="app-header">
            <h1 className="wordmark small">SNAPSHOT RADIO</h1>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2.1 2.1M16.9 16.9L19 19M19 5l-2.1 2.1M7.1 16.9L5 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <button className="logout-btn" onClick={logout} aria-label="Log out">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4M16 17l5-5-5-5M21 12H9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </header>

          <p className="status-message" aria-live="polite">
            {playerError || status}
          </p>

          <MoodBoard
            items={CAROUSEL_ITEMS}
            loadingId={loadingId}
            activeId={activeId}
            onSelect={handleSelect}
            track={currentTrack}
            isPaused={isPaused}
            onTogglePlay={togglePlay}
            onNext={handleNext}
            onPrev={handlePrev}
            isTrackSaved={isCurrentTrackSaved}
            onToggleFavorite={handleToggleFavorite}
          />
        </section>
      )}
    </>
  );
}
