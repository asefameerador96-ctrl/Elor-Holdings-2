import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

/**
 * Fixed wordmark header. Deliberately minimal: era-residence-style
 * sites let the content carry the weight and keep chrome nearly
 * invisible. Server component — no state, no JS shipped.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href="/"
          className="font-display text-sm font-semibold uppercase tracking-[0.32em] text-fg"
        >
          {SITE.shortName}
          <span className="text-accent">.</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="hidden items-center gap-8 sm:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 cursor-pointer items-center text-xs uppercase tracking-[0.22em] text-muted transition-colors duration-200 hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line bg-bg/60 px-5 text-xs uppercase tracking-[0.22em] text-fg backdrop-blur transition-colors duration-200 hover:border-accent-dim"
              >
                Enquire
              </a>
            </li>
          </ul>
          {/* Mobile: single always-visible action instead of a JS menu. */}
          <a
            href="#contact"
            className="inline-flex min-h-11 cursor-pointer items-center text-xs uppercase tracking-[0.22em] text-muted sm:hidden"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
