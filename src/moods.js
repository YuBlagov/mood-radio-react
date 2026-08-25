// Single source of truth for moods and their colors.
// Update this list and the dial + playlist search pick it up automatically.

// `icon` is a placeholder stand-in for a future hand-drawn illustration
// per mood (see design reference) — swap for an <img> once art is ready.
export const MOODS = [
  { id: "happy",     title: "Happy",     query: "feel good upbeat",        color: "#FFF89A" },
  { id: "sad",       title: "Sad",       query: "sad",                     color: "#8FA6C4" },
  { id: "chill",     title: "Chill",     query: "chill",                   color: "#AAC4FF" },
  { id: "energetic", title: "Energetic", query: "workout gym motivation",  color: "#F5B971" },
  { id: "romantic",  title: "Romantic",  query: "romantic love",           color: "#F5B0CB" },
  { id: "focus",     title: "Focus",     query: "focus instrumental",      color: "#8FD8D2" },
  { id: "party",     title: "Party",     query: "party dance hits",        color: "#FF8080" },
  { id: "yoga",      title: "Yoga",      query: "yoga meditation",         color: "#CAABD8" },
  { id: "nostalgic", title: "Nostalgic", query: "throwback nostalgia",     color: "#90C8AC" },
];

export function getMoodById(id) {
  return MOODS.find((m) => m.id === id);
}

// A special card that isn't a mood — it shuffles and plays the user's own
// Liked Songs (Spotify's "Your Library" saved tracks) directly.
export const FAVORITES_CARD = {
  id: "favorites",
  title: "Favorites",
  isFavorites: true,
  color: "#F5B0CB",
};

export const CAROUSEL_ITEMS = [...MOODS, FAVORITES_CARD];
