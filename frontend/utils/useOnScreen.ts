import { useEffect, useRef, useState } from "react";

/**
 * Toggling visibility observer. Returns a ref and whether the element is
 * currently on screen. Starts `true` so content renders before the observer
 * attaches (avoids a blank first frame).
 */
export function useOnScreen<T extends Element>(
  rootMargin = "0px"
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, onScreen];
}
