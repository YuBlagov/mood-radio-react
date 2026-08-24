import { useEffect, useState } from "react";
import { CONFIG } from "./config.js";
import { CAROUSEL_ITEMS } from "./moods.js";
import { useAuth } from "./hooks/useAuth.js";
import { useSpotifyPlayer } from "./hooks/useSpotifyPlayer.js";
import { searchPlaylistsByMood, playContext, setShuffle, skipToNext, skipToPrevious} from "./spotifyApi.js";
import { LoginScreen } from "./components/LoginScreen.jsx";
import { MoodBoard } from "./components/MoodBoard.jsx";

export default function App() {
  const { loggedIn, authError, checkingAuth, login } = useAuth();
  const { deviceId, currentTrack, isPaused, playerError, togglePlay } =
    useSpotifyPlayer(loggedIn);

  const [activeId, setActiveId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [glowColor, setGlowColor] = useState("#8d8d99");
  const [glowOpacity, setGlowOpacity] = useState(0.1);
  const [status, setStatus] = useState("");

  // The whole app's ambient background tints toward the active card's color.
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", glowColor);
  }, [glowColor]);

  // Clicking any card plays music right away, shuffled:
  // - "Mood Radio" shuffles and plays the configured default playlist
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
      let contextUri = null;

      if (item.isAlbum) {
        if (!CONFIG.DEFAULT_PLAYLIST_URI) {
          setStatus("No default playlist configured yet — set DEFAULT_PLAYLIST_URI in config.js.");
          return;
        }
        contextUri = CONFIG.DEFAULT_PLAYLIST_URI;
      } else {
        const results = await searchPlaylistsByMood(item.query, 8);
        if (results.length === 0) {
          setStatus("Nothing found for this mood. Try another one.");
          return;
        }
        contextUri = results[Math.floor(Math.random() * results.length)].id;
      }

      await setShuffle(deviceId, true).catch(() => {}); // best-effort, playback still works if this fails
      await playContext(deviceId, contextUri);
    } catch (err) {
      setStatus("Could not start playback. Please try again.");
      console.error(err);
    } finally {
      setLoadingId(null);
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

      {!loggedIn ? (
        <LoginScreen onLogin={login} error={authError} />
      ) : (
        <section className="screen app-screen">
          <header className="app-header">
            <h1 className="wordmark small">SNAPSHOT RADIO</h1>
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
          />
        </section>
      )}
    </>
  );
}
