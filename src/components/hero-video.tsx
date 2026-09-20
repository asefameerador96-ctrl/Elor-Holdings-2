"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { REDUCED_MOTION_QUERY } from "@/lib/motion";

const POSTER = "/media/hero-poster.jpg";

/**
 * Background video for the hero.
 *
 * Owner's explicit decision (2026-09-20): the FULL 63.5s film at full
 * picture resolution plays for every visitor — no mobile variant, no
 * shortened loop. hero-full.mp4 is a CRF 18 (visually transparent)
 * encode of the complete reel at 91 MB; faststart + preload=metadata
 * mean it streams progressively behind the poster rather than blocking
 * paint. Muted is a browser requirement for autoplay, not a choice.
 *
 * Reduced motion still gets the static poster — that stays
 * non-negotiable regardless of file strategy.
 */
export function HeroVideo() {
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY);

  if (reduced) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${POSTER})` }}
      />
    );
  }

  return (
    <video
      aria-hidden
      className="absolute inset-0 h-full w-full object-cover"
      src="/media/hero-full.mp4"
      poster={POSTER}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
