# Music Mood App

Music by mood color. Rewritten from scratch as a React + Vite app —
no backend, authorization via Spotify's Authorization Code with PKCE flow.

> A reimagining of an idea from an earlier collaborative pet project
> ([mood-radio](https://github.com/YuBlagov/mood-radio)); this implementation
> is written from scratch.

## Stack

- React 18 + Vite
- [Spotify Web API](https://developer.spotify.com/documentation/web-api) — playlist search
- [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk) — in-browser playback
- Auth: **Authorization Code with PKCE** — no client secret, no server needed

## Spotify setup

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) → **Create app**.
2. In the app's **Settings**, add a **Redirect URI** — the exact address you'll open the app at
   (e.g. `http://127.0.0.1:5173/` for local Vite dev, or your production domain after deploying).
   The Redirect URI must match the page address exactly.
3. Copy the **Client ID** and paste it into `src/config.js`:
   ```js
   CLIENT_ID: "your_client_id",
   ```
4. While the app is in **Development Mode**, only users you've manually added under
   **Settings → User Management** (up to 25 emails) can log in. Add your grader's/instructor's
   email there if they need to test it.
5. **Important**: playback via the Web Playback SDK only works with a **Spotify Premium** account.
6. Optional: in `src/config.js`, set `DEFAULT_PLAYLIST_URI` to a Spotify playlist/album URI
   (e.g. `spotify:playlist:XXXXXXXXXXXXXXXXXXXXXX` — get it from a playlist's Share → Copy Spotify URI
   in the Spotify app) to have something start playing automatically as soon as the player connects,
   before any mood is picked. Leave it empty to stay silent until a mood is selected.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (typically `http://localhost:5173/`) — make sure it matches the
Redirect URI configured in the Spotify Dashboard.

## Build

```bash
npm run build
npm run preview   # serve the production build locally
```

## Deploy

The build output in `dist/` is static and can be hosted anywhere — Netlify, Vercel, GitHub Pages.
After deploying, add the final URL as a Redirect URI in the Spotify Dashboard.

## Structure

```
src/
  config.js              — Client ID and OAuth settings
  pkce.js                — PKCE code_verifier / code_challenge generation
  auth.js                — login, code-for-token exchange, refresh (framework-agnostic)
  spotifyApi.js           — playlist search, playback control
  moods.js                — mood list and colors (single source of truth)
  App.jsx                 — top-level layout and state wiring
  hooks/
    useAuth.js             — React wrapper around auth.js
    useSpotifyPlayer.js    — React wrapper around the Web Playback SDK
  components/
    LoginScreen.jsx
    MoodCarousel.jsx        — 3D drag-to-spin drum of uniform glassmorphic cards, plus the Mood Radio card
    PlayerBar.jsx           — fixed bottom player bar
  styles/index.css        — design tokens + all styles
```

## Ideas for further development

- History/stats: which moods get picked most often
- Blend two moods into a single playlist
- Offline fallback without Spotify (demo cards, no player)
# mood-radio-react
