"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Index within a group, used to stagger siblings. */
  index?: number;
  className?: string;
  /** Distance travelled on entry, in px. Keep small; 24 reads better than 80. */
  distance?: number;
};

/**
 * Entrance primitive: fade + short rise, once, when scrolled into view.
 *
 * Deliberately boring. The design-system guidance is to animate one or
 * two key elements per view — this exists so that entrances across the
 * whole site share identical timing rather than each section inventing
 * its own. `whileInView` with `once: true` means no re-trigger on scroll
 * back up, which otherwise makes long pages feel twitchy.
 */
export function Reveal({ children, index = 0, className, distance = 24 }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    // Final state, no transition. Not `opacity: 0` with a 0.01ms timer —
    // content must be present and readable immediately.
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: DURATION.slow,
        ease: EASE_OUT,
        delay: index * STAGGER,
      }}
    >
      {children}
    </motion.div>
  );
}
