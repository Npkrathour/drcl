/**
 * Product catalogue.
 *
 * NOTE: Prices are sample values for the storefront build. Product images are
 * generated SVG mockups (see scripts/generate-mockups.mjs) — replace them with
 * real product photography at the same paths when available.
 * Ratings are intentionally omitted: only add `rating` once genuine customer
 * reviews exist.
 */

export type CategorySlug =
  | "floor-cleaning"
  | "toilet-cleaning"
  | "bathroom-cleaning"
  | "kitchen-cleaning"
  | "glass-cleaning"
  | "multi-purpose-cleaning"
  | "disinfectants"
  | "cleaning-essentials";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
  /** Soft tint used behind the category artwork */
  tint: string;
  /** Category colour, matching its product's bottle */
  accent: string;
}

export type SizeLabel = "500ml" | "1L" | "5L";

export interface ProductSize {
  label: SizeLabel;
  price: number;
}

export interface Product {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: CategorySlug;
  images: string[];
  sizes: ProductSize[];
  fragrance: string;
  highlights: string[];
  howToUse: string[];
  accent: string;
  tint: string;
  featured: boolean;
  /** Only set when backed by real, verified reviews. */
  rating?: { average: number; count: number };
}

const img = (slug: string) => [
  `/images/products/${slug}.svg`,
  `/images/products/${slug}-label.svg`,
  `/images/products/${slug}-sizes.svg`,
];

export const categories: Category[] = [
  {
    slug: "floor-cleaning",
    name: "Floor Cleaning",
    description: "Everyday floor care that leaves rooms looking bright and smelling fresh.",
    image: "/images/products/premium-floor-cleaner.svg",
    tint: "#E3F5EA",
    accent: "#32B768",
  },
  {
    slug: "toilet-cleaning",
    name: "Toilet Cleaning",
    description: "Thick formulas with an angled nozzle to reach under the rim.",
    image: "/images/products/strong-toilet-cleaner.svg",
    tint: "#E2ECF8",
    accent: "#1D5FA8",
  },
  {
    slug: "bathroom-cleaning",
    name: "Bathroom Cleaning",
    description: "Spray-and-wipe care for tiles, taps and fittings.",
    image: "/images/products/bathroom-cleaner.svg",
    tint: "#DFF4F3",
    accent: "#19A7A0",
  },
  {
    slug: "kitchen-cleaning",
    name: "Kitchen Cleaning",
    description: "Cuts through daily kitchen grease on counters and stovetops.",
    image: "/images/products/kitchen-cleaner.svg",
    tint: "#FDF3DE",
    accent: "#E09B1B",
  },
  {
    slug: "glass-cleaning",
    name: "Glass Cleaning",
    description: "For windows, mirrors and glass tops with a clear finish.",
    image: "/images/products/glass-cleaner.svg",
    tint: "#E4F1FB",
    accent: "#2E86CC",
  },
  {
    slug: "multi-purpose-cleaning",
    name: "Multi-Purpose Cleaning",
    description: "One bottle for many washable surfaces around the home.",
    image: "/images/products/multi-purpose-cleaner.svg",
    tint: "#EEEBFB",
    accent: "#6A5ACD",
  },
  {
    slug: "disinfectants",
    name: "Disinfectants",
    description: "Surface hygiene products for routine home and workplace use.",
    image: "/images/products/surface-disinfectant.svg",
    tint: "#EEF2F6",
    accent: "#102A43",
  },
  {
    slug: "cleaning-essentials",
    name: "Other Cleaning Essentials",
    description: "Refills and everyday add-ons that keep your routine stocked.",
    image: "/images/products/refill-pouch.svg",
    tint: "#E6ECF2",
    accent: "#2B4C6F",
  },
];

export const products: Product[] = [
  {
    slug: "premium-floor-cleaner",
    name: "DRCL Premium Floor Cleaner",
    shortDescription: "Fresh citrus floor cleaner for tiles, marble and mosaic floors.",
    description:
      "DRCL Premium Floor Cleaner is made for everyday mopping. Dilute in water, mop as usual and enjoy floors that look clean and smell fresh with a light citrus fragrance.",
    category: "floor-cleaning",
    images: img("premium-floor-cleaner"),
    sizes: [
      { label: "500ml", price: 99 },
      { label: "1L", price: 179 },
      { label: "5L", price: 749 },
    ],
    fragrance: "Fresh Citrus",
    highlights: ["Fresh citrus fragrance", "Suitable for daily mopping", "Easy-pour bottle with grip handle"],
    howToUse: [
      "Add one capful to half a bucket of water.",
      "Mop the floor as usual.",
      "No need to rinse for routine cleaning.",
    ],
    accent: "#32B768",
    tint: "#E3F5EA",
    featured: true,
  },
  {
    slug: "strong-toilet-cleaner",
    name: "DRCL Strong Toilet Cleaner",
    shortDescription: "Thick toilet cleaner with an angled nozzle for under-rim cleaning.",
    description:
      "DRCL Strong Toilet Cleaner comes in an angled-neck bottle that makes it easy to reach under the rim. The thick liquid clings to the bowl so it has time to work before you scrub.",
    category: "toilet-cleaning",
    images: img("strong-toilet-cleaner"),
    sizes: [
      { label: "500ml", price: 109 },
      { label: "1L", price: 199 },
      { label: "5L", price: 849 },
    ],
    fragrance: "Ocean Fresh",
    highlights: ["Angled nozzle for under-rim reach", "Thick, clinging formula", "Ocean fresh fragrance"],
    howToUse: [
      "Squeeze under the rim and around the bowl.",
      "Leave for 10 minutes.",
      "Scrub with a toilet brush and flush.",
    ],
    accent: "#1D5FA8",
    tint: "#E2ECF8",
    featured: true,
  },
  {
    slug: "bathroom-cleaner",
    name: "DRCL Bathroom Cleaner",
    shortDescription: "Spray-and-wipe cleaner for tiles, taps, sinks and shower areas.",
    description:
      "DRCL Bathroom Cleaner is a ready-to-use spray for the surfaces you clean every week — tiles, taps, sinks and shower areas. Spray, wait a moment and wipe clean.",
    category: "bathroom-cleaning",
    images: img("bathroom-cleaner"),
    sizes: [
      { label: "500ml", price: 129 },
      { label: "1L", price: 229 },
      { label: "5L", price: 949 },
    ],
    fragrance: "Aqua Mist",
    highlights: ["Ready-to-use trigger spray", "For tiles, taps and sinks", "Aqua mist fragrance"],
    howToUse: [
      "Spray evenly on the surface.",
      "Leave for 2–3 minutes.",
      "Wipe with a damp cloth or sponge and rinse.",
    ],
    accent: "#19A7A0",
    tint: "#DFF4F3",
    featured: true,
  },
  {
    slug: "kitchen-cleaner",
    name: "DRCL Kitchen Cleaner",
    shortDescription: "Lemon-fresh spray for counters, stovetops and kitchen tiles.",
    description:
      "DRCL Kitchen Cleaner is designed for the everyday mess of cooking. Use it on counters, stovetops and backsplash tiles to lift daily grease and leave a lemon-fresh finish.",
    category: "kitchen-cleaning",
    images: img("kitchen-cleaner"),
    sizes: [
      { label: "500ml", price: 129 },
      { label: "1L", price: 229 },
      { label: "5L", price: 949 },
    ],
    fragrance: "Lemon Zest",
    highlights: ["Lifts everyday kitchen grease", "Lemon zest fragrance", "Ready-to-use trigger spray"],
    howToUse: [
      "Spray on the surface.",
      "Wipe with a clean cloth.",
      "For food-contact surfaces, rinse with water after cleaning.",
    ],
    accent: "#E09B1B",
    tint: "#FDF3DE",
    featured: true,
  },
  {
    slug: "glass-cleaner",
    name: "DRCL Glass Cleaner",
    shortDescription: "Clear-finish spray for windows, mirrors and glass tabletops.",
    description:
      "DRCL Glass Cleaner helps you clean windows, mirrors and glass tabletops. Spray and wipe with a dry, lint-free cloth for a clear finish.",
    category: "glass-cleaning",
    images: img("glass-cleaner"),
    sizes: [
      { label: "500ml", price: 99 },
      { label: "1L", price: 179 },
      { label: "5L", price: 749 },
    ],
    fragrance: "Crystal Clear",
    highlights: ["For windows and mirrors", "Clear finish", "Fine-mist trigger spray"],
    howToUse: [
      "Spray from about 20 cm away.",
      "Wipe with a dry, lint-free cloth.",
      "Buff in circular motions for best results.",
    ],
    accent: "#2E86CC",
    tint: "#E4F1FB",
    featured: true,
  },
  {
    slug: "multi-purpose-cleaner",
    name: "DRCL Multi-Purpose Cleaner",
    shortDescription: "Lavender-fresh cleaner for most washable surfaces at home.",
    description:
      "DRCL Multi-Purpose Cleaner is the one bottle to keep handy for quick clean-ups on washable surfaces — tables, doors, switchboards (dry cloth only) and more. Always test on a small hidden area first.",
    category: "multi-purpose-cleaning",
    images: img("multi-purpose-cleaner"),
    sizes: [
      { label: "500ml", price: 119 },
      { label: "1L", price: 209 },
      { label: "5L", price: 899 },
    ],
    fragrance: "Lavender Fresh",
    highlights: ["For many washable surfaces", "Lavender fragrance", "Ready-to-use trigger spray"],
    howToUse: [
      "Test on a small hidden area first.",
      "Spray on the surface or on a cloth.",
      "Wipe clean.",
    ],
    accent: "#6A5ACD",
    tint: "#EEEBFB",
    featured: true,
  },
  {
    slug: "surface-disinfectant",
    name: "DRCL Surface Disinfectant",
    shortDescription: "Surface hygiene liquid for routine use at home and work.",
    description:
      "DRCL Surface Disinfectant is a surface hygiene liquid for routine home and workplace cleaning. Always read the label and use as directed.",
    category: "disinfectants",
    images: img("surface-disinfectant"),
    sizes: [
      { label: "500ml", price: 149 },
      { label: "1L", price: 269 },
      { label: "5L", price: 1099 },
    ],
    fragrance: "Mild",
    highlights: ["For routine surface hygiene", "Home and workplace use", "Read label before use"],
    howToUse: [
      "Read the label before use.",
      "Dilute or apply as directed on the pack.",
      "Keep out of reach of children.",
    ],
    accent: "#102A43",
    tint: "#EEF2F6",
    featured: false,
  },
  {
    slug: "refill-pouch",
    name: "DRCL Floor Cleaner Refill Pouch",
    shortDescription: "Refill pouch for your DRCL floor cleaner bottle.",
    description:
      "Keep your DRCL Premium Floor Cleaner bottle and top it up with this refill pouch. Same fresh citrus formula, less plastic per litre than buying a new bottle.",
    category: "cleaning-essentials",
    images: img("refill-pouch"),
    sizes: [
      { label: "1L", price: 159 },
      { label: "5L", price: 699 },
    ],
    fragrance: "Fresh Citrus",
    highlights: ["Refills your existing bottle", "Same fresh citrus formula", "Spout for easy pouring"],
    howToUse: [
      "Unscrew the spout cap.",
      "Pour slowly into your DRCL bottle.",
      "Close both caps tightly after use.",
    ],
    accent: "#2B4C6F",
    tint: "#E6ECF2",
    featured: false,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 4) {
  const same = products.filter((p) => p.slug !== product.slug && p.category === product.category);
  const others = products.filter((p) => p.slug !== product.slug && p.category !== product.category);
  return [...same, ...others].slice(0, limit);
}

export function startingPrice(product: Product) {
  return Math.min(...product.sizes.map((s) => s.price));
}

export function searchProducts(query: string, list: Product[] = products) {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((p) => {
    const category = getCategory(p.category)?.name ?? "";
    return [p.name, p.shortDescription, p.fragrance, category].join(" ").toLowerCase().includes(q);
  });
}
