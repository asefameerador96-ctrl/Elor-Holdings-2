import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

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
 * for — deliberately not as certifications or measured statistics,
 * which the business does not yet have and must not invent.
 */
export function Stewardship() {
  return (
    <section id="stewardship" className="mx-auto max-w-7xl px-6 py-28 sm:px-10 sm:py-40">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Stewardship
            </p>
            <h2 className="mt-3 text-4xl font-semibold uppercase sm:text-6xl">
              A greener
              <br />
              Dhaka, one
              <br />
              roof at a time
            </h2>
          </Reveal>
          <Reveal index={1}>
            <p className="measure mt-8 text-lg text-muted">
              Dhaka is one of the fastest-growing cities on earth, and its
              buildings will outlast every lease we sign. Management is
              leverage: the firm that runs a property decides how it consumes,
              what it wastes, and how long it lasts. We use that leverage.
            </p>
          </Reveal>

          <dl className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.title} index={i}>
                <div className="border-t border-line pt-5">
                  <dt className="font-display text-base font-semibold uppercase tracking-wide">
                    {c.title}
                  </dt>
                  <dd className="mt-2 text-sm text-muted">{c.body}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal index={2} className="relative min-h-[420px] overflow-hidden rounded-lg border border-line lg:min-h-0">
          <Image
            src="/images/green-rooftops.jpg"
            alt="Terraced rooftops with planting on a modern Dhaka residential building at dusk"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
