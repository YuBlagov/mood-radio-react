import { getValidAccessToken } from "./auth.js";

const API_BASE = "https://api.spotify.com/v1";

async function apiFetch(path, options = {}) {
  const token = await getValidAccessToken();
  if (!token) throw new Error("No valid access token available.");

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Spotify API error ${res.status}: ${text}`);
  }
  // 204 No Content — e.g. play/pause requests return this.
  if (res.status === 204) return null;
  return res.json();
}

// Runs a single raw playlist search against the Spotify API.
async function rawPlaylistSearch(query, limit) {
  const data = await apiFetch(
    `/search?q=${encodeURIComponent(query)}&type=playlist&limit=${limit}`
  );
  const items = data?.playlists?.items?.filter(Boolean) || [];
  return items.map((p) => ({
    id: p.uri,
    title: p.name,
    image: p.images?.[0]?.url || "",
  }));
}

// Searches for playlists matching a mood's text query.
// Multi-word queries (e.g. "ambient meditation") match playlists containing
// ALL of those words, which often returns very few results. If the primary
// query comes up short, we widen the search using just the first word and
// merge in any new results, so moods with narrow phrasing still get a full
// strip of playlists to choose from.
export async function searchPlaylistsByMood(query, limit = 8) {
  const primary = await rawPlaylistSearch(query, limit);
  if (primary.length >= limit) return primary;

  const firstWord = query.split(" ")[0];
  const broadened = firstWord === query ? [] : await rawPlaylistSearch(firstWord, limit);

  const seen = new Set(primary.map((p) => p.id));
  const merged = [...primary];
  for (const item of broadened) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      merged.push(item);
    }
    if (merged.length >= limit) break;
  }
  return merged;
}

// Starts playback of a playlist on a specific device (Web Playback SDK device).
export async function playContext(deviceId, contextUri) {
  await apiFetch(`/me/player/play?device_id=${deviceId}`, {
    method: "PUT",
    body: JSON.stringify({ context_uri: contextUri }),
  });
}

// Starts playback of a specific, unordered list of tracks — unlike
// playContext, which plays a playlist/album context by URI, this plays
// exactly the track URIs handed to it (e.g. the user's own Liked Songs).
export async function playTracks(deviceId, uris) {
  await apiFetch(`/me/player/play?device_id=${deviceId}`, {
    method: "PUT",
    body: JSON.stringify({ uris }),
  });
}

// Fetches the current user's saved ("Liked") tracks.
export async function getLikedTracks(limit = 50) {
  const data = await apiFetch(`/me/tracks?limit=${limit}`);
  const items = data?.items?.filter((item) => item?.track) || [];
  return items.map(({ track }) => ({
    id: track.id,
    uri: track.uri,
    name: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    image: track.album?.images?.[0]?.url || "",
  }));
}

// Whether a track is already in the user's Liked Songs.
export async function isTrackSaved(trackId) {
  const data = await apiFetch(`/me/tracks/contains?ids=${trackId}`);
  return Boolean(data?.[0]);
}

export async function saveTrack(trackId) {
  await apiFetch(`/me/tracks?ids=${trackId}`, { method: "PUT" });
}

export async function removeSavedTrack(trackId) {
  await apiFetch(`/me/tracks?ids=${trackId}`, { method: "DELETE" });
}

// Turns shuffle on/off for the current playback session.
export async function setShuffle(deviceId, state) {
  await apiFetch(`/me/player/shuffle?state=${state}&device_id=${deviceId}`, {
    method: "PUT",
  });
}

export async function pausePlayback(deviceId) {
  await apiFetch(`/me/player/pause?device_id=${deviceId}`, { method: "PUT" });
}

export async function resumePlayback(deviceId) {
  await apiFetch(`/me/player/play?device_id=${deviceId}`, { method: "PUT" });
}

export async function skipToNext(deviceId) {
  await apiFetch(`/me/player/next?device_id=${deviceId}`, { method: "POST" });
}

export async function skipToPrevious(deviceId) {
  await apiFetch(`/me/player/previous?device_id=${deviceId}`, { method: "POST" });
}
