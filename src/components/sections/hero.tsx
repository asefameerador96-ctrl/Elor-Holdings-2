import { HeroVideo } from "@/components/hero-video";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <HeroVideo />
      </div>

      {/* Bottom-anchored scrim only: the upper two-thirds of the video
          stays untouched; text keeps contrast where it actually sits. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[45%] bg-gradient-to-t from-bg/90 via-bg/40 to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-10 sm:pb-24">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-accent">
            Dhaka &middot; Property management &amp; commission agents
          </p>
        </Reveal>

        <Reveal index={1}>
          <h1 className="text-[clamp(3.2rem,10.5vw,9rem)] font-semibold uppercase">
            Elor
            <br />
            Holdings
          </h1>
        </Reveal>

        <Reveal index={2} className="mt-10">
          <p className="measure text-lg text-muted">
            {SITE.tagline} We manage, let, and broker property across
            Dhaka&rsquo;s prime districts &mdash; and push every building we
            touch toward a longer, greener life.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
