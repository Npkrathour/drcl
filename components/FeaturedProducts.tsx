import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "./ProductCard";
import { SectionHeading } from "./ui/Reveal";
import { ButtonLink } from "./ui/Button";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();
  return (
    <section id="featured" className="bg-mint-gradient relative py-16 sm:py-24 lg:py-28">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fresh/30 to-transparent" />
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Featured products"
            title="Our bestselling essentials"
            description="Thoughtfully made cleaners for every room, available in 500ml, 1L and 5L packs."
          />
          <ButtonLink href="/products" variant="outline">
            View all products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
