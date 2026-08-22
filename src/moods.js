// Single source of truth for moods and their colors.
// Update this list and the dial + playlist search pick it up automatically.

// `icon` is a placeholder stand-in for a future hand-drawn illustration
// per mood (see design reference) — swap for an <img> once art is ready.
export const MOODS = [
   { id: "happy",     title: "Happy",     query: "happy",              color: "#FFF89A" },
  { id: "sad",       title: "Sad",       query: "sad",                color: "#8FA6C4" },
  { id: "chill",     title: "Chill",     query: "chill",              color: "#AAC4FF" },
  { id: "energetic", title: "Energetic", query: "energetic",          color: "#F5B971" },
  { id: "romantic",  title: "Romantic",  query: "romantic love",      color: "#F5B0CB" },
  { id: "focus",     title: "Focus",     query: "focus instrumental", color: "#8FD8D2" },
  { id: "party",     title: "Party",     query: "party hits",         color: "#FF8080" },
  { id: "yoga",      title: "Yoga",      query: "yoga meditation",    color: "#CAABD8" },
  { id: "nostalgic", title: "Nostalgic", query: "throwback nostalgia",color: "#90C8AC" },
];

export function getMoodById(id) {
  return MOODS.find((m) => m.id === id);
}

// A special card that isn't a mood — it shuffles and plays the configured
// default playlist/album directly (see CONFIG.DEFAULT_PLAYLIST_URI in config.js).
export const ALBUM_CARD = {
  id: "mood-radio",
  title: "Mood Radio",
  isAlbum: true,
  color: "#e8e6df",
};

export const CAROUSEL_ITEMS = [...MOODS, ALBUM_CARD];
