import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Image credits",
};

/**
 * CC attribution page. The Wikimedia Commons licenses used on this
 * site (CC BY 2.0 / CC BY-SA 4.0) require author and license credit;
 * this page is linked from the footer of every page.
 */
const CREDITS = [
  {
    file: "Dhaka City Gulshan 10 / 11 / 12",
    author: "IbnSina20",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Dhaka_City_Gulshan_10.jpg",
  },
  {
    file: "Modern residential building with terraced rooftops at Mugda in Dhaka",
    author: "A S M Jobaer",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Modern_residential_building_with_terraced_rooftops_at_Mugda_in_Dhaka.jpg",
  },
  {
    file: "Hatirjheel, Dhaka, Bangladesh",
    author: "ASaber91",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Hatirjheel,_Dhaka,_Bangladesh_(35715286874).jpg",
  },
  {
    file: "A modern building exterior at night",
    author: "Muhammadphoto",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:A_modern_building_exterior_at_night,_featuring_prominent_vertical_architectural_elements_and_a_well-lit_ground_floor_entrance.jpg",
  },
] as const;

export default function CreditsPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-6 py-32">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Credits</p>
      <h1 className="mt-3 text-4xl font-semibold uppercase sm:text-5xl">
        Image credits
      </h1>
      <p className="measure mt-6 text-muted">
        Photography of Dhaka on this site is used under Creative Commons
        licenses from Wikimedia Commons. Our thanks to the photographers.
      </p>

      <ul className="mt-12 divide-y divide-line border-t border-line">
        {CREDITS.map((c) => (
          <li key={c.file} className="py-6">
            <p className="font-medium">{c.file}</p>
            <p className="mt-1 text-sm text-muted">
              by {c.author} &middot;{" "}
              <a
                href={c.licenseUrl}
                className="cursor-pointer underline underline-offset-2 transition-colors duration-200 hover:text-fg"
              >
                {c.license}
              </a>{" "}
              &middot;{" "}
              <a
                href={c.sourceUrl}
                className="cursor-pointer underline underline-offset-2 transition-colors duration-200 hover:text-fg"
              >
                source
              </a>
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-muted">
        Background film: original footage, Elor Holdings Bangladesh.
      </p>

      <Link
        href="/"
        className="mt-12 inline-flex min-h-11 cursor-pointer items-center text-xs uppercase tracking-[0.22em] text-accent"
      >
        &larr; Back to site
      </Link>
    </main>
  );
}
