import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

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

export function Services() {
  return (
    <section id="services" className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-28 sm:px-10 sm:py-36 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              What we do
            </p>
            <h2 className="mt-3 text-4xl font-semibold uppercase sm:text-6xl">
              Services
            </h2>
            <p className="measure mt-6 text-muted">
              One firm, end to end: from the first valuation to the monthly
              statement years later.
            </p>
          </Reveal>
          <Reveal index={1} className="relative mt-10 hidden aspect-[3/4] overflow-hidden rounded-lg border border-line lg:block">
            <Image
              src="/images/night-facade.jpg"
              alt="Well-lit modern building entrance in Dhaka at night with patterned screens"
              fill
              sizes="(max-width: 1024px) 0px, 33vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        <ol className="divide-y divide-line border-t border-line">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} index={i}>
              <li className="group flex gap-6 py-8 sm:gap-10">
                <span className="pt-1 text-xs uppercase tracking-[0.25em] text-accent">
                  {s.id}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold uppercase sm:text-3xl">
                    {s.title}
                  </h3>
                  <p className="measure mt-3 text-muted">{s.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
