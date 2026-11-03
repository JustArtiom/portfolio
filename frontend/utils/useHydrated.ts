import { useEffect, useState } from "react";

/**
 * False during the build-time render and the first browser render
 * (hydration), true right after. Gate browser-only UI on it so the first
 * browser render matches the prerendered HTML.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
