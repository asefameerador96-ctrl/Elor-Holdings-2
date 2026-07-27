"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MaskHeading } from "@/components/ui/mask-heading";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { prefersReducedMotion } from "@/lib/motion";

const SERVICES = [
  {
    id: "01",
    title: "Property management",
    body: "Rent collection, maintenance, tenant relations, and clean ledgers — run with the discipline of a bank, reported monthly.",
  },
  {
    id: "02",
    title: "Letting & tenancy",
    body: "Vetted tenants, watertight agreements, and occupancy kept high across residential and commercial stock.",
  },
  {
    id: "03",
    title: "Sales & commission brokerage",
    body: "Buy-side and sell-side representation. Our commission is earned on outcomes, not introductions.",
  },
  {
    id: "04",
    title: "Valuation & advisory",
    body: "Honest pricing, feasibility, and market read-outs before you commit — not after.",
  },
  {
    id: "05",
    title: "Documentation & compliance",
    body: "Mutation, registration, utility transfers, RAJUK paperwork — handled, filed, and defensible.",
  },
] as const;

/**
 * Numbered service ledger. Each row scrubs from ghosted to full as it
 * transits its own viewport band — the list develops under the scroll
 * rather than appearing once. The sticky image eases from a slight
 * zoom across the section so the panel never sits dead.
 */
export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".service-row").forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0.15, x: 40 },
          {
            opacity: 1,
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 92%",
              end: "top 58%",
              scrub: 1,
            },
          },
        );
      });

      gsap.fromTo(
        ".services-image",
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-28 sm:px-10 sm:py-36 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              What we do
            </p>
          </Reveal>
          <MaskHeading
            lines={["Services"]}
            className="mt-3 text-4xl font-semibold uppercase sm:text-6xl"
          />
          <Reveal index={1}>
            <p className="measure mt-6 text-muted">
              One firm, end to end: from the first valuation to the monthly
              statement years later.
            </p>
          </Reveal>
          <div className="services-image mt-10 hidden lg:block">
            <ParallaxImage
              src="/images/night-facade.jpg"
              alt="Well-lit modern building entrance in Dhaka at night with patterned screens"
              sizes="(max-width: 1024px) 0px, 33vw"
              className="aspect-[3/4] rounded-lg border border-line"
            />
          </div>
        </div>

        <ol className="divide-y divide-line border-t border-line">
          {SERVICES.map((s) => (
            <li
              key={s.id}
              className="service-row group flex gap-6 py-8 motion-reduce:!opacity-100 motion-reduce:!transform-none sm:gap-10"
            >
              <span className="pt-1 text-xs uppercase tracking-[0.25em] text-accent">
                {s.id}
              </span>
              <div>
                <h3 className="text-2xl font-semibold uppercase transition-colors duration-200 group-hover:text-accent sm:text-3xl">
                  {s.title}
                </h3>
                <p className="measure mt-3 text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
