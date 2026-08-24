import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function getInitialTheme() {
  return localStorage.getItem(STORAGE_KEY) || "light";
}

// Tracks light/dark theme, persists the choice, and reflects it onto
// <html data-theme="..."> so CSS can key off it (see [data-theme="dark"]
// in styles/index.css — it only darkens --bg, the "table" the polaroid
// cards sit on; the cards themselves stay photo-paper light).
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return { theme, toggleTheme };
}
