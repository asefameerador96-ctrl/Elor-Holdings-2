"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

const DISTRICTS = [
  {
    id: "01",
    title: "Gulshan",
    body: "Diplomatic-zone addresses, corporate lets, and Dhaka's deepest rental market.",
    image: "/images/district-gulshan.jpg",
    alt: "Aerial view of Gulshan, Dhaka at sunset with high-rise buildings emerging from haze",
  },
  {
    id: "02",
    title: "Banani & Baridhara",
    body: "Boutique residential blocks and mixed-use avenues a bridge away from the lake.",
    image: "/images/district-banani.jpg",
    alt: "Drone view of a Banani avenue lined with modern towers, one with a rooftop garden",
  },
  {
    id: "03",
    title: "Hatirjheel fringe",
    body: "Lake-facing stock along the green loop — the city's most walkable waterfront.",
    image: "/images/green-hatirjheel.jpg",
    alt: "Tree-lined embankment and green water of Hatirjheel lake with the city skyline behind",
  },
  {
    id: "04",
    title: "Emerging east",
    body: "Mugda to Aftabnagar: terraced rooftops and first-owner buildings on the rise.",
    image: "/images/green-rooftops.jpg",
    alt: "Modern residential building in Mugda with terraced rooftops at blue hour",
  },
] as const;

/**
 * Pinned horizontal district gallery. Vertical scroll converts to
 * horizontal travel while pinned; pinned distance equals real track
 * width so the sequence ends exactly as the last card lands. Reduced
 * motion: never built — the track stays a user-driven horizontal list.
 */
export function Districts() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="districts"
      ref={sectionRef}
      aria-label="Districts we cover"
      className="relative overflow-hidden border-y border-line bg-surface py-20"
    >
      <div className="mb-10 px-6 sm:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          Where we work
        </p>
        <h2 className="mt-3 text-4xl font-semibold uppercase sm:text-6xl">
          The districts
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex gap-6 px-6 motion-reduce:overflow-x-auto motion-reduce:pb-4 sm:px-10"
      >
        {DISTRICTS.map((d) => (
          <article
            key={d.id}
            className="group relative flex h-[62vh] w-[82vw] shrink-0 flex-col justify-end overflow-hidden rounded-lg border border-line sm:w-[52vw] lg:w-[38vw]"
          >
            <Image
              src={d.image}
              alt={d.alt}
              fill
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 52vw, 38vw"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/25 to-transparent"
            />
            <div className="relative p-7">
              <span className="text-xs uppercase tracking-[0.25em] text-accent">
                {d.id}
              </span>
              <h3 className="mt-2 text-3xl font-semibold uppercase sm:text-4xl">
                {d.title}
              </h3>
              <p className="mt-3 max-w-md text-sm text-muted">{d.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
