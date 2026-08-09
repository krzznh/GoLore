import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "golore-theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage unavailable (private mode, etc.) — fall through
  }
  // The inline script in index.html already applied the right class
  // before paint, so trust the DOM if it's already set.
  if (document.documentElement.classList.contains("dark")) return "dark";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Tracks and persists the GoLore theme (light/dark). Keeps the `dark`
 * class on <html> in sync so all Tailwind dark: / CSS-variable-based
 * styles respond immediately.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore write failures
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, setTheme, toggleTheme };
}
