/**
 * Business details shown across the site.
 * Empty values show a "To be announced" note instead of invented data.
 */
export const site = {
  name: "DRCL",
  tagline: "A Cleaner Space. A Better Life.",
  description:
    "DRCL makes reliable cleaning products for floors, toilets, bathrooms, kitchens and glass — designed to make every corner of your home shine.",
  /**
   * Live website address, used for canonical links, sitemap and Google.
   * Set NEXT_PUBLIC_SITE_URL (e.g. https://www.yourdomain.com) when you deploy.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  /** Local area used in SEO titles, meta tags and Google structured data. */
  location: {
    locality: "Powayan",
    district: "Shahjahanpur",
    state: "Uttar Pradesh",
    stateCode: "IN-UP",
    postalCode: "242401",
    country: "IN",
  },
  keywords: [
    "DRCL",
    "cleaning products Powayan",
    "cleaning products Shahjahanpur",
    "floor cleaner Powayan",
    "floor cleaner Shahjahanpur",
    "toilet cleaner Shahjahanpur",
    "phenyl Powayan",
    "phenyl Shahjahanpur",
    "bathroom cleaner Shahjahanpur",
    "kitchen cleaner Shahjahanpur",
    "glass cleaner Shahjahanpur",
    "cleaning products manufacturer Shahjahanpur",
    "cleaning products wholesale Shahjahanpur",
    "home cleaning products Uttar Pradesh",
  ],
  contact: {
    email: "drcl@gmail.com" as string,
    /** Display format. */
    phone: "+91 95698 58304" as string,
    /** WhatsApp Business number: digits only, with country code — used for wa.me links. */
    whatsapp: "919569858304" as string,
    address: "Badripur Hadira, Powayan, Shahjahanpur, Uttar Pradesh, India" as string,
  },
  social: {
    instagram: "" as string,
    facebook: "" as string,
    youtube: "" as string,
    x: "" as string,
  },
  /** Orders at or above this subtotal ship free. Sample value. */
  freeShippingThreshold: 499,
  shippingFee: 49,
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/#why-drcl", label: "Why DRCL" },
  { href: "/contact", label: "Contact" },
] as const;
