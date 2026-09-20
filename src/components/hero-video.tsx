"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { REDUCED_MOTION_QUERY } from "@/lib/motion";

const POSTER = "/media/hero-poster.jpg";

/**
 * Background video for the hero.
 *
 * Owner's explicit decision (2026-09-20): the ORIGINAL film file,
 * byte-for-byte (149.9 MB, 63.5s, 1920x1080), for every visitor.
 * GitHub's 100 MB cap rules the repo out, so it is served from Vercel
 * Blob (store elor-hero) — the URL below is that store's public CDN
 * address. Muted is a browser requirement for autoplay, not a choice;
 * the file's letterbox bars are part of its pixels and will show.
 *
 * Reduced motion still gets the static poster — that stays
 * non-negotiable regardless of file strategy.
 */
const FILM_URL =
  "https://yuwcvgwwgwizeppn.public.blob.vercel-storage.com/hero-film.mp4";

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
      src={FILM_URL}
      poster={POSTER}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
