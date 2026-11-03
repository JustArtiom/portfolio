export const THEME_STORAGE_KEY = "portfolio-theme";

/**
 * Adds the `dark` class to <html> when the stored theme is dark, or when
 * nothing is stored and the OS prefers dark.
 *
 * It is also serialised into the inline <head> script below, so it must stay
 * self-contained: no imports or outer variables, only its argument.
 */
export function applyStoredTheme(storageKey: string): void {
  const stored = localStorage.getItem(storageKey);
  if (
    stored === "dark" ||
    (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  }
}

// Runs inline in <head> before first paint so prerendered pages don't flash
// the light theme for dark-mode visitors.
export const themeInitScript = `(${applyStoredTheme.toString()})(${JSON.stringify(THEME_STORAGE_KEY)});`;
