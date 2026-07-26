"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { REDUCED_MOTION_QUERY } from "@/lib/motion";

const POSTER = "/media/hero-poster.jpg";

/**
 * Background video for the hero.
 *
 * - Reduced motion: no <video> at all — the poster frame is the hero.
 *   A background video is exactly the kind of ambient motion the
 *   preference exists to stop.
 * - Coarse pointers get the 720p encode (1.8 MB vs 4.4 MB); phone
 *   networks and batteries shouldn't pay for desktop pixels.
 * - Muted + playsInline are both required for mobile autoplay; the
 *   poster covers the gap until first frame.
 */
export function HeroVideo() {
  const reduced = useMediaQuery(REDUCED_MOTION_QUERY);
  const isCoarse = useMediaQuery("(pointer: coarse)");

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
      src={isCoarse ? "/media/hero-720.mp4" : "/media/hero-1080.mp4"}
      poster={POSTER}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
