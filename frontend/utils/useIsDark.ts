import { useEffect, useState } from "react";

/** Tracks whether the site is in dark mode (the `dark` class on <html>). */
export function useIsDark(): boolean {
  // Always start light so the first browser render matches the prerendered
  // HTML; the effect corrects it right after hydration.
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const update = () => setDark(el.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return dark;
}
