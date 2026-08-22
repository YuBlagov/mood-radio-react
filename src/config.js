// App configuration. Get CLIENT_ID from the Spotify Developer Dashboard —
// see README.md, "Spotify setup" section.
export const CONFIG = {
  CLIENT_ID: "66f0aa7cc0e94d659b4cc082c02d323f",
  REDIRECT_URI: window.location.origin + window.location.pathname,
  SCOPES: [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-read-playback-position",
    "user-modify-playback-state",
  ].join(" "),
  // Optional: a Spotify playlist/album URI that starts playing automatically
  // as soon as the player is ready, before any mood is picked.
  // Format: "spotify:playlist:XXXXXXXXXXXXXXXXXXXXXX" or "spotify:album:...".
  // Leave empty to stay silent until a mood is selected.
  DEFAULT_PLAYLIST_URI: "spotify:playlist:6jTIqtJmJgrHyTS0rh1t71",
};

