import { useEffect, useState } from "react";

/**
 * Ramps a value 0 → 100 over `durationMs` using requestAnimationFrame.
 * Pass `active = false` to hold at 0 until you're ready to start (e.g. until the
 * 3D models have loaded).
 */
export function useTimedProgress(durationMs: number, active = true): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let startTs = 0;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const t = durationMs <= 0 ? 1 : Math.min(1, (ts - startTs) / durationMs);
      setProgress(t * 100);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, active]);

  return progress;
}
