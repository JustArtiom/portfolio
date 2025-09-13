/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * Carousell — focused card in front, one behind on the left, one behind on the right.
 * Clicking a behind card rotates with smooth slide/fade. No bounce.
 *
 * Key idea: we render ONE DOM node per ITEM (stable key = item index) and
 * assign role classes (left/center/right/incoming). During a transition we
 * overlay animation classes. We commit the new `current` **only** after the
 * transition that promotes a behind card to center ends (via `transitionend`).
 */

type Direction = "next" | "prev";
export type Role = "left" | "center" | "right" | "incoming";

export type CarousellProps<T> = {
  items: T[];
  children: (param: {
    item: T;
    index: number;
    role: Role;
    onClick?: () => any;
    classes: string[];
  }) => React.ReactNode;
  className?: string;
  /** Duration of the transition in ms (must match CSS var --dur). */
  transitionMs?: number;
  /** Start focused index. */
  initialIndex?: number;
  /** Callback when focus changes. */
  onChange?: (index: number) => void;
};

export default function Carousell<T>({
  items,
  children,
  className,
  transitionMs = 450,
  initialIndex = 0,
  onChange,
}: CarousellProps<T>) {
  const count = items?.length ?? 0;
  const [current, setCurrent] = useState(() => clampIndex(initialIndex, count));
  const [isAnimating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<Direction | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If items change size or initialIndex changes, re-clamp current.
    setCurrent((c) => clampIndex(c, count));
  }, [count]);

  useEffect(() => {
    // Sync to external initialIndex changes
    setCurrent(clampIndex(initialIndex, count));
  }, [initialIndex, count]);

  const leftIndex = useMemo(
    () => (count ? (current - 1 + count) % count : 0),
    [current, count]
  );
  const rightIndex = useMemo(
    () => (count ? (current + 1) % count : 0),
    [current, count]
  );
  const incomingIndex = useMemo(() => {
    if (!count || direction === null) return 0;
    return direction === "next"
      ? (current + 2) % count
      : (current - 2 + count) % count;
  }, [current, count, direction]);

  const commitNext = useCallback(() => {
    if (!count) return;
    const next = (current + 1) % count;
    setCurrent(next);
    setAnimating(false);
    setDirection(null);
    onChange?.(next);
  }, [count, current, onChange]);

  const commitPrev = useCallback(() => {
    if (!count) return;
    const prev = (current - 1 + count) % count;
    setCurrent(prev);
    setAnimating(false);
    setDirection(null);
    onChange?.(prev);
  }, [count, current, onChange]);

  const rotateNext = useCallback(() => {
    if (isAnimating || count < 2) return;
    setDirection("next");
    setAnimating(true);
  }, [isAnimating, count]);

  const rotatePrev = useCallback(() => {
    if (isAnimating || count < 2) return;
    setDirection("prev");
    setAnimating(true);
  }, [isAnimating, count]);

  // End the animation precisely on transitionend of the behind->center card.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onEnd = (e: TransitionEvent) => {
      if (!isAnimating) return;
      if (e.propertyName !== "transform") return; // ignore opacity ends
      const target = e.target as HTMLElement;
      const cls = target?.className || "";
      if (direction === "next" && cls.includes("anim-right-toCenter")) {
        commitNext();
      } else if (direction === "prev" && cls.includes("anim-left-toCenter")) {
        commitPrev();
      }
    };

    el.addEventListener("transitionend", onEnd as any);
    return () => el.removeEventListener("transitionend", onEnd as any);
  }, [commitNext, commitPrev, direction, isAnimating]);

  if (!count) return null;

  return (
    <div
      className={["carousel", className].filter(Boolean).join(" ")}
      style={{ ["--dur" as any]: `${transitionMs}ms` }}
    >
      <div className="carousel__stage" ref={stageRef}>
        {items.map((item, idx) => {
          const isCenter = idx === current;
          const isLeft = count > 1 && idx === leftIndex;
          const isRight = count > 1 && idx === rightIndex;
          const isIncoming = isAnimating && count > 2 && idx === incomingIndex;

          if (!isCenter && !isLeft && !isRight && !isIncoming) return null;

          const role: Role = isCenter
            ? "center"
            : isLeft
              ? "left"
              : isRight
                ? "right"
                : "incoming";

          const classes = ["carousel__card", `is-${role}`];

          // Animation overlays
          if (isAnimating && direction === "next") {
            if (idx === leftIndex) classes.push("anim-left-fadeOut");
            if (idx === current) classes.push("anim-center-toLeft");
            if (idx === rightIndex) classes.push("anim-right-toCenter");
            if (idx === incomingIndex && count > 2)
              classes.push("anim-incoming-fromRight");
          } else if (isAnimating && direction === "prev") {
            if (idx === rightIndex) classes.push("anim-right-fadeOut");
            if (idx === current) classes.push("anim-center-toRight");
            if (idx === leftIndex) classes.push("anim-left-toCenter");
            if (idx === incomingIndex && count > 2)
              classes.push("anim-incoming-fromLeft");
          }

          const clickable =
            !isAnimating && (role === "left" || role === "right");
          const onClick = !clickable
            ? undefined
            : role === "left"
              ? () => rotatePrev()
              : () => rotateNext();

          return children({ item, index: idx, role, onClick, classes });
        })}
      </div>

      <style>{`
        .carousel { position: relative; width: 100%; height: 100%; }
        .carousel__stage { position: relative; width: 100%; height: 100%; perspective: 1200px; }

        .carousel__card {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          transition: transform var(--dur) ease, opacity var(--dur) ease;
          will-change: transform, opacity; contain: layout paint; /* smoother */
        }

        /* Base poses */
        .is-center { transform: translate(-50%, -50%) scale(1); opacity: 1; z-index: 3; }
        .is-left   { transform: translate(calc(-50% - 28%), -50%) scale(0.86); opacity: 0.6; z-index: 2; }
        .is-right  { transform: translate(calc(-50% + 28%), -50%) scale(0.86); opacity: 0.6; z-index: 2; }
        .is-incoming { opacity: 0; z-index: 1; }

        /* NEXT flow */
        .anim-left-fadeOut   { opacity: 0; transform: translate(calc(-50% - 34%), -50%) scale(0.8); }
        .anim-center-toLeft  { transform: translate(calc(-50% - 28%), -50%) scale(0.86); opacity: 0.7; z-index: 2; }
        .anim-right-toCenter { transform: translate(-50%, -50%) scale(1); opacity: 1; z-index: 3; }
        .anim-incoming-fromRight { transform: translate(calc(-50% + 28%), -50%) scale(0.86); opacity: 0.6; z-index: 2; }

        /* PREV flow */
        .anim-right-fadeOut  { opacity: 0; transform: translate(calc(-50% + 34%), -50%) scale(0.8); }
        .anim-center-toRight { transform: translate(calc(-50% + 28%), -50%) scale(0.86); opacity: 0.7; z-index: 2; }
        .anim-left-toCenter  { transform: translate(-50%, -50%) scale(1); opacity: 1; z-index: 3; }
        .anim-incoming-fromLeft { transform: translate(calc(-50% - 28%), -50%) scale(0.86); opacity: 0.6; z-index: 2; }

        .is-left, .is-right { cursor: pointer; }
        .is-center { pointer-events: none; }
      `}</style>
    </div>
  );
}

function clampIndex(i: number, count: number) {
  if (!count) return 0;
  const n = ((i % count) + count) % count;
  return n;
}
