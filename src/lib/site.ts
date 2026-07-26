/** Single source of truth for brand strings and contact details. */
export const SITE = {
  name: "Elor Holdings Bangladesh",
  shortName: "Elor",
  domain: "elorholdingsbangladesh.com",
  url: "https://elorholdingsbangladesh.com",
  tagline: "Property, held to a higher standard.",
  description:
    "Dhaka-based property management and commission agents. Elor Holdings runs residential and commercial property with institutional discipline and a stated commitment to greener buildings.",
  email: "hello@elorholdingsbangladesh.com",
  address: "Gulshan 2, Dhaka, Bangladesh",
  phone: "+880 1711-762015",
} as const;

export const NAV = [
  { label: "Districts", href: "#districts" },
  { label: "Stewardship", href: "#stewardship" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;
