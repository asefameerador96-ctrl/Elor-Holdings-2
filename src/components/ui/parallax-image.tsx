"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
};

/**
 * Image with a slow vertical drift while it crosses the viewport.
 * The inner image is oversized (scale 1.15) so the drift never exposes
 * container edges. Parallax stays on this decorative layer only — text
 * never moves against scroll. Reduced motion: plain static image.
 */
export function ParallaxImage({ src, alt, sizes, className }: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, frame);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={frameRef} className={`relative overflow-hidden ${className ?? ""}`}>
      <div ref={imgRef} className="absolute inset-0 scale-[1.15]">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}
