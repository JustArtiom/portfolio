import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref and a boolean that flips to `true` once the element scrolls
 * into view. It stays true afterwards (fires once).
 */
export function useInView<T extends Element>(
  rootMargin = "0px",
  threshold = 0
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return [ref, inView];
}
