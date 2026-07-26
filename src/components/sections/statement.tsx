"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

const COPY =
  "A building is a promise — to the family inside it, to the street it stands on, and to the city that has to outlive it. We manage property in Dhaka as if all three are watching.";

/**
 * Scrubbed word-by-word reveal. The real sentence lives in an sr-only
 * paragraph; the per-word spans are aria-hidden so screen readers hear
 * one sentence, not seventy fragments.
 */
export function Statement() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".statement-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.4,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 1,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mx-auto max-w-5xl px-6 py-32 sm:py-44">
      <p className="sr-only">{COPY}</p>
      <p
        aria-hidden
        className="text-[clamp(1.6rem,4.2vw,3.1rem)] font-medium leading-[1.25] tracking-tight"
      >
        {COPY.split(" ").map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="statement-word motion-reduce:opacity-100"
          >
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
