"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskHeading } from "@/components/ui/mask-heading";
import { Reveal } from "@/components/ui/reveal";
import { prefersReducedMotion } from "@/lib/motion";
import { SITE } from "@/lib/site";

const TICKER =
  "Gulshan · Banani · Baridhara · Dhanmondi · Uttara · Bashundhara · Hatirjheel · ";

/**
 * Closing section. Two scroll moments: a district ticker whose travel
 * is bound to scroll progress (it only moves while you do — no
 * infinite autoplay), and the masked headline entrance. The ticker is
 * decorative and aria-hidden; the districts are already named
 * accessibly in the gallery.
 */
export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".district-ticker",
        { xPercent: 0 },
        {
          xPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="overflow-hidden border-t border-line"
    >
      <div aria-hidden className="border-b border-line py-6">
        <p className="district-ticker whitespace-nowrap font-display text-2xl font-semibold uppercase tracking-tight text-muted/60 motion-reduce:!transform-none sm:text-4xl">
          {TICKER.repeat(4)}
        </p>
      </div>

      <div className="px-6 py-20 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Reveal>
                <p className="text-xs uppercase tracking-[0.3em] text-accent">
                  Contact
                </p>
              </Reveal>
              <MaskHeading
                lines={["Put your", "property in", "better hands"]}
                className="mt-3 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold uppercase"
              />
              <Reveal index={1}>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-8 inline-block cursor-pointer text-lg text-accent underline decoration-accent-dim underline-offset-4 transition-colors duration-200 hover:decoration-accent"
                >
                  {SITE.email}
                </a>
              </Reveal>
            </div>

            <Reveal index={2}>
              <address className="text-sm not-italic leading-7 text-muted">
                {SITE.name}
                <br />
                {SITE.address}
                <br />
                {SITE.phone}
              </address>
            </Reveal>
          </div>

          <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {SITE.name}. All rights
              reserved.
            </p>
            <p>
              Photography of Dhaka by its residents &mdash;{" "}
              <Link
                href="/credits"
                className="cursor-pointer underline underline-offset-2 transition-colors duration-200 hover:text-fg"
              >
                image credits
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
