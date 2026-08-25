import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Only the production build needs the GitHub Pages subpath — applying it
  // to the dev server too changed the local URL to 127.0.0.1:5173/mood-radio-react/,
  // which no longer matched the 127.0.0.1:5173/ Redirect URI registered in
  // the Spotify Dashboard (config.js builds REDIRECT_URI from
  // window.location.pathname) and broke local login.
  base: command === "build" ? "/mood-radio-react/" : "/",
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
}));
