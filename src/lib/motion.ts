/**
 * Shared motion tokens.
 *
 * Every duration and easing in the app comes from here. Consistent
 * timing is most of what separates "designed" motion from "animated
 * everything" — if a value is invented inline in a component, it will
 * drift out of sync with the rest of the page.
 */

/** Expo-out. The workhorse for entrances: fast start, long settle. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Quint-in-out. For elements that leave and return (modals, menus). */
export const EASE_IN_OUT = [0.83, 0, 0.17, 1] as const;

export const DURATION = {
  /** Micro-interactions: hover, focus, colour shifts. */
  fast: 0.2,
  /** Standard UI transitions. */
  base: 0.4,
  /** Entrances for large elements. */
  slow: 0.9,
} as const;

/** Stagger between siblings in a reveal group. Above ~0.09 it drags. */
export const STAGGER = 0.06;

/**
 * Media query used in JS to halt animation engines outright.
 * CSS `prefers-reduced-motion` cannot stop a requestAnimationFrame loop,
 * so GSAP, Lenis and R3F each consult this before starting.
 */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
