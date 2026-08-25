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
    "user-library-read",
    "user-library-modify",
  ].join(" "),
};

