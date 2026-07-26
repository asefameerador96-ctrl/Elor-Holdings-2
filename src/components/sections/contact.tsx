import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/site";

export function Contact() {
  return (
    <footer id="contact" className="border-t border-line px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Contact
            </p>
            <h2 className="mt-3 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold uppercase">
              Put your
              <br />
              property in
              <br />
              better hands
            </h2>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-8 inline-block cursor-pointer text-lg text-accent underline decoration-accent-dim underline-offset-4 transition-colors duration-200 hover:decoration-accent"
            >
              {SITE.email}
            </a>
          </Reveal>

          <Reveal index={1}>
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
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
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
    </footer>
  );
}
