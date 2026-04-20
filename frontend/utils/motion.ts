import type { Transition, Variants } from "framer-motion";

export interface RevealOptions {
  side?: "left" | "right" | "top" | "bottom";
  distance?: number;
  opacity?: boolean;
  transition?: Transition;
  viewport?: {
    once?: boolean;
    amount?: "some" | "all" | number;
  };
  delay?: number;
}

const DEFAULT_TRANSITION: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

function hiddenShown({
  side = "bottom",
  distance = 40,
  opacity = true,
}: Pick<RevealOptions, "side" | "distance" | "opacity"> = {}) {
  const hidden: Record<string, number> = {};
  const shown: Record<string, number> = {};
  if (side === "left") {
    hidden.x = -distance;
    shown.x = 0;
  } else if (side === "right") {
    hidden.x = distance;
    shown.x = 0;
  } else if (side === "top") {
    hidden.y = -distance;
    shown.y = 0;
  } else {
    hidden.y = distance;
    shown.y = 0;
  }
  if (opacity) {
    hidden.opacity = 0;
    shown.opacity = 1;
  }
  return { hidden, shown };
}

/** Entrance reveal bound to viewport (plays once when scrolled into view). */
export function motionProps(opts: RevealOptions = {}) {
  const { hidden, shown } = hiddenShown(opts);
  const transition: Transition = {
    ...DEFAULT_TRANSITION,
    ...(opts.delay != null ? { delay: opts.delay } : {}),
    ...(opts.transition ?? {}),
  };
  const viewport = {
    once: true,
    amount: 0.2 as "some" | "all" | number,
    ...(opts.viewport ?? {}),
  };
  return {
    initial: hidden,
    whileInView: shown,
    transition,
    viewport,
  };
}

/** Mount-entrance reveal (plays immediately on mount, not on scroll). */
export function mountProps(opts: RevealOptions = {}) {
  const { hidden, shown } = hiddenShown(opts);
  const transition: Transition = {
    ...DEFAULT_TRANSITION,
    ...(opts.delay != null ? { delay: opts.delay } : {}),
    ...(opts.transition ?? {}),
  };
  return {
    initial: hidden,
    animate: shown,
    transition,
  };
}

/** Parent container that staggers children. Pair with `staggerChild()`. */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    shown: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };
}

/** Child variant used inside a `staggerContainer`. */
export function staggerChild(opts: RevealOptions = {}): Variants {
  const { hidden, shown } = hiddenShown(opts);
  return {
    hidden,
    shown: {
      ...shown,
      transition: { ...DEFAULT_TRANSITION, ...(opts.transition ?? {}) },
    },
  };
}

/** Scroll-triggered stagger container (plays once on scroll into view). */
export function staggerOnScroll(stagger = 0.08, amount: number = 0.2) {
  return {
    initial: "hidden",
    whileInView: "shown",
    viewport: { once: true, amount },
    variants: staggerContainer(stagger),
  };
}

/** Mount-triggered stagger container (plays immediately). */
export function staggerOnMount(stagger = 0.08, delayChildren = 0) {
  return {
    initial: "hidden",
    animate: "shown",
    variants: staggerContainer(stagger, delayChildren),
  };
}
