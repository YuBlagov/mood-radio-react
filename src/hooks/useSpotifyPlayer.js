import { useEffect, useRef, useState, useCallback } from "react";
import { getValidAccessToken } from "../auth.js";

function loadSpotifySdkScript() {
  return new Promise((resolve) => {
    if (window.Spotify) return resolve();
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);
    window.onSpotifyWebPlaybackSDKReady = resolve;
  });
}

// Initializes the Spotify Web Playback SDK once the user is logged in,
// and exposes device readiness + current track state to components.
export function useSpotifyPlayer(enabled) {
  const playerRef = useRef(null);
  const [deviceId, setDeviceId] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [playerError, setPlayerError] = useState(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    async function init() {
      await loadSpotifySdkScript();
      if (cancelled) return;

      const player = new window.Spotify.Player({
        name: "Music Mood App",
        getOAuthToken: async (cb) => {
          const token = await getValidAccessToken();
          cb(token);
        },
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        if (!cancelled) setDeviceId(device_id);
      });

      player.addListener("not_ready", () => {
        if (!cancelled) setDeviceId(null);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state || cancelled) return;
        const track = state.track_window.current_track;
        setCurrentTrack({
          name: track.name,
          artist: track.artists.map((a) => a.name).join(", "),
          image: track.album.images[0]?.url || "",
        });
        setIsPaused(state.paused);
      });

      player.addListener("initialization_error", ({ message }) => setPlayerError(message));
      player.addListener("authentication_error", ({ message }) => setPlayerError(message));
      player.addListener("account_error", ({ message }) =>
        setPlayerError(`Spotify Premium is required: ${message}`)
      );

      await player.connect();
      playerRef.current = player;
    }

    init();

    return () => {
      cancelled = true;
      playerRef.current?.disconnect();
      playerRef.current = null;
    };
  }, [enabled]);

  const togglePlay = useCallback(() => playerRef.current?.togglePlay(), []);
  const setVolume = useCallback((value) => playerRef.current?.setVolume(Number(value)), []);

  return { deviceId, currentTrack, isPaused, playerError, togglePlay, setVolume };
}
