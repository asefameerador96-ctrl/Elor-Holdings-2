"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskHeading } from "@/components/ui/mask-heading";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { prefersReducedMotion } from "@/lib/motion";

const COMMITMENTS = [
  {
    title: "Rooftops that work",
    body: "We push owners toward planted roofs and terraces — cooler floors below, calmer air above.",
  },
  {
    title: "Water, twice",
    body: "Rainwater capture and reuse specified in every renovation we manage.",
  },
  {
    title: "Solar-ready",
    body: "Wiring and roof loading planned so panels are an upgrade, not a rebuild.",
  },
  {
    title: "Waste, separated",
    body: "Segregation at source in the buildings we run, with tenants on board.",
  },
] as const;

/**
 * Environmental positioning stated as commitments — practices we push
 * for — deliberately not as certifications or measured statistics.
 *
 * Motion: masked headline entrance, parallax image, and commitment
 * cards whose top rules draw in (scaleX) as the grid scrubs into view.
 */
export function Stewardship() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Rules draw left-to-right, scrubbed so the drawing tracks the
      // user's own scroll speed rather than playing on a timer.
      gsap.fromTo(
        ".commit-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".commit-grid",
            start: "top 85%",
            end: "top 45%",
            scrub: 1,
          },
        },
      );

      gsap.from(".commit-card", {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".commit-grid", start: "top 80%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stewardship"
      ref={sectionRef}
      className="mx-auto max-w-7xl px-6 py-28 sm:px-10 sm:py-40"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Stewardship
            </p>
          </Reveal>
          <MaskHeading
            lines={["A greener", "Dhaka, one", "roof at a time"]}
            className="mt-3 text-4xl font-semibold uppercase sm:text-6xl"
          />
          <Reveal index={1}>
            <p className="measure mt-8 text-lg text-muted">
              Dhaka is one of the fastest-growing cities on earth, and its
              buildings will outlast every lease we sign. Management is
              leverage: the firm that runs a property decides how it consumes,
              what it wastes, and how long it lasts. We use that leverage.
            </p>
          </Reveal>

          <dl className="commit-grid mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {COMMITMENTS.map((c) => (
              <div key={c.title} className="commit-card">
                <div
                  aria-hidden
                  className="commit-rule h-px origin-left bg-accent-dim motion-reduce:scale-x-100"
                />
                <dt className="pt-5 font-display text-base font-semibold uppercase tracking-wide">
                  {c.title}
                </dt>
                <dd className="mt-2 text-sm text-muted">{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ParallaxImage
          src="/images/green-rooftops.jpg"
          alt="Terraced rooftops with planting on a modern Dhaka residential building at dusk"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="min-h-[420px] rounded-lg border border-line lg:min-h-0"
        />
      </div>
    </section>
  );
}
