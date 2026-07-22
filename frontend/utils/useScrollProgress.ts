import { useEffect, useRef, useState } from "react";

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/**
 * Reversible scroll progress (0–100) for an element scrolling up through the
 * viewport. 0 when the element's top sits at the bottom of the viewport, 100
 * once its top reaches the top — i.e. it completes over one viewport of scroll.
 */
export function useScrollProgress<T extends Element>(): [
  React.RefObject<T | null>,
  number,
] {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      setProgress(clamp01(1 - rect.top / vh) * 100);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return [ref, progress];
}
