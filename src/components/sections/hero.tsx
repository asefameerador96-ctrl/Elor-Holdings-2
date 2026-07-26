import { HeroVideo } from "@/components/hero-video";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden grain">
      <div className="absolute inset-0 -z-10">
        <HeroVideo />
      </div>

      {/* Scrim guarantees text contrast over any video frame. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/55 to-bg/10"
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

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Reveal index={2}>
            <p className="measure text-lg text-muted">
              {SITE.tagline} We manage, let, and broker property across
              Dhaka&rsquo;s prime districts &mdash; and push every building we
              touch toward a longer, greener life.
            </p>
          </Reveal>
          <Reveal index={3}>
            <p
              aria-hidden
              className="shrink-0 text-xs uppercase tracking-[0.3em] text-muted"
            >
              00 &mdash; scroll
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
