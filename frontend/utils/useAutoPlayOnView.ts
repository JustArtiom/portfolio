import { useEffect, useRef } from "react";

/**
 * Plays a muted video only while it's on screen and pauses it when it isn't —
 * so off-screen videos stop decoding (they don't with plain `autoPlay`), which
 * saves a lot of CPU/GPU and memory when several are on the page.
 */
export function useAutoPlayOnView<
  T extends HTMLVideoElement,
>(): React.RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
