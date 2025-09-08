import type { Transition, Variants } from "framer-motion";

export interface ViewportSlideOptions {
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

export function motionProps({
  side = "bottom",
  distance = 60,
  opacity = true,
  transition,
  viewport,
  delay,
}: ViewportSlideOptions = {}) {
  const initial: Record<string, number | undefined> = {};
  const target: Record<string, number | undefined> = {};

  if (side === "left") {
    initial.x = -distance;
    target.x = 0;
  } else if (side === "right") {
    initial.x = distance;
    target.x = 0;
  } else if (side === "top") {
    initial.y = -distance;
    target.y = 0;
  } else {
    // bottom
    initial.y = distance;
    target.y = 0;
  }

  if (opacity) {
    initial.opacity = 0;
    target.opacity = 1;
  }

  const defaultTransition: Transition = { duration: 0.6, ease: "easeOut" };
  const mergedTransition: Transition = {
    ...defaultTransition,
    ...(delay != null ? { delay } : {}),
    ...(transition ?? {}),
  };

  const mergedViewport = {
    once: false,
    amount: 0.2 as "some" | "all" | number,
    ...(viewport ?? {}),
  };

  const props = {
    initial,
    whileInView: target,
    transition: mergedTransition,
    viewport: mergedViewport,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return props as any;
}

export function slideInVariants({
  side = "bottom",
  distance = 60,
  opacity = true,
}: Pick<ViewportSlideOptions, "side" | "distance" | "opacity"> = {}): Variants {
  const hidden: Record<string, number | undefined> = {};
  const show: Record<string, number | undefined> = {};

  if (side === "left") {
    hidden.x = -distance;
    show.x = 0;
  } else if (side === "right") {
    hidden.x = distance;
    show.x = 0;
  } else if (side === "top") {
    hidden.y = -distance;
    show.y = 0;
  } else {
    hidden.y = distance;
    show.y = 0;
  }

  if (opacity) {
    hidden.opacity = 0;
    show.opacity = 1;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return { hidden, show } as any;
}
