"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

type Slide = { src: string; alt: string };

const DISTRICTS: {
  id: string;
  title: string;
  body: string;
  slides: [Slide, Slide];
}[] = [
  {
    id: "01",
    title: "Gulshan",
    body: "Diplomatic-zone addresses, corporate lets, and Dhaka's deepest rental market.",
    slides: [
      {
        src: "/images/districts/gulshan-1.jpg",
        alt: "Residential tower in Gulshan with a patterned perforated-screen facade",
      },
      {
        src: "/images/districts/gulshan-2.jpg",
        alt: "Perforated metal facade in Gulshan seen from below against a blue sky",
      },
    ],
  },
  {
    id: "02",
    title: "Banani",
    body: "Boutique blocks and café avenues — Dhaka's most walkable commercial address.",
    slides: [
      {
        src: "/images/districts/banani-1.jpg",
        alt: "Faceted concrete facade of a modern building in Banani",
      },
      {
        src: "/images/districts/banani-2.jpg",
        alt: "Sunlit modern living room with leather sofas and marble floor in a Banani residence",
      },
    ],
  },
  {
    id: "03",
    title: "Baridhara Diplomatic Zone",
    body: "Embassy rows, gated calm, and residences that hold their value quietly.",
    slides: [
      {
        src: "/images/districts/baridhara-1.jpg",
        alt: "Modern concrete residence in Baridhara Diplomatic Zone lit at dusk",
      },
      {
        src: "/images/districts/baridhara-2.jpg",
        alt: "Terraced balconies with dense planting at a Baridhara residence",
      },
    ],
  },
  {
    id: "04",
    title: "Jolshiri",
    body: "A planned township taking shape east of the city — early, green, and rising.",
    slides: [
      {
        src: "/images/districts/jolshiri-1.jpg",
        alt: "Rooftop infinity pool overlooking the city at blue hour in Jolshiri",
      },
      {
        src: "/images/districts/jolshiri-2.jpg",
        alt: "Landscaped rooftop terrace with seating at dusk in Jolshiri",
      },
    ],
  },
  {
    id: "05",
    title: "Purbachal",
    body: "Plots, weekend homes, and the expressway — the city's next chapter.",
    slides: [
      {
        src: "/images/districts/purbachal-1.jpg",
        alt: "Container-style weekend house with lawn and pergola at sunset in Purbachal",
      },
      {
        src: "/images/districts/purbachal-2.jpg",
        alt: "Elevated container home with hanging vines beside a tennis court in Purbachal",
      },
    ],
  },
  {
    id: "06",
    title: "Basundhara",
    body: "Universities, corporate campuses, and green-roofed towers in the northeast.",
    slides: [
      {
        src: "/images/districts/basundhara-1.jpg",
        alt: "Apartment towers with rooftop gardens in Basundhara",
      },
      {
        src: "/images/districts/basundhara-2.jpg",
        alt: "Aerial view of green-roofed apartment towers with rooftop solar panels in Basundhara",
      },
    ],
  },
];

/**
 * Two-image crossfade for a district card. Auto-advances on a slow
 * cadence, desynchronised per card (staggered start) so the wall of
 * cards never blinks in unison. Dots are real buttons — keyboard
 * focusable, and they sit above the card so they stay clickable.
 * Reduced motion: no timer, first image only, dots still work.
 */
function CardCarousel({
  slides,
  offsetMs,
  sizes,
}: {
  slides: readonly Slide[];
  offsetMs: number;
  sizes: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let interval: ReturnType<typeof setInterval> | undefined;
    const kickoff = setTimeout(() => {
      interval = setInterval(
        () => setIndex((i) => (i + 1) % slides.length),
        6000,
      );
      setIndex((i) => (i + 1) % slides.length);
    }, 3000 + offsetMs);

    return () => {
      clearTimeout(kickoff);
      if (interval) clearInterval(interval);
    };
  }, [slides.length, offsetMs]);

  return (
    <>
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes={sizes}
          className={`object-cover transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute bottom-5 right-5 z-10 flex gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show photo ${i + 1}`}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 cursor-pointer rounded-full border border-fg/40 transition-colors duration-200 ${
              i === index ? "bg-accent" : "bg-bg/50 hover:bg-fg/60"
            }`}
          />
        ))}
      </div>
    </>
  );
}

/**
 * Pinned horizontal district gallery — six cards, each a two-image
 * carousel. Pinned distance equals real track width; reduced motion
 * degrades to a user-driven horizontal list.
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

  const sizes = "(max-width: 640px) 82vw, (max-width: 1024px) 52vw, 38vw";

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
        {DISTRICTS.map((d, cardIndex) => (
          <article
            key={d.id}
            className="group relative flex h-[62vh] w-[82vw] shrink-0 flex-col justify-end overflow-hidden rounded-lg border border-line sm:w-[52vw] lg:w-[38vw]"
          >
            <CardCarousel
              slides={d.slides}
              offsetMs={cardIndex * 1100}
              sizes={sizes}
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
