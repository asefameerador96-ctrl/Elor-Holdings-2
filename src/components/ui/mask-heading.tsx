"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

type MaskHeadingProps = {
  /** One entry per visual line; rendered as stacked masked lines. */
  lines: readonly string[];
  as?: "h1" | "h2";
  className?: string;
  id?: string;
};

/**
 * Heading whose lines slide up out of clipped wrappers on first view —
 * the era-residence signature entrance. Whole phrases per line (never
 * split mid-word), so screen readers read one continuous heading.
 * Reduced motion: lines render in place, nothing animates.
 */
export function MaskHeading({ lines, as: Tag = "h2", className, id }: MaskHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".mask-line-inner", {
        yPercent: 115,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden">
          <span className="mask-line-inner block">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
